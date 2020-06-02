const mongoose = require('mongoose')

const entranceSchema = new mongoose.Schema({
    user:{
        type: new mongoose.Schema({
            name: String,
            email: String
        }),
        required: true
    },
    title:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    date:{type:Date,default:Date.now}
})

const Entrance = mongoose.model('entrance', entranceSchema)

module.exports = Entrance