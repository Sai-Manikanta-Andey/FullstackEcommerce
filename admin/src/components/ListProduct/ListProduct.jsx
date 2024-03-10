import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setallProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("https://shy-worm-stole.cyclic.app//allproducts")
      .then((res) => res.json())
      .then((data) => {
        setallProducts(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    await fetch("https://shy-worm-stole.cyclic.app//removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchProducts();
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  className="listproduct-product-icon"
                  src={product.image}
                  alt=""
                />
                <p className="title">{product.name} </p>
                <p className="old-price">${product.old_price} </p>
                <p className="new-price">${product.new_price} </p>
                <p className="category">{product.category} </p>
                <img
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
