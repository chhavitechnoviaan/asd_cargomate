const mongoose = require("mongoose");

const tradeInvoiceSchema = new mongoose.Schema({

  invoiceNumber:{
    type:String,
    required:true,
    unique:true
  },

  invoiceDate:{
    type:Date,
    default:Date.now
  },

  dueDate:Date,

  party:{
    type:String,
    required:true
  },

  type:{
    type:String,
    enum:[
      "Commercial Invoice",
      "Proforma Invoice",
      "Tax Invoice",
      "Service Invoice"
    ],
    default:"Commercial Invoice"
  },

  country:String,

  invoiceValue:{
    type:Number,
    default:0
  },

  currency:{
    type:String,
    default:"INR"
  },

  status:{
    type:String,
    enum:[
      "Paid",
      "Pending",
      "Overdue",
      "Cancelled"
    ],
    default:"Pending"
  },

  shipment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Shipment"
  },

  remarks:String,

  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

},{
  timestamps:true
});

module.exports=mongoose.model("TradeInvoice",tradeInvoiceSchema);