// src/models/Product.js

/*
 * Клас Product представляє товар (продукт) з ідентифікатором, назвою, ціною,
 * описом, зображеннями та категорією.
 * Використовується для моделювання даних товарів, наприклад, з API
 * https://fakeapi.platzi.com/en/rest/products/
 */
export class Product {
  // Конструктор класу для створення нового об'єкта товару
  constructor(id, title, price, description, images, category) {
    this.id = id         // унікальний ідентифікатор товару (генерується API)
    this.title = title   // назва товару
    this.price = price   // ціна товару
    this.description = description  // Опис товару
    // Масив URL-адрес зображень товару. Якщо зображення не передані,
    // використовується зображення-заповнювач:
    this.images = images ||
      [`https://placehold.co/600x400?font=playfair-display&text=${title}`]
    this.category = category       // категорія, до якої належить товар
  }
}