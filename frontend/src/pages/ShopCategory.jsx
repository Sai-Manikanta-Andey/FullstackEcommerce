import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import  { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/assets/dropdown_icon.png'
import Items from '../components/Items/Items'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)
  console.log(all_product,props.category);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(props.category === item.category){
            return <Items props={item} key={item.id} />
          }else{
            return null
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
      Explore more
      </div>
    </div>
  )
}

export default ShopCategory