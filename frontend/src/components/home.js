import {useEffect}from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDrivers } from '../store/actions/driverActions';
import { fetchAllCabs } from '../store/actions/cabActions';

const Home = () => {
    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#fffaf4',
        marginLeft: '200px',
        marginTop: '10%'
    }));
    const dispatch = useDispatch();
    const drivers = useSelector((state) => state.drivers)
    const cabs = useSelector((state) => state.cabs)
    useEffect(() => {
        dispatch(fetchAllDrivers());
        dispatch(fetchAllCabs())
      }, [dispatch]);
    return (
        <>
            <Box sx={{ width: '80%' }}>
                <Stack>
                    <Item className='welcome-text'>Welcome, Lorem!</Item>
                </Stack>
            </Box>
            <Box className='flex-cards' sx={{ mt: 10, display: 'flex', justifyContent: 'space-around' }}>
                <Card className='card-cab' sx={{ width: 200, m: 3, height: 150, borderRadius: '16px', p: 1 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <CarRentalIcon sx={{ fontSize: '2rem' }} />
                                <Typography>
                                    Cabs
                                </Typography>
                            </Box>
                            <Typography gutterBottom variant="h5">
                                {cabs.length}
                            </Typography>
                        </Box>

                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/addCab">
                            <Button variant="outlined" sx={{ color: 'black', width: 150 }} className='card-button'>
                                Add Cab
                            </Button>
                        </Link>
                    </Box>
                </Card>

                <Card className='card-driver' sx={{ width: 200, m: 3, height: 150, borderRadius: '16px', p: 1 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <PeopleIcon sx={{ fontSize: '2rem' }} />
                                <Typography>
                                    Drivers
                                </Typography>
                            </Box>
                            <Typography gutterBottom variant="h5">
                                {drivers.length}
                            </Typography>
                        </Box>

                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/addDriver">
                            <Button variant="outlined" sx={{ color: 'black', width: 150 }} className='card-button'>
                                Add Driver
                            </Button>
                        </Link>
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default Home