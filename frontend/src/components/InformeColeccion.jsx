import React from 'react';
import MaterialTable  from '@material-table/core';
import {ExportCsv,ExportPdf} from '@material-table/exporters';


function InformeColeccion({datos}){
   console.log('Datos en InformeColeccion:', datos);
   const totalPrecio = datos.reduce((total, item) => total + item.precio, 0);


   // Crear una fila de resumen con la suma de precios
   const summaryRow = { nombre: 'Total', precio: totalPrecio };


   // Combina la fila de resumen con los datos originales
   const dataWithSummary = [...datos, summaryRow];




   const col=[
       {title:'Nombre',field:'nombre',filtering:false},
       {title:'Marca',field:'marca'},
       {title:'Tipo',field:'tipo'},
       {title:'Precio',field:'precio',filtering:false}
   ];
   return(
       <MaterialTable
   title='Informe Colección'
   columns={col}
   data={dataWithSummary}
   options={{
       filtering:true,
       exportMenu:[
           {
           label:'Export PDF',
           exportFunc: (col,datos)=>ExportPdf(col,datos,'informe.pdf')
       },
       {
           label:'Export CSV',
           exportFunc:(col,datos)=>ExportCsv(col,datos,'informe.csv')
       }
   ],
   columnsButton:true,
   dragAndDrop:true,
   showSummaryRow:true,
   summaryRow: { nombre: 'Total', precio: totalPrecio }
   }}
   />
   )
}
export default InformeColeccion;
