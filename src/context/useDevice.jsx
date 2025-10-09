import { useContext } from "react"
import DeviceContext from "./DeviceContext.jsx"

// Хук для отримання стану isMobile із DeviceContext
export const useDevice = () => {
  try {
    const context = useContext(DeviceContext)
    if (!context) {
      throw new Error("useDevice має використовуватися в межах DeviceProvider")
    }
    return context
  } catch (error) {
    console.error(error.message)
    return { isMobile: false } // повернення значення за замовчуванням
  }
}