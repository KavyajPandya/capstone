import React, { useState } from "react";
import { Container, Typography, Box, Paper, Modal } from "@mui/material";


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


const fontFamily = "Poppins, sans-serif";

export default function ExploreCambridge() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

 
  const places = [
    {
      imgSrc:
        "https://d3d0lqu00lnqvz.cloudfront.net/1200px-Old_Post_Office_Galt_Cambridge_Ontario.jpg",
      title: "Historic Galt",
      description:
        "A charming downtown area with stunning architecture and scenic river views.",
      link: "https://explorewaterloo.ca/places-to-go/galt/",
    },
    {
      imgSrc: "https://i.ytimg.com/vi/F1vOw58T5E0/maxresdefault.jpg",
      title: "Riverside Park",
      description:
        "The largest park in Cambridge, featuring gardens, trails, and a mini-golf course.",
      link: "https://www.ontarioparks.com/park/riverside",
    },
    {
      imgSrc:
        "https://www.doorsopenontario.on.ca/events/waterloo-region/old-post-office-idea-exchange/Old-Post-Office-Idea-Exchange.JPG",
      title: "Idea Exchange",
      description:
        "A cultural hub offering art exhibits, workshops, and community events.",
      link: "https://www.ideaexchange.org/",
    },
    {
      imgSrc:
        "https://i0.wp.com/wanderrambleroam.com/wp-content/uploads/2020/08/IMG_2159.jpg?fit=2048%2C1536&ssl=1",
      title: "Langdon Hall",
      description:
        "A historic country house hotel and spa, known for its fine dining and luxurious gardens.",
      link: "https://www.langdonhall.ca/",
    },
    {
      imgSrc: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      title: "McDougall Cottage",
      description:
        "A heritage site featuring Scottish-inspired decor and seasonal exhibits.",
      link: "https://www.mcdougallcottage.ca/",
    },
    {
      imgSrc:
        "https://mls-photos.ojo.ca/on_kwar_bridge_vow/a2e/1b42dd35970be473ba38e00820d57c67_e2231f390e4cb93dde31f60f1af98e91.jpeg",
      title: "Preston Towne Centre",
      description:
        "A bustling area with unique shops, cafes, and community events.",
      link: "https://www.explorewaterloo.ca/places-to-go/preston/",
    },
    {
      imgSrc:
        "https://cdn.findspace.com/asset/eyJrZXkiOiAibWVkaWEvMzQyMmJmYmIzOTYzNDdiMjg1NjVhYzJhOTVmYmQxMjMuanBnIn0=",
      title: "Cambridge Centre Mall",
      description:
        "A popular shopping destination with retail stores, dining, and entertainment.",
      link: "https://www.cambridgecentre.com/",
    },
    {
      imgSrc:
        "https://metroscapes.ca/wp-content/uploads/2022/12/2019-10-05_2.jpg",
      title: "Grand River",
      description:
        "A beautiful river winding through Cambridge, offering scenic trails, kayaking, and picnic spots.",
      link: "https://www.grandriver.ca/en/our-watershed/Cambridge.aspx",
    },
  ];


  const handleOpen = (imgSrc, description) => {
    setSelectedImage(imgSrc);
    setSelectedDescription(description);
    setOpen(true);
  };

 
  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
    setSelectedDescription("");
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ minHeight: "100vh", padding: 0, overflowX: "hidden", fontFamily }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "calc(100vh - 12vh)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src="/assets/videos/cambridge.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Typography variant="h2" sx={{ color: "white", fontFamily, fontWeight: "bold" }}>
            CAMBRIDGE
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#003366",
            fontFamily,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Explore Cambridge: Famous Places
        </Typography>
      </Box>

 
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ marginTop: 2, zIndex: 1, paddingBottom: "20px" }}
      >
        {places.map((place, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: "100%", sm: "48%", md: "30%", lg: "23%" },
              margin: "1%",
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                textAlign: "center",
                padding: 2,
                height: "240px",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(place.imgSrc, place.description)}
            >
              <img
                src={place.imgSrc}
                alt={place.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <Typography
                variant="h6"
                sx={{ color: "#003366", margin: "10px 0", fontFamily }}
              >
                {place.title}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

    
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgb(1, 92, 166)",
          color: "white",
          marginTop: "20px",
        }}
      >
        <Typography variant="body2" sx={{ fontFamily }}>
          &copy; 2024 Explore Cambridge. All rights reserved.
        </Typography>
      </footer>

  
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "auto" }}
          />
          <Typography variant="body1" sx={{ marginTop: 2, fontFamily }}>
            {selectedDescription}
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}