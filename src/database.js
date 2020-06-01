const mongoose = require('mongoose')


// 'mongodb://localhost/micro-twitter'
mongoose.connect ('mongodb+srv://application:<password>@cluster0-hllop.mongodb.net/micro-twitter?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then( db => console.log('BASE DE DATOS: Conectada'))
    .catch( err => console.error(err))

module.exports = mongoose