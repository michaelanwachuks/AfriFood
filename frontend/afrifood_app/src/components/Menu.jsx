import './Menu.css'
import 'bootstrap/dist/css/bootstrap.css';
import jollof from '../assets/jollof.jpg'
import poundo from '../assets/poundo.jpg'
import amala from '../assets/amala.jpg'
import suya from '../assets/suya.jpg'
import suya2 from '../assets/suya_sallat.jpg'
import amalaewedu from '../assets/amala-and-ewedu-2.jpg'
import { useState } from "react";
import CartContext from './CartContext';
import { useContext } from 'react'; 


const Menu = () => {

   //define the menu data to display the menu dynamically
   const menuItems = [
    { id: 1, name: 'Jollof Rice', description: 'Delicious Jollof rice with herbs and spices.', price: '$12.99', image: jollof },
    { id: 2, name: 'Pounded yam', description: 'Traditional Nigerian dish made from pounded yam.', price: '$14.99', image: poundo },
    { id: 3, name: 'Amala', description: 'Traditional Nigerian dish made from yam.', price: '$10.99', image: amala },
    { id: 4, name: 'Suya', description: 'Traditional Nigerian dish made from cow meat.', price: '$15.99', image: suya },
    { id: 5, name: 'Suya', description: 'Traditional Nigerian dish made from cow meat.', price: '$20.99', image: suya2 },
    { id: 6, name: 'Amala and Ewedu', description: 'Traditional Nigerian dish made from yam and ewedu.', price: '$12.99', image: amalaewedu }
  ];

  // Get the addToCart function from the CartContext(using destructuring assignment)
  const { addToCart } = useContext(CartContext);
  return (
    <div>
       
       <div className="container mt-5">
      <h2 className="text-center mb-4 menu_style">Our Menu</h2>

      <div className="row g-4">

        {menuItems.map((item, index)=>{
          return (
            <div className="col-md-4" key={index}>  
          <div className="card h-100">
            <img src={item.image} width={200} height={200} className="card-img-top" alt={item.name}/>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                {item.description}
              </p>
              <h6>{item.price}</h6>
              <br/>
              <button className="btn btn-primary" onClick={() => addToCart(item)}>Order Now</button>
            </div>
          </div>
        </div>
          );
        })}
         
              </div>
    </div>
       </div> 
       
  );
};

export default Menu;