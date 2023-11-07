import React from 'react'
import {lightBlue} from '@mui/material/colors'
import { Container,Box,Button, Avatar,Paper, TextField, Grid, Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


function Login () {
   return <>
   <Container sx={{pt:10}} >
    <Paper>
    <Stack alignItems={'center'} >
       <Avatar sx={{bgcolor:lightBlue[500]}}>
           <LockIcon />
       </Avatar>
       <body1>Acceder</body1>
       </Stack>
       <Box sx={{my: 2 }} >
           <Grid container spacing={3}>
               <Grid item xs={12} >
               <TextField label="Usuario" variant='outlined' fullWidth ></TextField>
               </Grid>
               <Grid item xs={12}>
               <TextField label="Contraseña" typed='password' variant='outlined' fullWidth></TextField>
               </Grid>
               <Grid item xs={12}>
               <Button variant='contained'color='primary' fullWidth>Acceder</Button>
               </Grid>
  
           </Grid>
       </Box>
    </Paper>
    </Container>
  </>
  }



  export default Login

