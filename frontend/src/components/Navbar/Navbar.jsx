import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import downarrow from '../assets/down-arrow.png'
import { useRef } from 'react'



const Navbar = () => {
  const [menu,setMenu]= useState("shop")
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef()
  const dropDown = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
    e.stopPropogation()
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>CLOTHER</p>
      </div>
      <img
        className="nav-dropdown"
        src={downarrow}
        alt=""
        onClick={dropDown}
        width={25}
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop {menu === "shop" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            {" "}
            Men{menu === "mens" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            {" "}
            Women{menu === "womens" ? <hr /> : <></>}
          </Link>
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            {" "}
            Kids{menu === "kids" ? <hr /> : <></>}
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()} </div>
      </div>
    </div>
  );
}

export default Navbar