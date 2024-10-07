import React from "react";

const ProductCard = ({ product, addToCart, buyNow }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <div className="card-actions">
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button className="buy-now" onClick={() => buyNow(product)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
