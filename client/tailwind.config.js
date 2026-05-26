/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#111113',
        surface2: '#1c1c1f',
        border: '#27272a',
        borderLight: '#3f3f46',
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-muted': '#52525b',
        accent: '#7c3aed',
        accentLight: '#8b5cf6',
        accentGlow: 'rgba(124, 58, 237, 0.15)',
        todo: '#3b82f6',
        inprogress: '#f59e0b',
        done: '#22c55e',
        low: '#22c55e',
        medium: '#f59e0b',
        high: '#ef4444',
      },
    },
  },
  plugins: [],
};
