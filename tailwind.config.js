/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // This powers the "breathing" effect on your project cards
        'cyber-pulse': 'cyber-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // This powers the flickering text effect
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        'cyber-pulse': {
          '0%, 100%': { 
            opacity: '1', 
            borderColor: 'rgba(34, 211, 238, 0.2)',
            boxShadow: '0 0 5px rgba(34, 211, 238, 0.1)' 
          },
          '50%': { 
            opacity: '0.9', 
            borderColor: 'rgba(34, 211, 238, 0.8)',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)' 
          },
        },
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
      },
      // This allows you to use custom drop shadows for the neon icons
      dropShadow: {
        'neon-cyan': '0 0 10px rgba(34, 211, 238, 0.8)',
        'neon-green': '0 0 10px rgba(34, 197, 94, 0.8)',
        'neon-blue': '0 0 10px rgba(59, 130, 246, 0.8)',
        'neon-pink': '0 0 10px rgba(236, 72, 153, 0.8)',
      }
    },
  },
  plugins: [],
}