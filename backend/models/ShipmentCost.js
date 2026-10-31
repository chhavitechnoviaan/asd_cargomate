const mongoose=require("mongoose");

const shipmentCostSchema=new mongoose.Schema({

shipmentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Shipment"
},

freight:Number,

insurance:Number,

customDuty:Number,

handling:Number,

other:Number,

total:Number

},{timestamps:true})

module.exports=mongoose.model("ShipmentCost",shipmentCostSchema)