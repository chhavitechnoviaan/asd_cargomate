const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:[
            "Shipment",
            "Compliance",
            "Finance",
            "System"
        ]
    },

    urgency:{
        type:String,
        enum:[
            "Critical",
            "Warning",
            "Information"
        ],
        default:"Information"
    },

    actionText:String,

    actionLink:String,

    isRead:{
        type:Boolean,
        default:false
    },

    type:{
        type:String,
        enum:[
            "Invoice",
            "Shipment",
            "Payment",
            "User",
            "Document",
            "Report",
            "System"
        ]
    },
    
    relatedId:{
        type:mongoose.Schema.Types.ObjectId
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Notification",notificationSchema);