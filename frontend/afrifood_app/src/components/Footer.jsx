import React from 'react'

const Footer = () => {
  
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      <div className="container">

        <div className="row">

          {/* Company Info */}
          <div className="col-md-3">
            <h5>AfriFood</h5>
            <p>
              Bringing authentic African cuisine to your doorstep.
              Fast delivery and delicious meals anytime.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/menu" className="text-light text-decoration-none">Menu</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-md-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
              <li><a href="/orders" className="text-light text-decoration-none">Track Order</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-light text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <h5>Subscribe</h5>
            <p>Get updates on new meals and offers.</p>

            <div className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Email"
              />
              <button className="btn btn-warning">Join</button>
            </div>
          </div>

        </div>

        <hr className="bg-light" />

        {/* Bottom footer */}
        <div className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} AfriFood. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer