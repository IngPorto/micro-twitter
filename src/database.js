const mongoose = require('mongoose')


// DEV ---> mongoose.connect ('mongodb://localhost/micro-twitter', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connect ('mongodb+srv://application:Appl1c4t10n@cluster0-hllop.mongodb.net/micro-twitter?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( db => console.log('BASE DE DATOS: Conectada'))
    .catch( err => console.error(err))

module.exports = mongoose