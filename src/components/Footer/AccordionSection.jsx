// src/components/Footer/AccordionSection.jsx

import React, {useState} from "react"
import {footerSections} from "../../constants/footerSections.js"

// Компонент AccordionSection для відображення секцій, що згортаються,
// у нижній частині сторінки
const AccordionSection = ({sections = footerSections}) => {
  // Стан для відстеження, яка секція відкрита
  const [openSection, setOpenSection] = useState(null)

  // Функція для перемикання стану відкрито/закрито секції
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
    // Якщо секція вже відкрита, закрити її; інакше відкрити
  }

  return (
    // Фрагмент для уникнення зайвого DOM-вузла
    <>
      {/* Перебір секцій для рендерингу кожного елемента акордеона */}
      {sections.map((sec, i) => (
        // Кожна секція має верхню межу та відступи
        <div key={i} className="border-t border-gray-200 py-3">
          {/* Кнопка для перемикання видимості секції */}
          <button
            // Викликає toggleSection з індексом секції
            onClick={() => toggleSection(i)}
            className="w-full flex justify-between items-center
            text-gray-800 text-[15px] font-medium"
          >
            {sec.title} {/* Заголовок секції */}
            {/* Піктограма шеврона обертається залежно від стану openSection */}
            <span
              className={`transform transition-transform ${
                openSection === i ? "rotate-180" : "rotate-0"
              }`}
            >
              V
            </span>
          </button>
          {/* Умовне відображення посилань, якщо секція відкрита */}
          {openSection === i && (
            // Список посилань із відступами
            <ul className="mt-2 pl-3 space-y-2 text-gray-700">
              {sec.links.map((link, j) => (
                // Елемент списку з унікальним ключем
                <li key={j}>
                  {/* Посилання зі стилями при наведенні */}
                  <a href="#" className="hover:text-green-600 hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  )
}

export default AccordionSection