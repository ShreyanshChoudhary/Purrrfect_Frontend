import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './Cart.css';

function Cart() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Function to update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    // Initial load
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to cart page
  };

  return (
    <div className="cart-button-container">
      <div className="cart-icon-container" onClick={handleCartClick}>
        <FaShoppingCart size={24} className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>
    </div>
  );
}

export default Cart;