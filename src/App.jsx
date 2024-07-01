import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoadingPage from './components/LoadingPage/LoadingPage'; 
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); 

      return () => clearTimeout(timer);
    }, [location]);

    const hideNavbarFooter = location.pathname === '/loading';

    return (
      <div className="App">
        <ScrollToTop/>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            {!hideNavbarFooter && <Navbar />}
            <Routes>
              <Route exact path='/' element={<HomePage/>}/>
            </Routes>
            {!hideNavbarFooter && <Footer />}
          </>
        )}
      </div>
    );
}

export default App;
