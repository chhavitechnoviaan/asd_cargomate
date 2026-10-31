const mongoose = require("mongoose");

const analyticsInsightSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    icon:{
        type:String,
        default:"info"
    },

    color:{
        type:String,
        default:"blue"
    },

    priority:{
        type:Number,
        default:1
    },

    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }

},{
    timestamps:true
});

module.exports=mongoose.model(
    "AnalyticsInsight",
    analyticsInsightSchema
);