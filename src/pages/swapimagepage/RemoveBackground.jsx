import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import image from '../../assets/Remove-Background.png';
import image1 from '../../assets/02_02.jpg';
import axios from 'axios';

export default function RemoveBackground() {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [downloadedImageUrl, setDownloadedImageUrl] = useState(null);

  const handleUploadLocalPhoto = (event) => {
    const file = event.target.files[0];
    setInputImage(file);
    setOutputImage(null)
  };

  const handleDownloadClick = () => {
    if (downloadedImageUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadedImageUrl;
      downloadLink.download = 'removed_background_image.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleRemoveBackground = async () => {
    if (!inputImage) {
      console.error('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', inputImage);

    try {
      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            'X-Api-Key': 'adZ3kbcdvCjNZ3jHVbTjwARp',
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'arraybuffer',
          encoding: null,
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(blob);
        setOutputImage(imageUrl);
        setDownloadedImageUrl(imageUrl);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0D0B25', height: '100vh' ,width:"100%"}}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white' }}>
            Remove Background
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            color: 'white',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
          }}
        >
          <Typography mr={1} variant="h6">
            The
          </Typography>
          <Typography color="#4744f6" mr={1} variant="h6">
            Most
          </Typography>
          <Typography
            mr={1}
            sx={{
              background: 'linear-gradient(to right, red, green, yellow)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            variant="h6"
          >
            Accurate
          </Typography>
          <Typography mr={1} variant="h6">
            &amp;
          </Typography>
          <Typography mr={1} variant="h6">
            Free
          </Typography>
          <Typography
            sx={{
              background: 'linear-gradient(to right, pink, green, yellow)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
            variant="h6"
          >
            AI Backgroud Remover
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={image}
                width="400px"
                height="400px"
                style={{ borderRadius: '50%', boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)', borderColor: 'blue' }}
              />
            </Box>
            <Typography color="gray" variant="h6" mt={2} ml={8}>
              100% Automatically and Free
            </Typography>
          </Grid>
          {/* <Grid item sx={{display:"flex",diplayDirection:"coloumn",width:"500px",height:"414px"}} xs={12} md={6}> */}
          <Grid item xs={12} md={6} sx={{display:"flex"}}>
            <Paper
              style={{
                height: '350px',
                width: '280px',
                borderRadius: '30px',
                boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)',
              }}
            >
              {inputImage ? (
                <img
                  src={URL.createObjectURL(inputImage)}
                  alt="Uploaded"
                  style={{ width: '280px', height: '350px', borderRadius: '30px' }}
                />
              ) : (
                <img src={image1} alt="Uploaded" style={{ width: '280px', height: '350px', borderRadius: '30px' }} />
              )}

              <Button
                variant="contained"
                component="label"
                sx={{
                  left: '56%',
                  top: inputImage ? '5%' : '5%',
                  transform: 'translateX(-100%)',
                  borderRadius: '50px',
                }}
              >
                <Typography sx={{ padding: 1, fontSize: '13px' }}>Upload Photo</Typography>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUploadLocalPhoto} />
              </Button>
              {!outputImage && (
                <Grid sx={{ textAlign: 'center', width: '300px' }} ml={17} mt={-4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRemoveBackground}
                    sx={{ borderRadius: '50px', backgroundColor: 'rgba(245, 54, 137, 1)' }}
                  >
                    <Typography sx={{ padding: 1, fontSize: '13px' }}>Remove Background</Typography>
                  </Button>
                </Grid>
              )}
            </Paper>
            {outputImage && (
          <Grid item xs={12} md={6} justifyContent="center"  ml={2}>
            <Paper
              style={{
                height: '350px',
                width: '280px',
                borderRadius: '30px',
                borderTopColor: 'blue',
                boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)',
              }}
            >
              <img src={outputImage} alt="Result" style={{ width: '280px', height: '350px', borderRadius: '30px' }} />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDownloadClick}
                disabled={!downloadedImageUrl}
                sx={{ borderRadius: '50px', ml: 4, mt: 2, backgroundColor: 'rgba(245, 54, 137, 1)' }}
              >
                <Typography sx={{ padding: '6px', paddingLeft: '40px', paddingRight: '40px', fontSize: '13px' }}>
                  Download
                </Typography>
              </Button>
            </Paper>
          </Grid>
        )}
          </Grid>
        

        
      </Grid>
      </Grid>
      {/* </Grid> */}
    </Box>
  );
}
