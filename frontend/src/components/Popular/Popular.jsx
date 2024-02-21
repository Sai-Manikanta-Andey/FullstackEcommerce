import React from 'react'
import { useState,useEffect } from 'react'
import './Popular.css'
import Items from '../Items/Items'

const Popular = () => {
    const [data_product, setNewDataProduct] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/popularinwomen")
        .then((res) => res.json())
        .then((data) => setNewDataProduct(data));
    }, []);

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
       <hr />
       <div className="popular-item">
        {data_product.map((item)=> <Items props={item} key={item.id} />)}
       </div>
    </div>
  )
}

export default Popular