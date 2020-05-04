const express = require('express')
const router = express.Router()
const TwitModel = require('../models/twit')
const ObjectId = require('mongoose').Types.ObjectId

// -- Basic Twits requests

router.get('/', async (req, res) =>{
    const twits = await TwitModel.find()
    res.json(twits)
})

router.get('/:id', async (req, res) =>{
    try{
        ObjectId(req.params.id)
    } catch (e){
        res.json({status: 'request fail', message: 'The id sended is not a ObjectId: '+e})
        return;
    }
    const twits = await TwitModel.findById( ObjectId(req.params.id) )
    res.json(twits)
})

router.post('/', async (req, res) =>{
    const {
        message,
        owner,
        image = null,
        parent = null
    } = req.body
    
    const newTwit = new TwitModel({
        message,
        image,
        owner,
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

router.put('/:id', async (req, res) =>{
    let updTwit = {}
    try {
        updTwit = await TwitModel.findByIdAndUpdate(req.params.id, req.body)
    } catch (e) {
        res.json({status: 'request fail', message: 'Fail updating the Twit: '+e})
        return;
    }
    res.json (updTwit)
})

router.delete('/:id', async (req, res) =>{
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

// -- Custom Twit request
router.get('/:skip/:limit', async (req, res) =>{
    const { skip = 0, limit = 10 } = req.params
    const twits = await TwitModel.find().skip( parseInt(skip)).limit( parseInt(limit)).sort({creation_time: -1})
    res.json(twits)
})

module.exports = router