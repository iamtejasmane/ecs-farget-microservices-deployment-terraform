import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Picture from '../../images/admin.jpg'
import { Typography } from '@mui/material';
import SidebarList from './sidebarlist';

const drawerWidth = 270;

const Sidebar = () => {
    return(
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#F2EAE1' },
                    }}
                    open 
                >
                    <div className='main-drawer'>
                        <Box sx={{display: 'flex' }}>
                            <Box className='logo-bar' sx={{p:0.4, m: 1}}></Box>
                            <Box>
                                <p className='logo'>CABMaster</p>
                            </Box>
                        </Box>

                        <Box sx ={{ display: 'flex',
                            justifyContent: 'center',
                            p: 1,
                            m: 1,
                            mt: 4}}
                        >
                            <Avatar sx={{width: '129px !important', height: '129px !important'}} alt="Remy Sharp" src={Picture} />
                        </Box>
                        <Typography variant="h6" style={{ textAlign: 'center' }}>
                            <b>Lorem Ipsum</b>
                        </Typography>

                        <SidebarList />
                    </div>
                </Drawer>
            </Box>
        </>
    )
}

export default Sidebar;