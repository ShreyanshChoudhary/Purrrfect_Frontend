import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Fallback from './Fallback';
import "../global.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CarouselFade from './CarouselFade';
import ProductTile from './ProductTile';
import { ProductProvider } from '../components/ProductContext'; 
import Chatbot from './Chatbot';  // Import the Chatbot component

function HomePage() {
    const [loading, setLoading] = useState(true); 
    const [showMessage, setShowMessage] = useState(false);  // State to handle success message visibility
    const location = useLocation(); 

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        // Check if the login was successful by checking the query parameter
        if (new URLSearchParams(location.search).get('loginSuccess') === 'true') {
            setShowMessage(true);
        } else {
            setShowMessage(false);
        }

        return () => clearTimeout(timer);
    }, [location]); 

    if (loading) {
        return <Fallback />;
    }

    return (
        <div className="homepage">
            <Header />
            
            <div className="homepage-content">
                {showMessage && <div className="alert alert-success">Login Successful!</div>}  {/* Display success message */}
                <CarouselFade />
                <ProductProvider>
                    <ProductTile />
                </ProductProvider>
            </div>

            <Footer />

            {/* Add the Chatbot to the homepage */}
            <Chatbot />
        </div>
    );
}

export default HomePage;
