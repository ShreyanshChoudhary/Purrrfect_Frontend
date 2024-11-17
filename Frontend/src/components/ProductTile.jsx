import Card from 'react-bootstrap/Card';
import React from 'react';
import './ProductTile.css'; // Custom CSS for Flipkart-like styling

function ProductTile() {
  return (
    <div className="product-tile-container">
      <div className="product-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <h5 className="product-title">Product Name</h5>
          <p className="product-price">₹1,299</p>
          <p className="product-description">Brief description of the product.</p>
        </div>
      </div>
      <div className="product-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <h5 className="product-title">Product Name</h5>
          <p className="product-price">₹999</p>
          <p className="product-description">Brief description of the product.</p>
        </div>
      </div>
      <div className="product-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <h5 className="product-title">Product Name</h5>
          <p className="product-price">₹2,499</p>
          <p className="product-description">Brief description of the product.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductTile;
