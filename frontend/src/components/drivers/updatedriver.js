import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { updateDriver } from '../../store/actions/driverActions';
import { useParams, useNavigate   } from 'react-router-dom';

const myHelper = {
    driverName: {
        required: "Driver name is Required"
    },
    driverEmail: {
      required: "Email is Required",
      pattern: "Invalid Email Address"
    },
    driverPhoneNumber: {
        required: "Mobile number is Required",
        maxLength: "Number Can't be more than 10 digits",
        minLength: "Number Can't be less than 10 digits"
    },
    driverLicenseNo: {
        required: "Driver License is required"
    }
  };

const UpdateDriver = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const drivers = useSelector(state =>state.drivers);
    const driver = drivers.find((driver) => driver.driverId.toString() === id)

    useEffect(() => {
        console.log(driver)
    },[driver])

    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    
      const handleOnSubmit = (evt) => {
        console.log(evt);
        dispatch(updateDriver(id,evt))
        navigate('/drivers')
      };
    return (
        <>
            <Box className='form-section'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{width:500}}>
                    <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>
                        Update Driver details
                    </Typography>
                    <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverName"
                            defaultValue={driver ? driver.driverName : ''}
                            rules={{
                                required: true,
                            }}
                            
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="text"
                                fullWidth
                                label="Driver Name"
                                error={error !== undefined}
                                helperText={error ? myHelper.driver_name[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverEmail"
                            defaultValue={driver ? driver.driverEmail : ''}
                            rules={{
                                required: true,
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="email"
                                fullWidth
                                label="Driver Email"
                                error={error !== undefined}
                                helperText={error ? myHelper.email[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverPhoneNumber"
                            defaultValue={driver ? driver.driverPhoneNumber : ''}
                            rules={{
                                required: true,
                                maxLength: 10,
                                minLength: 10
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="number"
                                fullWidth
                                label="Driver Mobile no"
                                error={error !== undefined}
                                helperText={error ? myHelper.mobile_no[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverLicenseNo"
                            defaultValue={driver ? driver.driverLicenseNo : ''}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="text"
                                fullWidth
                                label="Driver License"
                                error={error !== undefined}
                                helperText={error ? myHelper.mobile_no[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid >
                        <Button type="submit" variant="outlined" sx={{color: 'black', mt:3, boxShadow: 1}} className='submit-button'>
                                Update Driver
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default UpdateDriver