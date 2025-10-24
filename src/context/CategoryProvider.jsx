// src/context/CategoryProvider.jsx

import React, {useEffect, useState} from "react"
import {fetchCategories} from "../api/api.js"
import {Category} from "../models/Category.js"
import {CategoryContext} from "./CategoryContext.jsx"

// Компонент-провайдер, який завантажує список категорій з API, зберігає їх
// у стані, обробляє вибір категорії, статус завантаження та помилки.
// Передає ці дані через контекст CategoryContext до дочірніх компонентів.
export const CategoryProvider = ({children}) => {
// Стан для масиву категорій (Array<Category>), вибраної категорії
// (Category|null), статусу завантаження (boolean) та помилки (string|null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)  // true — поки йде запит
  const [error, setError] = useState(null)
  // https://react.dev/reference/react/useState
  // https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_interactivity_events_state

  // Завантаження категорій з API один раз при монтуванні компонента
  // https://react.dev/reference/react/useEffect
  useEffect(() => {
    const controller = new AbortController()
    // Асинхронна функція для завантаження категорій в useEffect
    const loadCategories = async () => {
      try {
        // Виконуємо запит до API, передаючи сигнал для можливого скасування
        const data = await fetchCategories(controller.signal)
        // Перетворюємо отримані дані у масив об'єктів типу Category
        const mapped = data.map(item => new Category(item.id, item.name,
          item.image))
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        setCategories(mapped)  // оновлюємо стан категорій
        setLoading(false)  // позначаємо, що завантаження завершено
      } catch (err) {
        setError(err.message) // у разі помилки зберігаємо повідомлення про неї
        setLoading(false)  // завершуємо завантаження, навіть з помилкою
      }
    }
    loadCategories()
    return () => controller.abort() // скасовує запит у разі розмонтування
  }, [])  // ефект виконається лише один раз (порожній масив залежностей)

  // Передача стану і функцій через контекст
  return (
    <CategoryContext.Provider value={{
      categories,          // масив усіх категорій
      selectedCategory,    // поточна вибрана категорія
      setSelectedCategory, // функція для зміни вибраної категорії
      loading,             // чи триває завантаження
      error                // повідомлення про помилку, якщо є
    }}>
      {children} {/* Вкладені компоненти, які отримають доступ до контексту */}
    </CategoryContext.Provider>
    // https://react.dev/learn/passing-data-deeply-with-context
  )
}