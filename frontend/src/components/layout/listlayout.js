import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TableList from './table';

const ListLayout = () => {
    return(
        <>
            <Container>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt:10}}>
                    <Box><p className='list-header'>Cabs List</p></Box>
                    <Box>
                        <Button variant="outlined" sx={{color: 'black', width: 180, mt:2.5}} className='card-button'>
                            Add Cab
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <Container>
                    <TableList />
                </Container>
            </Container>
        </>
    )
}

export default ListLayout