"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { GiftType } from "./gift-creation-form"

interface BurstHeart {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
}

const romanticQuotes = [
  "Love is composed of a single soul inhabiting two bodies.",
  "The best thing to hold onto in life is each other.",
  "Where there is love there is life.",
  "You are my today and all of my tomorrows.",
  "I have found the one whom my soul loves.",
  "Love recognizes no barriers.",
]

export function GiftReveal({
  visible,
  name,
  message,
  giftType,
  onReset,
}: {
  visible: boolean
  name: string
  message: string
  giftType: GiftType
  onReset: () => void
}) {
  const [phase, setPhase] = useState<"loading" | "wrapped" | "opening" | "revealed">("loading")
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([])
  const [typedText, setTypedText] = useState("")
  const [randomQuote, setRandomQuote] = useState("")
  const [kissHearts, setKissHearts] = useState<BurstHeart[]>([])
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!visible) {
      setPhase("loading")
      setTypedText("")
      setBurstHearts([])
      setKissHearts([])
      return
    }

    setRandomQuote(romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)])

    const loadingTimer = setTimeout(() => {
      setPhase("wrapped")
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [visible])

  const typeMessage = useCallback(
    (text: string) => {
      let index = 0
      setTypedText("")

      const typeNext = () => {
        if (index < text.length) {
          setTypedText(text.slice(0, index + 1))
          index++
          typingRef.current = setTimeout(typeNext, 40)
        }
      }
      typeNext()
    },
    [],
  )

  const handleGiftClick = useCallback(() => {
    if (phase !== "wrapped") return

    setPhase("opening")

    // Create burst hearts
    const hearts: BurstHeart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 300 - 100,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.8 + 0.4,
    }))
    setBurstHearts(hearts)

    setTimeout(() => {
      setPhase("revealed")
      typeMessage(message)
    }, 900)
  }, [phase, message, typeMessage])

  const sendKiss = useCallback(() => {
    const newHearts: BurstHeart[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 400,
      y: -(Math.random() * 200 + 50),
      rotation: Math.random() * 360,
      scale: Math.random() * 0.6 + 0.5,
    }))
    setKissHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setKissHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)))
    }, 1200)
  }, [])

  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current)
    }
  }, [])

  if (!visible) return null

  const giftIcon =
    giftType === "heart"
      ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      : giftType === "letter"
        ? "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        : "M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative z-10">
      {/* Loading phase - heartbeat */}
      {phase === "loading" && (
        <div className="flex flex-col items-center gap-6 animate-fade-up">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="hsl(var(--primary))"
            className="animate-beat drop-shadow-[0_0_30px_hsl(var(--glow))]"
            aria-label="Loading your gift"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <p className="text-muted-foreground text-lg font-display">
            Wrapping your love...
          </p>
        </div>
      )}

      {/* Wrapped gift phase */}
      {(phase === "wrapped" || phase === "opening") && (
        <div className="flex flex-col items-center gap-6 relative">
          {/* Burst hearts overlay */}
          {burstHearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute animate-burst text-[hsl(var(--primary))] pointer-events-none"
              style={{
                ["--tx" as string]: `${heart.x}px`,
                ["--ty" as string]: `${heart.y}px`,
                transform: `rotate(${heart.rotation}deg) scale(${heart.scale})`,
                fontSize: `${16 + heart.scale * 16}px`,
                left: "50%",
                top: "50%",
                marginLeft: "-8px",
                marginTop: "-8px",
                animationFillMode: "forwards",
              }}
              aria-hidden="true"
            >
              {"\u2764"}
            </span>
          ))}

          <button
            onClick={handleGiftClick}
            type="button"
            className={`group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl p-8
              ${phase === "opening" ? "animate-gift-open" : "animate-fade-up cursor-pointer"}`}
            aria-label={`Open gift for ${name}`}
            disabled={phase === "opening"}
          >
            {/* Gift box glow */}
            <div
              className="absolute inset-0 rounded-2xl bg-[hsl(var(--primary)/0.1)] blur-xl transition-all duration-300 group-hover:bg-[hsl(var(--primary)/0.2)]"
              aria-hidden="true"
            />

            {/* Gift icon */}
            <div className={`relative ${phase === "wrapped" ? "group-hover:animate-shake-box" : ""}`}>
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="hsl(var(--primary))"
                className="drop-shadow-[0_0_30px_hsl(var(--glow))] transition-all duration-300 group-hover:drop-shadow-[0_0_50px_hsl(var(--glow))]"
                aria-hidden="true"
              >
                <path d={giftIcon} />
              </svg>

              {/* Ribbon bow decoration */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[hsl(var(--accent))] opacity-80"
                aria-hidden="true"
              />
            </div>

            <p className="relative mt-6 text-foreground font-display text-xl">
              A gift for{" "}
              <span className="text-[hsl(var(--primary))] font-bold">{name}</span>
            </p>
            {phase === "wrapped" && (
              <p className="relative text-muted-foreground text-sm mt-2 transition-all duration-300 group-hover:text-foreground/80">
                Tap to open
              </p>
            )}
          </button>
        </div>
      )}

      {/* Revealed message phase */}
      {phase === "revealed" && (
        <div className="flex flex-col items-center gap-8 w-full max-w-lg animate-letter-appear">
          {/* Letter card */}
          <div
            className="w-full p-8 md:p-10 rounded-2xl
              bg-[hsl(var(--card)/0.6)] backdrop-blur-xl
              border border-[hsl(var(--border))]
              shadow-[0_8px_60px_hsl(var(--primary)/0.2)]"
          >
            <div className="flex items-center justify-center mb-6">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="hsl(var(--primary))"
                className="animate-pulse-glow"
                aria-hidden="true"
              >
                <path d={giftIcon} />
              </svg>
            </div>

            <p className="text-center text-foreground/60 text-sm font-medium mb-4">
              Dearest{" "}
              <span className="text-[hsl(var(--primary))]">{name}</span>,
            </p>

            {/* Typing message */}
            <div className="min-h-[100px] flex items-start justify-center">
              <p className="text-foreground text-lg md:text-xl leading-relaxed text-center italic">
                {typedText}
                <span className="inline-block w-0.5 h-5 bg-[hsl(var(--primary))] ml-0.5 animate-pulse align-text-bottom" />
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
              <p className="text-center text-foreground/50 text-sm">
                With all my love
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={sendKiss}
              type="button"
              className="px-6 py-3 rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-display font-semibold
                transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)]
                active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {"Send Another Kiss \uD83D\uDC8B"}
            </button>

            <button
              onClick={onReset}
              type="button"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-3 py-1"
            >
              Create another gift
            </button>
          </div>

          {/* Kiss hearts burst */}
          <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
            {kissHearts.map((heart) => (
              <span
                key={heart.id}
                className="absolute animate-burst text-[hsl(var(--primary))]"
                style={{
                  left: "50%",
                  top: "60%",
                  fontSize: `${20 + heart.scale * 14}px`,
                  animationFillMode: "forwards",
                  transform: `translate(${heart.x}px, ${heart.y}px) scale(${heart.scale})`,
                }}
              >
                {"\u2764"}
              </span>
            ))}
          </div>

          {/* Random romantic quote */}
          <div className="mt-4 max-w-sm text-center">
            <p className="text-muted-foreground/50 text-xs italic leading-relaxed">
              &ldquo;{randomQuote}&rdquo;
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
