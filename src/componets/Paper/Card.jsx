import React from 'react';
import { Grid, Paper, Typography, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Card({ image, heading, description, handleVisitClick,navigationPath }) {
    const handleClick = () => {
        handleVisitClick(navigationPath);
      };
  return (
    <Grid item xs={12} md={6} sx={{ mb: 10, mt: 5, textAlign: 'center' }}>
      <Paper sx={{ padding: 2, height: "100%", width: "80%", margin: "auto", borderRadius: "20px" ,boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)'}}>
        <Grid container spacing={2}>
          {/* Left column for image */}
          <Grid item xs={12} md={6} >
            <img
              src={image}
              alt={`${heading} Image`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' ,boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)'}}
            />
          </Grid>
          {/* Right column for heading, description, and buttons */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" mt={2}>
              {heading}
            </Typography>
            <Typography>{description}</Typography>
            <Button variant="outlined" color="primary" sx={{ marginTop: "15px" }} endIcon={<OpenInNewIcon />} onClick={handleClick}>
              Visit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
