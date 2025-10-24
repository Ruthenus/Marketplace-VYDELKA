// src/models/Category.js

/*
 * Клас Category представляє категорію з ідентифікатором, назвою та зображенням.
 * Використовується для моделювання даних категорій, наприклад, з API
 * https://fakeapi.platzi.com/en/rest/categories/
 */
export class Category {
  // Конструктор класу для створення нового об'єкта категорії
  constructor(id, name, image) {
    this.id = id      // унікальний ідентифікатор категорії (генерується API)
    this.name = name  // Назва категорії
    // URL-адреса зображення категорії або зображення-заповнювача
    this.imageUrl = image ||
      `https://placehold.co/600x400?font=playfair-display&text=${name}`
  }
}