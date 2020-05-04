const mongoose = require('mongoose')

mongoose.connect ('mongodb://localhost/micro-twitter', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( db => console.log('BASE DE DATOS: Conectada'))
    .catch( err => console.error(err))

module.exports = mongoose