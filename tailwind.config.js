/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'], // Adicionado para a estética hacker
      },
      keyframes: {
        fadeInChar: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: '#06b6d4' }, /* cyan-500 */
          '50%': { borderColor: '#8b5cf6' }, /* violet-500 */
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        fadeInChar: 'fadeInChar 0.5s ease-out forwards',
        pulseBorder: 'pulseBorder 3s infinite alternate',
        gradientShift: 'gradientShift 10s ease infinite',
        // Outras animações existentes (fadeIn, slideInUp, scaleIn, fadeInUp, inputFadeIn, buttonPop)
      },
    },
  },
  plugins: [],
}

