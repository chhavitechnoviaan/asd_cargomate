const Subscription=require("../models/Subscription");
const Usage=require("../models/SubscriptionUsage");
const KEYS=["aiChatbot","hsLookup","incentiveChecker","shipmentPlanning","shipmentCost","governmentSchemes","countryRules","tradeResearch"];
const DEFAULTS={user:{Basic:[50,50,10,5,5,10,10,0],Premium:[200,200,50,20,25,50,50,0],Platinum:[500,500,150,50,100,150,150,0]},b2b:{Basic:[100,100,20,10,10,20,20,10],Premium:[400,500,100,50,50,100,100,50],Platinum:[1000,2000,500,200,200,300,500,200]}};
const defaults=(audience,tier)=>Object.fromEntries(KEYS.map((k,i)=>[k,DEFAULTS[audience]?.[tier]?.[i]??0]));
const isTestingFree=()=>process.env.FREE_TESTING_UNLIMITED==="true";
const cycleStart=(sub,now=new Date())=>{const start=new Date(sub.startDate||sub.createdAt);const anchor=new Date(start);while(true){const next=new Date(anchor);next.setUTCMonth(next.getUTCMonth()+1);if(next>now)break;anchor.setTime(next.getTime());}return anchor;};
const current=async userId=>Subscription.findOne({userId,status:"Active",expiryDate:{$gt:new Date()}}).sort({createdAt:-1}).populate("planId");
const limits=plan=>({...(plan?.featureLimits?.toObject?.()||plan?.featureLimits||defaults(plan?.audience||"user",plan?.tier||"Basic"))});
async function consume(userId,feature){if(!KEYS.includes(feature))throw new Error("Unknown feature");const sub=await current(userId);if(!sub){if(isTestingFree())return {unlimited:true};const e=new Error("Active subscription required");e.status=402;throw e;}
 const max=Number(limits(sub.planId)[feature]??0),start=cycleStart(sub),filter={userId,subscriptionId:sub._id,feature,cycleStart:start};
 if(!Number.isFinite(max)||max<0)throw new Error("Invalid feature limit");
 if(max===0){const e=new Error("Feature unavailable in your plan");e.status=403;throw e;}
 const doc=await Usage.findOneAndUpdate({...filter,used:{$lt:max}},{$inc:{used:1}},{new:true});if(doc)return {used:doc.used,limit:max};
 try{await Usage.create({...filter,used:1});return {used:1,limit:max};}catch(err){if(err.code!==11000)throw err;const retry=await Usage.findOneAndUpdate({...filter,used:{$lt:max}},{$inc:{used:1}},{new:true});if(retry)return {used:retry.used,limit:max};}
 const e=new Error("Monthly limit reached. Upgrade your plan or wait for reset.");e.status=429;throw e;
}
async function summary(userId){const sub=await current(userId);if(!sub)return {subscription:null,unlimitedFreeTesting:isTestingFree()};const start=cycleStart(sub);const rows=await Usage.find({userId,subscriptionId:sub._id,cycleStart:start}).lean();return {subscription:sub,cycleStart:start,features:Object.fromEntries(KEYS.map(k=>{const limit=Number(limits(sub.planId)[k]||0),used=rows.find(r=>r.feature===k)?.used||0;return [k,{limit,used,remaining:Math.max(0,limit-used)}]}))};}
module.exports={KEYS,defaults,consume,summary,current,isTestingFree};
