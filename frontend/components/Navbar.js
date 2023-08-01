
"use client"

import React from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Cart } from './';
import { useStateContext } from '@/context/StateContext';
const Navbar = () => {
  const {totalQuantities,showCart,setShowCart}=useStateContext();
  return (
    <div className="navbar-container">
    <p className="logo">
      <Link href="/">Boat Headphones</Link>
    </p>

    <button type="button" className="cart-icon" onClick={()=>setShowCart((prev)=>!prev)}>
      <AiOutlineShoppingCart />
      <span className="cart-item-qty">{totalQuantities}</span>
    </button>

    {showCart && <Cart />} 
  </div>
  )
}

export default Navbar
