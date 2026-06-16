import { Link } from "react-router-dom";

const MenuItemCard = ({ item, onOrder, showOrderLink = false }) => (
  <div className="card h-100 shadow-sm">
    <img
      src={item.image}
      className="card-img-top"
      alt={item.name}
      style={{ height: "200px", objectFit: "cover" }}
    />
    <div className="card-body d-flex flex-column">
      {item.country && (
        <span className="badge bg-secondary align-self-start mb-2">{item.country}</span>
      )}
      <h5 className="card-title">{item.name}</h5>
      <p className="card-text flex-grow-1 text-muted small">{item.description}</p>
      <h6 className="text-dark">₦{Number(item.price).toLocaleString()}</h6>
      {showOrderLink ? (
        <Link to="/menu" className="btn btn-primary mt-2">
          View Menu
        </Link>
      ) : (
        <button type="button" className="btn btn-primary mt-2" onClick={() => onOrder?.(item)}>
          Order Now
        </button>
      )}
    </div>
  </div>
);

export default MenuItemCard;
