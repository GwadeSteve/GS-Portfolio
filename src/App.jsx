import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ModeProvider } from './context/ModeContext';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import BackgroundManager from './components/Background/BackgroundManager';
import './App.css';

import Hero from './components/Hero/Hero';
import About from './components/About/About';

// Placeholder Components for Sections (will move to separate files later)
import Projects from './components/Projects/Projects';
import Timeline from './components/Timeline/Timeline';
import Expertise from './components/Expertise/Expertise';
import Contact from './components/Contact/Contact';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer';
import SEO from './components/SEO/SEO';

const Portfolio = () => (
    <>
        <SEO
            title="ML & FullStack AI Engineer"
            description="Portfolio of Gwade Steve, a professional ML Engineer and Fullstack AI Engineer specializing in Computer Vision and Deep Learning."
            keywords="Gwade Steve, ML Engineer, AI Engineer, FullStack AI, Computer Vision, Deep Learning, Cameroon"
        />
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Expertise />
        <Contact />
    </>
);

function App() {
    return (
        <ModeProvider>
            <div className="App">
                <ScrollToTop /> {/* Add ScrollToTop here */}
                <BackgroundManager />
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Portfolio />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<Blog />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </ModeProvider>
    );
}

export default App;