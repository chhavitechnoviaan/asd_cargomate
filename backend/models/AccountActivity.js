const mongoose = require("mongoose");

const accountActivitySchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    title:String,

    description:String,

    icon:String

},{
    timestamps:true
});

module.exports = mongoose.model(
    "AccountActivity",
    accountActivitySchema
);