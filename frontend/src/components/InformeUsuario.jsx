import React from 'react';
import MaterialTable  from '@material-table/core';
import {ExportCsv,ExportPdf} from '@material-table/exporters';


function InformeUsuario({datos}){
   console.log('Datos en InformeUsuario:', datos);

   const col=[
       {title:'Nombre',field:'nombre'},
       {title:'Login',field:'login',filtering:false},
       {title:'Password',field:'password',filtering:false},
       {title:'Rol',field:'rol',filtering:false}
   ];

   return(
       <MaterialTable
   title='Informe Usuarios'
   columns={col}
   data={datos}
   options={{
       filtering:true,
       exportMenu:[
           {
           label:'Export PDF',
           exportFunc: (col,datos)=>ExportPdf(col,datos,'Informe Usuarios')
       },
       {
           label:'Export CSV',
           exportFunc:(col,datos)=>ExportCsv(col,datos,'Informe Usuarios')
       }
   ],
   columnsButton:true,
   dragAndDrop:true,
   }}
   />
   )
}
export default InformeUsuario;
