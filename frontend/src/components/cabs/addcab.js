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
    cab_model: {
        required: "Cab model / name is Required"
    },
    cab_number: {
      required: "Cab number is Required"
    },
    cab_color: {
        required: "Cab color is Required"
    }
  };

const AddCab = () => {
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
                        Add Cab
                    </Typography>
                    <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cab_model"
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="text"
                                fullWidth
                                label="Cab Model"
                                error={error !== undefined}
                                helperText={error ? myHelper.cab_model[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cab_registration_number"
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="text"
                                fullWidth
                                label="Cab Number"
                                error={error !== undefined}
                                helperText={error ? myHelper.cab_number[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cab_color"
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
                                label="Cab Color"
                                error={error !== undefined}
                                helperText={error ? myHelper.cab_color[error.type] : ""}
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

export default AddCab