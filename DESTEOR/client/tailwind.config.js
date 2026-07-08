/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'matte-black': '#0D0D0D',
        'champagne-gold': '#C6A15B',
        'champagne-gold-light': '#D9C08A',
        'ivory-white': '#FAF7F2',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 12px rgba(13, 13, 13, 0.08)',
        elevated: '0 8px 30px rgba(13, 13, 13, 0.12)',
      },
      borderRadius: {
        card: '0.75rem',
      },
    },
  },
  plugins: [],
};
