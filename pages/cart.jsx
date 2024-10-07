// /pages/cart.js
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CartItem from "../components/CartItem";
import { useRouter } from "next/router";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve saved cart from local storage
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  const updateQuantity = (item, quantity) => {
    if (quantity === 0) {
      removeItem(item);
    } else {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
    }
  };

  const removeItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const proceedToCheckout = () => {
    router.push("/checkout"); // Navigate to checkout page
  };

  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))
      ) : (
        <p>No items in cart.</p>
      )}
      {cartItems.length > 0 && (
        <div className="checkout-button">
          <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
