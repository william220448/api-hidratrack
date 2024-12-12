const express = require('express');
const morgan = require('morgan');

const hidratacion = require('./modulos/hidratacion/rutas.js');
const error = require('./red/errors.js');
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json()); 

app.use(express.urlencoded({extended: true}));

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express')
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);
});
//rutas
app.use('/api/hidratacion', hidratacion)
app.use(error);
module.exports = app;
