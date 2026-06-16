import "./Menu.css";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import MenuItemCard from "../components/MenuItemCard";
import { useFoods } from "../hooks/useFoods";

const Menu = () => {
  const { addToCart } = useContext(CartContext);
  const { foods, loading, error, reload } = useFoods();

  return (
    <div>
      <div className="container mt-5">
        <h2 className="text-center mb-4 menu_style">Our Menu</h2>
        <p className="text-center text-muted mb-4">
          Popular dishes from across Africa — synced from our kitchen
        </p>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status" />
            <p className="mt-2 text-muted">Loading menu…</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
            <div className="mt-2">
              <button type="button" className="btn btn-sm btn-warning" onClick={reload}>
                Try again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && foods.length === 0 && (
          <p className="text-center text-muted py-5">No menu items available right now.</p>
        )}

        {!loading && !error && foods.length > 0 && (
          <div className="row g-4">
            {foods.map((item) => (
              <div className="col-md-4" key={item.id}>
                <MenuItemCard item={item} onOrder={addToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
