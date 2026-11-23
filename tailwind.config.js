/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080A0F',
          surface: '#0F131D',
          panel: '#151A27',
          border: '#20283A',
          neon: '#CCFF00', // Acid Chartreuse
          cyan: '#00F0FF',
          crimson: '#FF334B',
          amber: '#FFB800',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        hud: '.2em',
        telemetry: '.3em',
      },
      boxShadow: {
        'neon-glow': '0 0 25px rgba(204, 255, 0, 0.25)',
        'cyan-glow': '0 0 25px rgba(0, 240, 255, 0.25)',
      },
    },
  },
  plugins: [],
}
