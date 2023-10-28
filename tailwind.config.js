/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
    colors: {
      primary: '#FF5733',          // Color Principal
      secondary: '#33FF57',        // Color Secundario
      warning: '#FFC300',          // Color de Advertencia
      background: '#F0F0F0',      // Color Neutro de Fondo
      text: '#333333',            // Color de Texto Principal
      textSecondary: '#777777',   // Color de Texto Secundario
      accent: '#FF33A1',          // Color de Acento
      highlight: '#E1E1E1',       // Color de Fondo Destacado
      completedTask: '#000380',   // Color de Tareas Completadas
      completedTaskDark: '#00004e',
      pendingTask: '#FF5733',     // Color de Tareas Pendientes
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      teal: '#008080',
      coral: '#FF6B6B',
      lavender: '#E6E6FA',
      indigo: '#4B0082',
      chocolate: '#D2691E',
      plum: '#DDA0DD',
      red:'#8B0000',
    },

  },
  plugins: [],
}

