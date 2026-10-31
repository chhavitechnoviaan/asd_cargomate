const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({

  companyName:{
    type:String,
    required:true
  },

  location:{
    country:String,
    state:String,
    city:String
  },

  buyerType:{
    type:String,
    enum:[
      "Importer",
      "Distributor",
      "Retailer",
      "Wholesaler",
      "E-commerce"
    ],
    default:"Importer"
  },

  products:[
    String
  ],

  hsCodes:[
    String
  ],

  product:String,

  tradeVolume:{
    type:Number,
    default:0
  },

  totalShipments:{
    type:Number,
    default:0
  },

  buyerScore:{
    type:Number,
    default:0
  },

  avgGrowth:{
    type:Number,
    default:0
  },

  orders:{
    type:Number,
    default:0
  },

  status:{
    type:String,
    enum:[
      "Active",
      "Pending",
      "Inactive"
    ],
    default:"Active"
  },

  verified:{
    type:Boolean,
    default:false
  },

  email:String,

  phone:String,

  website:String,

  contactPerson:String,

  joinedOn:{
    type:Date,
    default:Date.now
  },

  lastTrade:Date

},{
  timestamps:true
});

module.exports=mongoose.model("Buyer",buyerSchema);