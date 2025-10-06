// https://react.dev/reference/react/StrictMode
import {StrictMode} from 'react'
// https://react.dev/reference/react-dom/client/createRoot
import {createRoot} from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)