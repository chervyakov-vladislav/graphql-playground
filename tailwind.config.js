/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'color-dark-grey': '#383D5B',
        'color-purple': '#3F20BA',
        'color-dark-purple': '#1B2240',
        'color-bright-black': '#333333',
        'color-dark-blue': '#566992',
        'color-border-dark-purple': '#361e9a',
        'color-hover-button-purple': '#311C87',
        'color-dark-blue-hover': '#003D5B',
        'color-heading-border': '#DEE2E7',
        'color-documentation-primary': '#191C23',
        'color-documentation-secondary': '#5A6270',
        'color-light-gray': '#f3f4f6',
        'color-text-bright-red': '#ff6b98',
        'color-text-red': '#d2054e',
        'color-text-orange': '#ca9800',
        'color-text-green': '#00c773',
      },
      fontFamily: {
        SourceSansPro: ['Source Sans Pro', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        SourceCodePro: ['Source Code Pro', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
