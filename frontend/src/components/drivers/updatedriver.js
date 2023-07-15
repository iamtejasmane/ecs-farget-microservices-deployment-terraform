import React, { useEffect, useState } from 'react';
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
import AWS from 'aws-sdk';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';  

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState(false);

    AWS.config.update({
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        },
        region: process.env.REACT_APP_AWS_REGION,
      });
    
    const s3 = new AWS.S3();

    useEffect(() => {
        if(driver){
            loadImage()
        }
    },[driver])

    const loadImage = async () => {
          const params = {
            Bucket: "afourathon3images",
            Key: driver.driverProfilePictureKey
          }
            try {
                const data = await s3.getObject(params).promise();
                const imageBase64 = 'data:image/jpg;base64,' + data.Body.toString('base64');
                setImages(imageBase64)
                setLoaded(true)
          }
          catch(e){
            console.log(e)
          }
      }

    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    
      const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const handleOnSubmit = (evt) => {
        if(selectedFile){
          console.log("selectedfile",selectedFile)
          evt['driverProfilePicture'] = selectedFile;
        }
        console.log(evt);
        dispatch(updateDriver(id,evt)).then(() => {
            navigate('/drivers')
        })
      };
    return (
        <>
            <Box className='form-section'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{width:500}}>
                    <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>
                        Update Driver details
                    </Typography>
                    <Box sx={{justifyContent: 'center', display:'flex', mt: 2}}>
                            {loaded ? <Avatar sx={{ width: '100px !important', height: '75px !important' }} alt="Remy Sharp" variant='square' src={images}/> : <CircularProgress color="inherit" />}
                    </Box>
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
                                helperText={error ? myHelper.driverName[error.type] : ""}
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
                                helperText={error ? myHelper.driverEmail[error.type] : ""}
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
                                helperText={error ? myHelper.driverPhoneNumber[error.type] : ""}
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
                                helperText={error ? myHelper.driverLicenseNo[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 1}}>
                            <div>
                                <input
                                    type="file"
                                    name="driverProfilePicture"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <Typography className='warning-text'>If you want to update driver profile picture, select new image</Typography>
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