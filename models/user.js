const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    image: {
        type: String,
    },
    isAdmin: Boolean,
    date: {type:Date, default:Date.now}
})

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        _id: this._id, 
        name: this.name,
        isAdmin: this.isAdmin
    }, 'password')
}

const User = mongoose.model('user', userSchema)

module.exports = User