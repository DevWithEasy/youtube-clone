const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    subscribers:{
        type: Number,
        default:0
    },
    subscribedUsers:{
        type: [String],
        default:[]
    },
},{timestamps:true})

const User = mongoose.model('User',userModel)

module.exports = User