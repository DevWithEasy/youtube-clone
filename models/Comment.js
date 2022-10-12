const mongoose = require("mongoose")

const commentModel = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
},{timestamps:true})

const Comment = mongoose.model('Comment',commentModel)

module.exports = Comment