// src/context/useDevice.jsx

import {useContext} from "react"
import DeviceContext from "./DeviceContext.jsx"

// Хук для отримання стану isMobile із DeviceContext
export const useDevice = () => {
  try {
    const context = useContext(DeviceContext)
    if (!context) {
      console.error("useDevice має використовуватися в межах DeviceProvider")
      return {isMobile: false} // повернення значення за замовчуванням
    }
    return context
  } catch (error) {
    console.error("Неочікувана помилка в useDevice:", error.message)
    return {isMobile: false}
  }
}