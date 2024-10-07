"use client";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { router } from "next/router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const productsSnapShot = await getDocs(productsRef);
        setProducts(
          productsSnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from local storage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Add to Cart Functionality
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to local storage
  };

  // Buy Now Functionality
  const buyNow = (product) => {
    addToCart(product);
    // Redirect to checkout page after adding to cart
    router.push("/checkout");
  };

  return (
    <div>
      <Navbar cart={cart} />
      <h1>Product List</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              buyNow={buyNow}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
