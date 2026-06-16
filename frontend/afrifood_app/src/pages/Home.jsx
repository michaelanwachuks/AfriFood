import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MenuItemCard from "../components/MenuItemCard";
import { useFoods } from "../hooks/useFoods";

const Home = () => {
  const { foods, loading, error, reload } = useFoods();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return foods.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.country?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [foods, searchTerm]);

  const featuredItems = useMemo(() => foods.slice(0, 3), [foods]);

  return (
    <div>
      <section className="bg-dark text-white text-center p-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to AfriFood</h1>
          <p className="lead">
            Order delicious African meals from your favorite restaurants.
          </p>

          <div className="d-flex justify-content-center mt-4">
            <input
              className="form-control w-50 me-2"
              placeholder="Search for African meals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link to="/menu" className="btn btn-warning">
              Browse Menu
            </Link>
          </div>

          {searchTerm && (
            <div className="container mt-5 text-start">
              {loading && <p className="text-center text-muted">Loading menu…</p>}
              {error && (
                <div className="alert alert-warning text-center">
                  {error}
                  <button type="button" className="btn btn-sm btn-dark ms-2" onClick={reload}>
                    Retry
                  </button>
                </div>
              )}
              {!loading && !error && (
                <div className="row">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div key={item.id} className="col-md-4 mb-4">
                        <MenuItemCard item={item} showOrderLink />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted">No food found</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="container mt-5">
        <h2 className="text-center mb-4">Popular Categories</h2>
        <div className="row g-4 text-center">
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>Grills & BBQ</h5>
              <p>Suya, grilled fish & more</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>Traditional Meals</h5>
              <p>Amala, Egusi, Fufu</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>Rice Dishes</h5>
              <p>Jollof, Fried Rice</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5>Snacks</h5>
              <p>Puff Puff, Meat Pie</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 className="text-center mb-4">Featured Meals</h2>
        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-warning" role="status" />
          </div>
        )}
        {!loading && featuredItems.length > 0 && (
          <div className="row g-4">
            {featuredItems.map((item) => (
              <div className="col-md-4" key={item.id}>
                <MenuItemCard item={item} showOrderLink />
              </div>
            ))}
          </div>
        )}
        {!loading && featuredItems.length === 0 && (
          <p className="text-center text-muted">Menu coming soon.</p>
        )}
      </section>

      <section className="bg-light mt-5 p-5">
        <div className="container text-center">
          <h2 className="mb-4">How AfriFood Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <h4>1. Browse</h4>
              <p>Explore restaurants and meals.</p>
            </div>
            <div className="col-md-4">
              <h4>2. Order</h4>
              <p>Add meals to cart and checkout.</p>
            </div>
            <div className="col-md-4">
              <h4>3. Enjoy</h4>
              <p>Fast delivery to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card p-3">
              <p>&quot;Best African food delivery service!&quot;</p>
              <h6>- Sarah</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <p>&quot;Fast delivery and amazing meals.&quot;</p>
              <h6>- James</h6>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <p>&quot;Authentic taste just like home.&quot;</p>
              <h6>- Ada</h6>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center p-5 mt-5">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe for deals and new meals.</p>
          <div className="d-flex justify-content-center">
            <input className="form-control w-50 me-2" placeholder="Enter email" />
            <button type="button" className="btn btn-warning">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
