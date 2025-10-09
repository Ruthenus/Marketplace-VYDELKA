{/* https://react.dev/reference/react/StrictMode
  * https://react.dev/reference/react-dom/client/createRoot
  */
}
import React from "react"
import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./styles/globals.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)