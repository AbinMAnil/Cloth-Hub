const mongoose = require("mongoose");
const schema = mongoose.Schema;
const addressSchma = require('./userAddress')



const userSchecma = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    blockStatus:{
        type:Boolean,
        default:false,
    },
    address:[addressSchma]

}, {timestamps:true } )

const userData = mongoose.model('user',userSchecma)
module.exports = userData;
