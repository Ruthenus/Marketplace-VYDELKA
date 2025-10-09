// Імпорт функції defineConfig для створення конфігурації Vite
import { defineConfig } from "vite"
// Імпорт плагіна React для підтримки JSX і Fast Refresh
import react from "@vitejs/plugin-react"

// Конфігурація Vite для проєкту
// https://vite.dev/config/
export default defineConfig({
  // Плагіни для обробки React і JSX
  plugins: [react()],
  // Налаштування CSS, включаючи PostCSS
  css: {
    // Вказівка файлу конфігурації PostCSS (наприклад, для Tailwind CSS)
    // Документація PostCSS у Vite: https://vite.dev/config/#css-postcss
    postcss: "./postcss.config.js",
  },
})