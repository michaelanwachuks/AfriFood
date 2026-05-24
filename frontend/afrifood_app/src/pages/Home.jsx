import React from "react";
import jollofImage from "../assets/jollof.jpg";
import suyaImage from "./../assets/suya.jpg";
import amalaImage from "../assets/amala.jpg"; 
import menuItems from "../data/MenuData";
import { useState } from "react";
import Footer from "../components/Footer";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [theMenuItems, settheMenuItems] = useState(menuItems);

  //create a filter function to filter the menu items based on the search query
  const filterMenuItems = (query) => {

  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  settheMenuItems(filtered);
  console.log(filtered);
};


  return (
     
    <div>
      {/* Hero section*/}
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
              onChange={(e) => {
              const query = e.target.value;
              setSearchTerm(query);

              const filtered = menuItems.filter(item =>
               item.name.toLowerCase().includes(query.toLowerCase())
           );

            settheMenuItems(filtered);
       }}
              
            />

          
          </div>
           {searchTerm && (
                <div className="container mt-5">
  <div className="row">

    {theMenuItems.length > 0 ? (
      theMenuItems.map(item => (
        <div key={item.id} className="col-md-4 mb-4">

          <div className="card h-100 shadow-sm">
            
            {/* Image */}
            <img
              src={item.image}
              className="card-img-top"
              alt={item.name}
              style={{ height: "200px", objectFit: "cover" }}
            />

            {/* Content */}
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="text-muted small mb-1">{item.country}</p>
              <p className="card-text">{item.description}</p>
              <h6>₦{item.price.toLocaleString()}</h6>
              <br />
              <button className="btn btn-primary">Order Now</button>
            </div>

          </div>

        </div>
      ))
    ) : (
      <p className="text-center">No food found</p>
    )}

  </div>
</div>
            )}
        </div>
      </section>


      {/* Food categories */}
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


      {/* featured meals */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">Featured Meals</h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card">
              <img src={jollofImage} width={200} height={200}  className="card-img-top" alt="Jollof Rice"/>
              <div className="card-body">
                <h5 className="card-title">Jollof Rice</h5>
                <p className="card-text">Delicious Nigerian jollof rice.</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={suyaImage} width={200} height={200} className="card-img-top" alt="Suya"/>
              <div className="card-body">
                <h5 className="card-title">Suya</h5>
                <p className="card-text">Spicy grilled beef suya.</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={amalaImage} width={200} height={200} className="card-img-top" alt="Amala"/>
              <div className="card-body">
                <h5 className="card-title">Amala & Ewedu</h5>
                <p className="card-text">Traditional Yoruba delicacy.</p>
                <button className="btn btn-primary">Order Now</button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* How our service works */}
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


      {/* what our customers say */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="card p-3">
              <p>"Best African food delivery service!"</p>
              <h6>- Sarah</h6>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <p>"Fast delivery and amazing meals."</p>
              <h6>- James</h6>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3">
              <p>"Authentic taste just like home."</p>
              <h6>- Ada</h6>
            </div>
          </div>

        </div>
      </section>


      {/* subscribe to our newsletter */}
      <section className="bg-dark text-white text-center p-5 mt-5">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe for deals and new meals.</p>

          <div className="d-flex justify-content-center">
            <input className="form-control w-50 me-2" placeholder="Enter email" />
            <button className="btn btn-warning">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;