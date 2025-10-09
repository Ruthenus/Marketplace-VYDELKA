import React, {useState} from "react"
import Modal from "./Modal.jsx"
import {modalConfig} from "../../constants/modalConfig.js"

// Компонент PaymentMethods для відображення методів оплати та модальних вікон
const PaymentMethods = () => {
  // Стан для керування відображенням модального вікна Visa
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false)
  // Стан для керування відображенням модального вікна MasterCard
  const [isMasterCardModalOpen, setIsMasterCardModalOpen] = useState(false)

  return (
    // Контейнер із верхньою рамкою та стилізацією для тексту
    <div className="border-t-2 border-gray-300 pt-6 pb-8 text-sm
     text-gray-600">
      {/* Основний контейнер з обмеженням ширини та адаптивним розташуванням */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col
      md:flex-row md:justify-between md:items-start gap-6">

        {/* Блок із логотипами платіжних систем */}
        <div className="order-2 md:order-1 flex justify-center
        md:justify-start space-x-7 md:w-1/2">
          {/* Логотип MasterCard із можливістю відкриття модального вікна */}
          <img
            src="src/assets/mastercard-logo.svg"
            alt="MasterCard"
            className="h-11 cursor-pointer"
            onClick={() => setIsMasterCardModalOpen(true)}
          />
          {/* Логотип Visa із можливістю відкриття модального вікна */}
          <img
            src="src/assets/visa-logo.svg"
            alt="Visa"
            className="h-11 cursor-pointer"
            onClick={() => setIsVisaModalOpen(true)}
          />
        </div>

        {/* Блок із персональною інформацією */}
        <address className="order-1 md:order-2 md:text-right md:w-1/2
        text-center">
          <strong>ПІБ:</strong> Качуровський Руслан Русланович &nbsp;[&nbsp;
          <strong>а/с:</strong>{" "}
          <a href="mailto:energobrama@proton.me">energobrama@proton.me</a>
          &nbsp;]&nbsp;
          <strong>тел.:</strong>{" "}
          <a href="tel:+380961949174">64-57-82</a>
        </address>
      </div>

      {/* Модальне вікно для Visa */}
      <Modal
        isOpen={isVisaModalOpen}
        onClose={() => setIsVisaModalOpen(false)}
        title={modalConfig.content.visa.title}
      >
        {modalConfig.content.visa.text}
      </Modal>

      {/* Модальне вікно для MasterCard */}
      <Modal
        isOpen={isMasterCardModalOpen}
        onClose={() => setIsMasterCardModalOpen(false)} // закриття
        title={modalConfig.content.mastercard.title}  // із конфігурації
      >
        {/* Текст модального вікна з конфігурації */}
        {modalConfig.content.mastercard.text}
      </Modal>
    </div>
  )
}

export default PaymentMethods