import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import LoadingPage from './components/LoadingPage/LoadingPage'; 
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage/AboutPage';
import Work from './pages/Work/Work';
import Request from './pages/Request/Request';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.css';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [initialLoading, setInitialLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [targetRoute, setTargetRoute] = useState(null);
    const [pageTransitioning, setPageTransitioning] = useState(false);
    
    // Handle initial app loading
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setInitialLoading(false);
        document.body.style.overflow = '';
      }, 3000);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }, []);

    // Custom navigation handler to show loading first
    const handleNavigate = useCallback((path) => {
      if (path === location.pathname) return; // Don't navigate to the same route
      
      // Show loading first, then navigate
      setPageLoading(true);
      setTargetRoute(path);
      document.body.style.overflow = 'hidden';
    }, [location.pathname]);

    // Effect to execute navigation after loading screen is shown
    useEffect(() => {
      if (pageLoading && targetRoute) {
        // Wait briefly to ensure loading screen renders fully before navigating
        const navTimer = setTimeout(() => {
          navigate(targetRoute);
        }, 100);

        // Then handle completing the page transition
        const loadTimer = setTimeout(() => {
          setPageLoading(false);
          setTargetRoute(null);
          document.body.style.overflow = '';
        }, 2800); // slightly longer than your original timer
        
        return () => {
          clearTimeout(navTimer);
          clearTimeout(loadTimer);
        };
      }
    }, [pageLoading, targetRoute, navigate]);

    useEffect(() => {
      if (!initialLoading && !pageLoading) {
        setPageTransitioning(true);
        const timer = setTimeout(() => {
          setPageTransitioning(false);
        }, 0);
        
        return () => clearTimeout(timer);
      }
    }, [initialLoading, pageLoading]);

    useEffect(() => {
      const handleLinkClick = (e) => {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
        }
      };
      
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleLinkClick);
      });
      
      return () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.removeEventListener('click', handleLinkClick);
        });
      };
    }, []);

    const hideNavbarFooter = location.pathname === '/request';

    if (initialLoading || pageLoading) {
      return <LoadingPage />;
    }

    return (
      <div className="App">
        <ScrollToTop />
        {!hideNavbarFooter && <Navbar onNavigate={handleNavigate} />}
        <ThemeToggle />
        <main className={`main-content ${pageTransitioning ? 'page-transitioning' : ''}`}>
          <Routes location={location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/work' element={<Work />} />
            <Route path='/request' element={<Request />} />
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
      </div>
    );
}

export default App;