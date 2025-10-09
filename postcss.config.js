/*
Конфігурація PostCSS для обробки CSS у проєкті
Ініціалізація: npx tailwindcss init -p
Документація PostCSS: https://postcss.org/
Документація Tailwind CSS: https://tailwindcss.com/docs/installation
Документація Autoprefixer: https://github.com/postcss/autoprefixer
*/

export default {
  // Плагіни PostCSS для обробки стилів
  plugins: {
    // Tailwind CSS для генерації утиліт
    tailwindcss: {},
    // Autoprefixer для додавання вендорних префіксів до CSS
    autoprefixer: {},
  },
}