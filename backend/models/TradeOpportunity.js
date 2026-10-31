const mongoose=require("mongoose");

const tradeOpportunitySchema=new mongoose.Schema({

opportunityId:{
type:String,
unique:true
},

hsCode:{
type:mongoose.Schema.Types.ObjectId,
ref:"HSCode"
},

product:String,

country:String,

tradeType:{
type:String,
enum:["Import","Export"]
},

opportunityType:{
type:String,
enum:[
"Unmet Demand",
"Supplier Gap",
"Price Advantage",
"Market Growth"
]
},

tradeValue:{
type:Number,
default:0
},

opportunityScore:{
type:Number,
default:0
},

growthPotential:{
type:String,
enum:["Low","Medium","High"],
default:"Medium"
},

competitionLevel:{
type:String,
enum:["Low","Medium","High"],
default:"Medium"
},

demandValue:{
type:Number,
default:0
},

supplyValue:{
type:Number,
default:0
},

gapValue:{
type:Number,
default:0
},

saved:{
type:Boolean,
default:false
},

status:{
type:String,
enum:["New","Converted","Closed"],
default:"New"
}

},{timestamps:true});

module.exports=mongoose.model("TradeOpportunity",tradeOpportunitySchema);