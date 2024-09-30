import React from 'react';
import { Typography, Box } from '@mui/material';

export default function ExploreKWC(){
    return(
        <Box
        sx={{
            position: 'relative',
            width: '100%',
            height: '83vh',
            overflow: 'hidden', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
        {/* hero-bg Video */}
        <Box
            component="video"
            autoPlay
            loop
            muted
            sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6, 
            zIndex: 1,
            }}
        >
            <source src="/assets/videos/kwc.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </Box>

        {/* Heading */}
        <Box
            sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            }}
        >
            <Typography
            variant="h2"
            sx={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
                fontSize: { xs: '2rem', md: '4rem' }, 
            }}
            >
            Explore Kitchener, Waterloo and Cambridge.
            </Typography>
        </Box>
    </Box>
    )
}