const mongoose=require("mongoose");
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},subscriptionId:{type:mongoose.Schema.Types.ObjectId,ref:"Subscription",required:true},feature:{type:String,required:true},cycleStart:{type:Date,required:true},used:{type:Number,default:0,min:0}},{timestamps:true});
schema.index({userId:1,subscriptionId:1,feature:1,cycleStart:1},{unique:true});
module.exports=mongoose.model("SubscriptionUsage",schema);
