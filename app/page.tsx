"use client"

import { useState } from "react"
import { Wallet, CheckCircle2, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

// Hash function to deterministically generate allocation based on address
function generateAllocation(address: string): number {
  let hash = 0
  for (let i = 0; i < address.length; i++) {
    const char = address.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  // Convert hash to a number between 500 and 18000
  const range = 18000 - 500
  const allocation = 500 + (Math.abs(hash) % range)
  return Math.floor(allocation)
}

export default function AirdropChecker() {
  const [walletAddress, setWalletAddress] = useState("")
  const [allocation, setAllocation] = useState<number | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = async () => {
    if (!walletAddress.trim()) return

    setIsChecking(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allocatedAmount = generateAllocation(walletAddress)
    setAllocation(allocatedAmount)
    setIsChecking(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] via-[#2563eb] to-[#3b82f6] animate-gradient" />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent opacity-50" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-purple-500/10 via-transparent to-transparent opacity-40" />

      <div className="absolute top-20 left-10 w-48 h-48 opacity-40">
        <Image src="/rainbow-3d.png" alt="" width={192} height={192} className="rainbow-float drop-shadow-2xl" />
      </div>
      <div className="absolute top-1/3 right-10 w-56 h-56 opacity-30">
        <Image
          src="/rainbow-planet.png"
          alt=""
          width={224}
          height={224}
          className="rainbow-float-delayed drop-shadow-2xl"
        />
      </div>
      <div className="absolute bottom-32 left-20 w-40 h-40 opacity-35 rotate-12">
        <Image src="/rainbow-3d.png" alt="" width={160} height={160} className="rainbow-float-delayed drop-shadow-xl" />
      </div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 opacity-20 -rotate-45">
        <Image src="/rainbow-planet.png" alt="" width={128} height={128} className="rainbow-float drop-shadow-lg" />
      </div>

      <div className="absolute top-40 right-32 w-16 h-16 opacity-40">
        <Sparkles className="w-full h-full text-yellow-200 animate-pulse" />
      </div>
      <div className="absolute bottom-40 right-20 w-12 h-12 opacity-30">
        <Sparkles className="w-full h-full text-cyan-200 animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="absolute top-1/4 left-1/3 w-10 h-10 opacity-25">
        <Sparkles className="w-full h-full text-pink-200 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full" />
              <Image
                src="/rainbow-logo.png"
                alt="Rainbow Logo"
                width={120}
                height={120}
                className="relative drop-shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-center text-white leading-tight text-balance drop-shadow-lg">
            Check Your RAINBOW Airdrop
          </h1>

          <Card className="p-8 md:p-12 glass-card rounded-[2.5rem] shadow-2xl pulse-glow">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/90 text-sm font-bold uppercase tracking-wider">
                  <Wallet className="w-5 h-5" />
                  <span>Wallet Address</span>
                </div>

                <Input
                  type="text"
                  placeholder="Enter your wallet address..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="h-16 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl px-6 text-base backdrop-blur-md focus:bg-white/15 focus:border-white/30 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCheck()
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleCheck}
                disabled={!walletAddress.trim() || isChecking}
                className="w-full h-16 bg-gradient-to-r from-red-500 via-orange-400 via-yellow-400 via-green-400 via-cyan-400 to-blue-500 hover:opacity-90 hover:scale-[1.02] text-black font-black text-lg rounded-2xl transition-all disabled:opacity-50 shadow-2xl hover:shadow-3xl disabled:hover:scale-100"
              >
                <CheckCircle2 className="w-6 h-6 mr-2" />
                {isChecking ? "Checking..." : "Check Airdrop"}
              </Button>

              {allocation !== null && (
                <div className="mt-8 p-8 glass-card rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="text-center space-y-3">
                    <p className="text-white/80 text-sm uppercase tracking-widest font-bold">Your Allocation</p>
                    <p className="text-6xl md:text-7xl font-black rainbow-text drop-shadow-lg">
                      {allocation.toLocaleString()}
                    </p>
                    <p className="text-3xl md:text-4xl font-black text-white drop-shadow-md">RAINBOW</p>
                    <div className="pt-4 mt-4 border-t border-white/20">
                      <p className="text-white/60 text-xs font-mono tracking-wider">
                        {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex items-center justify-center gap-3 pt-4">
            <p className="text-white/60 text-sm font-medium">Powered by</p>
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
              <Image
                src="/rainbow-logo.png"
                alt="Rainbow"
                width={28}
                height={28}
                className="relative inline-block drop-shadow-lg"
              />
            </div>
            <p className="text-white/80 text-sm font-bold tracking-wide">RAINBOW</p>
          </div>
        </div>
      </div>
    </div>
  )
}
