import React from 'react'
import { useState } from "react";
import { useContext } from 'react';
import { createContext } from 'react';

// Create a context for the cart
const CartContext = React.createContext();

// Create a provider component to wrap the app and provide the cart state
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext