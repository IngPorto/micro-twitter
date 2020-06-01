const express = require('express')
const server = express()
const path = require('path')
const morgan = require('morgan')
const { mongoose } = require('./database')
const session = require('express-session')
const cors = require('cors')
const MongoStore = require('connect-mongo')(session)
const mongoose2 = require('mongoose')
//const cors = require('cors')

// --------------------
// ::: Configuración :::
// --------------------
server.set('port', process.env.PORT || 3100)

// --------------------
// ::: Middleware ::: 
// --------------------
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.set('trust proxy', 1)

//server.use(cors())

// Conexión de mongo solo para adminstrar las sesiones
const connection = mongoose2.createConnection('mongodb+srv://application:Appl1c4t10n@cluster0-hllop.mongodb.net/micro-twitter?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const sessionStorage = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})
server.use(session({
    secret: 'innovacion-salt',
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, // 1 day 
        secure: false // only save on https false
    } 
}))

// --------------------
// ::: Routes :::
// --------------------
server.use('/api/twit', require('./api-routes/twit.routes') )
server.use('/api/user', require('./api-routes/user.routes') )
server.get('/',function(req,res) {
    res.sendFile( path.join(__dirname,'app/build/index.html'));
});

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