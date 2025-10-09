// Конфігурація для модального вікна
export const modalConfig = {
  // Об'єкт стилів для різних елементів модального вікна
  styles: {
    // Стилі для фонового шару (оверлею) модального вікна
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      inset: 0,
      transition: "opacity 220ms ease-in-out",
      opacity: 1,
      padding: "20px",
    },
    // Стилі для основного контейнера вмісту модального вікна
    content: {
      backgroundColor: "#ffffff",
      padding: "24px 28px",
      borderRadius: "12px",
      maxWidth: "760px",
      position: "relative",
      overflowY: "auto",
      maxHeight: "86vh",
      boxShadow: "0 18px 40px rgba(6, 24, 44, 0.45)",
      border: "1px solid rgba(0,0,0,0.06)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: "transform 240ms cubic-bezier(.2,.9,.3,1)",
      transform: "translateY(0)",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },
    // Стилі для заголовка модального вікна
    header: {
      fontSize: "20px",
      fontWeight: 700,
      color: "#0b3550",
      margin: "0 0 14px 0",
      textAlign: "center",
      borderBottom: "1px solid rgba(15, 38, 56, 0.06)",
      paddingBottom: "10px",
      lineHeight: "1.1",
    },
    // Стилі для кнопки закриття модального вікна
    closeButton: {
      position: "absolute",
      top: "12px",
      right: "12px",
      fontSize: "16px",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#6b6b6b",
      borderRadius: "6px",
      transition: "background 140ms ease, color 140ms ease",
      // hover styles should be applied where this config is consumed, e.g.:
      // on hover: background: 'rgba(0,0,0,0.04)', color: '#333'
    },
    // Стилі для текстового вмісту модального вікна
    contentText: {
      fontSize: "15px",
      color: "#222222",
      lineHeight: "1.58",
      textAlign: "justify",
      whiteSpace: "pre-line",
      margin: 0,
      hyphens: "auto",
      wordBreak: "break-word",
    },
  },

  // Вміст модального вікна для різних платіжних систем
  content: {
    visa: {
      title: "Verified by Visa",  // Заголовок
      text: `Платіжні системи в партнерстві з банками-емітентами впроваджують 
сучасні схеми перевірки особистості власника картки, щоб зробити покупки 
в Інтернеті більш безпечними. Встановлюється спеціальний пароль для 
кожної операції, що здійснюється, і це вселяє в Вас впевненість, що 
тільки Ви можете робити такі покупки онлайн. Сучасні технологічні рішення 
необхідні для того, щоб власник картки був упевнений в безпеці транзакції 
і в тому, що він має справу зі справжнім (а не «підставним») магазином.

Одне з таких технологічних рішень називається Verified by Visa 
(«Перевірено Visa»).

Verified by Visa — це нова система захисту, яка сповіщає 
онлайн-торговців, що беруть участь в програмі, і банки про те, що Ви є 
справжнім власником картки, коли Ви робите онлайн-покупки. Вона дозволяє 
використовувати персональний пароль для підтвердження вашої особи і 
захисту Вашої картки Visa, коли Ви використовуєте її в Інтернеті, 
вселяючи велику впевненість в здійснюваних Вами діях.

До технології Verified by Visa легко підключитися, її легко 
використовувати, послуга діє для всіх карток Visa.

Для активації послуги Verified by Visa для Вашої картки необхідно 
звернутися в Ваш банк.`,
    },

    mastercard: {
      title: "MasterCard® SecureCode™", // Заголовок
      text: `MasterCard® SecureCode™ — це технологія, яка забезпечує Вашу картку
MasterCard® або Maestro® додатковим секретним кодом, що захищає її від 
несанкціонованого використання під час здійснення покупок в 
інтернет-магазинах, що беруть участь в програмі.

Щоб підключити технологію SecureCode, необхідно звернутися в банк, що 
випустив Вашу карту. Ваш секретний код буде відомий тільки Вам і Вашому 
банку. Далі при кожній оплаті покупок або послуг в інтернет-магазинах, 
що беруть участь в програмі, Ваш банк запропонує Вам ввести даний 
секретний код, який Ви отримаєте на Ваш мобільний телефон, зареєстрований
в банку. Тільки після перевірки та підтвердження банком даного коду 
операція з оплати буде проведена. Процедура використання технології 
SecureCode так само проста, як введення PIN-коду в банкоматі.

Ввівши правильний SecureCode в процесі покупки, Ви підтверджуєте, що є 
авторизованим власником карти. Якщо ввести неправильний SecureCode, 
покупка не буде здійснена. Навіть якщо комусь відомий номер Вашої 
платіжної карти, без SecureCode не вдасться оплатити покупку в 
інтернет-магазинах, що беруть участь в програмі.`,
    },
  },

  portalId: "modal-root", // Ідентифікатор контейнера для порталу
}
