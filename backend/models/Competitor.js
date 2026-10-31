const mongoose = require("mongoose");

const competitorSchema = new mongoose.Schema({

    companyName:{
        type:String,
        required:true
    },

    country:String,

    marketShare:{
        type:Number,
        default:0
    },

    totalShipments:{
        type:Number,
        default:0
    },

    totalTradeValue:{
        type:Number,
        default:0
    },

    topProduct:String,

    topDestination:String,

    growth:{
        type:Number,
        default:0
    },

    products:[
        String
    ],

    active:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

module.exports=mongoose.model("Competitor",competitorSchema);