// tailwind.config.js

/*
Конфігурація Tailwind CSS для проєкту.
- Визначає файли для сканування класів (content).
- Налаштовує тему через theme.extend для кастомізації.
- Дозволяє підключати плагіни через plugins.
Інструкції для встановлення:
- npm install -D tailwindcss@3.4.18
- npx tailwindcss init -p
- npm install -D autoprefixer
Документація Tailwind CSS: https://tailwindcss.com/docs/configuration
*/
export default {
  // Вказівка файлів, які скануються для генерації CSS класів
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Налаштування теми Tailwind CSS
  theme: {
    // Розширення стандартної теми
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"],
      },
    },
  },
  // Плагіни для розширення функціональності
  plugins: [],
}