import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTopOnRoute />
      <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-[#111827] dark:text-[#F8FAFC] transition-colors duration-200">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
