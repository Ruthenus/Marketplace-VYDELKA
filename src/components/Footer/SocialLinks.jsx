// src/components/Footer/SocialLinks.jsx

import React from "react"
import {socialMediaLinks} from "../../constants/socialLinks.jsx"

// Компонент SocialLinks для відображення посилань на соціальні мережі
const SocialLinks = ({className}) => {
  // Визначення стандартних класів для стилізації контейнерів посилань
  const defaultClasses = "flex flex-wrap gap-7 mb-5 text-3xl text-gray-400"

  return (
    // Основний контейнер для групування двох рядків соціальних посилань
    <div>
      {/* Перший рядок посилань на соціальні мережі */}
      <div className={className || defaultClasses}>
        {/* Ітерація по масиву посилань першого рядка */}
        {socialMediaLinks.firstRow.map(({href, icon, label}, index) => (
          // Посилання на соціальну мережу з унікальним ключем
          <a
            key={`first-${index}`} // унікальний ключ для першого рядка
            href={href} // URL соціальної мережі
            target="_blank" // відкриття посилання в новій вкладці
            rel="noopener noreferrer" // безпека для зовнішніх посилань
            aria-label={label} // доступність: опис для програм озвучення екрана
            title={label} // підказка при наведенні
            className="hover:text-black cursor-pointer"
          >
            {icon} {/* Піктограма соціальної мережі */}
          </a>
        ))}
      </div>
      {/* Другий рядок посилань на соціальні мережі */}
      <div className={className || defaultClasses}>
        {socialMediaLinks.secondRow.map(({href, icon, label}, index) => (
          <a
            key={`second-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="hover:text-black cursor-pointer"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks