import { useEffect, useState } from "react";
import { db } from "./api/firebase"; // Ensure this path is correct
import Navbar from "../components/Navbar";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState(""); // New state for description
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

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
      console.error("Error loading products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch on mount
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (productName && productPrice && productDescription) {
      try {
        const newProductRef = await addDoc(collection(db, "products"), {
          name: productName,
          price: Number(productPrice),
          description: productDescription,
        });

        // Update local state without fetching again
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            id: newProductRef.id,
            name: productName,
            price: Number(productPrice),
            description: productDescription,
          },
        ]);

        setProductName("");
        setProductPrice("");
        setProductDescription("");
      } catch (error) {
        console.error("Error adding product: ", error);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));

      // Update local state directly to remove the product without re-fetching
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <Navbar />
      <h1 className="admin-title">Admin Panel</h1>
      <form className="admin-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          className="admin-input"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          className="admin-input"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <textarea
          className="admin-input"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
        <button type="submit" className="admin-button">
          Add Product
        </button>
      </form>
      <div className="admin-search">
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="admin-product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="admin-product-item">
              <span className="admin-product-name">{product.name}</span>
              <span className="admin-product-price">
                ${product.price.toFixed(2)}
              </span>
              <span className="admin-product-description">
                {product.description}
              </span>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="admin-button"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
