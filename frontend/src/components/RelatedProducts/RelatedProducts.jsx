import React from 'react'
import "./RelatedProducts.css";
import data_product from '../assets/data'
import Items from '../Items/Items'

const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item)=>{
            return <Items props={item} key={item.id}/>
        })}
      </div>
    </div>
  );
}

export default RelatedProducts