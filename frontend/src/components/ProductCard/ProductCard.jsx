import React, { useContext } from "react";
import "./ProductCard.css";
import Product from "../../pages/Product";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";

const ProductCard = (props) => {
  const { product } = props;
  const {addToCart} = useContext(ShopContext)
  
  return (
    <div className="productcard">
      <div className="productcard-left">
        <div className="productcard-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productcard-img">
          <img className="productcard-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productcard-right">
        <h1>{product.name} </h1>
        <div className="productcard-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>{122} </p>
        </div>
        <div className="productcard-right-prices">
          <div className="productcard-right-price-old">
            ${product.old_price}
          </div>
          <div className="productcard-right-price-new">${product.new_price}</div>
        </div>
        <div className="productcard-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productcard-right-size">
          <h1>Select Size</h1>
          <div className="productcard-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=> {addToCart(product.id)}}>ADD TO CART</button>
        <p className="productcard-right-category">
            <span>Category :</span>Women, T-Shirt, crop Top
        </p>
        <p className="productcard-right-category">
            <span>Tags :</span>Modern, Latest, crop Top
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
