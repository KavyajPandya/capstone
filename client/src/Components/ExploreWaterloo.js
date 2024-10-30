import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';

const sliderItems = [
    { name: "Google office", img: "/assets/images/google.jpg", description: "" },
    { name: "Waterloo Park", img: "/assets/images/waterloo-park.png", description: "" },
    { name: "Downtown", img: "/assets/images/waterlooDT.png", description: "" },
    { name: "University of waterloo", img: "/assets/images/uwaterloo.jpg", description: "" },
    { name: "The Grand River", img: "/assets/images/grandriver.jpg", description: "" },
];

const fontFamily = "Poppins, sans-serif";

export default function ExploreWaterloo() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const [sliderBackground, setSliderBackground] = useState(sliderItems[0]?.img);

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % sliderItems.length;
        setCurrentIndex(newIndex);
        setSliderBackground(sliderItems[newIndex]?.img);
    };

    return (
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
                {/* Hero Background */}
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
                        zIndex: 1,
                    }}
                >
                    <source src="/assets/videos/kitchener.mp4" type="video/mp4" />
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
                        sx={{ color: "white", fontFamily, fontWeight: "bold" }}
                    >
                        WATERLOO
                    </Typography>
                </Box>
            </Box>

            {/* Slider Section */}
            <Box
                sx={{
                    position: 'relative',
                    width: '80vw',
                    height: '80vh',
                    margin: '10vh 10vw',
                    paddingBottom:'3%',
                    // width: '100vw',
                    // height: '100vh',
                    // margin: '0',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    backgroundImage: `url(${sliderBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxSizing:'border-box',
                }}
            >
                {/* Slider Container with sliding effect */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 5,
                        width: '54%', 
                        height: '36%',
                        zIndex: 2,
                        transform: `translateX(-${currentIndex * 33.33}%)`, 
                        transition: 'transform 0.7s ease', 
                    }}
                >
                    {sliderItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '30%', 
                                textAlign: 'center',
                                flexShrink: 0,
                                transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)', 
                                transition: 'transform 0.5s ease', 
                            }}
                        >
                            <Typography variant="h6" sx={{ color: 'white', mt: 2 }}>
                                {item.name}
                            </Typography>
                            <img
                                src={item.img}
                                alt={item.name}
                                style={{
                                    width: '100%',
                                    height: '63%',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    boxShadow: '12px 12px 18px rgba(0, 0, 0, 0.5)',
                                    boxSizing: 'border-box'
                                }}
                            />
                            {/* <Typography variant="h5" sx={{ color: 'white', mt: 2 }}>
                                {item.name}
                            </Typography> */}
                            {/* <Typography sx={{ color: 'white', mb: 2 }}>
                                {item.description}
                            </Typography> */}
                        </Box>
                    ))}
                </Box>

                {/* Navigation */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ position: 'absolute', right: '5%', bottom: '2%', zIndex: 2 }}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
``