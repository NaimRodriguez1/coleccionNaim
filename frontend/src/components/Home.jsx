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


function Home() {
const dispatch = useDispatch()
const navigate = useNavigate()
const userData = useSelector (state => state.login)
const [error,setError]=useState("")
const isLoggedin = userData.isAutenticated;
const [item,setItem]=useState({nombre:'',marca:'',tipo:'',precio:''})
const[tableData,setTableData]=useState([])


console.log('Datos del usuario en el store: ', userData)
const handleLogout = (e) => {
dispatch(loginActions.logout());
navigate('/');
};

useEffect(()=>{
        if (!isLoggedin) {
        navigate('/')
        }
        handleGetItem()
        }, [isLoggedin, navigate])

const handleSaveItem=(event)=>{
fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
.then(response => response.json())
.then(response =>{
if(response){
        handleGetItem()
}
}).catch(()=>{
        setError("Error al conectar la servidor")
})
}


const handleGetItem=(event)=>{
fetch(`http://localhost:3030/getItems`)
.then(response => response.json())
.then(response =>{
if(response){
console.log(response)
        if(Object.keys(response.data).length !==0){
                setTableData(response.data)
                console.log('Datos table',response.data)
        }else{
                console.log('Error al hacer el select')
        }
}
})
}


const handleDeleteItem=(id)=>{
fetch(`http://localhost:3030/deleteItem?id=${id}`)
.then(response => response.json())
.then(response =>{
if(response){
        handleGetItem()
        alert('Datos eliminados correctamente')
        if (tableData.length === 1) {
                setTableData([]);
        }
}
}).catch(()=>{
        setError("Error al eleiminar datos")
})
}


  // Efecto secundario para redirigir al usuario si no ha iniciado sesión



  // Función para manejar el cierre de sesión







  // Renderizado del componente Home
return <>
<AppBar position='static' sx={{bgcolor:'lightgreen '}}>
        <Toolbar>
        <Grid container spacing={30}>
                <Grid item>
                        <PersonIcon/>
                        <Typography>{userData.userName}</Typography>
                </Grid>
                <Grid item mt={2}>
                        <Link to={'/home'}>Inicio</Link>
                </Grid>
                <Grid item mt={2} >
                        <Link>Informes</Link>
                </Grid>
                <Grid item mt={2}>
                        <Link>Ayuda</Link>
                </Grid>
        </Grid>
        <Grid>
                <Button variant='contained' startIcon={<LogoutIcon/>} sx={{bgcolor:'lightcoral'}} onClick={handleLogout}  >Salir</Button>
        </Grid>
        </Toolbar>
</AppBar>
<Paper elevation={3} sx={{mt:3,ml:10,mr:10}}>
        <Box>
        <Grid container spacing={10} mt={0} alignContent={'center'}>
                <Grid item ml={5} >
                        <TextField
                        label='Nombre'
                        required
                        type='text'
                        onChange={(event)=>setItem({...item,nombre:event.target.value})}
                        >
                        </TextField>
                </Grid>
                <Grid item>
                        <TextField
                        label='Marca'
                        required
                        onChange={(event)=>setItem({...item,marca:event.target.value})}
                        >
                        </TextField>
                </Grid>
                <Grid item mb={5}>
                        <TextField
                        label='Tipo'
                        required
                        type='text'
                        onChange={(event)=>setItem({...item,tipo:event.target.value})}
                        >
                        </TextField>
                </Grid>
                <Grid item mb={5} flexGrow={1} >
                        <TextField
                        label='Precio'
                        required
                        onChange={(event)=>setItem({...item,precio:event.target.value})}
                        >
                        </TextField>
                </Grid>
                <Grid item mr={5} mb={5} >
                        <Button variant='contained' startIcon={<AddBoxIcon/>} onClick={handleSaveItem} >Insertar</Button>
                </Grid>
        </Grid>
        </Box>
</Paper>


<TableContainer sx={{mt:5}}>
        <Table aria-label='Table'>
                <TableHead>
                        <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Precio</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                        {tableData.map((row)=> (
                                <TableRow key={row.id}>
                                        <TableCell>
                                                <Button onClick={()=>handleDeleteItem(row.id)}>
                                                        <DeleteForeverIcon/>
                                                </Button>
                                        </TableCell>
                                        <TableCell>
                                                {row.nombre}
                                        </TableCell>
                                        <TableCell>
                                                {row.marca}
                                        </TableCell>
                                        <TableCell>
                                                {row.tipo}
                                        </TableCell>
                                        <TableCell>
                                                {row.precio}
                                        </TableCell>
                                </TableRow>
                        ))}
                </TableBody>
        </Table>
</TableContainer>
</>
}




export default Home;