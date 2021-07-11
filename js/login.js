const express = require('express');
const mysql = require('mysql2');
const app = express();

const mysqlConfig = require('../config/config');
const connection = mysql.createConnection(mysqlConfig);
// prueba de funcionamiento
connection.connect( (error) => {
    if (error){
        console.error('Error en la conexion: ' + error.stack);
        process.exit(); //mata la app si no se puede conectar = nos sirve
    }
    console.log('Base de datos conectada correctamente');
});
// funcion middlepoint (habilita body de postman)
app.use(express.json());
// endpoint (rutas)
app.get('/api/health', function(req,res){
    res.json({ message: 'App login funcionando'});
});

app.post('/api/users', (req,res) => {
    //console.log(req.body);
    const body = req.body;

    connection.query(`
    INSERT INTO \`usuarios\` 
    (\`email\`, \`pass\`, \`frogCard\`, \`fullName\`, \`barrio\`) 
    VALUES ('${body.email}', '${body.pass}', '${body.frogCard}', '${body.fullName}', '${body.barrio}')`,

    (error, result) => {
        if (error) {
            console.error(error);
            return res.json({ message: 'No pudo crearse el usuario'});
        };

        return res.json({ message: 'Usuario creado exitosamente'});
    });
    // res.json({ message: 'Endpoint crear usuario'}) no se puede mandar mas de una respuesta
})
// para validar el inicio de sesion no se usa get porque muestra la info en la url, se usa POST
app.post('/api/login', (req,res) => {
    const body = req.body;
    console.log(body);
    connection.query(`
        SELECT email, frogCard, fullName, barrio 
        FROM usuarios
        WHERE email = '${body.email}' AND pass = '${body.pass}' `,

    (error, result) => {
        if (error) {
            console.error(error);
            return res.json({ message: 'Error inesperado, estamos trabajando para solucionarlo'});    
        }
        
        if (result.length > 0) {
            return res.json({ message: 'Usuario logueado existosamente', data: result[0]})
        } else {
            return res.json({ message: 'Usuario o contraseña incorrectos'})
        }
    }
    );
});

app.listen(5000, () => {
    console.log('El servidor arranco');
});