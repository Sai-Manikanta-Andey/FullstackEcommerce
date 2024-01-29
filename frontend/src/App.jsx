import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCateogry from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from './pages/Cart'
import LoginSignUp from './pages/LoginSignUp'
import Footer from "./components/Footer/Footer";
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kids_banner from './components/assets/banner_kids.png'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCateogry category="men" banner={men_banner} />} />
          <Route path="/womens" element={<ShopCateogry category="women" banner={women_banner} />} />
          <Route path="/kids" element={<ShopCateogry category="kid" banner={kids_banner} />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<LoginSignUp/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;
