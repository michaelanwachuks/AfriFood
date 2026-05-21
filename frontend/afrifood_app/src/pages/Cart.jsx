import React, { useContext } from 'react'
import CartContext from '../context/CartContext';
//import React from 'react'
 import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {

  //use descructuring assignment to get cartItems
  const { cartItems, total, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  return (
    <div className="container mt-5">

      <h1 className="mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (

        <div className="row">

          {/* Cart Items */}
          <div className="col-md-8">

            {cartItems.map(item => (
              <div className="card mb-3" key={item.id}>
                <div className="row g-0 align-items-center">

                  <div className="col-md-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded"
                      alt={item.name}
                    />
                  </div>

                  <div className="col-md-5">
                    <div className="card-body">
                      <h5>{item.name}</h5>
                      <p>₦{item.price}</p>
                    </div>
                  </div>

                  <div className="col-md-2 text-center">

                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>

                    {item.quantity}

                    <button
                      className="btn btn-outline-secondary btn-sm ms-2"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>

                  </div>

                  <div className="col-md-2 text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>


          {/* Order Summary */}
          <div className="col-md-4">

            <div className="card p-3">

              <h4>Order Summary</h4>

              <hr />

              <p>
                Subtotal:
                <span className="float-end">
                  ₦{total.toFixed(2)}
                </span>
              </p>

              <p>
                Delivery Fee:
                <span className="float-end">₦3,000.00</span>
              </p>

              <hr />

              <h5>
                Total:
                <span className="float-end">
                  ₦{(total + 3).toFixed(2)}
                </span>
              </h5>

              <button className="btn btn-warning w-100 mt-3">
                Proceed to Checkout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart