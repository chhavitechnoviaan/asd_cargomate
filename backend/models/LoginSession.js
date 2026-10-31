const mongoose = require("mongoose");

const loginSessionSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    device:String,

    browser:String,

    ipAddress:String,

    location:String,

    lastLogin:Date,

    isActive:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "LoginSession",
    loginSessionSchema
);