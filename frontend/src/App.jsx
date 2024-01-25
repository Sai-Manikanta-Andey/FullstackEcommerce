import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCateogry from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCateogry category="mens" />} />
          <Route path="/womens" element={<ShopCateogry category="womens" />} />
          <Route path="/kids" element={<ShopCateogry category="kids" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<LoginSignUp/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
};

export default App;
