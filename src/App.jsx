// src/App.jsx

import React from "react"
import {Outlet} from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import {CategoryProvider} from "./context/CategoryProvider.jsx"
import {DeviceProvider} from "./context/DeviceContext.jsx"

function App() {
  return (
    <DeviceProvider>
      <CategoryProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CategoryProvider>
    </DeviceProvider>
  )
}

export default App