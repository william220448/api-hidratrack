const express = require('express');


const hidratacion = require('./modulos/hidratacion/rutas.js')
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hola mundo desde Express')
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en https://localhost:${PORT}`);


//rutas
app.use('/api/hidratacion', hidratacion)
});
