"use client"

import React,{useState,useEffect}  from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/components';
import { getAllProduct,getProduct } from '@/sanity/sanity-utils';
import { urlFor } from '@/sanity/config/sanityConfig';
import Image from 'next/image';
import { useStateContext } from '@/context/StateContext';

const ProductDetails = ({params}) => {
  const { qty,incQty,decQty,onAdd,setShowCart } =useStateContext();
   const [product, setProduct] = useState([]);
   const [products, setProducts] = useState([]);
   const [index, setIndex] = useState(0)
    useEffect(()=>{
      getProduct(params.slug).then((res)=>setProduct(res)).catch((err)=>console.log(err));
      getAllProduct().then((res)=>setProducts(res)).catch((err)=>console.log(err));
    },[params.slug])

    const handleCheckOut=()=>{
      onAdd(product,qty);

      setShowCart(true);
    }
    return (
        <div>
          <div className="product-detail-container">
            <div>
              <div className="image-container">
                {product.image && <Image src={urlFor(product.image[index]).url()} alt={product.name} width={400} height={400} className="product-detail-image" />}
              </div>
              <div className="small-images-container">
                {product?.image?.map((item, i) => (
                  <Image 
                    key={i}
                    alt={item.ref}
                    src={urlFor(item).url()}
                    width={70}
                    height={70}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={()=>setIndex(i)}
                    
                  />
                ))}
              </div>
            </div>
    
            <div className="product-detail-desc">
              <h1>{product?.name}</h1>
              <div className="reviews">
                <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
                </div>
                <p>
                  (20)
                </p>
              </div>
              <h4>Details: </h4>
              <p>{product?.details}</p>
              <p className="price">${product?.price}</p>
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                </p>
              </div>
              <div className="buttons">
                <button type="button" className="add-to-cart" onClick={()=>product.name && onAdd(product,qty)}>Add to Cart</button>
                <button type="button" className="buy-now" onClick={handleCheckOut}>Buy Now</button>
              </div>
            </div>
          </div>
    
          <div className="maylike-products-wrapper">
              <h2>You may also like</h2>
              <div className="marquee">
                <div className="maylike-products-container track">
                  {products.map((item) => (
                    <Product key={item._id} product={item} />
                  ))}
                </div>
              </div>
          </div>
        </div>
      )
    }

export default ProductDetails
