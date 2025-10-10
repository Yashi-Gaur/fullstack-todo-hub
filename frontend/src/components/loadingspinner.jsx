import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { LoadingContext } from '../context/loadingcontext.jsx'

const LoadingSpinner = () => {
const { loading } = useContext(LoadingContext);

return (
    <AnimatePresence>
{loading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(240, 248, 255, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
        }}
        >
        <Box
            sx={{
                backgroundColor: '#ffffff',
                padding: 3,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CircularProgress size={60} sx={{ color: '#0c7ef0' }} />
        </Box>
        </motion.div>
    )}
    </AnimatePresence>
);
};

export default LoadingSpinner;
