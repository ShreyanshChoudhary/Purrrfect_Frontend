import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Importing cart icon
import './Cart.css'// Optional: add your custom CSS for the cart

function Cart() {
  const [cartCount, setCartCount] = useState(0); // State to hold cart item count

  return (
    <div className="cart-button-container">
      <div className="cart-icon-container">
        <FaShoppingCart size={24} className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Cart count */}
      </div>
    </div>
  );
}

export default Cart;
