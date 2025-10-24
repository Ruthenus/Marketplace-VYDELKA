// src/components/Footer/SectionList.jsx

import React from "react"
import {footerSections} from "../../constants/footerSections.js"

// Компонент SectionList для відображення списків секцій "підвалу"
const SectionList = ({sections = footerSections}) => (
  // Фрагмент для групування елементів без додаткового DOM-вузла
  <>
    {/* Ітерація по масиву секцій для створення окремих блоків */}
    {sections.map((sec, i) => (
      // Унікальний ключ для кожної секції на основі індексу
      <div key={i}>
        {/* Заголовок секції з відповідними стилями */}
        <h4 className="text-sm text-gray-500 font-medium mb-3">{sec.title}</h4>
        {/* Список посилань у секції з вертикальними відступами */}
        <ul className="space-y-1.5 text-[15px] font-normal">
          {/* Ітерація по масиву посилань у секції */}
          {sec.links.map((link, j) => (
            // Унікальний ключ для кожного елемента списку на основі індексу
            <li key={j}>
              {/* Посилання з ефектом наведення */}
              <a
                href="#"  // Тимчасовий href
                className="hover:text-green-600 hover:underline transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
)

export default SectionList