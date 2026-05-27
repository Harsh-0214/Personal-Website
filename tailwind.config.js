/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:          'rgb(var(--c-bg) / <alpha-value>)',
        surface:     'rgb(var(--c-surface) / <alpha-value>)',
        ink:         'rgb(var(--c-ink) / <alpha-value>)',
        mid:         'rgb(var(--c-mid) / <alpha-value>)',
        dim:         'rgb(var(--c-dim) / <alpha-value>)',
        rust:        'rgb(var(--c-rust) / <alpha-value>)',
        line:        'rgb(var(--c-line) / <alpha-value>)',
        'line-faint':'rgb(var(--c-line-faint) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"Courier New"', 'Courier', 'monospace'],
      },
      keyframes: {
        beltLeft:  { '0%': { transform: 'translateX(0)' },    '100%': { transform: 'translateX(-50%)' } },
        beltRight: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' }   },
        gentlePulse: { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '0.7' } },
      },
      animation: {
        'belt-l':       'beltLeft 48s linear infinite',
        'belt-r':       'beltRight 38s linear infinite',
        'gentle-pulse': 'gentlePulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
