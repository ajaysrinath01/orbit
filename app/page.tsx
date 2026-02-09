"use client"

import { useCallback, useState } from "react"
import { FloatingHearts } from "@/components/floating-hearts"
import { LandingSection } from "@/components/landing-section"
import { GiftCreationForm, type GiftType } from "@/components/gift-creation-form"
import { GiftReveal } from "@/components/gift-reveal"

type AppScreen = "landing" | "create" | "reveal"

export default function Page() {
  const [screen, setScreen] = useState<AppScreen>("landing")
  const [giftData, setGiftData] = useState({ name: "", message: "", type: "heart" as GiftType })

  const handleStart = useCallback(() => {
    setScreen("create")
  }, [])

  const handleWrap = useCallback((data: { name: string; message: string; type: GiftType }) => {
    setGiftData(data)
    setScreen("reveal")
  }, [])

  const handleReset = useCallback(() => {
    setGiftData({ name: "", message: "", type: "heart" })
    setScreen("landing")
  }, [])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient radial glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, hsl(340 82% 62% / 0.08), transparent 70%)",
        }}
      />

      {/* Floating hearts background */}
      <FloatingHearts />

      {/* Screens */}
      {screen === "landing" && <LandingSection onStart={handleStart} />}
      {screen === "create" && (
        <GiftCreationForm onWrap={handleWrap} visible={screen === "create"} />
      )}
      <GiftReveal
        visible={screen === "reveal"}
        name={giftData.name}
        message={giftData.message}
        giftType={giftData.type}
        onReset={handleReset}
      />
    </main>
  )
}
