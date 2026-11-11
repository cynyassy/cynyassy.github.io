import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        designAdventure: path.resolve(__dirname, 'projects/design-adventure.html'),
        styleStudio: path.resolve(__dirname, 'projects/style-studio.html'),
        interfaceExperiments: path.resolve(__dirname, 'projects/interface-experiments.html'),
        perspectives: path.resolve(__dirname, 'projects/perspectives.html'),
        coffeeTools: path.resolve(__dirname, 'projects/coffee-tools.html'),
        algotest: path.resolve(__dirname, 'projects/algotest.html'),
        cynyassy: path.resolve(__dirname, 'projects/cynyassy.html'),
        bookStory: path.resolve(__dirname, 'projects/not-everything-is-urgent.html'),
        filmFestivalFriday: path.resolve(__dirname, 'projects/film-festival-friday.html'),
        otherProjects: path.resolve(__dirname, 'projects/other-projects.html'),
        workWithMe: path.resolve(__dirname, 'projects/work-with-me.html'),
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
