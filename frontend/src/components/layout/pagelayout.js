import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';
import {useLocation } from 'react-router-dom';

const PageLayout = ({children}) => {
  const location = useLocation();
  return (
    <Box>
      <Box>
        {location.pathname !== '/'? <Sidebar /> : <React.Fragment />}
        
      </Box>
      <Box sx={{ml: 33}}>
        {children}
      </Box>  
    </Box>
  );
}

export default PageLayout;
