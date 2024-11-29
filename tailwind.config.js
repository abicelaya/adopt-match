/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verdeClaro: "#c5d5af",      
        verdeOscuro: "#58624c",     
        beige: "#f7ead8",           
        marron: "#695942",          
        celeste: "#c5e1ee",         
        celesteGrisaceo: "#69787f", 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

