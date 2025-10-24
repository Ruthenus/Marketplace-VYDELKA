// src/components/Slider.jsx

import React, {useState, useEffect} from "react"
import {useDevice} from "../context/useDevice.jsx"
import styled from "styled-components"

// Стилізований контейнер слайдера з адаптивною висотою
const SliderContainer = styled.div`
    position: relative;
    height: ${({isMobile, heightDesktop, height}) =>
    (isMobile ? height : heightDesktop)}; // висота залежить від типу пристрою
    overflow: hidden;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
`
// https://styled-components.com/docs/advanced#responsive-design
// https://styled-components.com/docs/api

// Стилізований блок одного слайду
const Slide = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${({$active}) => ($active ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
`

// Стилізоване зображення всередині слайду
const SlideImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

// Стилізована кнопка для навігації
const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: ${({$bg}) => $bg ?? "rgba(0,0,0,0.5)"};
    color: ${props => props.color || "white"};
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
        background: ${({$hoverBg}) => $hoverBg || "rgba(0,0,0,0.7)"};
    }
`

// Стилі для кнопки "Попередній слайд"
const PrevButton = styled(Button)`
    left: 1rem;
`

// Стилі для кнопки "Наступний слайд"
const NextButton = styled(Button)`
    right: 1rem;
`

// Компонент слайдера
function Slider({
  slides = [],         // масив слайдів (об'єкти з полями image, alt, id)
  autoPlay = true,     // автоматична зміна слайдів
  interval = 5000,     // інтервал автоматичної зміни слайдів (мс)
  startIndex = 0,      // початковий індекс слайда
  showButtons = true,  // показувати кнопки навігації
  height = "200px",    // висота слайдера для мобільних пристроїв
  heightDesktop = "300px",  // висота слайдера для десктопів
  buttonBg,            // колір фону кнопок
  buttonColor,         // колір тексту кнопок
  onChange,            // callback-функція, яка викликається при зміні слайда
  hideOnMobile = true  // властивість для контролю відображення на мобільних!
}) {
  // Стан для відстеження поточного слайда
  const [currentSlide, setCurrentSlide] = useState(startIndex)
  // Отримуємо інформацію про тип пристрою з контексту
  const {isMobile} = useDevice()

  // Скидання поточного слайда в разі зміни startIndex
  useEffect(() => {
    setCurrentSlide(startIndex)
  }, [startIndex]) // ефект виконається кожного разу, коли startIndex зміниться

  // Логіка для автоматичної зміни слайдів
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return
    const id = setInterval(() => {
      setCurrentSlide(prev => {
        // Переходимо циклічно до наступного слайда
        const next = (prev + 1) % slides.length
        if (onChange) onChange(next)  // викликаємо callback при зміні слайда
        return next
      })
    }, interval)
    return () => clearInterval(id) // очищаємо інтервал при демонтажі компонента
  }, [autoPlay, interval, slides.length, onChange])
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval

  // Обробник для переходу до попереднього слайда
  const handlePrev = () => {
    setCurrentSlide(prev => {
      // Циклічний перехід до попереднього слайда
      const next = (prev - 1 + slides.length) % slides.length
      if (onChange) onChange(next)  // викликаємо callback
      return next
    })
  }

  // Обробник для переходу до наступного слайда
  const handleNext = () => {
    setCurrentSlide(prev => {
      // Циклічний перехід до наступного слайда
      const next = (prev + 1) % slides.length
      if (onChange) onChange(next)  // викликаємо callback
      return next
    })
  }

  // Якщо пристрій мобільний і hideOnMobile=true, не відображаємо слайдер
  if (hideOnMobile && isMobile) {
    return null
  }
  // https://react.dev/reference/react/hooks#rules-of-hooks

  // Рендеринг слайдера (тільки для десктопів або якщо hideOnMobile=false)
  // noinspection JSValidateTypes
  return (
    <SliderContainer
      height={height}  // передаємо висоту для мобільних
      heightDesktop={heightDesktop}  // передаємо висоту для десктопів
      isMobile={isMobile}  // передаємо тип пристрою
    >
      {/* Відтворюємо лише активний і сусідні слайди */}
      {slides.map((slide, index) =>
        Math.abs(index - currentSlide) <= 1 ? ( //
          <Slide key={slide.id || index} $active={index === currentSlide}>
            <SlideImage
              src={slide.image}
              alt={slide.alt || ""}
              loading="lazy"
              width="100%"
              height="100%"
            />
          </Slide>
        ) : null
      )}
      {/* Показуємо кнопки навігації, якщо showButtons = true */}
      {showButtons && (
        <React.Fragment>
          <PrevButton
            onClick={handlePrev}
            bg={buttonBg}
            color={buttonColor}
            aria-label="Попередній слайд"
          >
            ←
          </PrevButton>
          <NextButton
            onClick={handleNext}
            bg={buttonBg}
            color={buttonColor}
            aria-label="Наступний слайд"
          >
            →
          </NextButton>
        </React.Fragment>
      )}
    </SliderContainer>
  )
}

export default Slider

// МОЖЛИВІ ПОКРАЩЕННЯ:
// https://www.npmjs.com/package/prop-types
// https://react.dev/reference/react/useCallback
// https://web.dev/articles/optimize-cls