import React from "react"
import { DeviceProvider } from "./context/DeviceContext.jsx"
import Footer from "./components/Footer/Footer.jsx"

function App() {
  return (
    <DeviceProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {/* Майбутні компоненти будуть розміщені тут */}
        </main>
        <Footer />
      </div>
    </DeviceProvider>
  )
}

export default App