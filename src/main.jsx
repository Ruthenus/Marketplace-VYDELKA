// src/main.jsx

{/* https://react.dev/reference/react/StrictMode
 * https://react.dev/reference/react-dom/client/createRoot
 */
}
import React, {StrictMode} from "react"
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from "./App.jsx"
// import Admin from "./pages/Admin.jsx"
// import Cart from "./pages/Cart.jsx"
// import Catalog from "./pages/Catalog.jsx"
// import Checkout from "./pages/Checkout.jsx"
import Home from "./pages/Home.jsx"
// import Product from "./pages/Product.jsx"
// import Search from "./pages/Search.jsx"
import "./styles/globals.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          {/* <Route path="categories" element={<Catalog />} /> */}
          {/* <Route path="category/:categoryId" element={<Catalog />} /> */}
          {/* <Route path="product/:productId" element={<Product />} /> */}
          {/* <Route path="cart" element={<Cart />} /> */}
          {/* <Route path="checkout" element={<Checkout />} /> */}
          {/* <Route path="admin" element={<Admin />} /> */}
          {/* <Route path="search" element={<Search />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)