const express = require ('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/user')
const cors = require('cors')

// --------------------------
// ::: Configuración CORS ::: 
// --------------------------
let corsOptions = {
    "origin": [
        "http://localhost:3000",
        "http://localhost:3000/*",
        "http://192.168.0.3:3000",
        "http://192.168.0.3:3000/*",
        "http://192.168.0.14:3000",
        "http://192.168.0.14:3000/*", 
        "https://micro-twitter-7gs78f4y7.now.sh", 
        "https://micro-twitter-7gs78f4y7.now.sh/*",
        "https://clontw.herokuapp.com",
        "https://clontw.herokuapp.com/*"
    ],
    "allowedHeaders": "Content-Type, Authorization",
    "preflightContinue": true,
    "credentials": true,
}
// Enabling CORS Pre-Flight. Necesario cuando el cliente envía datos y el servidor mantiene la sesión por cookies
router.options('/auth', cors(corsOptions))  // Credenciales de autenticación de usuario
router.options('/', cors(corsOptions))      // Creación de usuario
router.options('/:id', cors(corsOptions))   // Actualización de datos de usuario y Eliminación
router.options('/follow/:id', cors(corsOptions))   // Actualización de datos de usuario y Eliminación
// ---END-Configuración-CORS---



// -- Custom User requests
router.post('/auth', cors(corsOptions), async (req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const { slug, password } = req.body
    console.log(req.body)
    const user = await UserModel.findOne({"slug": slug, "password": password })
    
    //console.log("::::: USER ::::::")
    //console.log(user)
    if ( user ){
        req.session.user = user
        //await req.session.save()
        showRequestData(req)
    }
    res.json(user)
})

router.get('/session', cors(corsOptions), async (req, res)=>{
    showRequestData(req)
    if ( req.session.user ){
        const user = await UserModel.findById(req.session.user._id)
        req.session.user = user
        res.json(user)
    }else {
        res.json(null)
    }
})

router.get('/logout', cors(corsOptions), async (req, res)=>{
    if ( req.session.user ){
        await req.session.destroy()
        res.json({status: 'session closed'})
        return;
    }
    res.json( {status: 'request failed', message: 'fallo en -Logout- del usuario: El usuario no existe'} )
})

// does slug exist? return an array fill or empty
router.get('/slug/:slug', cors(corsOptions), async (req, res)=>{
    const users = await UserModel.find({"slug": req.params.slug})
    res.json(users)
})


// -- User basic requests
router.get('/', cors(corsOptions), async (req, res) => {
    const user = await UserModel.find()
    res.json( user )
})

router.get('/:id', cors(corsOptions), async (req, res) => {
    try {
        ObjectId(req.params.id)
    }catch (e){
        res.json( {status: 'request rejected', message: 'El parámetro dado no es un ObjectId'} )
        return;
    }
    const user = await UserModel.findById( ObjectId(req.params.id) )
    res.json( user )
})

router.post('/', [
    cors(corsOptions),
    check('name').not().isEmpty(),
    check('slug').not().isEmpty(),
    check('password').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const name = req.body.name
    const slug = req.body.slug
    const description = req.body.description
    const photo = '/img/user_default.svg'
    const password = req.body.password
    const creation_time = Date.now()

    const newUser = new UserModel({
        name,
        slug,
        description,
        photo,
        password,
        creation_time
    })
    try {
        await newUser.save()
    } catch (e) {
        res.json( {status: 'request failed', message: 'fallo en la -creación- del usuario: '+e} )
        return;
    }
    res.json( newUser )
})

router.post('/follow/:id', cors(corsOptions), async (req, res)=>{
    req.body.followerId // seguidor
    req.params.id       // seguido
    try {
        const user = await UserModel.findById( req.body.followerId )
        if ( user.following.indexOf( req.params.id ) > (-1) ){
            // si ya lo estoy siguiendo, lo dejo de seguir
            updUser_follower = await UserModel.findByIdAndUpdate( req.body.followerId, {
                $pull: {
                    "following": req.params.id
                }
            } )
            updUser_followed = await UserModel.findByIdAndUpdate( req.params.id, {
                $pull: {
                    "followers": req.body.followerId
                }
            })
            const updateUser = await UserModel.findById( req.params.id )
            res.json( updateUser ) 
            return;
        }else{
            // si no lo estoy siguiendo, lo sigo
            updUser_follower = await UserModel.findByIdAndUpdate( req.body.followerId, {
                $push: {
                    "following": req.params.id
                }
            } )
            updUser_followed = await UserModel.findByIdAndUpdate( req.params.id, {
                $push: {
                    "followers": req.body.followerId
                }
            })
            const updateUser = await UserModel.findById( req.params.id )
            res.json( updateUser ) 
        }

    } catch (e){
        res.json( {status: 'request failed', message: 'fallo en la -actualización- del usuario: '+e} )
        return;
    }
})

router.put('/:id', cors(corsOptions), async (req, res) => {
    let updUser = {}
    try {
        updUser = await UserModel.findByIdAndUpdate( req.params.id, req.body )
    } catch (e){
        res.json( {status: 'request failed', message: 'fallo en la -actualización- del usuario: '+e} )
        return;
    }
    res.json( updUser )
})

router.delete('/:id', cors(corsOptions), async (req, res) => {
    const newUserData = { deleted: true }
    try {
        const user = await UserModel.findByIdAndUpdate( req.params.id, newUserData )
        await user.save()
    } catch (e){
        res.json( {status: 'request failed', message: 'fallo en la -eliminación- del usuario: '+e} )
        return;
    }
    res.json( {status: 'user deleted'} )
})

const showRequestData = req => {
    console.log(":::::::::::::::::::::::::::::: NETWORK ::::::")
    console.log( req.originalUrl )
    console.log( req.headers )
    console.log( req.rawHeaders )
    console.log(":::::::::::::::::::::::::::::: SESION ::::::")
    console.log(req.session)
} 


module.exports = router