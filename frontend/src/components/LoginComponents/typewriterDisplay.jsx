import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

function TypewriterDisplay({text}) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [forward, setForward] = useState(true);

    useEffect(() => {
        if (index >= text.length) return;

        const timeout = setTimeout(() => {
            const currentText = text[index];

            if (forward) {
            setDisplayedText(currentText.substring(0, subIndex + 1));
            setSubIndex((prev) => prev + 1);

            if (subIndex + 1 === currentText.length) {
                setForward(false);
                setTimeout(() => {}, 1000);
            }
            } else {
            setDisplayedText(currentText.substring(0, subIndex - 1));
            setSubIndex((prev) => prev - 1);

            if (subIndex === 0) {
                setForward(true);
                setIndex((prev) => (prev + 1) % text.length);
            }
            }
        }, forward ? 150 : 80);

        return () => clearTimeout(timeout);
    }, [index, subIndex, forward]);
    
    return (
        <Typography
            variant="h5"
            sx={{
                height: '2.5em',
                color: '#0c7ef0',
                fontWeight: 700,
                fontSize: '1.6rem',
                letterSpacing: '0.7px',
                fontFamily: `'Segoe UI', sans-serif`,
            }}
            >
            {displayedText}
            <span
                style={{
                borderRight: '2px solid #0c7ef0',
                marginLeft: '3px',
                }}
            />
        </Typography>
    )
}

export default TypewriterDisplay;