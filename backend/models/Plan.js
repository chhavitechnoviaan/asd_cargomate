
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  audience: {type:String,enum:["user","b2b"],default:"user"},
  tier: {type:String,enum:["Basic","Premium","Platinum"],default:"Basic"},
  featureLimits: {type:Map,of:Number,default:{}},
  trialDays:{type:Number,default:7},

  planType: {
    type: String,
    enum: ["monthly", "yearly"]
  },

  price: Number,

  billingCycle: String, // per month / per year

  description: String,

  features: [{type:String}],

  limits: {
    shipmentLimit: Number,
    userLimit: Number,
    apiLimit: Number,
    storageLimit: Number
  },



  isPopular: Boolean,
  isRecommended: Boolean,

  



duration: Number,



hsLookupLimit: Number,

storageLimit: Number,

aiQueryLimit: Number,

status: {
    type: String,
    enum: [
        "active",
        "inactive"
    ],
    default: "active"
}

},

 { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);