import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { createDriver } from '../../store/actions/driverActions';
import { useNavigate   } from 'react-router-dom';


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

const AddDriver = () => {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
      const handleOnSubmit = (evt) => {
        console.log(evt);
        dispatch(createDriver(evt))
        navigate('/drivers')
      };
    return (
        <>
            <Box className='form-section'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{width:500}}>
                    <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>
                        Add Driver
                    </Typography>
                    <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverName"
                            defaultValue=""
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
                                helperText={error ? myHelper.driverName[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverEmail"
                            defaultValue=""
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
                                helperText={error ? myHelper.driverEmail[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverPhoneNumber"
                            defaultValue=""
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
                                helperText={error ? myHelper.driverPhoneNumber[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driverLicenseNo"
                            defaultValue=""
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
                                helperText={error ? myHelper.driverLicenseNo[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid >
                        <Button type="submit" variant="outlined" sx={{color: 'black', mt:3, boxShadow: 1}} className='submit-button'>
                                Add Driver
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AddDriver