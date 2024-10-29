import React from 'react';
import { Typography, Box } from '@mui/material';
import logo from '../../public/assets/images/logo-transparent-png.png'; 

export default function ExploreKWC() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '88vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
          
            <Box
                component="video"
                autoPlay
                loop
                muted
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    width: '100vw',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.6,
                    zIndex: 1,
                }}
            >
                <source src="/assets/videos/kitchener.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Box>

         
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                }}
            >
                <img
                    src={logo}
                    alt="Explore KWC Logo"
                    style={{
                        maxWidth: '250px', 
                        marginBottom: '0px', 
                    }}
                />
                
            </Box>
        </Box>
    );
}
