const express = require('express')
const server = express()
const path = require('path')
const morgan = require('morgan')
const { mongoose } = require('./database')
const session = require('express-session')

// --------------------
// ::: Configuración :::
// --------------------
server.set('port', process.env.PORT || 3000)

// --------------------
// ::: Middleware ::: 
// --------------------
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded())
server.use(session({
    secret: 'innovacion-salt',
    resave: true,
    saveUninitialized: true
}))

// --------------------
// ::: Routes :::
// --------------------
server.use('/api/twit', require('./api-routes/twit.routes') )
server.use('/api/user', require('./api-routes/user.routes') )

// --------------------
// ::: Static files :::
// --------------------
server.use(express.static(path.join(__dirname,'app/build')))

// --------------------
// ::: Starting server :::
// --------------------
server.listen( server.get('port'), ()=>{
    console.log(`Servidor al aire en el puerto ${server.get('port')}`)
})