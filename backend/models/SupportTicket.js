const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    ticketId:{
        type:String,
        unique:true
    },

    subject:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:[
            "Shipment",
            "Document",
            "HS Code",
            "Freight",
            "Payment",
            "Other"
        ]
    },

    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High"
        ],
        default:"Medium"
    },

    status:{
        type:String,
        enum:[
            "Open",
            "In Progress",
            "Resolved",
            "Closed"
        ],
        default:"Open"
    },

    attachment:String

},{
    timestamps:true
});

module.exports=mongoose.model(
    "SupportTicket",
    supportTicketSchema
);