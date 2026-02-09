import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const _lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  title: 'Send Love, Not Just Gifts',
  description: 'A romantic digital gift-sending experience for lovers. Create heartfelt, emotional digital gifts for your special someone.',
}

export const viewport: Viewport = {
  themeColor: '#1a0a10',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-serif antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
