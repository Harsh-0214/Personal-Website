/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: '#00CFFF',
        'accent-dim': 'rgba(0,207,255,0.1)',
        'accent-border': 'rgba(0,207,255,0.25)',
        base: '#080808',
        raised: '#0F0F0F',
        card: '#131313',
        'card-hover': '#1A1A1A',
        'line-subtle': '#1C1C1C',
        'line-vis': '#2A2A2A',
        'text-hi': '#F2F0EA',
        'text-mid': '#888',
        'text-lo': '#444',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      keyframes: {
        beltLeft:  { '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(-50%)' } },
        beltRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
      animation: {
        'belt-l': 'beltLeft 30s linear infinite',
        'belt-r': 'beltRight 24s linear infinite',
      },
    },
  },
  plugins: [],
}
