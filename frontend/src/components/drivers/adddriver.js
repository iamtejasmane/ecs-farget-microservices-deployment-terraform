import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";


const myHelper = {
    driver_name: {
        required: "Driver name is Required"
    },
    email: {
      required: "Email is Required",
      pattern: "Invalid Email Address"
    },
    mobile_no: {
        required: "Mobile number is Required",
        maxLength: "Number Can't be more than 10 digits",
        minLength: "Number Can't be less than 10 digits"
    }
  };

const AddDriver = () => {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    
      const handleOnSubmit = (evt) => {
        console.log(evt);
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
                            name="driver_name"
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
                                helperText={error ? myHelper.driver_name[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="email"
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
                                helperText={error ? myHelper.email[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driver_no"
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
                                helperText={error ? myHelper.mobile_no[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="driver_license"
                            defaultValue=""
                            rules={{
                                required: true,
                                maxLength: 10,
                                minLength: 10
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
                                Add Driver
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AddDriver