const express = require('express')
const router = express.Router()
const TwitModel = require('../models/twit')
const ObjectId = require('mongoose').Types.ObjectId
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

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
        "https://micro-twitter.now.sh", 
        "https://micro-twitter.now.sh/*", 
        "https://micro-twitter-7gs78f4y7.now.sh", 
        "https://micro-twitter-7gs78f4y7.now.sh/*",
        "https://clontw.herokuapp.com",
        "https://clontw.herokuapp.com/*"
    ],
    "allowedHeaders": "Content-Type,Authorization",
    "preflightContinue": true,
    "credentials": true,
}
// Enabling CORS Pre-Flight. Necesario cuando el cliente envía datos y el servidor mantiene la sesión por cookies
//router.options('/:skip/:limit', cors(corsOptions))   // Actualización de datos de tarea y Eliminación
router.options('/like/:id', cors(corsOptions))      // Asignar un like
router.options('/share/:id', cors(corsOptions))     // Asignar un share
router.options('/comment/:id', cors(corsOptions))   // Agregar un comentario
router.options('/comments', cors(corsOptions))   // Agregar un comentario
router.options('/noImageTwit', cors(corsOptions))      // Creación de twit sin imagen, solo texto
router.options('/user/:id', cors(corsOptions))   // Actualización de datos de tarea y Eliminación
router.options('/:id', cors(corsOptions))   // Actualización de datos de tarea y Eliminación
router.options('/test', cors(corsOptions))      // Creación de tarea
router.options('/', cors(corsOptions))      // Creación de tarea
// ---END-Configuración-CORS---




// get user twits by user id
router.get('/user/:id', cors(corsOptions), async (req, res) =>{
    try{
        ObjectId(req.params.id)
    } catch (e){
        res.json({status: 'request fail', message: 'The id sended is not a ObjectId: '+e})
        return;
    }
    //const twits = await TwitModel.findById( ObjectId(req.params.id) )
    const twits = await TwitModel.aggregate([
        {
            $match: {owner : ObjectId(req.params.id)}
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        },
        {
            $sort: {creation_time: -1}
        }
    ]) 
    res.json(twits)
})

// -- Custom Twit request
router.get('/:skip/:limit', cors(corsOptions), async (req, res) =>{
    const { skip = 0, limit = 10 } = req.params
    //const twits = await TwitModel.find().skip( parseInt(skip)).limit( parseInt(limit)).sort({creation_time: -1})
    const twits = await TwitModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        },
        {
            $sort: {creation_time: -1}
        },
        {
            $skip: parseInt(skip),
        },    
        {
            $limit: parseInt(limit)
        }
    ]) // ojo, el orden de los consultas importan, afectan el resultado
    res.json(twits)
})



// -- Basic Twits requests
router.get('/', cors(corsOptions), async (req, res) =>{
    const twits = await TwitModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        }
    ])
    res.json(twits)
})

// get twit by id
router.get('/:id', cors(corsOptions), async (req, res) =>{
    try{
        ObjectId(req.params.id)
    } catch (e){
        res.json({status: 'request fail', message: 'The id sended is not a ObjectId: '+e})
        return;
    }
    //const twits = await TwitModel.findById( ObjectId(req.params.id) )
    const twits = await TwitModel.aggregate([
        {
            $match: { "_id": ObjectId(req.params.id)}
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        }
    ])
    // Podría usar $unwind para volver todo el arreglo de comentarios objetos 
    // y luego hacer un $lookup para traer esos datos de los comentarios y 
    // mandarlos en la respuesta. Pero pueden llegar a ser muchos, así que haré
    // otra consulta donde limitaré la cantidad de comentarios en pantalla
    res.json(twits)
})


router.post('/noImageTwit', cors(corsOptions), async (req, res) =>{
    const {
        message,
        owner,
        parent = null
    } = req.body
    const newTwit = new TwitModel({
        message,
        owner,
        image=null,
        parent,
        creation_time: Date.now(),
    })
    try {
        await newTwit.save()
        if( parent ){
            await TwitModel.findByIdAndUpdate( ObjectId(parent), { $push: { comments: newTwit._id }})
        }
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail creating a new Twit: '+e})
        return;
    }
    res.json(newTwit)
})



// CLOUDINARY

const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'lanubevoladora',
    api_key: '599336553174427',
    api_secret: 'rAI6QiuEtOX8rePQ9GAmS6SmXuc'
})



// Configuraciones de carga globales a todas las rutas
const storage = multer.diskStorage({
    destination: path.join( __dirname ,'../uploads'),
    filename:(req, file, callback) => {
        callback( null, uuidv4() + path.extname( file.originalname) ) // ningún error, nuevo nombre del archivo
    }
})
// Configuraciones de carga locales a la ruta
const uploadConfig = multer({
    storage,
    dest: path.join( __dirname ,'../uploads'),
    limits: {fileSize: 3000000} // peso máximo 3 Mb
})

// single lleva el nombre del tag
router.post('/', cors(corsOptions), uploadConfig.single('image') , async (req, res) =>{
    const {
        message,
        owner,
        parent = null
    } = req.body

    let image = null;
    
    // visualizando el archivo entrante
    if ( req.file ){
        console.log('---:: visualizando el archivo entrante ::---')
        console.log(req.file)
        console.log('---:: nombre del archivo entrante ::---')
        console.log(req.file.filename)
    }else {
        console.log('---:: NO HAY ARCHIVO ADJUNTO ::---')
    }

    await cloudinary.uploader.upload(req.file.path, {resource_type: 'image', folder: "micro-twitter"}, (err, result) => { 
        console.log("Carga Completa a CLOUDINARY") 
        console.log(result) 
        image= result.secure_url
    });

    const newTwit = new TwitModel({
        message,
        owner,
        image,
        parent,
        creation_time: Date.now(),
    })
    try {
        await newTwit.save()
        if( parent ){
            await TwitModel.findByIdAndUpdate( ObjectId(parent), { $push: { comments: newTwit._id }})
        }
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail creating a new Twit: '+e})
        return;
    }
    res.json(newTwit)
})

/**
 * Servicios que recibe un arreglo de twit_id y los transforma en un arreglo de objetos de twits
 */
router.post('/comments', cors(corsOptions), async (req, res) =>{
    let { comments } = req.body
    if ( comments.length < 1){
        res.json({status: 'request fail', message: 'Comments array is empty'})
        return 
    }

    comments = comments.map( commentsId => {
        return ObjectId(commentsId)
    })
    
    const twits = await TwitModel.aggregate([
        {
            $match: { "_id": {$in: comments } }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        }
    ])
    res.json(twits)
})

router.put('/:id', cors(corsOptions), async (req, res) =>{
    let updTwit = {}
    try {
        const twit = await TwitModel.findById(req.params.id)
        req.body.comments = [ ...twit.comments, ...req.body.comments ]
        updTwit = await TwitModel.findByIdAndUpdate(req.params.id, req.body)
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail updating the Twit: '+e})
        return;
    }
    res.json (updTwit)
})

router.put('/like/:id', cors(corsOptions), async (req, res) =>{
    let updTwit = {}
    try {
        const twit = await TwitModel.findById( req.params.id )
        if ( twit.likes.indexOf( req.body.like ) > (-1) ){
            // removing the like from the twit
            updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
                $pull: {
                    "likes": req.body.like
                }
            })
            res.json (updTwit)
            return;
        }else {
            // pushing the like to the twit
            updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
                $push: {
                    "likes": req.body.like
                }
            })
            res.json (updTwit)
        }
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail commiting -Like- the Twit: '+e})
        return;
    }
})

router.put('/share/:id', cors(corsOptions), async (req, res) =>{
    let updTwit = {}
    try {
        const twit = await TwitModel.findById( req.params.id )
        if ( twit.shares.indexOf( req.body.share ) > (-1) ){
            // removing the share from the twit
            updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
                $pull: {
                    "shares": req.body.share
                }
            })
            res.json (updTwit)
            return;
        }else {
            updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
                $push: {
                    "shares": req.body.share
                }
            })
        }
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail pushing new -Comment- to the Twit: '+e})
        return;
    }
    res.json (updTwit)
})

router.put('/comment/:id', cors(corsOptions), async (req, res) =>{
    let updTwit = {}
    try {
        updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
            $push: {
                "comments": req.body.comment
            }
        })
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail pushing new -Comment- to the Twit: '+e})
        return;
    }
    res.json (updTwit)
})

router.delete('/:id', cors(corsOptions), async (req, res) =>{
    const newTwitData = { deleted: true }
    try {
        const twit = await TwitModel.findByIdAndUpdate(req.params.id, newTwitData)
        await twit.save()
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail updating the Twit: '+e})
        return;
    }
    res.json( {status: 'twit deleted'} )
})



module.exports = router