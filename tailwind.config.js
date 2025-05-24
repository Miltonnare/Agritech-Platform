/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2E7D32', // primary
          600: '#2e7031',
          700: '#285e2a',
          800: '#224c24',
          900: '#1b3a1c',
        },
        secondary: {
          50: '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548', // secondary
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723',
        },
        accent: {
          50: '#fdf8ef',
          100: '#faefd7',
          200: '#f8e7bf',
          300: '#f5deb3', // accent
          400: '#f2d699',
          500: '#efce80',
          600: '#ecc566',
          700: '#e9bd4d',
          800: '#e6b433',
          900: '#e3ac1a',
        },
        success: {
          500: '#4CAF50',
        },
        warning: {
          500: '#FFA000',
        },
        error: {
          500: '#E53935',
        },
        weather: {
          sunny: '#FFB74D',
          rainy: '#64B5F6',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};