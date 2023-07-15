import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { assignCabDriver } from '../../store/actions/cabDriverActions';
import { useForm, Controller } from "react-hook-form";
import { useNavigate   } from 'react-router-dom';
import { fetchAllDrivers } from '../../store/actions/driverActions';
import { fetchAllCabs } from '../../store/actions/cabActions';

const style = {
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', width: 500, bgcolor: 'background.paper',
    border: '2px solid #000', boxShadow: 24, p: 4,
};

const AssignDriverModal = ({ handleClose, open }) => {
    const drivers = useSelector((state) => state.drivers);
    const cabs = useSelector((state) => state.cabs);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
    });

    useEffect(() => {
        dispatch(fetchAllDrivers());
        dispatch(fetchAllCabs())
      }, [dispatch]);

    const handleOnSubmit = (evt) => {
        console.log(evt)

        dispatch(assignCabDriver(evt)).then(() => {
            handleClose()
            navigate('/cab-driver')
        })
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div>
                <Box sx={style} component="form" onSubmit={handleSubmit(handleOnSubmit)}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Select Driver and Cab
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel>Driver</InputLabel>
                            <Controller
                                name="driverId"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Driver is required' }}
                                render={({ field }) => (
                                    <Select {...field}>
                                        {drivers.map((driver) => (
                                            <MenuItem key={driver.driverId} value={driver.driverId}>
                                                {driver.driverName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel>Cab</InputLabel>
                            <Controller
                                name="cabId"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Cab is required' }}
                                render={({ field }) => (
                                    <Select {...field}>
                                        {cabs.map((cab) => (
                                            <MenuItem key={cab.cabId} value={cab.cabId}>
                                                {cab.cabModel} - {cab.cabRegistrationNumber}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Box>
                    <Button type='submit'>Submit</Button>
                </Box>
            </div>
        </Modal>

    );
}

export default AssignDriverModal