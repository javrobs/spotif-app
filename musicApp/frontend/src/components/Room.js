import React from "react"
import { Button, ButtonGroup, Grid2, Typography, TextField } from "@mui/material"
import { useParams, Link } from "react-router-dom"

export default function Room() {
    const {roomCode} = useParams();
    
    React.useEffect(()=>{
        fetch(`/api/room/${roomCode}/`)
        .then(data => data.json())
        .then(data => {setState(data)});
        
    },[]);

    const [state, setState] = React.useState({})

    console.log(state)

    return (
    <Grid2 container spacing={2}>
        <Grid2 size={12} align="center">
            <Typography variant="h2">
            {roomCode}
            </Typography>
        </Grid2>
        {Object.keys(state).includes("guest_can_pause") && <Grid2 size={12} align="center">
            <Typography variant="h4">
            Can guests pause? <b>{state.guest_can_pause?"Yes":"No"}</b>
            </Typography>
        </Grid2>}
        {Object.keys(state).includes("votes_to_skip") && <Grid2 size={12} align="center">
            <Typography variant="h4">
            Votes to skip song: <b>{state.votes_to_skip}</b>
            </Typography>
        </Grid2>}
        <Grid2 size={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
                <Button color="secondary" to="/" component={Link}>Return to Main Menu</Button>
            </ButtonGroup>
        </Grid2>
    </Grid2>
    )
}