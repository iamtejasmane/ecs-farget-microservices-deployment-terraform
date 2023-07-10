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
import { login } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';


const myHelper = {
    ownerEmail: {
        required: "Email is Required"
    },
    ownerPassword: {
      required: "Password is Required"
    }
  };

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    
      const handleOnSubmit = async (evt) => {
        console.log(evt);
        await dispatch(login(evt))
        navigate("/home")
      };
    return (
        <>
            <Box className='form-section'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{width:500}}>
                    <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>
                        Login
                    </Typography>
                    <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="ownerEmail"
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="email"
                                fullWidth
                                label="Enter Email"
                                error={error !== undefined}
                                helperText={error ? myHelper.ownerEmail[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="ownerPassword"
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="password"
                                fullWidth
                                label="Enter Password"
                                error={error !== undefined}
                                helperText={error ? myHelper.ownerPassword[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid >
                        <Button type="submit" variant="outlined" sx={{color: 'black', mt:3, boxShadow: 1}} className='submit-button'>
                                Login
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Login