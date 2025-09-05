/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 11%, 97%)',
        accent: 'hsl(210, 100%, 50%)',
        danger: 'hsl(0, 72%, 50%)',
        primary: 'hsl(210, 13%, 17%)',
        surface: 'hsl(0, 0%, 100%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0, 0%, 0%, 0.05)',
        'modal': '0 12px 36px hsla(0, 0%, 0%, 0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
}