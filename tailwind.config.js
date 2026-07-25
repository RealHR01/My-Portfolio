/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Clash Display"', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#09090B',
          surface: '#18181B',
          border: '#27272A',
          muted: '#3F3F46',
          accent: '#2563EB',
          'accent-light': '#3B82F6',
          fg: '#FAFAFA',
          'fg-muted': '#A1A1AA',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee linear infinite',
        'marquee-reverse': 'marquee-reverse linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.3334%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-33.3334%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
