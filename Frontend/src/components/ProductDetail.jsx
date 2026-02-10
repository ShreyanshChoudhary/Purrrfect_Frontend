import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch pet details");
        const data = await response.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPetDetails();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(prev => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === pet.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      existingCart.push({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        price: pet.price,
        imageUrl: pet.imageUrl,
        quantity: quantity
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to notify cart component
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message (you can replace with a toast notification)
    alert(`${pet.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // Add to cart first
    handleAddToCart();
    
    // Navigate to cart page or checkout
    navigate('/cart');
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading product details...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <p>Error: {error}</p>
    </div>
  );
  
  if (!pet) return (
    <div className="error-container">
      <p>Product not found</p>
    </div>
  );

  return (
    <div className="product-detail-page">
      <div className="product-detail-wrapper">
        {/* Logo/Brand Header */}
        <div className="brand-header" onClick={() => navigate('/')}>
          <span className="brand-name">Purrrfect</span>
          <FaDog size={28} className="brand-icon" />
        </div>

        {/* Breadcrumb Navigation */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <span className="separator">/</span>
          <span>Pets</span>
          <span className="separator">/</span>
          <span className="current">{pet.breed}</span>
        </div>

        <div className="product-detail-container">
          {/* LEFT: Pet Image */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img src={pet.imageUrl} alt={pet.name} className="main-product-image" />
            </div>
          </div>

          {/* RIGHT: Pet Info */}
          <div className="product-info-section">
            <div className="product-header">
              <h1 className="product-title">{pet.name}</h1>
              <p className="product-breed">{pet.breed}</p>
            </div>

            <div className="product-price-section">
              <span className="product-price">₹{pet.price.toLocaleString()}</span>
              <span className="price-note">Inclusive of all taxes</span>
            </div>

            <div className="product-description-section">
              <h3>Description</h3>
              <p>{pet.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="specifications-section">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Age</span>
                  <span className="spec-value">{pet.age}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Gender</span>
                  <span className="spec-value">{pet.gender}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Weight</span>
                  <span className="spec-value">{pet.weight}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Color</span>
                  <span className="spec-value">{pet.color}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Diet</span>
                  <span className="spec-value">{pet.diet}</span>
                </div>
              </div>
            </div>

            {/* Health Information */}
            <div className="health-section">
              <h3>Health Information</h3>
              <div className="health-badges">
                <span className={`health-badge ${pet.vaccinated ? 'verified' : ''}`}>
                  {pet.vaccinated ? '✓' : '✗'} Vaccinated
                </span>
                <span className={`health-badge ${pet.dewormed ? 'verified' : ''}`}>
                  {pet.dewormed ? '✓' : '✗'} Dewormed
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity === 1}
                >
                  −
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-cart" onClick={handleAddToCart}>Add to Cart</button>
              <button className="btn btn-buy" onClick={handleBuyNow}>Buy Now</button>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <div className="info-text">
                  <strong>Free Delivery</strong>
                  <p>For orders above ₹999</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">🔒</span>
                <div className="info-text">
                  <strong>Secure Transaction</strong>
                  <p>We ensure secure payment</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">💯</span>
                <div className="info-text">
                  <strong>Health Guaranteed</strong>
                  <p>All pets are vet-checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;