import React from 'react'
import './Popular.css'
import data_product from '../assets/data'
import Items from '../Items/Items'

const Popular = () => {
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