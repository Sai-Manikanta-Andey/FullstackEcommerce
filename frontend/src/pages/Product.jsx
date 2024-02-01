import React, { useContext } from 'react' 
import {ShopContext} from '../context/ShopContext'
import {useParams}  from 'react-router-dom'
import Breadcrum from '../components/Breadcrump/Breadcrum'
import ProductCard from '../components/ProductCard/ProductCard'
import DescriptionBox from '../components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'

const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams()
  const product = all_product.find((e)=> e.id === Number(productId))
  console.log(product);
  return (
    <div >
      <Breadcrum product={product}/>
      <ProductCard product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
}

export default Product