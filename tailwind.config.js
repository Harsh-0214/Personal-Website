/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent:       'rgb(var(--c-accent) / <alpha-value>)',
        base:         'rgb(var(--c-base) / <alpha-value>)',
        raised:       'rgb(var(--c-raised) / <alpha-value>)',
        card:         'rgb(var(--c-card) / <alpha-value>)',
        'card-hover': 'rgb(var(--c-card-hover) / <alpha-value>)',
        'line-subtle':'rgb(var(--c-line-subtle) / <alpha-value>)',
        'line-vis':   'rgb(var(--c-line-vis) / <alpha-value>)',
        'text-hi':    'rgb(var(--c-text-hi) / <alpha-value>)',
        'text-mid':   'rgb(var(--c-text-mid) / <alpha-value>)',
        'text-lo':    'rgb(var(--c-text-lo) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      keyframes: {
        beltLeft:  { '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(-50%)' } },
        beltRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' }   },
      },
      animation: {
        'belt-l': 'beltLeft 30s linear infinite',
        'belt-r': 'beltRight 24s linear infinite',
      },
    },
  },
  plugins: [],
}
