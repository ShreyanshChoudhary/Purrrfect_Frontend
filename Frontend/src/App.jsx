import React, { Suspense, lazy } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Fallback from "./components/Fallback"

// Import HomePage normally as it's the main page
import HomePage from './components/HomePage';

// Lazy load SignupLoginPage with a delay
const SignupLoginPage = lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./components/SignupLoginPage'));
    }, 1000); // 1 second delay
  })
);

function App() {
    return (
        <Router>
            <div className="main-content">
                <Suspense fallback={<div><Fallback /></div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {/* Adding key prop to force re-render on navigation */}
                        <Route path="/signup-login" element={<SignupLoginPage />} key="signup-login" />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
