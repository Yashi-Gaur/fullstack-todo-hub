import { Box, Typography } from "@mui/material";

export default function Stat({ icon, label, value }) {
    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            p={1}
            sx={{
                marginTop: '10px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                padding: '16px 24px',
                minWidth: '200px',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                transform: 'scale(1.02)',
                },
            }}
        >
            {icon}
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {label}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
                {value}
            </Typography>
        </Box>
    );
}
