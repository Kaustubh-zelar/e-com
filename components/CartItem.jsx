import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
      <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
      <button onClick={() => removeItem(item)}>Remove</button>
    </div>
  );
};

export default CartItem;
