import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [pageTransitioning, setPageTransitioning] = useState(false);
    const isNavigatingRef = useRef(false);
    const navigationTimeoutRef = useRef(null);
    const ignoreNextNavigationRef = useRef(false);
    const isInitialRenderRef = useRef(true);

    const setScrollLock = useCallback((lock) => {
        if (lock) {
            document.body.classList.add('body-scroll-lock');
        } else {
            document.body.classList.remove('body-scroll-lock');
        }
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setScrollLock(true);

        const timer = setTimeout(() => {
            setInitialLoading(false);
            setScrollLock(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            setScrollLock(false);
        };
    }, [setScrollLock]);

    const clearNavigationState = useCallback(() => {
        setPageLoading(false);
        setScrollLock(false);
        isNavigatingRef.current = false;

        if (navigationTimeoutRef.current) {
            clearTimeout(navigationTimeoutRef.current);
            navigationTimeoutRef.current = null;
        }
    }, [setScrollLock]);

    const handleNavigate = useCallback((path) => {
        if (path === location.pathname) return;
        if (isNavigatingRef.current) return;

        isNavigatingRef.current = true;
        setPageLoading(true);
        setScrollLock(true);

        navigationTimeoutRef.current = setTimeout(() => {
            navigate(path);

            navigationTimeoutRef.current = setTimeout(() => {
                clearNavigationState();
            }, 1000);

        }, 150);

    }, [location.pathname, navigate, clearNavigationState, setScrollLock]);

    useEffect(() => {
        const handlePopState = () => {
            ignoreNextNavigationRef.current = true;
            setScrollLock(false);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [setScrollLock]);

    useEffect(() => {
        if (isInitialRenderRef.current) {
            isInitialRenderRef.current = false;
            return;
        }

        if (ignoreNextNavigationRef.current) {
            ignoreNextNavigationRef.current = false;
            setScrollLock(false);
            return;
        }

        if (!isNavigatingRef.current && !initialLoading && !pageLoading) {
             setScrollLock(false);
        }
    }, [location.pathname, initialLoading, pageLoading, setScrollLock]);

    useEffect(() => {
        const navigationController = new AbortController();

        const handleNavigation = (e) => {
            let element = e.target;
            while (element && element.tagName !== 'A') {
                element = element.parentElement;
            }

            if (!element) return;

            const href = element.getAttribute('href');
            const target = element.getAttribute('target');
            const download = element.hasAttribute('download');

            if (target === '_blank' || download || (href && href.startsWith('mailto:'))) {
                return;
            }

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const yOffset = -80;
                    const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
                return;
            }

            if (href && href.startsWith('/') && !href.startsWith('//')) {
                 const currentUrl = new URL(window.location.href);
                 const targetUrl = new URL(href, window.location.origin);

                 if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search && targetUrl.hash === currentUrl.hash) {
                     return;
                 }

                e.preventDefault();
                if (isNavigatingRef.current) return;
                handleNavigate(href);
            }
        };

        document.addEventListener('click', handleNavigation, {
            signal: navigationController.signal,
            capture: true
        });

        return () => {
            navigationController.abort();
        };
    }, [handleNavigate]);


    useEffect(() => {
        if (!initialLoading && !pageLoading) {
            setPageTransitioning(true);
            const timer = setTimeout(() => {
                setPageTransitioning(false);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [initialLoading, pageLoading, location.pathname]);

    useEffect(() => {
        return () => {
            if (navigationTimeoutRef.current) {
                clearTimeout(navigationTimeoutRef.current);
            }
            setScrollLock(false);
        };
    }, [setScrollLock]);

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
                    <Route path='/' element={<HomePage onNavigate={handleNavigate} />} />
                    <Route path='/about' element={<AboutPage onNavigate={handleNavigate} />} />
                    <Route path='/work' element={<Work onNavigate={handleNavigate} />} />
                    <Route path='/request' element={<Request onNavigate={handleNavigate} />} />
                </Routes>
            </main>
            {!hideNavbarFooter && <Footer onNavigate={handleNavigate} />}
        </div>
    );
}

export default App;