import React from "react"
import { Button, ButtonGroup, Grid2, Typography, TextField } from "@mui/material"
import { Link, useNavigate} from 'react-router-dom';

export default function RoomJoinPage(props){

    const [object,setObject] = React.useState({code:'',error:""});
    const navigate = useNavigate();
    function updateCode(e){
        const {value,name} = e.target;
        setObject(pastObject=>({...pastObject,[name]:value}));
    }

    function goToRoom(e){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({code:object.code})
        }
        fetch('/api/join-room/',requestOptions)
        .then(response => {
            if(response.ok){
                navigate(`/room/${object.code}`);
            } else {
                console.log(response,response.statusText);
                setObject(pastObject=>({...pastObject,error:response.statusText}))
            }
        })
    }

    return (
    <Grid2 container spacing={1}>
        <Grid2 size={12} align="center">
            <Typography variant="h4" component="h4">
                Join a Room
            </Typography>
        </Grid2>
        <Grid2 size={12} align="center">
            <TextField
                error={Boolean(object.error)}
                label="Code"
                placeholder="Enter a Room Code"
                value={object.code}
                name="code"
                onChange={updateCode}
                variant="outlined"
                helperText={object.error}
            />
        </Grid2>
        <Grid2 size={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
            <Button variant="contained" color="secondary" to="/" component={Link}>Return</Button>
                <Button variant="contained" color="primary" onClick={goToRoom}>Enter Room</Button>
            </ButtonGroup>
        </Grid2>
    </Grid2>
    )
}