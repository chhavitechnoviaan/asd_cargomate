const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

company:String,

subtitle:String,

type:{
type:String,
enum:["buyer","seller"]
},

verified:{
type:Boolean,
default:false
},

location:{
city:String,
state:String,
country:String
},

product:String,

tradeFrequency:{
type:String,
enum:["high","medium","low"]
},

tradeVolume:Number,

orders:Number,

lastActivity:Date,

cinNumber:String,

website:String,

industry:String,

businessType:String,

establishedYear:Number,

employees:String,

annualTurnover:{
type:Number,
default:0
},

exportTurnover:{
type:Number,
default:0
},

importTurnover:{
type:Number,
default:0
},

netProfit:{
type:Number,
default:0
},

exportRatio:{
type:Number,
default:0
},

totalShipments:{
type:Number,
default:0
},

avgShipmentValue:{
type:Number,
default:0
},

leadTime:{
type:Number,
default:0
},

products:[
String
],

partners:[
String
]

},{timestamps:true});

module.exports=mongoose.model("Company",companySchema);