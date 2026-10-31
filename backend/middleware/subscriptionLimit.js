const {consume}=require("../services/subscriptionFeatures");
module.exports=feature=>async(req,res,next)=>{try{await consume(req.user._id,feature);next();}catch(e){res.status(e.status||500).json({status:0,message:e.message});}};
