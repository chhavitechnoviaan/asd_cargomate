const mongoose=require("mongoose");
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},planId:{type:mongoose.Schema.Types.ObjectId,ref:"Plan",required:true},orderId:{type:String,required:true,unique:true},paymentId:{type:String,unique:true,sparse:true},amountPaise:{type:Number,required:true},status:{type:String,enum:["Created","Paid","Failed"],default:"Created"},verifiedAt:Date},{timestamps:true});
module.exports=mongoose.model("SubscriptionPayment",schema);
