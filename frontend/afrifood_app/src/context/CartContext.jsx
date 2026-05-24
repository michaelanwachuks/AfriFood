import React from 'react'
import { useState } from "react";
import { useContext } from 'react';
import { createContext } from 'react';

// Create a context for the cart
const CartContext = React.createContext();

// Create a provider component to wrap the app and provide the cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
  /* const addToCart = (item) => {
    console.log("Adding to cart:", item);
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
    
  }; */

  const addToCart = (item) => {
  setCartItems(prevItems => {

    const existingItem = prevItems.find(i => i.id === item.id);

    if (existingItem) {
      return prevItems.map(the_item =>
        the_item.id === item.id
          ? { ...the_item, quantity: the_item.quantity + 1 }
          : the_item
      );
    }

    return [...prevItems, { ...item, quantity: 1 }];
  });
};

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  };

  const increaseQty = (id) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 0) + 1 }
        : item
    )
  );
};

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); 

  const cartCount = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, removeItem, clearCart, total, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext