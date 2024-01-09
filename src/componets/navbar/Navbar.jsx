import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import image from '../../assets/logititui.png';
import ai from '../../assets/ai.png'
import ReactAngle from '../../assets/Rectangle 1.png'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box, Avatar, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("/face-swap");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    setActiveMenuItem(pathname);
  }, [location.pathname]);

  const handleClick = () => {
    navigate('/face-swap');
  };

  const navBackground = scrolling ? '#0D0B25' : '#0D0B25';
  return (
    <AppBar position="sticky" sx={{ height: '100%',  backgroundColor: navBackground }}>
      <Toolbar sx={{ padding: '10px' }}>
        <img alt="Logo" src={image} style={{ height: '25px' }} onClick={handleClick} />
        <Typography sx={{ ml: 2 }} variant="h5">
           <img src={ReactAngle} style={{marginRight:10,height:"32px"}}/><img src={ai}/>
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'row' ,marginLeft: 'auto'}} >
          <MenuItem >
            <Link to="/face-swap" style={{textDecoration:"none" ,color:"white"}}>
              <Typography sx={{ borderBottom: activeMenuItem === '/face-swap' ? '2px solid #F53689' : 'none',color:activeMenuItem === '/face-swap' ? 'rgba(250, 250, 250, 1)' : 'rgba(250, 250, 250, 0.7)',paddingY:1 }}>Face Swap</Typography>
            </Link>
          </MenuItem>
          <MenuItem >
            <Link to="/remove-background" style={{textDecoration:"none" ,color:"white"}}>
              <Typography sx={{ borderBottom: activeMenuItem === '/remove-background' ? '2px solid #F53689' : 'none',color:activeMenuItem === '/remove-background' ? 'rgba(250, 250, 250, 1)' : 'rgba(250, 250, 250, 0.7)' ,paddingY:1 }}>Remove Background</Typography>
            </Link>
          </MenuItem>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
