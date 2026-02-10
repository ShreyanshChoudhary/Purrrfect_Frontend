import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './ProductTile.css';

const ProductTile = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();  // Initialize useNavigate

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://purrrfect-backend.onrender.com/api/products`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  if (isLoading && page === 1) return <div>Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-tile-container">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={15}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="product-swiper"
        >
          {products.map((product, index) => {
            const imageUrl = product.imageUrl
              ? `${product.imageUrl}?timestamp=${new Date().getTime()}`
              : 'https://dummyimage.com/300x300/cccccc/000000&text=No+Image';

            return (
              <SwiperSlide key={`${product.id}-${index}`} className="product-slide">
                <div 
                  className="product-card" 
                  onClick={() => navigate(`/product/${product.id}`)}  // Navigate on card click
                  style={{ cursor: 'pointer' }}  
                >
                  <Card className="h-100">
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                        e.target.src = 'https://dummyimage.com/300x300/cccccc/000000&text=No+Image';
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
                      </ListGroup>
                      <Button 
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click from triggering
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default ProductTile;
