// src/components/Footer/Footer.jsx

import React from "react"
import {useDevice} from "../../context/useDevice.jsx"
import SocialLinks from "./SocialLinks.jsx"
import QRSection from "./QRSection.jsx"
import SectionList from "./SectionList.jsx"
import AccordionSection from "./AccordionSection.jsx"
import PaymentMethods from "./PaymentMethods.jsx"

// Визначення компонента Footer
const Footer = () => {
  // Деструктуризація isMobile з хука useDevice для визначення, чи є
  // пристрій мобільним
  const {isMobile} = useDevice()

  return (
    // Компонент нижньої частини інтерфейсу (footer)
    <footer className="bg-neutral-100 text-gray-900 border-t-4
    border-green-600 mt-10">
      {/* Контейнер для вмісту "підвалу" з максимальною шириною і відступами */}
      <div className="max-w-screen-2xl mx-auto px-10 py-8">
        {/* Макет для десктопів: відображається лише на немобільних пристроях
        (прихований на мобільних через md:grid) */}
        {!isMobile && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-10">
            <div>
              <h4 className="text-sm text-gray-500 font-medium mb-4">
                Ми в соціальних мережах
              </h4>
              <SocialLinks />
              <p className="text-sm mb-2">
                Скануйте QR-код та встановлюйте <br />
                застосунок
              </p>
              <QRSection />
            </div>
            <SectionList />
          </div>
        )}

        {/* Макет для мобільних пристроїв */}
        {isMobile && (
          <div className="md:hidden">
            <h4 className="text-sm text-gray-500 font-medium mb-4">
              Ми в соціальних мережах
            </h4>
            <SocialLinks />
            <QRSection />
            <AccordionSection /> {/* Відображення секцій у стилі акордеона */}
          </div>
        )}
      </div>

      <PaymentMethods />
    </footer>
  )
}

export default Footer