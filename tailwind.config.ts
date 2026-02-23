import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c5f2d',
          50:  '#f0f7f0',
          100: '#d6ebd6',
          200: '#aed6af',
          300: '#7cba7d',
          400: '#4e9950',
          500: '#2c5f2d',
          600: '#244e25',
          700: '#1c3d1d',
          800: '#152e15',
          900: '#0e1f0e',
        },
        cream: '#f0ebe0',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/hero.png')",
      },
    },
  },
  plugins: [],
}

export default config
