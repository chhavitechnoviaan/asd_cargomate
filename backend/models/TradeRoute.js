const mongoose = require("mongoose");

const tradeRouteSchema = new mongoose.Schema({

    fromCountry:{
        type:String,
        required:true
    },

    toCountry:{
        type:String,
        required:true
    },

    tradeType:{
        type:String,
        enum:["Import","Export"],
        default:"Export"
    },

    tradeValue:{
        type:Number,
        default:0
    },

    shipments:{
        type:Number,
        default:0
    },

    topProduct:String,

    hsCode:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HSCode"
    },

    growth:{
        type:Number,
        default:0
    }

},{timestamps:true});

module.exports = mongoose.model("TradeRoute", tradeRouteSchema);