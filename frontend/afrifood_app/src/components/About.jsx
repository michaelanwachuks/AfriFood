
const About = () => {
  
  return (
    <div>

      {/* Hero */}
      <section className="bg-dark text-white text-center p-5">
        <div className="container">
          <h1 className="display-4 fw-bold">About AfriFood</h1>
          <p className="lead">
            Connecting people to the rich and authentic flavors of Africa.
          </p>
        </div>
      </section>


      {/* AfriFood story */}
      <section className="container mt-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h2>Our Story</h2>
            <p>
              AfriFood was created with a simple mission: to make authentic African
              cuisine easily accessible to everyone. We understand that food is
              more than just a meal—it is culture, tradition, and community.
            </p>

            <p>
              Our platform connects customers with local restaurants and chefs
              who specialize in delicious African dishes such as Jollof rice,
              Suya, Amala, Egusi, and many more. With AfriFood, you can discover
              new flavors, support local food businesses, and enjoy high-quality
              meals delivered straight to your doorstep.
            </p>
          </div>

          <div className="col-md-6">
            <img
              src="/images/african-food.jpg"
              className="img-fluid rounded"
              alt="African Food"
            />
          </div>

        </div>
      </section>


      {/* our mission and vision */}
      <section className="bg-light mt-5 p-5">
        <div className="container text-center">

          <div className="row">

            <div className="col-md-6">
              <h3>Our Mission</h3>
              <p>
                To bring authentic African cuisine to homes everywhere by
                connecting customers with trusted restaurants and chefs
                through a fast, reliable, and convenient delivery platform.
              </p>
            </div>

            <div className="col-md-6">
              <h3>Our Vision</h3>
              <p>
                To become the leading digital marketplace for African food,
                empowering restaurants and making traditional meals accessible
                to millions of people around the world.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Why choose us */}
      <section className="container mt-5">
        <h2 className="text-center mb-4">Why Choose AfriFood</h2>

        <div className="row g-4 text-center">

          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h4>Authentic Meals</h4>
              <p>
                We partner with restaurants that prepare genuine African
                dishes using traditional recipes and fresh ingredients.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h4>Fast Delivery</h4>
              <p>
                Our efficient delivery network ensures your food arrives
                quickly, fresh, and ready to enjoy.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow-sm">
              <h4>Support Local Businesses</h4>
              <p>
                Every order supports local chefs and restaurants,
                helping them grow and reach more customers.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* Our team*/}
      <section className="bg-light mt-5 p-5">
        <div className="container text-center">

          <h2 className="mb-4">Our Team</h2>

          <p className="mb-5">
            AfriFood is powered by a passionate team of developers,
            food lovers, and entrepreneurs committed to delivering
            exceptional food experiences.
          </p>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="card p-3">
                <img
                  src="/images/team1.jpg"
                  className="card-img-top rounded"
                  alt="Founder"
                />
                <div className="card-body">
                  <h5>Founder & CEO</h5>
                  <p>Leading the vision behind AfriFood.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <img
                  src="/images/team2.jpg"
                  className="card-img-top rounded"
                  alt="Operations"
                />
                <div className="card-body">
                  <h5>Operations Manager</h5>
                  <p>Ensuring smooth delivery operations.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-3">
                <img
                  src="/images/team3.jpg"
                  className="card-img-top rounded"
                  alt="Developer"
                />
                <div className="card-body">
                  <h5>Lead Developer</h5>
                  <p>Building and improving the platform.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Call to action*/}
      <section className="bg-primary text-white text-center p-5">
        <div className="container">
          <h2>Ready to Enjoy African Cuisine?</h2>
          <p className="mb-4">
            Browse our menu and order your favorite dishes today.
          </p>
          <a href="/menu" className="btn btn-warning btn-lg">
            Explore Menu
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;