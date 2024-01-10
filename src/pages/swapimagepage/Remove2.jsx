
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import image from '../../assets/Remove-Background.png';
import image1 from '../../assets/02_02.jpg';
import axios from 'axios';
import Loader from '../../componets/Loader';
import rigthImage from '../../assets/image 5.png'
const sourceUrl2 = "https://d21ksh0k4smeql.cloudfront.net/crop_1695201165222-7514-0-1695201165485-8149.png";
const souceUrl3 = "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC";
const imageUrl2 = "https://res.cloudinary.com/deb14t8r9/image/upload/v1704702965/khglsmr9bklmdymcpa0j.jpg";
const imageUrl1 = "https://d21ksh0k4smeql.cloudfront.net/crop_1695201103793-0234-0-1695201106985-2306.png";
const imageUrl3 = "https://res.cloudinary.com/deb14t8r9/image/upload/v1704702938/a7q5he40mdshwtryrxzq.jpg";
const sourceUrl1 = "https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg";


export default function RemoveBackground1() {

    const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [apiResponse, setApiResponse] = useState(imageUrl1); // Added state for API response
  //const [rigthImage, setRightImage] = useState(''); //
  

  const handleUploadClear = () => {
    setUploadedPhoto(null);
  };

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
          <Typography sx={{ fontWeight: "400", color: "white", fontFamily: "Open Sans", fontSize: "28px" }}>
          Liberate your visuals with our background removal magic!
          </Typography>
        </Box>
        
        <Grid container spacing={3} mt={5}>
        <Grid sx={{backgroundColor: "#0D0B25",display:"flex"}}>
     
     <Grid sx={{ width: "560px", height: "414px", display: "flex", backgroundColor: "rgba(124, 97, 254, 0.1) ", marginLeft: "9.375rem", borderRadius: "8px" }} className='Left'>
       <Grid sx={{ display: "flex", flexDirection: "row" }} className='MainContainer'>
         {/* Grid one */}
         <Grid sx={{ marginTop:"30%" ,marginLeft:"70%" }} className='leftMain'>
           <Typography sx={{ color: "white", textAlign: "center", mb: 2, fontWeight: "700", fontFamily: "Open Sans" }}>Source Face</Typography>
           <Grid sx={{ width: "220px", height: "140px", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
 
             {uploadedPhoto ? (
               <Paper sx={{
                 width: "160px", height: "160px", borderRadius: "8px", marginLeft: "2.375rem"
               }}>
 
                 <img src={uploadedPhoto} style={{ width: "100%", height: "160px", borderRadius: "8px", objectFit: "cover" }} />
               </Paper>
             ) : (
               <Paper sx={{
                 width: "220px", height: "140px", borderRadius: "8px",
                 border: '2px dashed #F53689',
                 position: 'relative',
                 overflow: 'hidden',
                 backgroundColor: "#0D0B25"
               }}>
 
                 <Box sx={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                   <Typography variant="h4" sx={{ color: '#F53689', cursor: "pointer" }} onClick={() => document.getElementById('uploadInput').click()}>+</Typography>
                   <input type="file" accept="image/*" id="uploadInput" style={{ display: 'none' }} onChange={handleUploadLocalPhoto} />
                 </Box>
                 <Typography sx={{ color: '#F53689', position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: "12px", fontWeight: "400px", fontFamily: "Open Sans" }}>Upload or drop your image here</Typography>
               </Paper>
             )}
 
             {uploadedPhoto ? (
               <Grid sx={{ position: "absolute", top: "29.5rem", textAlign: "center", left: "23.7rem", cursor: "pointer", }} onClick={handleUploadClear} >
                 <Typography color="error">Clear</Typography></Grid>
             ) : (
               <Grid sx={{ position: "absolute", bottom: "16rem", textAlign: "center", left: "20rem" }}>
                 <Typography sx={{ color: "white", marginBottom: "5px" }}>Or use these</Typography>
                 <Grid sx={{ display: "flex", width: "170px", justifyContent: "center", margin: "auto" }}>
                   <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px", borderRadius: "7px" }} onClick={() => setUploadedPhoto(sourceUrl1)}>
                     <img src={sourceUrl1} style={{ width: "50px", height: "50px", borderRadius: "7px" }} />
                   </Paper>
                   <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px", borderRadius: "7px" }} onClick={() => setUploadedPhoto(sourceUrl2)}>
                     <img src={sourceUrl2} style={{ width: "50px", height: "50px", borderRadius: "7px" }} />
                   </Paper>
                   <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px", borderRadius: "7px" }} onClick={() => setUploadedPhoto(souceUrl3)}>
                     <img src={souceUrl3} style={{ width: "50px", height: "50px", borderRadius: "7px" }} />
                   </Paper>
                 </Grid>
               </Grid>
             )}
           </Grid>
         </Grid>
         
       </Grid>
       
          {/* <Grid item sx={{display:"flex",diplayDirection:"coloumn",width:"500px",height:"414px"}} xs={12} md={6}> */}
          
          <Grid ml={60}>
          {apiResponse ? (
            <Grid>
              <Grid sx={{ width: "280px", height: "280px", borderRadius: "16px", marginTop: "10%" }}>
                <img src={apiResponse} alt="API Response" style={{ width: "280px", height: "280px", borderRadius: "16px", marginLeft: "3.5rem" }} />
              </Grid>
              <Box sx={{ width: "420px", height: "40px", textAlign: "center", mt: 4 }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: "8px", backgroundColor: "#F53689", width: "200px", marginRight: '10px' }} >
                  <Typography sx={{ fontWeight: "700", fontFamily: "Open Sans", fontSize: "14px" }}>Download</Typography>
                </Button>
                <Button variant='contained' color='primary' sx={{ borderRadius: "8px", backgroundColor: "rgba(124, 97, 254, 1)", width: "200px" }}>
                  <Typography sx={{ fontWeight: "700", fontFamily: "Open Sans", fontSize: "14px" }}>Share</Typography>
                </Button>
              </Box>
            </Grid>
          ) : (
            // If API response is not available, display default right image
            <Grid sx={{ width: "364px", height: "260px", borderRadius: "16px", marginTop: "3%", marginLeft: "5%" }}>
              <img src={rigthImage} alt="Right Image" style={{ width: "364px", height: "260px" }} />
              <Box sx={{ width: "318px", height: "40px", textAlign: "center", mt: "10px" }}>
                <Typography sx={{ color: "rgba(250,250,250,1)", fontWeight: "700", fontFamily: "Open Sans", fontSize: "14px" }}>
                Effortlessly remove backgrounds, and let your subject take center stage.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
              
             
        </Grid>
        </Grid>
        

        
   
      </Grid>
      </Grid>
    
    </Box>
  );
}


