const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({

    companyName:{
        type:String,
        required:true,
        trim:true
    },

    country:{
        type:String,
        required:true
    },

    supplierType:{
        type:String,
        enum:["Manufacturer","Exporter","Trader","Wholesaler"],
        default:"Manufacturer"
    },

    products:[
        {
            type:String
        }
    ],

    certifications:[
        {
            type:String
        }
    ],

    qualityScore:{
        type:Number,
        default:0
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    totalShipments:{
        type:Number,
        default:0
    },

    totalTradeValue:{
        type:Number,
        default:0
    },

    active:{
        type:Boolean,
        default:true
    },

    category:{
        type:String
    },
    
    hsCodes:[
        {
            type:String
        }
    ],
    
    contactPerson:{
        type:String
    },
    
    email:{
        type:String
    },
    
    phone:{
        type:String
    },
    
    website:{
        type:String
    },
    
    address:{
        type:String
    },
    
    supplierScore:{
        type:Number,
        default:0
    },
    
    status:{
        type:String,
        enum:[
            "Active",
            "Pending",
            "Rejected",
            "Expired"
        ],
        default:"Active"
    },
    
    joinedOn:{
        type:Date,
        default:Date.now
    },
    

},{
    timestamps:true
});

module.exports = mongoose.model("Supplier", supplierSchema);