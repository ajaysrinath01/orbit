"use client"

import { useEffect, useState } from "react"

const romanticQuotes = [
  "In all the world, there is no heart for me like yours.",
  "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.",
  "Whatever our souls are made of, his and mine are the same.",
  "You are my sun, my moon, and all my stars.",
  "I loved you yesterday, I love you still. I always have, I always will.",
  "Every love story is beautiful, but ours is my favorite.",
  "I choose you. And I'll choose you over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
  "To love and be loved is to feel the sun from both sides.",
]

export function LandingSection({ onStart }: { onStart: () => void }) {
  const [quote, setQuote] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setQuote(romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)])
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center relative z-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 text-[hsl(var(--glow))] animate-sparkle text-2xl" aria-hidden="true">
        {"*"}
      </div>
      <div
        className="absolute top-32 right-16 text-[hsl(var(--glow))] animate-sparkle text-lg"
        style={{ animationDelay: "0.5s" }}
        aria-hidden="true"
      >
        {"*"}
      </div>
      <div
        className="absolute bottom-40 left-20 text-[hsl(var(--glow))] animate-sparkle text-xl"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      >
        {"*"}
      </div>

      {/* Pulsing heart icon */}
      <div className="mb-8 animate-pulse-glow">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="hsl(var(--primary))"
          className="drop-shadow-[0_0_20px_hsl(var(--glow))]"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
        Send Love,{" "}
        <span className="text-[hsl(var(--primary))] drop-shadow-[0_0_20px_hsl(var(--glow))]">
          Not Just Gifts
        </span>
      </h1>

      <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
        Create heartfelt digital gifts wrapped in emotion. A letter, a memory, a
        heartbeat — send what money can&apos;t buy.
      </p>

      <button
        onClick={onStart}
        type="button"
        className="group relative px-8 py-4 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display text-lg font-semibold
          transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--glow)/0.5)]
          active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="relative z-10 flex items-center gap-2">
          Create a Gift
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      </button>

      {/* Romantic quote */}
      <div className="mt-16 max-w-md">
        <p className="text-muted-foreground/70 text-sm italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
    </section>
  )
}
