"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const initialHearts: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setHearts(initialHearts)

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * 16 + 10,
          duration: Math.random() * 6 + 6,
          delay: 0,
          opacity: Math.random() * 0.3 + 0.1,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hearts.length > 25) {
      setHearts((prev) => prev.slice(-20))
    }
  }, [hearts.length])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            ["--duration" as string]: `${heart.duration}s`,
            color: `hsl(var(--primary))`,
          }}
        >
          {"\u2764"}
        </span>
      ))}
    </div>
  )
}
