/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        handwriting: ['var(--font-handwriting)', 'cursive'],
      },
      // ... rest of your theme config
    },
  },
  // ... rest of your tailwind config
}

