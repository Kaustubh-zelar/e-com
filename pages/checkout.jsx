import { useState } from "react";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountNumber: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the checkout form
    console.log(formData);
  };

  return (
    <div className="checkout-container">
      <Navbar />
      <h1 className="checkout-title">Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label className="checkout-label">
          Name:
          <input
            type="text"
            name="name"
            className="checkout-input"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="checkout-label">
          Email:
          <input
            type="email"
            name="email"
            className="checkout-input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="checkout-label">
          Account Number:
          <input
            type="text"
            name="accountNumber"
            className="checkout-input"
            value={formData.accountNumber}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className="checkout-button">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
