const mongoose=require("mongoose");

const shipmentAlertSchema=new mongoose.Schema({

shipment:{
type:mongoose.Schema.Types.ObjectId,
ref:"Shipment"
},

title:String,

message:String,

type:{
type:String,
enum:["Info","Warning","Critical"]
},

isRead:{
type:Boolean,
default:false
}

},{timestamps:true});

module.exports=mongoose.model("ShipmentAlert",shipmentAlertSchema);