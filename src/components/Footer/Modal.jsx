// Імпорт React та хука useEffect для роботи з побічними ефектами
// Документація React: https://react.dev/reference/react
// Документація useEffect: https://react.dev/reference/react/useEffect
import React, {useEffect} from "react"
// Імпорт ReactDOM для рендерингу модального вікна через портал
// Документація ReactDOM: https://react.dev/reference/react-dom
import ReactDOM from "react-dom"
// Імпорт конфігурації модального вікна, що містить стилі та ID порталу
import {modalConfig} from "../../constants/modalConfig.js"

// Компонент Modal для відображення модального вікна з налаштуваннями
// Пропси: isOpen (логічне значення для контролю відображення), onClose
// (функція для закриття), title (заголовок модалки), children (вміст модалки)
const Modal = ({isOpen, onClose, title, children}) => {
  // Хук useEffect для обробки натискання клавіші Escape для закриття модалки
  useEffect(() => {
    // Функція обробки події натискання клавіші Escape
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()  // виклик функції закриття
    }

    // Додавання слухача подій для клавіші, якщо модальне вікно відкрите
    if (isOpen) window.addEventListener("keydown", handleEsc)
    // Очищення слухача подій при розмонтуванні компонента або зміні isOpen
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])  // залежності ефекту: isOpen та onClose

  // Якщо модальне вікно закрите, не рендеримо нічого
  if (!isOpen) return null

  // Рендеринг модального вікна через портал для розміщення у вказаному DOM-вузлі
  // Документація createPortal: https://react.dev/reference/react-dom/createPortal
  return ReactDOM.createPortal(
    <div
      style={{
        // Застосування стилів накладки з конфігурації
        ...modalConfig.styles.overlay,
        // Керування видимістю через прозорість
        opacity: isOpen ? 1 : 0,
        // Увімкнення/вимкнення взаємодії з мишею
        pointerEvents: isOpen ? "auto" : "none",
        // https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
      }}
      // Закриття модального вікна в разі клацання на накладку
      onClick={onClose}
    >
      <div
        style={{
          // Застосування стилів вмісту модального вікна
          ...modalConfig.styles.content,
          // Анімація появи модалки
          transform: isOpen ? "translateY(0)" : "translateY(10px)",
        }}
        // Запобігання закриттю в разі клацання всередині модалки
        onClick={(e) => e.stopPropagation()}
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
      >
        {/* Кнопка для закриття модального вікна */}
        <button style={modalConfig.styles.closeButton} onClick={onClose}>
          ✕
        </button>
        {/* Заголовок модального вікна */}
        <h2 style={modalConfig.styles.header}>{title}</h2>
        {/* Вміст модального вікна, переданий через пропс children */}
        <div style={modalConfig.styles.contentText}>{children}</div>
      </div>
    </div>,
    // Рендеринг у DOM-вузол із modalConfig.portalId, або в
    // document.body за замовчуванням
    document.getElementById(modalConfig.portalId) || document.body
  )
}

export default Modal