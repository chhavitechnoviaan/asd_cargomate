const mongoose=require("mongoose");

const shipmentPartySchema=new mongoose.Schema({

shipmentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Shipment"
},

type:{
type:String,
enum:["Exporter","Importer","Notify"]
},

companyName:String,

country:String,

address:String,

email:String,

phone:String,

gst:String,

iec:String

},{timestamps:true})

module.exports=mongoose.model("ShipmentParty",shipmentPartySchema)