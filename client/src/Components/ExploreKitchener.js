import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ExploreKitchener() {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedDescription, setSelectedDescription] = useState('');

    const gridItems = [
        { imgSrc: 'https://i.ytimg.com/vi/9PhwAWbEcA0/maxresdefault.jpg', title: 'Victoria Park', description: 'A beautiful park in downtown Kitchener featuring walking trails, a lake, and various events throughout the year.' },
        { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/KitchenerCityHall.JPG/1200px-KitchenerCityHall.JPG', title: 'Kitchener City Hall', description: 'The iconic city hall with stunning architecture, home to city council meetings and community events.' },
        { imgSrc: 'https://themuseum.ca/wp-content/uploads/2023/08/DSC00315-1-scaled.jpg', title: 'The Museum', description: 'A hands-on science and technology museum, offering interactive exhibits and educational programs for all ages.' },
        { imgSrc: 'https://kwag.ca/sites/default/files/civicrm/persist/contribute/images/Expressions_42_SLee_LR-4963.jpg', title: 'Kitchener-Waterloo Art Gallery', description: 'An art gallery showcasing contemporary art and hosting various exhibitions and community events.' },
        { imgSrc: 'https://www.rogerhodgson.com/documents/centreinthesquare1.jpg', title: 'Centre in the Square', description: 'A major performing arts venue hosting concerts, theatre productions, and special events.' },
        { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/ChicopeeSkiClub-Kitchener-2004.jpg', title: 'Chicopee Ski & Summer Resort', description: 'A popular ski resort in the winter and offers outdoor activities like mountain biking and hiking in the summer.' },
        { imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/KitchenerMarket.JPG', title: 'Kitchener Market', description: 'A vibrant market featuring local vendors, fresh produce, and artisanal goods, open year-round.' },
        { imgSrc: 'https://venuecoalition.com/wp-content/uploads/2018/01/Kitchener-AUD-Seats-Panorama2inset.webp', title: 'The Aud (Kitchener Memorial Auditorium Complex)', description: 'A multi-purpose arena hosting sports events, concerts, and community gatherings.' },
    ];

    const handleOpen = (imgSrc, description) => {
        setSelectedImage(imgSrc);
        setSelectedDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
        setSelectedDescription('');
    };

    return (
        <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', padding: 0, overflowX: 'hidden' }}>
            <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', height: 'calc(100vh - 12vh)' }}>
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                >
                    <source src="/assets/videos/Explorekitchener.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
            <Box sx={{ position: 'relative', zIndex: 1, padding: '20px 0' }}>
                <Typography variant="h1" align="center" sx={{ fontSize: '2.5em', color: '#003366' }}>
                    Explore Kitchener: Famous Places
                </Typography>
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                sx={{ marginTop: 2, zIndex: 1, paddingBottom: '20px' }}
            >
                {gridItems.map((item, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            width: { xs: '100%', sm: '48%', md: '30%', lg: '23%' }, 
                            margin: '1%',  
                            boxSizing: 'border-box',
                            overflow: 'hidden', 
                        }}
                    >
                        <Paper 
                            elevation={3} 
                            sx={{ textAlign: 'center', padding: 2, height: '240px', cursor: 'pointer' }}
                            onClick={() => handleOpen(item.imgSrc, item.description)}
                        >
                            <img src={item.imgSrc} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <Typography variant="h6" sx={{ color: '#003366', margin: '10px 0' }}>
                                {item.title}
                            </Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
            <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgb(1, 92, 166)', color: 'white', marginTop: '20px' }}>
                <Typography variant="body2">&copy; 2024 Explore Kitchener. All rights reserved.</Typography>
            </footer>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        {selectedDescription}
                    </Typography>
                </Box>
            </Modal>
        </Container>
    );
}
