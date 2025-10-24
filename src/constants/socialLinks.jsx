// src/constants/socialLinks.jsx

/*
 * Конфігурація посилань на соціальні мережі для компонента Footer.jsx.
 * Містить два масиви (firstRow і secondRow), які визначають іконки, URL й описи
 * для відображення у двох рядках у секції соціальних мереж у нижньому блоці.
 * Використовується в компоненті SocialLinks для рендерингу посилань,
 * які відображаються однаково на десктопних і мобільних пристроях,
 * відповідно до адаптивної логіки, реалізованої через DeviceContext (isMobile).
 * Кожен об'єкт у масивах містить:
 * - href: URL-посилання на профіль у соціальній мережі;
 * - icon: React-компонент піктограми з бібліотеки react-icons;
 * - label: Текст для доступності (aria-label).
 * Документація React щодо структуризації статичних даних:
 * https://react.dev/learn/thinking-in-react#step-2-build-a-static-version-of-your-app
 * Документація react-icons: https://react-icons.github.io/react-icons/
*/

import React from "react"
import {FaTiktok, FaFacebook, FaYoutube, FaInstagram} from "react-icons/fa"
import {FaXTwitter, FaViber} from "react-icons/fa6"
import {RiTelegram2Fill} from "react-icons/ri"

export const socialMediaLinks = {
  firstRow: [
    {
      href: "https://www.tiktok.com/@rozetkaua",
      icon: <FaTiktok />,
      label: "TikTok"
    },
    {
      href: "https://t.me/rrozetka",
      icon: <RiTelegram2Fill />,
      label: "Telegram"
    },
    {
      href: "https://www.facebook.com/rozetka.ua",
      icon: <FaFacebook />,
      label: "Facebook"
    },
    {
      href: "https://bit.ly/RZTK_UA",
      icon: <FaYoutube />,
      label: "YouTube"
    },
  ],
  secondRow: [
    {
      href: "https://instagram.com/rozetkaua",
      icon: <FaInstagram />,
      label: "Instagram"
    },
    {
      href: "https://x.com/rozetka_ua",
      icon: <FaXTwitter />,
      label: "X (Twitter)"
    },
    {
      href: "https://bit.ly/3KGlFxc",
      icon: <FaViber />,
      label: "Viber"
    },
  ],
}