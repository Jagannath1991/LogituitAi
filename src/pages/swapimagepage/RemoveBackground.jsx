import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import image from '../../assets/Remove-Background.png';
import image1 from '../../assets/02_02.jpg';
import image2 from '../../assets/image 5.png'
import axios from 'axios';
import Loader from '../../componets/Loader';
import { center } from '@cloudinary/url-gen/qualifiers/textAlignment';

export default function RemoveBackground() {
  const [inputImage, setInputImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [downloadedImageUrl, setDownloadedImageUrl] = useState(null);
 const [loader,setLoader]=useState(false)
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
    setLoader(true)
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
            'X-Api-Key': 'EXqBSS5RVs87Wege3b4X16GH',
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
    }finally{
        setLoader(false)
    }
  };

  return (
    <Box sx={{ backgroundColor: '#0D0B25', height: '100vh' ,width:"100%"}}>
      <Grid container justifyContent="center" alignItems="center" direction="column">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography sx={{ fontWeight: '700', color: 'white', fontSize:"44px",fontFamily: "Open Sans"}}>
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
          
          }}
        >
         <Typography style={{fontFamily: "Open Sans",fontSize:"28px"}}>
         Liberate your visuals with our background removal magic!
         </Typography>
        </Box>

        <Grid container spacing={3} mt={8} ml={8}>
          <Grid item xs={12} md={6} width="370px" >
            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
              <img
                src={image2}
                width="480px"
                height="360px"
                style={{borderRadius:"16px",objectFit: "cover"}}
              />
            </Box>
            <Box width="500px" ml={8} mt={1}>
            <Typography color="white" variant="h6" mt={2} ml={8} textAlign={center}>
            Effortlessly remove backgrounds, and let your subject take center stage.
            </Typography>
            </Box>
            
          </Grid>
          {/* <Grid item sx={{display:"flex",diplayDirection:"coloumn",width:"500px",height:"414px"}} xs={12} md={6}> */}
          
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          {outputImage ? (
            <Paper
              style={{
                height: '350px',
                width: '280px',
                borderRadius: '30px',
                borderTopColor: 'blue',
              }}
            >
              <img src={outputImage} alt="Result" style={{ width: '100%', height: '100%', borderRadius: '16px',objectFit: "cover" }} />
              <Button
                variant="contained"
                component="label"
                sx={{
                  left: '43%',
                  top: inputImage ? '5%' : '5%',
                  transform: 'translateX(-100%)',
                  borderRadius: '50px',
                }}
              >
                <Typography sx={{ padding: 1, fontSize: '13px' }}>Upload Photo</Typography>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUploadLocalPhoto} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDownloadClick}
                disabled={!downloadedImageUrl}
                sx={{ borderRadius: '50px', ml: 18, mt: -4, backgroundColor: 'rgba(245, 54, 137, 1)' }}
              >
                <Typography sx={{ padding: '6px', paddingLeft: '40px', paddingRight: '40px', fontSize: '13px' }}>
                  Download
                </Typography>
              </Button>
            </Paper>
          ) : loader ? (
            
              <Loader />
           
          ) : (
            <Paper
              style={{
                height: '350px',
                width: '280px',
                borderRadius: '30px',
              }}
            >
              {inputImage ? (
                <img
                  src={URL.createObjectURL(inputImage)}
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', borderRadius: '16px' ,objectFit: "cover"}}
                />
              ) : (
                <img src={image1} alt="Uploaded" style={{ width: '100%', height: '100%', borderRadius: '16px' ,objectFit: "cover"}} />
              )}

              <Button
                variant="contained"
                component="label"
                sx={{
                  left: '42%',
                  top: inputImage ? '5%' : '5%',
                  transform: 'translateX(-100%)',
                  borderRadius: '50px',
                }}
              >
                <Typography sx={{ padding: 1, fontSize: '13px' }}>Upload Photo</Typography>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUploadLocalPhoto} />
              </Button>
              {!outputImage && (
                <Grid sx={{ textAlign: 'center', width: '300px' }} ml={10} mt={-4}>
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
              {/* New button for uploading */}
              
            </Paper>
          )}
        </Grid>
        </Grid>
        

        
   
      </Grid>
      {/* </Grid> */}
    </Box>
  );
}
