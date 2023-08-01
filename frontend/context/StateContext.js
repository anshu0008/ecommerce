"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let foundIndex;

  const incQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };
  const onAdd = (product, quantity) => {
    setTotalPrice((prev) => prev + product?.price * quantity);
    setTotalQuantities((prev) => prev + quantity);
    const checkCardItem = cartItems.find((item) => item._id === product?._id);
    if (checkCardItem) {
      const updatedCartItem = cartItems.map((item) => {
        if (item._id == product?._id)
          return {
            ...item,
            quantity: quantity + item.quantity,
          };
      });
      setCartItems(updatedCartItem);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id == id);
    foundIndex = cartItems.findIndex((item) => item._id == id);
    
    // const newCartItems = cartItems.filter((item) => item._id != id);
    if (value == "inc") {
      cartItems[foundIndex]={ ...foundProduct, quantity: foundProduct.quantity + 1 };
      setCartItems([
        ...cartItems
      ]);
      setTotalQuantities((prev) => prev + 1);
      setTotalPrice((prev) => prev + foundProduct.price);
    } else if (value == "dec") {
      if (foundProduct.quantity > 1) {
        cartItems[foundIndex]={ ...foundProduct, quantity: foundProduct.quantity - 1 },
        setCartItems([
          ...cartItems
        ]);
        setTotalQuantities((prev) => prev - 1);
        setTotalPrice((prev) => prev - foundProduct.price);
      }
    }
  };
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id == product._id);
    foundIndex = cartItems.findIndex((item) => item._id == product._id);

    const newCartItem=cartItems.filter((item)=>item._id != product._id);

    setCartItems(newCartItem);
    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
