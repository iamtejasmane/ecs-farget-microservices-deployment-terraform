import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import CarRentalIcon from '@mui/icons-material/CarRental';
import { Link } from 'react-router-dom';

const SidebarList = () => {
    return(
        <>
            <List sx={{mt:3 , p:3}}>
                <ListItem>
                    <ListItemButton component={Link} to="/home">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={Link} to="/drivers">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Drivers' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={Link} to="/cabs">
                        <ListItemIcon>
                            <CarRentalIcon />
                        </ListItemIcon>
                        <ListItemText primary='Cabs' />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton component={Link} to="/cab-driver">
                        <ListItemIcon>
                            <CarRentalIcon />
                        </ListItemIcon>
                        <ListItemText primary='Cabs-Drivers' />
                    </ListItemButton>
                </ListItem>
                </List>
        </>
    )
}

export default SidebarList