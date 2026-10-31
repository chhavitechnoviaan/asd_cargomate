const mongoose=require("mongoose");

const riskAnalysisSchema=new mongoose.Schema({

shipment:{
type:mongoose.Schema.Types.ObjectId,
ref:"Shipment"
},

country:String,

hsCode:{
type:mongoose.Schema.Types.ObjectId,
ref:"HSCode"
},

riskCategory:{
type:String,
enum:[
"Political",
"Regulatory",
"Economic",
"Security",
"Supply Chain",
"Compliance",
"Natural Disaster"
]
},

riskLevel:{
type:String,
enum:[
"Very Low",
"Low",
"Medium",
"High",
"Very High"
],
default:"Low"
},

riskScore:{
type:Number,
default:0
},

riskFactors:[
String
],

estimatedImpact:{
type:Number,
default:0
},

status:{
type:String,
enum:[
"Open",
"Resolved",
"Monitoring"
],
default:"Open"
}

},{timestamps:true});

module.exports=mongoose.model("RiskAnalysis",riskAnalysisSchema);