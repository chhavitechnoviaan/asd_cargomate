const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:String,

    category:{
        type:String,
        enum:[
            "Invoice",
            "Shipment",
            "Payment",
            "Risk",
            "Partner",
            "Compliance",
            "Document",
            "System"
        ]
    },

    severity:{
        type:String,
        enum:[
            "Critical",
            "Warning",
            "Info"
        ],
        default:"Info"
    },

    status:{
        type:String,
        enum:[
            "Open",
            "Resolved",
            "Dismissed"
        ],
        default:"Open"
    },

    relatedModule:String,

    relatedId:{
        type:mongoose.Schema.Types.ObjectId
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    isRead:{
        type:Boolean,
        default:false
    },

    actionRequired:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Alert",alertSchema);