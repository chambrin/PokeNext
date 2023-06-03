/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-bug',
    'bg-dark',
    'bg-dragon',
    'bg-electric',
    'bg-fairy',
    'bg-fighting',
    'bg-fire',
    'bg-flying',
    'bg-ghost',
    'bg-grass',
    'bg-ground',
    'bg-ice',
    'bg-normal',
    'bg-poison',
    'bg-psychic',
    'bg-rock',
    'bg-steel',
    'bg-water',
    'bg-gradient-radial',
    'bg-gradient-conic',
  ],
  theme: {
    extend: {
      colors: {
        bug: '#8CB230',
        dark: '#58575F',
        dragon: '#0F6AC0',
        electric: '#FDD835',
        fairy: '#ED6EC7',
        fighting: '#D04164',
        fire: '#FD7D24',
        flying: '#748FC9',
        ghost: '#556AAE',
        grass: '#62B957',
        ground: '#DD7748',
        ice: '#61CEC0',
        normal: '#9DA0AA',
        poison: '#A552CC',
        psychic: '#EA5D60',
        rock: '#BAAB82',
        steel: '#417D9A',
        water: '#4A90DA',
      },
      backgroundImage: {

        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

      },
    },
  },
  plugins: [],
}
