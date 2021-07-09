console.log('App iniciada correctamente');

const pass = require('./usuario');

var mysql = require('mysql2');
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: pass.getPass(),
    database: 'FROG'
});

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
})

conexion.end();