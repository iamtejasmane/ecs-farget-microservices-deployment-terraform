import {useState} from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { createCab } from '../../store/actions/cabActions';
import { useNavigate } from 'react-router-dom';

const myHelper = {
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

const AddCab = () => {
    const { control, handleSubmit } = useForm({
        reValidateMode: "onBlur"
      });
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [selectedFile, setSelectedFile] = useState(null);
    
      const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const handleOnSubmit = (evt) => {
        console.log("selectedfile",selectedFile)
        evt['cabImage'] = selectedFile;
        console.log(evt);
        dispatch(createCab(evt)).then(() => {
            navigate('/cabs')
        })
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
                            name="cabModel"
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
                                helperText={error ? myHelper.cabModel[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>
                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cabRegistrationNumber"
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
                                helperText={error ? myHelper.cabRegistrationNumber[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                        <input
                            type="file"
                            name="cabImage"
                            onChange={handleFileChange}
                        />
                        </Grid>

                        <Grid item sx={{mt: 3}}>
                            <Controller
                            control={control}
                            name="cabColour"
                            defaultValue=""
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
                                helperText={error ? myHelper.cabColour[error.type] : ""}
                                />
                            )}
                            />
                        </Grid>

                        <Grid >
                        <Button type="submit" variant="outlined" sx={{color: 'black', mt:3, boxShadow: 1}} className='submit-button'>
                                Add Cab
                            </Button>
                        </Grid>
                </Box>
            </Box>
        </>
    )
}

export default AddCab