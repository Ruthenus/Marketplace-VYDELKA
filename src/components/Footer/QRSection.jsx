import React from "react"

// Компонент QRSection для відображення QR-коду та кнопок магазинів додатків
const QRSection = () => (
  // Контейнер для розташування QR-коду та кнопок у рядок із відступами
  <div className="flex space-x-4 items-center">
    {/* Зображення QR-коду для сканування */}
    <img
      src="src/assets/futtersite_qr_code.png"
      alt="QR Code"
      className="w-24 h-24"
    />
    {/* Контейнер для вертикального розташування кнопок магазинів */}
    <div className="flex flex-col space-y-3">
      {/* "Кнопка" для переходу до App Store */}
      <img
        src="src/assets/button-appstore-ua.svg"
        alt="App Store"
        className="w-28 md:w-32"
      />
      {/* "Кнопка" для переходу до Google Play */}
      <img
        src="src/assets/button-google-play-ua.svg"
        alt="Google Play"
        className="w-28 md:w-32"
      />
    </div>
  </div>
)

export default QRSection