/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d9040d',
          redHover: '#b8040b',
          accent: '#d9181c',
          subscribe: '#e31e24',
          blue: '#0447d9',
        },
        ink: {
          DEFAULT: '#0b1521',
          heading: '#111827',
          body: '#374151',
          muted: '#6b7280',
          faint: '#9ca3af',
        },
        line: {
          DEFAULT: '#e5e7eb',
          soft: '#f3f4f6',
        },
        blush: {
          50: '#fdf8f8',
          100: '#f9f3f3',
          200: '#f4e2e1',
          300: '#f8dcdb',
        },
        partner: {
          DEFAULT: '#4e46b4',
          600: '#2570eb',
          deep: '#16033e',
          soft: '#e7ebf9',
          tint: '#f2f3f8',
          band: '#cbd4ef',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        nav: ['Sora', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
      boxShadow: {
        btn: '0px 10px 15px -3px #fecaca, 0px 4px 6px -4px #fecaca',
        card: '0px 1px 3px rgba(0,0,0,0.06), 0px 1px 2px rgba(0,0,0,0.04)',
        cardHover: '0px 10px 20px -6px rgba(217,4,13,0.12)',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};
