import React from 'react'
import { AppBar, Toolbar, Typography,Container,Grid,Button,Box,Paper,TextField, TableContainer, TableHead, TableRow, TableCell,Table, TableBody } from "@mui/material";
import { useSelector, useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BuildIcon from '@mui/icons-material/Build';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'




function TopBar() {
const dispatch = useDispatch()
const navigate = useNavigate()
const userData = useSelector (state => state.login)
const isLoggedin = userData.isAutenticated;
const isAdmin=userData.userRol==='admin'
const isInvitado=userData.userRol==='invitado'




console.log('Datos del usuario en el store: ', userData)
const handleLogout = (e) => {
dispatch(loginActions.logout());
navigate('/');
};


useEffect(()=>{
       if (!isLoggedin) {
       navigate('/')
       }
       }, [isLoggedin, navigate])
return <>
<AppBar position='static' sx={{bgcolor:'black'}}>
       <Toolbar>
       <Grid container spacing={30}>
               <Grid item>
                       {isAdmin ?(
                               <BuildIcon/>
                       ) : isInvitado ? (
                               <InsertEmoticonIcon/>
                       ):(
                        <PersonIcon/>
                       )       
                       }
                      
                      
                       <Typography>{userData.userName}</Typography>
               </Grid>
               <Grid item mt={2}>
                       <Link to={'/home'}>Inicio</Link>
               </Grid>
               {isAdmin &&(
                <Grid item mt={2}>
                        <Link to={'/gestion'}>Gestion Usuarios</Link>
                        </Grid>
               )}
               {isAdmin && (
                       <Grid item mt={2} >
                       <Link to="/informes" >Informes</Link>
               </Grid>
               )}
               <Grid item mt={2}>
                       <Link to={'/ayuda'}>Ayuda</Link>
               </Grid>
       </Grid>
       <Grid>
               <Button variant='contained' startIcon={<LogoutIcon/>} sx={{bgcolor:'gray'}} onClick={handleLogout}  >Salir</Button>
       </Grid>
       </Toolbar>
</AppBar>
</>
}

export default TopBar;
