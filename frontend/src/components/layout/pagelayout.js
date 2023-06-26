import * as React from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';


const PageLayout = ({children}) => {
  return (
    <Box>
      <Box>
        <Sidebar />
      </Box>
      <Box sx={{ml: 33}}>
        {children}
      </Box>  
    </Box>
  );
}

export default PageLayout;
