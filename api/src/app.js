const express = require('express');
const cors = require('cors');
const config = require('./config')
const path = require('path');
const { route } = require('./routes/auth.routes');

//Inicializacion
const app = express();

//Archivos estaticos
app.use(express.static(path.join(__dirname, '/files')));

//settings
app.set('port', process.env.PORT || config.PORT);

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/', require('./routes/auth.routes'));

module.exports = app;