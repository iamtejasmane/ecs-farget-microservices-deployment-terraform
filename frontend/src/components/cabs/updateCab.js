import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { updateCab } from '../../store/actions/cabActions';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useParams, useNavigate   } from 'react-router-dom';
import AWS from 'aws-sdk';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';  

const errorHelper = {
    cabModel: {
        required: "Cab model / name is Required"
    },
    cabRegistrationNumber: {
      required: "Cab number is Required"
    },
    cabColour: {
        required: "Cab color is Required"
    }
  };

const UpdateCab = ({}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const drivers = useSelector(state =>state.cabs);
    const cab = drivers.find((cab) => cab.cabId.toString() === id)
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState([])
    const [loaded, setLoaded] = useState(false);
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
    
    useEffect(() => {
        console.log(cab)
        if(cab){
            loadImage()
        }
    },[cab])
    
      AWS.config.update({
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        },
        region: process.env.REACT_APP_AWS_REGION,
      });
    
    const s3 = new AWS.S3();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const loadImage = async () => {
        const params = {
          Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
          Key: cab.cabImageKey
        }
          try {
              const data = await s3.getObject(params).promise();
              const imageBase64 = 'data:image/jpg;base64,' + data.Body.toString('base64');
              setImage(imageBase64)
              setLoaded(true)
        }
        catch(e){
          console.log(e)
        }
    }
    
      const handleOnSubmit = (evt) => {
        if(selectedFile){
            console.log("selectedfile",selectedFile)
            evt['cabImage'] = selectedFile;
          }
          console.log(evt);
          dispatch(updateCab(id,evt)).then(() => {
              navigate('/cabs')
          })
      };
    return (
        <>
            <Box className='form-section'>
                <Box component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{width:500}}>
                    <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>
                        Update Cab
                    </Typography>

                    <Box sx={{justifyContent: 'center', display:'flex', mt: 2}}>
                        {loaded ? <Avatar sx={{ width: '100px !important', height: '100px !important' }} alt="Remy Sharp" variant='square' src={image}/> : <CircularProgress color="inherit" />}
                    </Box>
                    <Grid item sx={{mt: 1}}>
                            <Controller
                            control={control}
                            name="cabModel"
                            defaultValue={cab ? cab.cabModel : ""}
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
                                helperText={error ? errorHelper.cabModel[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cabRegistrationNumber"
                            defaultValue={cab ? cab.cabRegistrationNumber : ""}
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
                                helperText={error ? errorHelper.cabRegistrationNumber[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cabColour"
                            defaultValue={cab ? cab.cabColour : ""}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                {...field}
                                type="text"
                                fullWidth
                                label="Cab Color"
                                error={error !== undefined}
                                helperText={error ? errorHelper.cabColour[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item>
                        <Box sx={{mt: 1}}>
                            <div>
                                <input
                                    type="file"
                                    name="cabImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <Typography className='warning-text'>If you want to update cab image, select new image</Typography>
                        </Box>
                       
                        
                        </Grid>

                        <Grid >
                        <Button type="submit" variant="outlined" sx={{color: 'black', mt:3, boxShadow: 1}} className='submit-button'>
                                Update Cab
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default UpdateCab