import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingContext } from 'src/context/loadingcontext.jsx';

// Import your pages
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';

const AnimatedRoutes = () => {
const location = useLocation();
const { setLoading } = useContext(LoadingContext);

useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // simulate network delay
    return () => clearTimeout(timer);
}, [location.pathname]);

return (
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here */}
        </Routes>
    </AnimatePresence>
);
};

export default AnimatedRoutes;
