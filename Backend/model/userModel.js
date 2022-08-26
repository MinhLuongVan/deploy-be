const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstname:{
        type : String,   
    },
    lastname:{
        type : String,   
    },
    username:{
        type : String,
    },
    password:{
        type : String,
        minlength:6
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
    { timestamps:true}
);
module.exports = mongoose.model("User",UserSchema)