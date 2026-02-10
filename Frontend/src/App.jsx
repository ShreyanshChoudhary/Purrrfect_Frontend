import React, { Suspense, lazy } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Fallback from "./components/Fallback";
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import { UserProvider } from './components/contexts/UserContext';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
// Lazy load pages for performance optimization
const SignupLoginPage = lazy(() => import('./components/SignupLoginPage'));
const ProductTile = lazy(() => import('./components/ProductTile'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
        
          <main className="main-content" style={{ minHeight: 'calc(100vh - 120px)' }}> {/* Added min-height */}
            <Suspense fallback={<div><Fallback /></div>}>
              <Routes>
              <Route path="/cart" element={<CartPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductTile />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/signup-login" element={<SignupLoginPage />} />
                        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

                <Route path="/auth" element={<SignupLoginPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;