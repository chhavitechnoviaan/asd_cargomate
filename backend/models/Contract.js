const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({

    contractNo:{
        type:String,
        required:true,
        unique:true
    },

    contractName:{
        type:String,
        required:true
    },

    party:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            "Purchase",
            "Supply",
            "Service",
            "Other"
        ],
        default:"Purchase"
    },

    country:String,

    startDate:Date,

    endDate:Date,

    value:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "Draft",
            "Active",
            "Expiring Soon",
            "Expired",
            "Terminated"
        ],
        default:"Draft"
    },

    description:String,

    currency:{
        type:String,
        default:"INR"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Contract",contractSchema);