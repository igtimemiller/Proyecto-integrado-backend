const express = require('express')
const Entrance = require('../models/entrance')
const User = require('../models/user')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', async(req,res)=>{
    const entrances = await Entrance.find()
    res.send(entrances)
})

router.get('/:id',[auth], async(req, res)=>{
    const entrance = await Entrance.findById(req.params.id)
    if(!entrance) return res.status(404).send('No hemos encontrado una entrance con ese ID')
    res.send(entrance)
})

router.post('/', auth, async(req,res)=>{
    const user = await User.findById(req.body.userId)
    if(!user) return res.status(400).send('Usuario no existe')

    const entrance = new Entrance({
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        title:req.body.title,
        category:req.body.category,
        image: req.body.image,
    })

    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const result = await entrance.save()
        await session.commitTransaction()
        session.endSession()
        res.status(201).send(result)
    }catch(e){
        await session.abortTransaction()
        session.endSession()
        res.status(500).send(e.message)
    }
})

router.put('/:id',[auth], async (req, res)=>{

    const entrance = await Entrance.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        category:req.body.category,
        image: req.body.image,
    },
    {
        new: true
    })

    if(!entrance){
        return res.status(404).send('El usuario con ese ID no esta')
    }
    
    res.status(204).send('Actualizado')
})

router.delete('/:id',[auth], async(req, res)=>{

    const entrance = await Entrance.findByIdAndDelete(req.params.id)

    if(!entrance){
        return res.status(404).send('El entrance con ese ID no esta, no se puede borrar')
    }

    res.status(200).send('entrance borrado')

})

module.exports = router