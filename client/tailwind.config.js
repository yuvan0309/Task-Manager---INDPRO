/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(139, 92, 246, 0.35), 0 12px 40px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};
