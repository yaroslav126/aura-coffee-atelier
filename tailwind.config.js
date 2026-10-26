/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        obsidian: {
          950: '#110B07', // Darkest Roasted Espresso Bean
          900: '#1A120C', // Rich Smoked Mocha
          850: '#231810', // Dark Coffee Grounds
          800: '#2E2016', // Roasted Chestnut
          750: '#38281C', // Deep Toasted Cacao
          700: '#443224', // Warm Coffee Bark
          600: '#5A4331', // Warm Nutmeg
        },
        crema: {
          500: '#D98E3A', // Rich Golden Crema
          400: '#E8A34F', // Warm Amber Honey
          300: '#F5BE75', // Light Caramel Foam
          600: '#B97125', // Deep Toffee
          700: '#945417', // Roasted Molasses
        },
        parchment: {
          50: '#FDFBF7', // Silken Oat Milk Froth
          100: '#F5EFE6', // Unbleached Coffee Linen
          200: '#E8DCcc', // Warm Café-au-Lait Foam
          300: '#D2BFA8', // Coffee Husk Parchment
          400: '#B59F87', // Muted Cinnamon
          800: '#34261C', // Dark Roast Dregs
        },
        roast: {
          leaf: '#3B5949', // Coffee Cherry Leaf
          bean: '#23140C', // Whole Roasted Arabica
          warmClay: '#A85C3A', // Terracotta Roaster
        }
      },
      fontFamily: {
        // Exclusively Outfit (headlines) and Plus Jakarta Sans (body, footers, badges, info)
        serif: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-crema': '0 0 25px -5px rgba(217, 142, 58, 0.3)',
        'soft-float': '0 20px 40px -15px rgba(17, 11, 7, 0.7)',
        'cup-inner': 'inset 0 4px 8px rgba(0, 0, 0, 0.4)',
        'saucer-shadow': '0 12px 24px -6px rgba(10, 6, 4, 0.8)',
      }
    },
  },
  plugins: [],
}
