import React from 'react'
import {lightBlue} from '@mui/material/colors'
import { Container,Box,Button, Avatar,Paper, TextField, Grid,Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { loginActions } from '../store/storelogin';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';


function Login () {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error,setError]=useState("")
   const [usuario,setUsuario]=useState("");

   const [password,setPassword]=useState("")

   const [login,setLogin]=useState({user:'',pass:''})

   const handleSubmit=(e)=>{
    e.preventDefault();
       fetch(`http://localhost:3030/login?user=${login.user}&password=${login.pass}`)
            .then(response => response.json())
            .then(response =>{
                if(response){
                    console.log(response.data.nombre)
                    console.log(response.data.rol)
                    if(response && response.data.nombre !==undefined){
                        console.log('Datos enviados')
                        dispatch(loginActions.login({
                            name:response.data.nombre,
                            rol:response.data.rol
                        }));
                        navigate('/home')
                    }else{
                        setError("Usuario y clave incorrectas")
                    }
                }
            }).catch(()=>{
                setError("Error al conectar la servidor")
            })
       };
   return <>
   <Container sx={{pt:10}}>
    <Paper elevation={3} >
       <Stack sx={{alignItems:'center'}} >
           <Avatar sx={{bgcolor:lightBlue[500],mt:5}}>
               <LockIcon />
           </Avatar>
           <p sx={{}} >Acceder</p>
       </Stack>
       <form onSubmit={handleSubmit} >
       <Box sx={{my:2 }} >
           <Grid container spacing={3} >
               <Grid item xs={12} container justifyContent={'center'} >
                   <TextField
                   label="Usuario"
                   type='text' 
                   variant='outlined'
                   required
                   onChange={(e) =>setLogin({...login,user:e.target.value})}
                   helperText="Ingrese un nombre de usuario registrado"
                   >
                   </TextField>
               </Grid>
               <Grid item xs={12} container justifyContent={'center'}>
                   <TextField label="Contraseña"
                   type='password'
                   variant='outlined'
                   onChange={(e)=>setLogin({...login,pass:e.target.value})}
                   helperText="Ingrese una contraseña registrada"
                   required
                   >
                   </TextField>
               </Grid>
               <Grid item xs={12} sx={{mb:5}} container justifyContent={'center'}>
                   <Button
                   variant='contained'
                   color='primary'
                   type='submit'
                  
                   >
                   Acceder</Button>
               </Grid>
  
           </Grid>
       </Box>
       </form>
    </Paper>
    </Container>
  </>
  }


  export default Login

