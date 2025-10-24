// src/context/DeviceContext.jsx

import React, {createContext, useState, useEffect} from "react"

// Створення контексту для визначення типу пристрою (мобільний / десктоп)
const DeviceContext = createContext()

// Провайдер контексту, який відстежує ширину вікна та надає інформацію
// про тип пристрою
export const DeviceProvider = ({children}) => {
  // Стан для відстеження, чи є пристрій мобільним (ширина < 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Ефект, який додає слухача події resize для оновлення isMobile
  // в разі зміни ширини вікна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    // Реєстрація слухача події зміни розміру
    window.addEventListener("resize", handleResize)
    // Очищення слухача подій при розмонтуванні компонента
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    // Надання значення isMobile через контекст усім дочірнім компонентам
    <DeviceContext.Provider value={{isMobile}}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceContext