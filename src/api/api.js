// src/api/api.js

// Базовий URL для Platzi Fake Store API (версія v1) –
// використовується як основа для всіх запитів
const API_URL = "https://api.escuelajs.co/api/v1"
// https://fakeapi.platzi.com/

/*
 * Універсальна функція для виконання HTTP-запитів до API.
 * Параметри:
 * - endpoint: шлях до ресурсу API (наприклад, "/products" або "/categories").
 * - options: об'єкт із параметрами запиту:
 * method: HTTP-метод (за замовчуванням "GET"),
 * headers: додаткові заголовки запиту (об'єкт),
 * body: тіло запиту (об'єкт, серіалізується в JSON),
 * signal: сигнал для скасування запиту (AbortSignal, опціонально),
 * onFinally: функція, що викликається після завершення запиту (опціонально).
 * Повертає: Promise з результатом запиту у форматі JSON або кидає помилку.
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * https://react.dev/reference/react/useEffect#fetching-data-with-effects
 */
const fetchData = async (endpoint, options = {}) => {
  // Деструктуризація параметрів запиту з дефолтними значеннями
  const {method = "GET", headers = {}, body, signal = null, onFinally = null}
    = options

  if (signal !== null && !(signal instanceof AbortSignal)) {
    console.error("signal має бути об'єктом AbortSignal або null!")
    return endpoint.match(/^\/products\/\d+$/) ? null : []
  }
  if (onFinally !== null && typeof onFinally !== "function") {
    console.error("onFinally має бути функцією або null!")
    return endpoint.match(/^\/products\/\d+$/) ? null : []
  }

  /// Використовуємо AbortSignal.any для комбінування зовнішнього signal
  // із таймаутом, щоб забезпечити таймаут у всіх випадках:
  const timeoutSignal = signal
    ? AbortSignal.any([signal, AbortSignal.timeout(5000)])
    : AbortSignal.timeout(5000)  // рекомендовано 5 секунд
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/any_static
  // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static


  try {
    // Формування запиту до API з усіма параметрами
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        ...(body ? {"Content-Type": "application/json"} : {}),
        ...headers,  // додаємо додаткові заголовки, якщо є
      },
      // Серіалізуємо тіло запиту
      body: body ? JSON.stringify(body) : undefined,
      signal: timeoutSignal,
    })

    // Перевірка статусу відповіді
    if (!response.ok) {
      if (response.status === 404) {
        console.error("Ресурс не знайдено!")
        return endpoint.match(/^\/products\/\d+$/) ? null : []
      } else if (response.status >= 500) {
        console.error("Помилка сервера!")
        return endpoint.match(/^\/products\/\d+$/) ? null : []
      }
      console.error(`Помилка запиту: ${response.statusText}`)
      return endpoint.match(/^\/products\/\d+$/) ? null : []
    }

    /*
     * endpoint.match(/^\/products\/\d+$/) ? null : []
     * Перевіряє, чи endpoint відповідає шаблону "/products/:id" (наприклад,
     * "/products/123"), де "^\/products\/" — початок рядка з "/products/",
     * "\d+" — одна або більше цифр, "$" — кінець рядка. Якщо запит до окремого
     * товару (наприклад, "/products/123"), повертається null у разі помилки
     * (наприклад, 404, 5xx, AbortError), оскільки клієнтський код очікує
     * об'єкт продукту або null, якщо продукт не знайдено.
     * Для запитів до списків (наприклад, "/categories" або "/products"),
     * повертається порожній масив [], щоб клієнтський код міг обробити
     * відсутність даних як порожній список (наприклад, для відображення в UI).
     * Це забезпечує консистентну обробку помилок відповідно до REST-принципів
     * і документації API.
     */

    // Повертаємо отримані дані у форматі JSON з обробкою помилок парсингу
    let data
    try {
      data = await response.json()
    } catch (jsonError) {
      console.error("Помилка парсингу JSON відповіді:", jsonError.message)
      return endpoint.match(/^\/products\/\d+$/) ? null : []
    }
    return data

  } catch (error) {
    // Якщо запит було скасовано — попередження в консолі
    if (error.name === "AbortError") {
      console.warn(`Запит до ${endpoint} скасовано!`)
      // return [] / повертаємо порожній масив - це важливо для збірки!
      return endpoint.match(/^\/products\/\d+$/) ? null : []
    }

    // Логування інших помилок для налагодження
    console.error(`Помилка при запиті до ${method} ${endpoint}:`,
      error.message)
    throw error  // передати помилку далі
  } finally {
    // Викликаємо onFinally, якщо передано!
    if (typeof onFinally === "function") {
      onFinally()
    }
  }
}


/*
 * Отримує список категорій з API.
 * Параметри:
 * - signal: сигнал для скасування запиту (AbortSignal, опціонально).
 * - onFinally: функція, яка викликається після завершення запиту (опціонально).
 * Повертає: Promise<Array> зі списком категорій.
 * https://fakeapi.platzi.com/en/rest/categories/
 */

export const fetchCategories = async (signal = null, onFinally = null) => {
  // Викликаємо універсальну функцію запиту зі шляхом "/categories"
  return fetchData("/categories", {signal, onFinally})
}


/*
 * Отримує список товарів з API з підтримкою пагінації та фільтрації.
 * Параметри:
 * – limit: максимальна кількість товарів на сторінку (за замовчуванням 5);
 * – offset: зміщення для пагінації (за замовчуванням 0), тобто кількість
 * елементів, які потрібно пропустити перед початком набору результатів;
 * - categoryId: ID категорії для фільтрації (опціонально, додається як
 * ?categoryId=...);
 * - priceMin: мінімальна ціна для фільтрації (опціонально, ?price_min=...);
 * - priceMax: максимальна ціна для фільтрації (опціонально, ?price_max=...);
 * - title: рядок для пошуку за назвою товару (опціонально, ?title=...);
 * - signal: сигнал для скасування запиту (опціонально);
 * - onFinally: функція, яка викликається після завершення запиту (опціонально).
 * Повертає: Promise<Array> зі списком товарів.
 * Кидає: Error, якщо параметри некоректні (наприклад, priceMin > priceMax).
 * https://fakeapi.platzi.com/en/rest/products/
 * https://fakeapi.platzi.com/en/rest/products-filter/
 */
export const fetchProducts = async (
  {
    limit = 5,
    offset = 0,
    categoryId = null,
    priceMin = null,
    priceMax = null,
    title = null,
    signal = null,
    onFinally = null,
  } = {}) => {
  // Валідація параметрів
  if (typeof limit !== "number" || limit < 1) {
    console.error("limit має бути додатним числом!")
    throw new Error("limit має бути додатним числом!")
  }
  if (typeof offset !== "number" || offset < 0) {
    console.error("offset має бути невід'ємним числом!")
    throw new Error("offset має бути невід'ємним числом!")
  }
  if (categoryId !== null && (typeof categoryId !== "number" ||
    categoryId < 1)) {
    console.error("categoryId має бути додатним числом!")
    throw new Error("categoryId має бути додатним числом!")
  }
  if (priceMin !== null && (typeof priceMin !== "number" || priceMin < 0)) {
    console.error("priceMin має бути невід'ємним числом!")
    throw new Error("priceMin має бути невід'ємним числом!")
  }
  if (priceMax !== null && (typeof priceMax !== "number" || priceMax < 0)) {
    console.error("priceMax має бути невід'ємним числом!")
    throw new Error("priceMax має бути невід'ємним числом!")
  }
  if (priceMin !== null && priceMax !== null && priceMin > priceMax) {
    console.error("priceMin не може бути більшим за priceMax")
    throw new Error("priceMin не може бути більшим за priceMax")
  }

  // Об'єкт URLSearchParams автоматично кодує параметри для URL
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const params = new URLSearchParams({
    limit: String(limit),   // додаємо параметри limit та offset
    offset: String(offset),
  })
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams

  // Додаємо фільтри, якщо вони задані
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append
  if (categoryId !== null) params.append("categoryId", String(categoryId))
  if (priceMin !== null) params.append("price_min", String(priceMin))
  if (priceMax !== null) params.append("price_max", String(priceMax))
  if (title !== null) params.append("title", encodeURIComponent(title))
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

  // Формуємо шлях запиту залежно від наявності параметрів
  const queryString = params.toString()  // перетворюємо параметри в рядок
  const endpoint = queryString ? `/products?${queryString}` : "/products"
  // якщо є параметри — додаємо їх до endpoint

  // Викликаємо універсальну функцію з endpoint і додатковими параметрами
  return fetchData(endpoint, {signal, onFinally})
}


/*
 * Отримує дані продукту за ID.
 * Параметри:
 * - productId: ID продукту (обов'язковий);
 * - signal: сигнал для скасування запиту (опціонально);
 * - onFinally: функція, яка викликається після завершення запиту (опціонально).
 * Повертає: Promise<Object> з даними продукту.
 * Кидає: Error, якщо продукт не знайдено (404) або виникла інша помилка.
 * https://fakeapi.platzi.com/en/rest/products/
 */

export const fetchProductById = async (productId, signal, onFinally) => {
  if (typeof productId !== "number" || productId < 1) {
    console.error("productId має бути додатним числом!")
    throw new Error("productId має бути додатним числом!")
  }
  // Запит до конкретного продукту за ID
  return fetchData(`/products/${productId}`, {signal, onFinally})
}