/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefaf6',   // Creamy white
          100: '#fdf3ea',
          200: '#fbe3c8',
          300: '#f5cfa4',
          400: '#e8b47d',
          500: '#d39b5b',  // Nutty brown
          600: '#b87f3f',
          700: '#9b642e',
          800: '#7b4d21',
          900: '#5c3818',
        },
        secondary: {
          50: '#f9f7f6',
          100: '#efe8e6',
          200: '#d6c5c2',
          300: '#b59e97',
          400: '#93766e',
          500: '#6d5048',  // Chocolate brown
          600: '#543d36',
          700: '#3f2d29',
          800: '#2b1d1c',
          900: '#1a110f',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      },
    },
  },
  plugins: [],
};
