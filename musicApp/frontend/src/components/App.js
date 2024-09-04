import React from "react";
import HomePage from "./HomePage"
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room"

import {BrowserRouter,
    Routes,
    Route
} from "react-router-dom"



export default function App(props) {
    return (
    <div className="container">
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='/join' element={<RoomJoinPage />}/>
                <Route path='/create' element = {<CreateRoomPage/>}/>
                <Route path='/room/:roomCode' loader={({params}) => {params.roomCode}} Component= {Room}/>
            </Routes>
        </BrowserRouter>
    </div>)
}