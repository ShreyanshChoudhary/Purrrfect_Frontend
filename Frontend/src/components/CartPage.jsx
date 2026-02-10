import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaDog, FaTrash, FaShoppingCart } from "react-icons/fa";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Navigate to checkout page or show checkout modal
    alert("Proceeding to checkout...");
    // navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-wrapper">
          <div className="brand-header" onClick={() => navigate('/')}>
            <span className="brand-name">Purrrfect</span>
            <FaDog size={28} className="brand-icon" />
          </div>

          <div className="empty-cart">
            <FaShoppingCart size={80} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any pets to your cart yet.</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-wrapper">
        <div className="brand-header" onClick={() => navigate('/')}>
          <span className="brand-name">Purrrfect</span>
          <FaDog size={28} className="brand-icon" />
        </div>

        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items-section">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="cart-item-image"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-name" onClick={() => navigate(`/product/${item.id}`)}>
                    {item.name}
                  </h3>
                  <p className="cart-item-breed">{item.breed}</p>
                  <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <button className="continue-btn" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;