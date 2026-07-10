/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          bg:           'rgb(var(--color-bg) / <alpha-value>)',
          surface:      'rgb(var(--color-surface) / <alpha-value>)',
          border:       'rgb(var(--color-border) / <alpha-value>)',
          muted:        'rgb(var(--color-muted) / <alpha-value>)',
          accent:       'rgb(var(--color-accent) / <alpha-value>)',
          'accent-light':'rgb(var(--color-accent-light) / <alpha-value>)',
          fg:           'rgb(var(--color-fg) / <alpha-value>)',
          'fg-muted':   'rgb(var(--color-fg-muted) / <alpha-value>)',
        },
      },
      animation: {
        'gradient-x':      'gradient-x 8s ease infinite',
        'float':           'float 6s ease-in-out infinite',
        'marquee':         'marquee linear infinite',
        'marquee-reverse': 'marquee-reverse linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3334%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-33.3334%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
