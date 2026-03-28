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
          DEFAULT: '#c4b99a',
          50:  '#faf8f4',
          100: '#f0ebe0',
          200: '#e2d9c5',
          300: '#d4c7aa',
          400: '#c4b99a',
          500: '#b0a483',
          600: '#9a8e6e',
          700: '#7d7359',
          800: '#5f5744',
          900: '#413c30',
        },
        cream: '#f0ebe0',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/images/hero.png')",
      },
    },
  },
  plugins: [],
}

export default config
