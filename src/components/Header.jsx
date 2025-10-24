// src/components/Header.jsx

import React, {useState} from "react"  // керування станом пошукового поля
import styled from "styled-components"  // https://styled-components.com/
import {useNavigate, NavLink} from "react-router-dom"
// https://reactrouter.com/api/hooks/useNavigate
// https://reactrouter.com/api/components/NavLink
import {useDevice} from "../context/useDevice.jsx"  // мобільний режим
import {FiGrid, FiShoppingCart} from "react-icons/fi"  // каталог, кошик
import {HiOutlineUser, HiOutlineSearch, HiOutlineMicrophone}
  from "react-icons/hi"  // піктограми користувача, пошуку, голосового пошуку

// Контейнер для "шапки" сайту з адаптивними внутрішніми відступами
const HeaderContainer = styled.header`
    background: #000000;
    border-bottom: 1px solid #1f1f1f;
    padding: ${({isMobile}) => (isMobile ? "0.7rem" : "0.7rem 1.1rem")};
`

// Головна навігація з адаптивною орієнтацією та відступами
const Nav = styled.nav`
    display: flex;
    flex-direction: ${({isMobile}) => (isMobile ? "column" : "row")};
    align-items: center;
    // eslint-disable-next-line max-len
    justify-content: ${({isMobile}) => (isMobile ? "center" : "space-between")};
    flex-wrap: wrap;
    gap: ${({isMobile}) => (isMobile ? "0.7rem" : "1.2rem")};
    width: 100%;
`

// Логотип у вигляді брендового зображення (розмір залежить від пристрою)
/* https://brandfetch.com/rozetka.ua */
const SmileLogo = styled.img`
    margin-left: ${({isMobile}) => (isMobile ? "0.5rem" : "1.1rem")};
    height: ${({isMobile}) => (isMobile ? "40px" : "50px")};

    svg {
        flex-shrink: 0;
    }
`

// Текстовий логотип з брендовим стилем
const Logo = styled(NavLink)`
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    font-size: 2.3rem;
    letter-spacing: 0.1em;
    color: #ffffff;
    background-color: #000000;
    text-decoration: none;
    padding: 0.25em 0.15em;
    display: inline-block;
    margin-left: auto;
    margin-right: 0.8em;
`

// Кнопка переходу до каталогу товарів (категорій)
const CatalogButton = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background-color: #1f1f1f;
    border: 2px solid #ffffff;
    border-radius: 0.5rem;
    color: #ffffff;
    font-family: "Inter", "Work Sans", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #3a3a3a;
    }
`

// Форма пошуку з адаптивною шириною
const SearchForm = styled.form`
    display: flex;
    align-items: center;
    max-width: ${({isMobile}) => (isMobile ? "100%" : "700px")};
    min-width: ${({isMobile}) => (isMobile ? "62%" : "400px")};
    flex-grow: 1;
    background-color: #ffffff;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    margin-right: 0.3rem;
`

// Піктограма пошуку (лупа)
const SearchIcon = styled(HiOutlineSearch)`
    color: #6b7280;
    flex-shrink: 0;
    margin: 0 0.4rem 0 0.5rem;

    &:hover {
        color: #16a34a;
    }
`

// Піктограма голосового пошуку (мікрофон)
const MicIcon = styled(HiOutlineMicrophone)`
    color: #6b7280;
    flex-shrink: 0;
    cursor: pointer;
    margin-right: 0.5rem;
`

// Поле вводу пошукового запиту
const SearchInput = styled.input`
    flex-grow: 1;
    border: none;
    background: transparent;
    padding: 0.4rem 0.2rem;
    font-family: "Inter", "Work Sans", sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: #1f2937;
    min-width: 0;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        outline: none;
    }
`

// Кнопка запуску пошуку
const SearchButton = styled.button`
    padding: 0.6rem 1.4rem;
    background: #16a34a;
    color: #ffffff;
    border: none;
    border-left: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    font-family: "Inter", "Work Sans", sans-serif;
    font-size: 1.3rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    height: 100%;

    &:hover {
        background: #30d158;
    }
`

// Посилання на адмін-панель або особистий кабінет покупця
const AdminLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
        color: #16a34a;
    }
`

// Посилання на кошик
const CartLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;
    margin-left: ${({isMobile}) => (isMobile ? "1rem" : "1rem")};
    margin-right: ${({isMobile}) => (isMobile ? "0.2rem" : "1.5rem")};

    &:hover {
        color: #16a34a;
    }
`

// Обгортка для логотипу
const LogoNavLink = styled(NavLink)`
    text-decoration: none;
    display: inline-block;
`

// Лівий блок: логотип та кнопка каталогу
const LeftBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

// Центральний блок: форма пошуку
const CenterBlock = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
`

// Правий блок: адмін-панель та кошик
const RightBlock = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

// Мобільний рядок: логотип, пошук, кошик
const MobileRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.0rem;
    padding: 0.2rem 0.4rem;
    width: 100%;
`

function Header() {
  // Отримуємо інформацію про тип пристрою (мобільний чи десктоп) з контексту
  const {isMobile} = useDevice()
  // Створюємо локальний стан для збереження введеного пошукового запиту
  const [searchQuery, setSearchQuery] = useState("")
  // Ініціалізуємо навігацію для переходу між сторінками
  const navigate = useNavigate()

  // Обробник події пошуку (натискання Enter або кнопки)
  const handleSearch = (e) => {
    e.preventDefault()  // забороняємо стандартну поведінку форми
    console.log("Запущено пошук:", searchQuery)  // виводимо для налагодження

    // Якщо запит не порожній — переходимо на сторінку результатів пошуку
    if (searchQuery.trim()) {
      // Кодуємо запит в URL
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")  // очищаємо поле після переходу
    }
  }

  return (
    // Основний контейнер шапки сайту, адаптується до типу пристрою
    <HeaderContainer isMobile={isMobile}>
      {/* Головна навігаційна панель */}
      <Nav isMobile={isMobile}>
        {/* Якщо пристрій мобільний — показуємо компактну версію */}
        {isMobile ? (
          <MobileRow>
            {/* Логотип тільки у вигляді зображення */}
            <LogoNavLink to="/">
              <SmileLogo
                src="/Rozetka_idFpdXYM2v_1.svg"
                alt="Логотип Vydelka"  // альтернативний текст для доступності
                isMobile={isMobile}
              />
            </LogoNavLink>

            {/* Пошукова форма: лупа, поле вводу, мікрофон */}
            <SearchForm isMobile={isMobile} onSubmit={handleSearch}>
              <SearchIcon
                size={24}
                onClick={handleSearch}
                style={{cursor: "pointer"}}  // пошук за допомогою лупи
              />
              <SearchInput
                type="search" // змінює Enter на "Пошук"
                placeholder="Я шукаю..."  // підказка для користувача
                value={searchQuery}  // поточне значення поля
                // Оновлення стану при зміні
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Пошуковий запит"  // для доступності
              />
              <MicIcon
                size={24}
                title="Голосовий пошук (скоро)"  // підказка при наведенні
              />
            </SearchForm>
            <CartLink to="/cart" title="Кошик">
              <FiShoppingCart size={28} />
            </CartLink>
          </MobileRow>
        ) : (
          // Якщо пристрій не мобільний — показуємо повну версію заголовка
          <React.Fragment>
            {/* Лівий блок: логотип, назва сайту, перехід до каталогу */}
            <LeftBlock>
              <LogoNavLink to="/">
                <SmileLogo
                  src="/Rozetka_idFpdXYM2v_1.svg"
                  alt="Логотип Vydelka"
                  isMobile={isMobile}
                />
              </LogoNavLink>
              <Logo to="/">VYDELKA</Logo>
              <CatalogButton to="/categories" end>
                <FiGrid size={27} />
                Каталог
              </CatalogButton>
            </LeftBlock>

            {/* Центральний блок: розширена форма пошуку */}
            <CenterBlock>
              <SearchForm isMobile={isMobile} onSubmit={handleSearch}>
                <SearchIcon
                  size={30}
                  onClick={handleSearch}
                  style={{cursor: "pointer"}}
                />
                <SearchInput
                  type="search"
                  placeholder="Я шукаю..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Пошуковий запит"
                />
                <MicIcon size={30} title="Голосовий пошук (скоро)" />
                <SearchButton type="submit">Знайти</SearchButton>
              </SearchForm>
            </CenterBlock>

            {/* Правий блок: посилання на адмін-панель та кошик */}
            <RightBlock>
              <AdminLink to="/admin" title="Адмін-панель">
                <HiOutlineUser size={36} />
              </AdminLink>
              <CartLink to="/cart" title="Кошик">
                <FiShoppingCart size={36} />
              </CartLink>
            </RightBlock>
          </React.Fragment>
        )}
      </Nav>
    </HeaderContainer>
  )
}

export default Header