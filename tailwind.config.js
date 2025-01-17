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
        beigeOscuro: "#e6d2b8",
        marron: "#695942",          
        celeste: "#c5e1ee",         
        celesteGrisaceo: "#69787f", 
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
        dmSerif: ['DM Serif Display', 'serif'],
      },
      /**
       * spacing: {
        18: '4.5rem', // Ejemplo de margen/padding específico
        22: '5.5rem',
      },
      fontSize: {
        tiny: '0.75rem', // Tamaño pequeño personalizado
        huge: '2.5rem', // Tamaño grande personalizado
      },
      borderRadius: {
        xl: '1rem', // Bordes redondeados más grandes
        '2xl': '1.5rem',
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra personalizada
      },
      opacity: {
        15: '0.15', // Transparencia adicional
      },
       * 
       */
      
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

