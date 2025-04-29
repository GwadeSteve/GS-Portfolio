import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
    const [initialLoading, setInitialLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [previousLocation, setPreviousLocation] = useState('');
    const [pageTransitioning, setPageTransitioning] = useState(false);

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setInitialLoading(false);
        document.body.style.overflow = '';
      }, 5000);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }, []);

    useEffect(() => {
      if (previousLocation === '') {
        setPreviousLocation(location.pathname);
        return;
      }
      
      if (previousLocation.split('#')[0] === location.pathname.split('#')[0]) {
        setPreviousLocation(location.pathname);
        return;
      }
      
      setPageLoading(true);
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setPageLoading(false);
        document.body.style.overflow = '';
        setPreviousLocation(location.pathname);
      }, 2500);
      
      return () => {
        clearTimeout(timer);
      };
    }, [location.pathname, previousLocation]);

    useEffect(() => {
      if (!initialLoading && !pageLoading) {
        setPageTransitioning(true);
        const timer = setTimeout(() => {
          setPageTransitioning(false);
        }, 0);
        
        return () => clearTimeout(timer);
      }
    }, [location.pathname, initialLoading, pageLoading]);

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
        {!hideNavbarFooter && <Navbar />}
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