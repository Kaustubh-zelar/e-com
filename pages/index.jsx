"use client";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import FilterModal from "../components/FilterModal";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxProductPrice, setMaxProductPrice] = useState(1000); // State for max product price

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const productsSnapShot = await getDocs(productsRef);
        const fetchedProducts = productsSnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(fetchedProducts);

        // Calculate the maximum product price
        const prices = fetchedProducts.map((product) => product.price);
        setMaxProductPrice(Math.max(...prices));
        setMaxPrice(Math.max(...prices)); // Set initial maxPrice to the highest product price
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

  const cartCount = cart.length;

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

  const buyNow = (product) => {
    addToCart(product);
    router.push("/checkout");
  };

  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <h1 className="pl-2 pt-2 pb-2 text-2xl font-bold">Product List</h1>

      {/* Filter Button */}
      <button onClick={() => setIsModalOpen(true)}>Filter by Price</button>

      {/* Filter Modal */}
      {isModalOpen && (
        <FilterModal
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          closeModal={() => setIsModalOpen(false)} // Close the modal
          maxProductPrice={maxProductPrice} // Pass the max product price to the modal
        />
      )}

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              buyNow={buyNow}
            />
          ))
        ) : (
          <p>No products available in this price range.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
