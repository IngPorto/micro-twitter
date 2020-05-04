const express = require ('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require('../models/user')

// -- Custom User requests

router.post('/auth', async (req, res)=>{
    const { slug, password } = req.body
    console.log(req.body)
    const user = await UserModel.findOne({"slug": slug, "password": password })
    if ( user ){
        req.session.user = user
    }
    res.json(user)
})

router.get('/session', async (req, res)=>{
    if ( req.session.user ){
        res.json(req.session.user)
    }else {
        res.json(null)
    }
})

router.get('/logout', async (req, res)=>{
    if ( req.session.user ){
        await req.session.destroy()
    }
    res.json({status: 'session closed'})
})

// does slug exist? return an array fill or empty
router.get('/slug/:slug', async (req, res)=>{
    const users = await UserModel.find({"slug": req.params.slug})
    res.json(users)
})

// -- User basic requests

router.get('/', async (req, res) => {
    const user = await UserModel.find()
    res.json( user )
})

router.get('/:id', async (req, res) => {
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
    const photo = '/img/user_default.png'
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

router.put('/:id', async (req, res) => {
    let updUser = {}
    try {
        updUser = await UserModel.findByIdAndUpdate( req.params.id, req.body )
    } catch (e){
        res.json( {status: 'request failed', message: 'fallo en la -actualización- del usuario: '+e} )
        return;
    }
    res.json( updUser )
})

router.delete('/:id', async (req, res) => {
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




module.exports = router