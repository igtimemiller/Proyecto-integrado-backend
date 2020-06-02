const mongoose = require('mongoose')
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const entrance = require('./routes/entrance')
const user = require('./routes/user')
const auth = require('./routes/auth')
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use('/api/entrance/', entrance)
app.use('/api/user/', user)
app.use('/api/auth/', auth)
const port = process.env.PORT || 3003
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))

mongoose.connect('mongodb://localhost/blogdb',{useNewUrlParser:true, useFindAndModify:false, useCreateIndex: true})
    .then(()=> console.log('Conectado a MongoDb'))
    .catch(erro => console.log('No se ha conectado a MongoDb'))