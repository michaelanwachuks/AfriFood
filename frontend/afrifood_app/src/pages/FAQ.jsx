import React from 'react'

 
const FAQ = () => {
  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center mb-5">
        Find answers to common questions about ordering, delivery, and payments on AfriFood.
      </p>

      <div className="accordion" id="faqAccordion">

        {/* Question 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq1"
            >
              How do I place an order on AfriFood?
            </button>
          </h2>

          <div id="faq1" className="accordion-collapse collapse show">
            <div className="accordion-body">
              Browse the menu, select your favorite meals, and click
              "Add to Cart". Once you are ready, go to your cart and proceed
              to checkout to complete your order.
            </div>
          </div>
        </div>


        {/* Question 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq2"
            >
              How long does delivery take?
            </button>
          </h2>

          <div id="faq2" className="accordion-collapse collapse">
            <div className="accordion-body">
              Delivery usually takes between 30–60 minutes depending on your
              location, restaurant preparation time, and traffic conditions.
            </div>
          </div>
        </div>


        {/* Question 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq3"
            >
              What payment methods are accepted?
            </button>
          </h2>

          <div id="faq3" className="accordion-collapse collapse">
            <div className="accordion-body">
              AfriFood accepts multiple payment options including debit cards,
              credit cards, and online payment gateways. In some locations,
              cash on delivery may also be available.
            </div>
          </div>
        </div>


        {/* Question 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq4"
            >
              Can I track my order?
            </button>
          </h2>

          <div id="faq4" className="accordion-collapse collapse">
            <div className="accordion-body">
              Yes. Once your order is confirmed, you can track its progress
              from preparation to delivery through your order tracking page.
            </div>
          </div>
        </div>


        {/* Question 5 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq5"
            >
              What if there is a problem with my order?
            </button>
          </h2>

          <div id="faq5" className="accordion-collapse collapse">
            <div className="accordion-body">
              If there is an issue with your order, please contact our
              customer support team immediately through the contact page.
              We will work quickly to resolve the issue.
            </div>
          </div>
        </div>


        {/* Question 6 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq6"
            >
              Can restaurants join AfriFood?
            </button>
          </h2>

          <div id="faq6" className="accordion-collapse collapse">
            <div className="accordion-body">
              Yes! Restaurants and food vendors can partner with AfriFood to
              reach more customers. Please contact us through our partnership
              page for more information.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default FAQ