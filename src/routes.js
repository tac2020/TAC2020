import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { Drawer, Typography, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import App from './App';
import './App.css';
import SymptomCheck from './form';




export default function Routes() {
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState(false);


    function toggleDialog() {
        console.log("togle");

        setDialog(dialog === true ? false : true);
    }

    function toggleDrawer() {
        setOpen(open === true ? false : true)
    }

    return (
        <Router>
            <IconButton style={{position : "fixed", bottom : "25%", right: 20, color: "white",background: "rgba(255,33,32,60)", zIndex: 99}} onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
                <Menu />
            </IconButton>
            <Drawer transitionDuration={100} anchor="left" open={open} onClose={toggleDrawer}>
                <div className="sidebar">
                    <Typography>
                        <Link to="/" onClick={toggleDrawer} >
                            Home
                </Link>
                    </Typography>
                    <Typography>
                        <Link to="/symptoms" onClick={toggleDrawer} >
                            Profile
                </Link>
                    </Typography>
                    <Typography>
                        <Link to="/three" onClick={toggleDrawer}>
                            Settings
                </Link>
                    </Typography>
                </div>
            </Drawer>


            <Route path="/" exact render={App} />
            <Route path="/symptoms" component={() => <SymptomCheck />} />
            <Route path="/helplines"> hello </Route>
        </Router >
    )
}