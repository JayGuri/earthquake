/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-ocean': '#004c97',
        'earth-green': '#3a7d44',
        'sky-blue': '#87ceeb',
        'lime-green': '#a1c349',
        'light-gray': '#f5f5f5',
        'dark-charcoal': '#333333',
        'earthquake-amber': '#f9a602',
        'deep-coral': '#ff6f61',
        'teal-blue': '#79C7C5',
        'soft-green': '#99D19C',
        'dark-teal-blue': '#3A9B9B',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}

