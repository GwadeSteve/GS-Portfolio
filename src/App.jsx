import ScrollToTop from './components/ScrollToTop';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
        <>
          <ScrollToTop/>
        </>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
                {/*<Route exact path='/' element={<Home/>}/>
                <Route path='/about' element={<Feed/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                {/* Catch-all route */}
                {/*<Route path="*" element={<PageNotFound />} />*/}
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
