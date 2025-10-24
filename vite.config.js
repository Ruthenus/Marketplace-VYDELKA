// vite.config.js

// Імпорт функції defineConfig для створення конфігурації Vite
import {defineConfig} from "vite"
// Імпорт плагіна React для підтримки JSX і Fast Refresh
import react from "@vitejs/plugin-react"

// Імпорт плагіна OXC для прискореної трансформації JavaScript/TypeScript
// з підтримкою JSX
import oxc from "vite-plugin-oxc"  // ???

// Конфігурація Vite для проєкту
// https://vite.dev/config/
export default defineConfig({
  // Плагіни для обробки React і JSX
  plugins: [react(), oxc()],
  // Налаштування CSS, включаючи PostCSS
  css: {
    // Вказівка файлу конфігурації PostCSS (наприклад, для Tailwind CSS)
    // Документація PostCSS у Vite: https://vite.dev/config/#css-postcss
    postcss: "./postcss.config.js",
  },
  // base: "/", // Забезпечує правильні абсолютні шляхи
  // assetsInclude: ["**/*.png", "**/*.svg"], // Включає всі зображення
})