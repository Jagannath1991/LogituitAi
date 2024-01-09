import React from 'react';
import { Typography, Box, Paper, Button, Grid ,TextField,InputAdornment} from '@mui/material';
import Video from '../../assets/video.png';
import Audio from '../../assets/audio.png';
import Image from '../../assets/image.png';
import Art from '../../assets/art.png';
import { useNavigate } from 'react-router-dom';
import Card from '../../componets/Paper/Card';
const HomePage = () => {
  const navigate=useNavigate()
  

  const handleVisitClick = (navigationPath) => {
    navigate(navigationPath);
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#000a19", minHeight: "100vh", padding: 2 }}>
      <Grid  spacing={2} justifyContent="center" alignItems="center" textAlign="center" marginTop="15px">
          <Box spacing={2} sx={{display:"flex",justifyContent:"center" ,alignItems:"center" ,textAlign:"center"}}>
            <Typography variant="h2" fontWeight="bold" color="#ffd74f" mr={3}>AI </Typography><Typography  variant="h2" fontWeight="bold" color="#7c61fe" mr={3}> at</Typography> <Typography variant="h2" fontWeight="bold" color="#51c6c3" mr={3}> Your</Typography> <Typography variant="h2" fontWeight="bold" color="#f53689" > Service</Typography></Box>
          <Typography variant="h6" color="white">Realizing the Full Spectrum of Opportunities for You</Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" textAlign="center" sx={{margin:"10px",}}>
        <TextField
      //color="primary"
      //variant="outlined"
      sx={{
        mt: 2,
        width: "700px",
        borderRadius: "25px", // Adjust this value as needed
        '& input': {
          color: 'white',
          borderColor: 'white',
          backgroundColor:"white",
          borderRadius:"30px"
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{backgroundColor:"white"}}>
            <Button variant="contained" color="primary" sx={{ borderRadius: "25px" }}>
              <Typography sx={{padding:"7px"}}>Search</Typography>
            </Button>
          </InputAdornment>
        ),
      }}
    />
        </Grid>
        <Grid container spacing={2} sx={{display:"flex"}} mt={10}>
          <Card image={Art} heading="Remove Background" handleVisitClick={handleVisitClick} navigationPath="/remove" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia asperiores at ipsa quae quas modi eius totam aut eligendi."/>
          <Card image={Image} heading="Image Generator" handleVisitClick={handleVisitClick} navigationPath="/imageswap" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia asperiores at ipsa quae quas modi eius totam aut eligendi."/>
          <Card image={Audio} heading="Audio Generator" handleVisitClick={handleVisitClick} navigationPath="/imageswap" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia asperiores at ipsa quae quas modi eius totam aut eligendi."/>
          <Card image={Video} heading="Video Generator" handleVisitClick={handleVisitClick} navigationPath="/imageswap" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia asperiores at ipsa quae quas modi eius totam aut eligendi."/>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
