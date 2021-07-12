const express = require('express');
const mysql = require('mysql2');
const app = express();

//conexion a la base de datos
const mysqlConfig = require('../../config/config')
const connection = mysql.createConnection(mysqlConfig);

//prueba de funcionamiento de conexion
connection.connect(function (error){
    if (error){
        console.log('Error en la conexion: ' + error.stack);
        return;
    }
    console.log('Base de datos conectada correctamente');
});

// para usar el body de postman
app.use(express.json());

app.get('/frogUser', (req, res) => {

    connection.query('Select nroUser, email, frogCard from usuarios', (error,resultado) => {
        if (error){
            console.error(error);
            return;
        };

        res.json(resultado);
    });
});


app.post('/login',function(req,resp){
    const body = req.body; // requiere express.json
    console.log(body);
    gente.push(body.NAMES)
    resp.json({ message:"Persona ingresada correctamente", cantidadTotal: gente.length});
});

app.delete('/login',function(req,resp){
    const genteABorrar = req.query.NAMES;
    if (!genteABorrar) {
        return res.json({error : true, message: 'Tiene que dar una persona a borrar'});
    }

    gente = gente.filter(g => {
        return g !== genteABorrar;
    })
    console.log();
    resp.json({message: 'Persona eliminada correctamente', cantidadTotal: gente.length});
});

app.listen(4000, () => {
    console.log('Aplicacion express iniciada correctamente');
});