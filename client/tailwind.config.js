/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'negro': '#11131B',
        'gris': '#2A373D',
        'azul': '#76ABAE',
        'blanco': '#D9D9D9;',
        'rojo': '#37232E',
        'rojo-uam':'#cd032e',
        'azulFuerte': '#764460'
      },
    },
  },
  plugins: [],
}

