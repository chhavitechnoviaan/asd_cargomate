const mongoose = require("mongoose");

const shipmentDocumentSchema = new mongoose.Schema({

    shipmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shipment",
        required:true
    },

    documentName:{
        type:String,
        required:true
    },

    documentType:{
        type:String,
        enum:[
            "Required",
            "If Applicable",
            "Not Required"
        ],
        default:"Required"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Uploaded",
            "Verified",
            "Rejected",
            "Expired",
            "In Transit",
            "Not Required"
        ],
        default:"Pending"
    },

    

    fileUrl:String,

    fileName:String,

    fileSize:String,

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    country:String,

relatedTo:{
    type:String,
    default:"Shipment"
},

uploadedDate:{
    type:Date,
    default:Date.now
},

verifiedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},

verifiedDate:Date,

    expiryDate:Date,

    remarks:String,

    required:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports=mongoose.model(
    "ShipmentDocument",
    shipmentDocumentSchema
);