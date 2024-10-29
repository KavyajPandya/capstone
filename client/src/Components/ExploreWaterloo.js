import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const sliderItems = [
    {
        name: "Kitchener",
        img: "/assets/images/WatrelooPublicSquare.png",
        description: "Explore the city of Kitchener",
    },
    {
        name: "Waterloo",
        img: "/assets/images/waterloo-park.png",
        description: "Discover the beauty of Waterloo",

    },
    {
        name: "Cambridge",
        img: "/assets/images/waterlooDT.png",
        description: "Experience the charm of Cambridge",
    },
];

export default function ExploreWaterloo(){

    const [sliderBackground, setSliderBackground] = useState(sliderItems[0].img); 

        const handleSlideChange = (item) => {
            setSliderBackground(item.img);
        };
    return(        
        <>
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
                    <Typography
                        variant="h2"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                            fontSize: { xs: '2rem', md: '4rem' },
                        }}
                    >
                        Explore Waterloo
                    </Typography>
                </Box>
            </Box>

           
            <Box
                sx={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    backgroundImage: `url(${sliderBackground})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
               
                <Carousel
                    autoPlay={false}
                    navButtonsAlwaysVisible
                    indicators={false}
                    onChange={(index) => handleSlideChange(sliderItems[index])}
                    sx={{ zIndex: 2, width: '25vw', padding:'3%',margin:'3%', boxSizing:'border-box' }}
                >
                    {sliderItems.map((item, i) => (
                        <Box key={i} sx={{ textAlign: 'center' }}>
                            <img
                                src={item.img}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '63vh',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    boxShadow:'12px 12px 18px white',
                                    boxSizing:'border-box'
                                }}
                            />
                            <Typography variant="h5" sx={{ color: 'white', mt: 2 }}>
                                {item.name}
                            </Typography>
                            <Typography sx={{ color: 'white', mb: 2 }}>
                                {item.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSlideChange(item)}
                            >
                                See More
                            </Button>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </>
    );
}