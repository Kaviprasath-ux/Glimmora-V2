/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F6',
          100: '#F5F1EE',
          200: '#E8E4E0',
          300: '#D1CCC7',
          400: '#C8A896',
          500: '#A57865',
          600: '#8B6450',
          700: '#6B4D3D',
          800: '#4A342A',
          900: '#2A1E18',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F1EE',
          200: '#E8E4E0',
          300: '#D1CCC7',
          400: '#9E9891',
          500: '#6B6560',
          600: '#5C5C5C',
          700: '#3D3D3D',
          800: '#2C2C2C',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
