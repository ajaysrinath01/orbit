"use client"

import React from "react"

import { useState } from "react"

export type GiftType = "heart" | "letter" | "memory"

interface GiftData {
  name: string
  message: string
  type: GiftType
}

const giftOptions: { type: GiftType; label: string; icon: string; description: string }[] = [
  { type: "heart", label: "Heart", icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", description: "A glowing heart full of love" },
  { type: "letter", label: "Love Letter", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z", description: "Heartfelt words on paper" },
  { type: "memory", label: "Memory Box", icon: "M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z", description: "A treasure chest of memories" },
]

export function GiftCreationForm({
  onWrap,
  visible,
}: {
  onWrap: (data: GiftData) => void
  visible: boolean
}) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [giftType, setGiftType] = useState<GiftType>("heart")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    onWrap({ name: name.trim(), message: message.trim(), type: giftType })
  }

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-12 relative z-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none absolute"}`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 md:p-10 rounded-2xl
          bg-[hsl(var(--card)/0.6)] backdrop-blur-xl
          border border-[hsl(var(--border))]
          shadow-[0_8px_60px_hsl(var(--primary)/0.15)]"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Craft Your Gift
          </h2>
          <p className="text-muted-foreground text-sm">
            Pour your heart into every word
          </p>
        </div>

        {/* Partner name input */}
        <div className="mb-6">
          <label
            htmlFor="partner-name"
            className="block text-sm font-medium text-foreground/80 mb-2"
          >
            Your Beloved&apos;s Name
          </label>
          <input
            id="partner-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Their beautiful name..."
            required
            className="w-full px-4 py-3 rounded-lg
              bg-[hsl(var(--muted)/0.5)] backdrop-blur-sm
              border border-[hsl(var(--border))]
              text-foreground placeholder:text-muted-foreground/50
              focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent
              transition-all duration-300"
          />
        </div>

        {/* Love message textarea */}
        <div className="mb-6">
          <label
            htmlFor="love-message"
            className="block text-sm font-medium text-foreground/80 mb-2"
          >
            Your Love Message
          </label>
          <textarea
            id="love-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write from your heart..."
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg resize-none
              bg-[hsl(var(--muted)/0.5)] backdrop-blur-sm
              border border-[hsl(var(--border))]
              text-foreground placeholder:text-muted-foreground/50
              focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-transparent
              transition-all duration-300"
          />
        </div>

        {/* Gift type selector */}
        <div className="mb-8">
          <p className="block text-sm font-medium text-foreground/80 mb-3">
            Choose Your Gift
          </p>
          <div className="grid grid-cols-3 gap-3">
            {giftOptions.map((option) => (
              <button
                key={option.type}
                type="button"
                onClick={() => setGiftType(option.type)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
                  ${
                    giftType === option.type
                      ? "bg-[hsl(var(--primary)/0.2)] border-[hsl(var(--primary))] shadow-[0_0_20px_hsl(var(--glow)/0.3)]"
                      : "bg-[hsl(var(--muted)/0.3)] border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]"
                  }`}
                aria-pressed={giftType === option.type}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={
                    giftType === option.type
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))"
                  }
                  className="transition-colors duration-300"
                  aria-hidden="true"
                >
                  <path d={option.icon} />
                </svg>
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    giftType === option.type
                      ? "text-[hsl(var(--primary))]"
                      : "text-muted-foreground"
                  }`}
                >
                  {option.label}
                </span>
              </button>
            ))}
          </div>
          <p className="text-muted-foreground/60 text-xs mt-2 text-center">
            {giftOptions.find((o) => o.type === giftType)?.description}
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!name.trim() || !message.trim()}
          className="w-full py-4 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display text-lg font-semibold
            transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(var(--glow)/0.4)]
            active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Wrap the Gift
        </button>
      </form>
    </section>
  )
}
