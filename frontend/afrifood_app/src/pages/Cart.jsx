import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CartContext from '../context/CartContext'
import "bootstrap/dist/css/bootstrap.min.css"

const DELIVERY_FEE = 3000

const Cart = () => {
  const { cartItems, total, increaseQty, decreaseQty, removeItem, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const grandTotal = total + DELIVERY_FEE

  const handleCheckout = async () => {
    setError('')

    if (!shippingAddress.trim()) {
      setError('Please enter a delivery address')
      return
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty')
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/checkout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: shippingAddress.trim(),
          items: cartItems.map(item => ({
            foodId: item.id,
            productName: item.name,
            price: Number(item.price),
            quantity: item.quantity,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(typeof data === 'string' ? data : 'Checkout failed. Please try again.')
        return
      }

      clearCart()
      navigate('/order-confirmation', { state: { order: data } })
    } catch (err) {
      setError('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/menu')}>
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="row">
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
                      <p>₦{Number(item.price).toLocaleString()}</p>
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

          <div className="col-md-4">
            <div className="card p-3">
              <h4>Order Summary</h4>
              <hr />

              <p>
                Subtotal:
                <span className="float-end">₦{total.toLocaleString()}</span>
              </p>

              <p>
                Delivery Fee:
                <span className="float-end">₦{DELIVERY_FEE.toLocaleString()}</span>
              </p>

              <hr />

              <h5>
                Total:
                <span className="float-end">₦{grandTotal.toLocaleString()}</span>
              </h5>

              <hr />

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Street, city, phone for delivery..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

              <button
                className="btn btn-warning w-100 mt-2"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Placing order...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
