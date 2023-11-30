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
import TopBar from './TopBar';


function Gestion() {
const dispatch = useDispatch()
const navigate = useNavigate()
const userData = useSelector (state => state.login)
const [error,setError]=useState("")
const isLoggedin = userData.isAutenticated;
const [item,setItem]=useState({nombre:'',login:'',password:'',rol:''})
const[tableData,setTableData]=useState([])
const isAdmin=userData.userRol==='admin'


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
fetch(`http://localhost:3030/addUser?nombre=${item.nombre}&login=${item.login}&password=${item.password}&rol=${item.rol}`)
.then(response => response.json())
.then(response =>{
if(response){
        handleGetItem()
        setItem({ nombre: '', login: '', password: '', rol: '' });
}
}).catch(()=>{
        setError("Error al conectar al servidor")
})
}


const handleGetItem=(event)=>{
fetch(`http://localhost:3030/getUSer`)
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
fetch(`http://localhost:3030/deleteUser?id=${id}`)
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
  // Renderizado del componente Home
return <>
<TopBar/>
<Paper elevation={3} sx={{mt:3,ml:10,mr:10,bgcolor:'lightblue'}}>
        <Box>
        <Grid container spacing={10} mt={0} alignContent={'center'}>
                <Grid item ml={5} >
                        <TextField
                        sx={{bgcolor:'white',border:'1px solid black'}}
                        label='Nombre'
                        required
                        type='text'
                        onChange={(event)=>setItem({...item,nombre:event.target.value})}
                        value={item.nombre}
                        >
                        </TextField>
                </Grid>
                <Grid item>
                        <TextField
                        sx={{bgcolor:'white',border:'1px solid black'}}
                        label='Login'
                        required
                        onChange={(event)=>setItem({...item,login:event.target.value})}
                        value={item.login}
                        >
                        </TextField>
                </Grid>
                <Grid item mb={5}>
                        <TextField
                        sx={{bgcolor:'white',border:'1px solid black'}}
                        label='Password'
                        required
                        type='text'
                        onChange={(event)=>setItem({...item,password:event.target.value})}
                        value={item.password}
                        >
                        </TextField>
                </Grid>
                <Grid item mb={5} flexGrow={1} >
                        <TextField
                        sx={{bgcolor:'white',border:'1px solid black'}}
                        label='Rol'
                        required
                        onChange={(event)=>setItem({...item,rol:event.target.value})}
                        value={item.rol}
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
                        <TableRow sx={{bgcolor:'black'}} >
                                {isAdmin &&(
                                        <TableCell></TableCell>
                                )}
                                <TableCell sx={{color:'white'}} >Nombre</TableCell>
                                <TableCell sx={{color:'white'}} >Login</TableCell>
                                <TableCell sx={{color:'white'}} >Password</TableCell>
                                <TableCell sx={{color:'white'}} >Rol</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody sx={{bgcolor:'lightblue'}} >
                        {tableData.map((row)=> (
                                <TableRow key={row.id}>
                                        {isAdmin && (
                                                <TableCell sx={{ml:'5'}} >
                                                <Button onClick={()=>handleDeleteItem(row.id)}>
                                                        <DeleteForeverIcon/>
                                                </Button>
                                        </TableCell>
                                        )}
                                        <TableCell>
                                                {row.nombre}
                                        </TableCell>
                                        <TableCell>
                                                {row.login}
                                        </TableCell>
                                        <TableCell>
                                                {row.password}
                                        </TableCell>
                                        <TableCell>
                                                {row.rol}
                                        </TableCell>
                                </TableRow>
                        ))}
                </TableBody>
        </Table>
</TableContainer>
</>
}




export default Gestion;