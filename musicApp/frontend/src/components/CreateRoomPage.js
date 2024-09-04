import React from "react"
import { Button, ButtonGroup, Grid2, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material"
import { Link , useNavigate} from "react-router-dom"

export default function CreateRoomPage(){
    const [formValues,setFormValues] = React.useState({votes:2,control:"true"});
    const navigate = useNavigate()
    function handleChange(e){
        const {name,value} = e.target;
        setFormValues(prevFormValues=>{
            return {...prevFormValues,[name]:value}
        })
    }

    function submitForm(){
        const {votes , control} = formValues
        const renamedObject = {votes_to_skip:votes ,guest_can_pause:control}
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(renamedObject)
        };
        fetch("/api/create-room/",requestOptions)
        .then((response) => response.json())
        .then(data=>{
            console.log(data);
            navigate(`/room/${data.code}`);
        });
    }

    return(
        <Grid2 container spacing={1}>
            <Grid2 size={12} align="center">
                <Typography component="h4" variant="h4">Create a room</Typography>
            </Grid2>
            <Grid2 size={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row name="control" value={formValues.control} onChange={handleChange}>
                        <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom"/>
                        <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid2>
            <Grid2 size={12} align="center">
                <FormControl>
                    <FormHelperText>
                        Votes required to skip song
                    </FormHelperText>
                    <TextField
                        required
                        type = "number"
                        value = {formValues.votes}
                        name = "votes"
                        onChange = {handleChange}
                        slotProps = {{htmlInput:{min:1,style:{textAlign:"center"}}}}
                    />
                </FormControl>
            </Grid2>
            <Grid2 size={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                    <Button color="primary" variant="contained" onClick={submitForm}>Create A Room</Button>
                </ButtonGroup>
            </Grid2>
        </Grid2>
    )
}