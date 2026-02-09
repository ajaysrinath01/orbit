import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        sans: ['var(--font-playfair)', 'serif'],
        serif: ['var(--font-lora)', 'serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float-heart': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 10px hsl(var(--glow)))' },
          '50%': { transform: 'scale(1.08)', filter: 'drop-shadow(0 0 25px hsl(var(--glow)))' },
        },
        'shake-box': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-3deg)' },
          '20%': { transform: 'rotate(3deg)' },
          '30%': { transform: 'rotate(-3deg)' },
          '40%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '60%': { transform: 'rotate(2deg)' },
          '70%': { transform: 'rotate(-1deg)' },
          '80%': { transform: 'rotate(1deg)' },
          '90%': { transform: 'rotate(0deg)' },
        },
        'burst': {
          '0%': { transform: 'scale(0) translateY(0)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1.5) translateY(-80px)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gift-open': {
          '0%': { transform: 'scale(1) rotateY(0deg)' },
          '30%': { transform: 'scale(1.1) rotateY(0deg)' },
          '60%': { transform: 'scale(0.9) rotateY(90deg)' },
          '100%': { transform: 'scale(0) rotateY(180deg)', opacity: '0' },
        },
        'letter-appear': {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(40px)' },
          '60%': { transform: 'scale(1.05) translateY(-5px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        'beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float-heart': 'float-heart var(--duration, 6s) ease-in forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shake-box': 'shake-box 0.8s ease-in-out',
        'burst': 'burst 1s ease-out forwards',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'gift-open': 'gift-open 0.8s ease-in-out forwards',
        'letter-appear': 'letter-appear 0.8s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'beat': 'beat 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
