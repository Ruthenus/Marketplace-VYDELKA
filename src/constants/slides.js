// src/constants/slides.js

/*
 * Масив об'єктів для каруселі основних банерів.
 * Кожен об'єкт містить ID, URL зображення, текст alt для доступності та
 * параметр lazy-loading.
 */

export const slides = [
  {
    id: 1,
    image: "https://content.rozetka.com.ua/banner_main/images_ua/big/610850328.jpg",
    alt: "Gift",
    loading: "lazy"
  },
  {
    id: 2,
    image: "https://content1.rozetka.com.ua/banner_main/images_ua/big/610140869.jpg",
    alt: "Незламність",
    loading: "lazy"
  },
  {
    id: 3,
    image: "https://content.rozetka.com.ua/banner_main/images_ua/big/610810683.jpg",
    alt: "Sale",
    loading: "lazy"
  },
  {
    id: 4,
    image: "https://content1.rozetka.com.ua/banner_main/images_ua/big/606663937.jpg",
    alt: "Незламність",
    loading: "lazy"
  },
  {
    id: 5,
    image: "https://content1.rozetka.com.ua/banner_main/images_ua/big/611277015.jpg",
    alt: "Sale",
    loading: "lazy"
  },
  {
    id: 6,
    image: "https://content1.rozetka.com.ua/banner_main/images_ua/big/611063426.jpg",
    alt: "New",
    loading: "lazy"
  },
  {
    id: 7,
    image: "https://content.rozetka.com.ua/banner_main/images_ua/big/602934807.jpg",
    alt: "Gift",
    loading: "lazy"
  },
]

// https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading
// https://web.dev/articles/browser-level-image-lazy-loading
// https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element