import React, { useState } from 'react';
import { Paper, Typography, Button, Grid ,Box} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import image1 from "../../assets/02_02.jpg"
import image2 from "../../assets/02_03.jpg"
import image3 from "../../assets/02_10.jpg"
import arrow from "../../assets/arrow_forward.png"
import rigthImage from '../../assets/Group 3.png'
import RemoveBackground from './RemoveBackground';
import LoadingButton from '@mui/lab/LoadingButton';
import Loader from '../../componets/Loader';
import axios from "axios";

const sourceUrl2="https://d21ksh0k4smeql.cloudfront.net/crop_1695201165222-7514-0-1695201165485-8149.png"
const souceUrl3="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC"
const imageUrl2="https://res.cloudinary.com/deb14t8r9/image/upload/v1704702965/khglsmr9bklmdymcpa0j.jpg"
const imageUrl1="https://d21ksh0k4smeql.cloudfront.net/crop_1695201103793-0234-0-1695201106985-2306.png"
const imageUrl3="https://res.cloudinary.com/deb14t8r9/image/upload/v1704702938/a7q5he40mdshwtryrxzq.jpg"
const sourceUrl1="https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg"
const SwapImagePage = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [targetedPhoto, setTargetedPhoto] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [downloadedImageUrl, setDownloadedImageUrl] = useState(null);
  const [loader,setLoder]=useState(false)
  const [addLoader,setAddLoader]=useState(false)
 
  console.log("targeted Photo",targetedPhoto);
  console.log("upload",uploadedPhoto);
  console.log("resoult Photo",apiResponse);

  const cloudName = "djb84a1za"; 
  const uploadPreset = "uploadPhoto"; 


  // const handleUploadLocalPhoto = () => {
  //   // const file = event.target.files[0];
  //   if(uploadedPhoto){
  //     const formData = new FormData();
  //     formData.append("file", uploadedPhoto);
  //     formData.append("upload_preset", uploadPreset);
  //     formData.append("cloud_name",cloudName)
  //     fetch(`https://api.cloudinary.com/v1_1/${cloudName}/uploadedPhoto/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     }).then((res)=>res.json())
  //     .then((data)=>{console.log("Upload url",data)
  //     }).catch((err)=>{
  //       console.log(err);
  //     })
     
  //   }
  //   // if (file) {
  //   //   const fileUrl = URL.createObjectURL(file);
  //   //   setUploadedPhoto(fileUrl);
  //   // }
  // };

  const handleUploadLocalPhoto = (event) => {
    setAddLoader(true)
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      console.log("Enter");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);
      
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
        .then((response) => {
          console.log("Upload url", response.data);
          setUploadedPhoto(response?.data?.secure_url)
        })
        .catch((error) => {
          console.error("Upload error:", error);
        }).finally(() => {
          setAddLoader(false);
        });
    }
  };
  
 console.log("after",uploadedPhoto);
  const handleUplodTagetedPhoto = (event) => {
    setAddLoader(true)
    const file = event.target.files[0];
    if (file) {
      console.log("Enter");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);
      
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
        .then((response) => {
          console.log("Upload url", response.data);
          setTargetedPhoto(response?.data?.secure_url)
        })
        .catch((error) => {
          console.error("Upload error:", error);
        }).finally(() => {
          setAddLoader(false);
        });
    }
  };
  console.log("after",targetedPhoto);
 const handleUploadClear=()=>{
   setUploadedPhoto(null)
 }
 const handleTargetClear=()=>{
  setTargetedPhoto(null)
}

  const handleDownloadClick = () => {
    if (downloadedImageUrl) {
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadedImageUrl;
      downloadLink.download = 'swap_face_image.jpg'; // specify the desired filename
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  

  const handleApiRequest = async () => {
    setLoder(true)
    const options = {
      method: "POST",
      url: "https://faceswap-image-transformation-api.p.rapidapi.com/faceswap",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "91c37c4948msh7b3dfe8749542b3p172ac9jsn368020351e15",
        "X-RapidAPI-Host": "faceswap-image-transformation-api.p.rapidapi.com",
      },
      data: {
        
        TargetImageUrl: targetedPhoto,
        SourceImageUrl: uploadedPhoto,
      },
      
    };
 
    try {
      const response = await axios.request(options);
      // const blob = new Blob([response?.data?.ResultImageUrl], { type: "image/png" });
      // const imageUrl = URL.createObjectURL(blob);
      setApiResponse(response?.data?.ResultImageUrl);
      setDownloadedImageUrl(response?.data?.ResultImageUrl);
    } catch (error) {
      console.error("API Error:", error);
    }finally{
      setLoder(false)
    }
  };


  return (
    <Box sx={{ backgroundColor: "#0D0B25",height:"100vh" }}>

      {/* Image Swap Section */}
      {/* Heading */}
      <Grid>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography sx={{ fontWeight: "400", color: "white", fontFamily: "Open Sans", fontSize: "28px" }}>Embark on a face-swapping journey like never before! </Typography>
        </Box>
      </Grid>

      {/* LEFT CONTAINER */}
      <Grid sx={{ width: "100%", display: "flex" ,marginTop:"2.5rem"}}>
        <Grid sx={{ width: "560px", height: "414px", display: "flex", backgroundColor: "rgba(124, 97, 254, 0.1)", marginLeft: "9.375rem" ,borderRadius:"8px"}} className='Left'>

          <Grid sx={{ display: "flex", flexDirection: "row" }} className='MainContainer'>
            {/* Grid one */}
            <Grid sx={{ marginTop: "1.875rem", marginLeft: "1.75rem" }} className='leftMain'>
              <Typography sx={{ color: "white", textAlign: "center", mb: 2, fontWeight: "700", fontFamily: "Open Sans" }}>Source Face</Typography>
              <Grid sx={{ width: "220px", height: "140px", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
                
                {
                  uploadedPhoto ?(<Paper sx={{
                    width: "160px", height: "160px", borderRadius: "8px",marginLeft: "2.375rem" 
                  }}>
              
                  <img  src={uploadedPhoto} style={{width: "100%", height: "160px", borderRadius: "8px",objectFit: "cover"}}/>
                  </Paper> ):
                  (<Paper sx={{
                  width: "220px", height: "140px", borderRadius: "8px",
                  border: '2px dashed #F53689',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: "#0D0B25"
                }}>
                 
                 <Box sx={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Typography variant="h4" sx={{ color: '#F53689',cursor:"pointer" }}onClick={() => document.getElementById('uploadInput').click()}>+</Typography>
                    <input type="file" accept="image/*"  id="uploadInput" style={{ display: 'none' }} onChange={handleUploadLocalPhoto} />
                  </Box>
                  <Typography sx={{ color: '#F53689', position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: "12px", fontWeight: "400px", fontFamily: "Open Sans" }}>Upload or drop your image here</Typography>
                </Paper>)
                }
                {
                  uploadedPhoto ?
                  (<Grid sx={{ position: "absolute", top: "27.8rem", textAlign: "center",left:"17rem",cursor: "pointer", }} onClick={handleUploadClear} >
                  <Typography color="error">Clear</Typography></Grid>)
                  :
                  (<Grid sx={{ position: "absolute", top: "26.5rem", textAlign: "center",left:"12.7rem"}}>
                  <Typography sx={{ color: "white" ,marginBottom:"5px"}}>Or use these</Typography>
                  <Grid sx={{ display: "flex", width: "170px", justifyContent: "center", margin: "auto" }}>
                    <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px" ,borderRadius:"7px"}} onClick={()=>setUploadedPhoto(sourceUrl1)}>
                    <img src={sourceUrl1} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                    </Paper>
                    <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px",borderRadius:"7px" }} onClick={()=>setUploadedPhoto(sourceUrl2)}>
                    <img src={sourceUrl2} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                    </Paper>
                    <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px" ,borderRadius:"7px"}} onClick={()=>setUploadedPhoto(souceUrl3)}>
                    <img src={souceUrl3} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                    </Paper>
                  </Grid>
                </Grid>)
                }
                
                
              </Grid>
            </Grid>

            <Grid sx={{ margin: "auto" ,marginTop:"120px"}} className='middleImage'>
              <img src={arrow} style={{ width: "40px", height: "40px" ,marginLeft:"10px",marginRight:"10px"}} />
            </Grid>

            {/* Grid 2 */}
            <Grid sx={{ marginTop: "30px", textAlign: "center" }} className='rightMain'>
              <Typography sx={{ color: "white", mb: 2, fontWeight: "700", fontFamily: "Open Sans" }}>Target Photo</Typography>
              <Grid sx={{ width: "220px", height: "140px", margin: "auto", borderRadius: "8px", display: "flex", flexDirection: "column" }}>
              {
                targetedPhoto ? ( <Paper sx={{
                  width: "160px", height: "160px", borderRadius: "8px",marginLeft:"12%"
                }}>
            
                <img  src={targetedPhoto} style={{width: "100%", height: "160px", borderRadius: "8px",objectFit: "cover"}}/>
                </Paper>):
                (<Paper sx={{
                  width: "220px", height: "140px", borderRadius: "8px",
                  border: '2px dashed #F53689',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: "#0D0B25"
                }}>
                  <Box sx={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Typography variant="h4" sx={{ color: '#F53689',cursor:"pointer" }}onClick={() => document.getElementById('uploadTarget').click()}>+</Typography>
                    <input type="file" accept="image/*"  id="uploadTarget" style={{ display: 'none' }} onChange={handleUplodTagetedPhoto} />
                  </Box>
                  <Typography sx={{ color: '#F53689', position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', fontSize: "12px", fontWeight: "400px", fontFamily: "Open Sans" }}>Upload or drop your image here</Typography>
                </Paper>)}
             {
              targetedPhoto ?(<Grid sx={{ position: "absolute", top: "27.8rem", textAlign: "center",left:"34rem" ,cursor: "pointer"}}onClick={handleTargetClear}>
                <Typography color="error">Clear</Typography>
              </Grid>):(
                <Grid sx={{ position: "absolute", top: "26.5rem", textAlign: "center",left:"30.5rem" }}>
              <Typography sx={{ color: "white" ,marginBottom:"5px"}}>Or use these</Typography>
              <Grid sx={{ display: "flex", width: "170px", justifyContent: "center", margin: "auto" }}>
                <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px" ,borderRadius:"7px"}}onClick={()=>setTargetedPhoto(imageUrl1)}>
                  <img src={imageUrl1} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                </Paper>
                <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px",borderRadius:"7px" }}onClick={()=>setTargetedPhoto(imageUrl2)}>
                <img src={imageUrl2} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                </Paper>
                <Paper sx={{ width: "50px", height: "50px", backgroundColor: "red", marginRight: "10px" ,borderRadius:"7px"}} onClick={()=>setTargetedPhoto(imageUrl3)}>
                <img src={imageUrl3} style={{width:"50px",height:"50px",borderRadius:"7px"}}/>
                </Paper>
              </Grid>
            </Grid>)
             }
                
              </Grid>
            </Grid>
          </Grid>

          {/* Button */}
          <Grid sx={{ top: "34.5rem", position: 'absolute', left: "20rem" }} className='ButtonContainer'>
            <Button variant="contained" color="primary" onClick={handleApiRequest} sx={{ borderRadius: "8px", backgroundColor: "#F53689", width: "220px" }} >
              <Typography>Generate</Typography>
            </Button>
          </Grid>

        </Grid>
        <Grid>
      {/* Loader */}
      {loader && 
      
      <Loader />
      
      }
      {
        addLoader &&
        <Loader/>
      }

      {/* Image Display Section */}
      {!loader && (
        <Grid style={{marginLeft:"12rem"}} >
          {/* If API response is available, display the generated image */}
          {apiResponse ? (
            <Grid>
              <Grid sx={{ width: "280px", height: "280px", borderRadius: "16px", marginTop: "10%"}}>
                <img src={apiResponse} alt="API Response" style={{ width: "280px", height: "280px", borderRadius: "16px" ,marginLeft:"3.5rem"}} />
              </Grid>
              <Box sx={{ width: "420px", height: "40px", textAlign: "center", mt: 4 }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: "8px", backgroundColor: "#F53689", width: "200px", marginRight: '10px' }} onClick={handleDownloadClick}>
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
                  Dive into the magic of instant transformations with our cutting-edge face swap feature.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
      </Grid>

    </Box>
  );
};

export default SwapImagePage;
