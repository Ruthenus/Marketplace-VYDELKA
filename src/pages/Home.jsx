// src/pages/Home.jsx

import React from "react"
import styled from "styled-components"
import {useDevice} from "../context/useDevice.jsx"
import Slider from "../components/Slider.jsx"  // відображення слайд-шов
import {slides} from "../constants/slides.js"

// Стилізований компонент для головного контейнера сторінки Home
const HomeContainer = styled.div`
    background: #ffffff;
    padding: ${({isMobile}) => (isMobile ? "2rem" : "1rem")};
}
`
// Визначення компонента Home
function Home() {
  // Деструктуризація isMobile з хука useDevice для визначення типу пристрою
  const {isMobile} = useDevice()

  // Функція зворотного виклику для обробки подій зміни слайда,
  // виводить у консоль індекс активного слайда
  const handleSlideChange = index => {
    console.log("Активний слайд:", index)
  }

  // Рендеринг компонента Home
  return (
    // HomeContainer з динамічними відступами залежно від isMobile
    <HomeContainer isMobile={isMobile}>
      {/* Компонент Slider із заданими властивостями для слайд-шов */}
      <Slider
        slides={slides}  // масив даних слайдів із констант
        autoPlay={true}  // увімкнено автоматичну зміну слайдів
        interval={3000}  // 3 секунди між автоматичними переходами
        startIndex={0}   // початковий індекс слайда
        showButtons={true}
        height="120px"
        heightDesktop="220px"
        buttonBg="rgba(10,10,10,0.6)"
        buttonColor="#fff"
        onChange={handleSlideChange}  // викликається під час зміни слайда
        hideOnMobile={true}  // вирішив приховати слайдер на мобільних пристроях
        isMobile={isMobile}  // передає тип пристрою до компонента Slider
      />
    </HomeContainer>
  )
}

// Експорт компонента Home як експорт за замовчуванням
export default Home