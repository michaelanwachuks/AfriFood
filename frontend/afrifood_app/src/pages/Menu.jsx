import './Menu.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import menuItems from '../data/MenuData';

const Menu = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center mb-4 menu_style">Our Menu</h2>
        <p className="text-center text-muted mb-4">
          Popular dishes from across Africa
        </p>

        <div className="row g-4">
          {menuItems.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <span className="badge bg-secondary align-self-start mb-2">
                    {item.country}
                  </span>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text flex-grow-1">{item.description}</p>
                  <h6>₦{item.price.toLocaleString()}</h6>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => addToCart(item)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
