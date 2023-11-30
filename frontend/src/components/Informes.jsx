import React, { useState } from 'react';
import { Grid, Button } from "@mui/material";
import TopBar from './TopBar';
import InformeColeccion from './InformeColeccion';


function Informes() {
const [tableData, setTableData] = useState([]);
const [informeGenerado, setInformeGenerado] = useState(false);


const handleGetItem = () => {
   fetch(`http://localhost:3030/getItems`)
   .then(response => response.json())
   .then(response => {
       if (response) {
       console.log(response);
       if (Object.keys(response.data).length !== 0) {
           setTableData(response.data);
           console.log('Datos table', response.data);
           setInformeGenerado(true); // Indicamos que se ha generado el informe
       } else {
           console.log('Error al hacer el select');
       }
       }
   })
   .catch(error => {
       console.error('Error al obtener datos del informe:', error);
   });
};


return (
   <>
   <TopBar />
   {!informeGenerado ? (
       <Grid container justifyContent="center" sx={{ mt: 5 }}>
       <Button variant="contained" onClick={handleGetItem}>
           INFORME COLECCIÓN
       </Button>
       </Grid>
   ) : (
       <InformeColeccion datos={tableData} />
   )}
   </>
);
}


export default Informes;
