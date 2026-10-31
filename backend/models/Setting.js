const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    language:{
        type:String,
        default:"English"
    },

    timezone:{
        type:String,
        default:"Asia/Kolkata"
    },

    currency:{
        type:String,
        default:"INR"
    },

    theme:{
        type:String,
        enum:["Light","Dark","System"],
        default:"Light"
    },

    dashboardLayout:{
        type:String,
        default:"Default"
    },

    units:{
        type:String,
        default:"Metric"
    },
    defaultCountry:String,

    defaultPage:{
        type:String,
        default:"Dashboard"
    },

    itemsPerPage:{
        type:Number,
        default:25
    },
    emailNotification:{
        type:Boolean,
        default:true
    },
    billingEmail: {
  type: String,
  default: ""
},

billingCompanyName: {
  type: String,
  default: ""
},

billingGstNumber: {
  type: String,
  default: ""
},

    pushNotification:{
        type:Boolean,
        default:true
    },

    smsNotification:{
        type:Boolean,
        default:false
    },
    twoFactorAuth:{
        type:Boolean,
        default:false
    },

    sessionTimeout:{
        type:Number,
        default:30
    },

    apiKey:String

},{
    timestamps:true
});

module.exports=mongoose.model("Setting",settingSchema);