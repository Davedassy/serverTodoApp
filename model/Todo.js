const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Todo",todoSchema)