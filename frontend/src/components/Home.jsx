import React from 'react'
import { AppBar, Toolbar, Typography,Container,Grid,Button,Box,Paper,TextField } from "@mui/material";
import { useSelector, useDispatch} from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate,Link } from "react-router-dom";
import { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';


function Home() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const userData = useSelector (state => state.login)
   const isLoggedin = userData.isAutenticated;
   const {item,setItem}=useState("")


   // Efecto secundario para redirigir al usuario si no ha iniciado sesión
   useEffect(()=>{
       if (!isLoggedin) {
               navigate('/')
       }
       }, [isLoggedin, navigate])


   // Función para manejar el cierre de sesión
   console.log('Datos del usuario en el store: ', userData)
   const handleLogout = (e) => {
           dispatch(loginActions.logout());
           navigate('/');
   };


   // Renderizado del componente Home
return <>
        <AppBar position='static'>
                <Toolbar>
                <Grid container spacing={30}>
                        <Grid item>
                                <PersonIcon/>
                                <Typography>{userData.userName}</Typography>
                        </Grid>
                        <Grid item mt={2}>
                                <Link to={'/home'} >Inicio</Link>
                        </Grid>
                        <Grid item mt={2} >
                                <Link>Informes</Link>
                        </Grid>
                        <Grid item mt={2}>
                                <Link>Ayuda</Link>
                        </Grid>
                        
                </Grid>
                <Grid>
                        <Button variant  ='contained' startIcon={<LogoutIcon/>} >Salir</Button>
                </Grid>
                </Toolbar>
        </AppBar>
        <Paper elevation={3} sx={{mt:3,ml:10,mr:10}}>
                <Box component='form' autoComplete='off'>
                <Grid container spacing={10} mt={0} alignContent={'center'}>
                        <Grid item ml={5} >
                                <TextField
                                label='Nombre'
                                required
                                >
                                </TextField>
                        </Grid>
                        <Grid item>
                                <TextField 
                                label='Marca'
                                required
                                >
                                </TextField>
                        </Grid>
                        <Grid item mb={5}>
                                <TextField
                                label='Tipo'
                                required
                                >
                                </TextField>
                        </Grid>
                        <Grid item mb={5} flexGrow={1} >
                                <TextField
                                label='Precio'
                                required
                                        >
                                </TextField>
                        </Grid>
                        <Grid item mr={5} mb={5} >
                                <Button variant='contained' startIcon={<AddBoxIcon/>}>Insertar</Button>
                        </Grid>
                </Grid>
                </Box>
        </Paper>
        </>
}


export default Home;
