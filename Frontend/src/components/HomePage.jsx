import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation from react-router-dom
import Header from './Header';
import Footer from './Footer';
import Fallback from './Fallback'; // Importing the Fallback component
import "../global.css"; // Import global styles
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CarouselFade from './CarouselFade';
import ProductTile from './ProductTile';

function HomePage() {
    const [loading, setLoading] = useState(true); // State for tracking loading
    const location = useLocation(); // Using useLocation to track route changes

    useEffect(() => {
        // Set loading to true whenever the page is reloaded or when the location changes
        setLoading(true);

        // Simulate a loading state (can be adjusted for your needs)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate a loading state for 2 seconds

        // Clean up the timer when component unmounts or location changes
        return () => clearTimeout(timer);
    }, [location]); // Dependency on location to detect page navigation

    // If the page is in loading state, render fallback animation
    if (loading) {
        return <Fallback />;
    }

    return (
        <div className="homepage">
            {/* Header component */}
            <Header />
            
            {/* Main content area */}
            <div className="homepage-content">
                <CarouselFade />
                <ProductTile />
            </div>

            {/* Footer component */}
            <Footer />
        </div>
    );
}

export default HomePage;
