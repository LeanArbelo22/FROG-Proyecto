const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(req,resp){
    const admins = [
        'Lean',
        'Berni',
        'Nico',
        'Dani'
    ];
    const variableJSON = JSON.stringify(admins);
    const objetoJS = JSON.parse(variableJSON);
    console.log(variableJSON);
    console.log(objetoJS);
    console.log('Se ejecuto el index');;
    resp.send(variableJSON);
});

app.post('/', function (req,resp){
    resp.send('Esto es un POST')
});
app.put('/', function (req,resp){
    resp.send('Esto es un PUT')
});
app.delete('/', function (req,resp){
    resp.send('Esto es un DELETE')
})
app.get('/envios',function(req,resp){
    console.log('Se ejecuto envios');
    resp.send('PAGINA CON EXPRESS: "Envios"');
});

let gente = [
    'Lean',
    'Berni',
    'Nico',
    'Dani'
];

app.get('/login',function(req,resp){
    const filtroNombre = req.query.NAMES; //nombres que le demos por postman
    console.log(filtroNombre);

    let genteFiltrada;
    if(filtroNombre) {
        genteFiltrada = gente.filter(g => { //filtro de gente que solo este en la lista
        return g === filtroNombre;
        });
    } else {
        genteFiltrada = gente; // si en gente filtrada no hay resultado mostrar gente
    };

    resp.send(genteFiltrada);//muestra solo las coincidencias con la lista y las imprime

    /* const respExito = {
        success: true,
        message: 'Inicio de sesion exitoso'
    } */
    /* const variableJSON = JSON.stringify(admins);
    const objetoJS = JSON.parse(variableJSON);
    console.log(variableJSON);
    console.log(objetoJS);
    console.log('Se ejecuto el index');;
    resp.send(variableJSON);
 */
});

app.post('/login',function(req,resp){
    const body = req.body;
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

app.listen(4000, () => {-
    console.log('Aplicacion express iniciada correctamente');
})
