const express = require('express')
const router = express.Router()
const TwitModel = require('../models/twit')
const ObjectId = require('mongoose').Types.ObjectId
const cors = require('cors')

// --------------------------
// ::: Configuración CORS ::: 
// --------------------------
let corsOptions = {
    "origin": ["http://localhost:3000","http://localhost:3000/*"],
    "allowedHeaders": "Content-Type,Authorization",
    "preflightContinue": true,
    "credentials": true,
}
// Enabling CORS Pre-Flight. Necesario cuando el cliente envía datos y el servidor mantiene la sesión por cookies
//router.options('/:skip/:limit', cors(corsOptions))   // Actualización de datos de tarea y Eliminación
router.options('/like/:id', cors(corsOptions))      // Asignar un like
router.options('/share/:id', cors(corsOptions))     // Asignar un share
router.options('/comment/:id', cors(corsOptions))   // Agregar un comentario
router.options('/:id', cors(corsOptions))   // Actualización de datos de tarea y Eliminación
router.options('/', cors(corsOptions))      // Creación de tarea
// ---END-Configuración-CORS---



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

router.get('/:id', cors(corsOptions), async (req, res) =>{
    try{
        ObjectId(req.params.id)
    } catch (e){
        res.json({status: 'request fail', message: 'The id sended is not a ObjectId: '+e})
        return;
    }
    const twits = await TwitModel.findById( ObjectId(req.params.id) )
    res.json(twits)
})

router.post('/', cors(corsOptions), async (req, res) =>{
    const {
        message,
        owner,
        image = null,
        parent = null
    } = req.body
    
    const newTwit = new TwitModel({
        message,
        owner,
        image,
        parent,
        creation_time: Date.now(),
    })
    try {
        await newTwit.save()
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail creating a new Twit: '+e})
        return;
    }
    res.json(newTwit)
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
        updTwit = await TwitModel.findByIdAndUpdate(req.params.id, {
            $push: {
                "shares": req.body.share
            }
        })
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