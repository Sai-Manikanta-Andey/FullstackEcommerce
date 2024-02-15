import React from 'react'
import "./Addproduct.css";
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className="add-product-selector">
          <option  value="women">Women</option>
          <option  value="men">Men</option>
          <option value="kid">KIds</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input type="file" name="image" id="file-input" hidden />
      </div>
      <div className="addproduct-btn">ADD</div>
    </div>
  );
}

export default Addproduct
