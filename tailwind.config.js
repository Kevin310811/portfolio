/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050E1C',
          900: '#071426',
          850: '#081A2F',
          800: '#0A1933',
          700: '#0C2140',
          600: '#0E2A52',
        },
        brand: {
          primary: '#00D3F3',
          secondary: '#C27AFF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      backgroundImage: {
        'radial-brand':
          'radial-gradient(circle at 30% 20%, rgba(0,211,243,0.18), transparent 45%), radial-gradient(circle at 75% 80%, rgba(194,122,255,0.18), transparent 45%)',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(5,14,28,0.45)',
        'glass-lg': '0 24px 64px -12px rgba(5,14,28,0.6)',
        glow: '0 0 40px -8px rgba(0,211,243,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
