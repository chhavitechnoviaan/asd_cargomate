const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    emailNotification:{
        type:Boolean,
        default:true
    },

    smsNotification:{
        type:Boolean,
        default:true
    },

    appNotification:{
        type:Boolean,
        default:true
    },

    newsletter:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "UserPreference",
    userPreferenceSchema
);