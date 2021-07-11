console.log('App iniciada correctamente');

/* const pass = require('./usuario'); */
const mysql = require('mysql2');
const http = require('http');
const mysqlConfig = require('../config/config');

const conexion = mysql.createConnection(mysqlConfig);

conexion.connect(function (error){
    if (error){
        console.log('Error en la conexion: ' + error.stack);
        return;
    }
    console.log('Base de datos conectada correctamente');
});

// select from usuarios
conexion.query('Select nroUser, email, frogCard, barrio, nroSocio from usuarios', function (error, result){
    if(error){
        console.log('Error en la conexion a query: ' + error.stack);
        return;
    }
    result.forEach(resultado => {
        console.log('Prueba de conexion a query:', resultado);
    })
}); 

// view usuario
conexion.query('Select * from usuario', function (error, result){
    if(error){
        console.log('Error en la conexion a query: ' + error.stack);
        return;
    }
    result.forEach(resultado => {
        console.log('VISTA USUARIO:', resultado);
    })
});

// select con inner join
conexion.query('Select fullName, frogCard, email, puntos from usuarios inner join tarjetaPuntos on usuarios.nroSocio = tarjetaPuntos.nroSocio', function (error,result){
    if(error){
        console.log('Error en la conexion a la query: ' + error.stack);
        return;
    }
    result.forEach(resultado => {
        console.log('Prueba de query INNER JOIN:', resultado)
    })
});

// creando modulo http servidor
const servidor = http.createServer((request,response) =>{
    conexion.query('Select fullName, frogCard from usuarios', function (error, result){
        if(error){
            console.log('Error en la conexion a query: ' + error.stack);
            return;
        }

        //creando string para mostrar bd en frontend
        let frogName = '';
        result.forEach(resultado => {
            frogName += `<div>Nombre de socio: ${resultado.fullName} - FrogCard numero: ${resultado.frogCard}</div>`
        });

        const peticionURL = request.url;

        response.writeHead(200, {'Content-Type': 'text-html'});

        response.write(`<html>
        <head>
        <title> Proyecto con NODE.js </title>
        </head> 
        <body>
        <p> Creando un servidor y trayendo informacion de la base de datos: ${frogName}</p>
        <hr>
        ${(peticionURL === '/envios') ? 'Pagina de envios' : 'Pagina de locales'}
        <hr>
        <h1>Nuestra pagina es: ${peticionURL}</h1>
        </body>
        </html>`
        );

        response.end();
    });
    conexion.end();
});

servidor.listen(4000);
console.log('Servidor web inicializado')











