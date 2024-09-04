import React from "react";
import { Button, Grid2, Typography, ButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"

export default function HomePage(props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={12} align="center">
                <Typography variant="h3" compact="h3">
                    House Party
                </Typography>
            </Grid2>
            <Grid2 size={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                    <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                </ButtonGroup>
            </Grid2>
        </Grid2>
    )
}