import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pet) return <p>No product found.</p>;

  return (
    <div className="product-detail-container">
      {/* LEFT: Image Section */}
      <div className="product-image-container">
        <img src={pet.imageUrl} alt={pet.name} />
      </div>

      {/* RIGHT: Product Info */}
      <div className="product-info">
        <h1 className="product-name">{pet.name}</h1>
        <p className="product-price">₹{pet.price}</p>
        <p className="product-description">{pet.description}</p>

        {/* Product Specifications */}
        <div className="product-specs">
          <div><strong>Breed:</strong> {pet.breed || "Not specified"}</div>
          <div><strong>Age:</strong> {pet.age || "Not specified"}</div>
          <div><strong>Gender:</strong> {pet.gender || "Not specified"}</div>
          <div><strong>Weight:</strong> {pet.weight || "Not specified"}</div>
          <div><strong>Color:</strong> {pet.color || "Not specified"}</div>
          <div><strong>Vaccinated:</strong> {pet.vaccinated ? "Yes" : "No"}</div>
          <div><strong>Dewormed:</strong> {pet.dewormed ? "Yes" : "No"}</div>
          <div><strong>Diet:</strong> {pet.diet || "Not specified"}</div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="buy-now-button">Buy Now</button>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
