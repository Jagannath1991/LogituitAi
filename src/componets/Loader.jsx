import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgba(13,13,13,0.5)", zIndex: 9999}}>
      <CircularProgress color="secondary" size={80}/>
    </div>
  );
};

export default Loader;
