import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const DELIVERY_FEE = 3000

const OrderConfirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const order = location.state?.order

  if (!order) {
    return (
      <div className="container mt-5 text-center">
        <h2>No order details found</h2>
        <p className="text-muted">If you just placed an order, it may have opened in a new session.</p>
        <Link to="/menu" className="btn btn-primary me-2">Back to Menu</Link>
        <Link to="/cart" className="btn btn-outline-secondary">View Cart</Link>
      </div>
    )
  }

  const subtotal = order.subtotal ?? (order.totalAmount - (order.deliveryFee ?? DELIVERY_FEE))

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <div className="text-center mb-4">
              <h1 className="text-success">Order Placed!</h1>
              <p className="text-muted">Thank you for ordering from AfriFood</p>
            </div>

            <div className="alert alert-success">
              Your order <strong>#{order.orderNumber}</strong> has been received and is{' '}
              <strong>{order.orderStatus}</strong>.
            </div>

            <h5>Delivery Details</h5>
            <p>{order.shippingAddress}</p>

            <h5 className="mt-4">Items</h5>
            <ul className="list-group mb-3">
              {order.items?.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.productName} × {item.quantity}
                  </span>
                  <span>₦{(item.lineTotal ?? item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <div className="border-top pt-3">
              <p className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Delivery Fee</span>
                <span>₦{(order.deliveryFee ?? DELIVERY_FEE).toLocaleString()}</span>
              </p>
              <h5 className="d-flex justify-content-between">
                <span>Total Paid</span>
                <span>₦{order.totalAmount.toLocaleString()}</span>
              </h5>
            </div>

            <div className="d-flex gap-2 mt-4 justify-content-center">
              <button className="btn btn-warning" onClick={() => navigate('/menu')}>
                Order More
              </button>
              <Link to="/" className="btn btn-outline-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
