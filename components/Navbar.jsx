// /components/Navbar.js
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { cartCount } from "../pages/index";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <ul className="navbar-links">
          <li>
            <Link href="/" className={router.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className={router.pathname === "/cart" ? "active" : ""}
            >
              Cart{cartCount > 0 && `(${cartCount})`}
            </Link>
          </li>
          <li>
            <Link
              href="/checkout"
              className={router.pathname === "/checkout" ? "active" : ""}
            >
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
