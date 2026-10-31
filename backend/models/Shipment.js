  const mongoose = require("mongoose");

  const shipmentSchema = new mongoose.Schema({

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  
    sbNumber: {
      type: String,
      unique: true
    },
  
    exporter: {
      companyName: String,
      iecNumber: String,
      contactPerson: String,
      mobile: String
    },
  
    importer: {
      companyName: String,
      iecNumber: String,
      contactPerson: String,
      mobile: String
  },

  referenceNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  
  createdByRole: {
    type: String,
    enum: ["Admin", "User", "B2B"],
    default: "User"
  },
  
  customerType: {
    type: String,
    enum: ["Individual", "Company"],
    default: "Individual"
  },
  
  b2bCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null
  },
  
  assignedAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  
  currentStep: {
    type: Number,
    default: 1
  },


buyer:{

  buyerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Buyer"
  },

  companyName:String,

  country:String

},

cargo: {
  productName: String,

  description: String,

  hsCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HSCode"
  },

  cargoType: {
    type: String,
    enum: ["General", "Dangerous", "Perishable", "Live"],
    default: "General"
  },

  weight: Number,

  grossWeight: Number,

  netWeight: Number,

  quantity: Number,

  volumeCBM: Number,

  value: Number,

  currency: {
    type: String,
    default: "INR"
  }
},
    route: {

      originCountry: String,

originCity: String,

destinationCountry: String,

destinationCity: String,

warehouse: String,
      mode:{
          type:String,
          enum:["Air","Sea","Road"]
      }
  
  },
  leadTime:{
    type:Number,
    default:0
},

shipmentDate:{
  type:Date,
  default:Date.now
},


  
    etd: Date,
    eta: Date,
  
    shipmentStatus: {
      type: String,
      enum: [
        "Draft",
        "Submitted",
        "Pending Admin Approval",
        "Approved",
        "Carrier Assigned",
        "Pickup Scheduled",
        "Picked Up",
        "Warehouse Received",
        "Customs Documentation",
        "Customs Clearance",
        "In Transit",
        "Arrived at Destination",
        "Out for Delivery",
        "Delivered",
        "Closed"
      ],
      default: "Draft"
    },

    approvalStatus: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
        "Correction Required"
      ],
      default: "Pending"
    },
  
    documentStatus: {
      type: String,
      enum: [
        "Pending",
        "Uploaded",
        "Under Review",
        "Verified",
        "Rejected"
      ],
      default: "Pending"
    },
  
    amount: Number,
    vendor: String,
    estimatedCost: {
      type: Number,
      default: 0
    },
    
    paidAmount: {
      type: Number,
      default: 0
    },
    
    balanceAmount: {
      type: Number,
      default: 0
    },
    
    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Partially Paid",
        "Paid",
        "Failed",
        "Refunded",
        "Overdue"
      ],
      default: "Pending"
    },

    trackingStatus: {
      type: String,
      enum: [
        "Not Started",
        "Tracking Active",
        "Completed"
      ],
      default: "Not Started"
    },

    exceptionStatus: {
      type: String,
      enum: [
        "None",
        "On Hold",
        "Delayed",
        "Cancelled",
        "Customs Issue",
        "Payment Pending",
        "Document Pending"
      ],
      default: "None"
    },

    approvedAt: Date,

deliveredAt: Date,

closedAt: Date,
    
    supplier:{

      supplierId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Supplier"
      },
  
      companyName:String,
  
      country:String
  
  },
  notes:{
    type:String,
    default:""
    },

    additionalInformation:{

      packagingType:String,
      
      packages:Number,
      
      marksNumbers:String,
      
      dangerousGoods:{
      type:Boolean,
      default:false
      },
      
      specialHandling:{
      type:Boolean,
      default:false
      },
      
      temperatureControl:{
      type:Boolean,
      default:false
      }
      
      },

      carrier: {
        name: String,
        code: String,
        contactPerson: String,
        mobile: String,
        email: String
      },
      
      assignedCarrierAt: Date,
      
      assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      statusHistory: [
        {
          status: String,
      
          updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
      
          remarks: String,
      
          updatedAt: {
            type: Date,
            default: Date.now
          }
        }
      ],

      invoice: {
        invoiceNumber: String,
        invoiceDate: Date,
        invoiceValue: Number,
        currency: String
      },
      
      paymentTerms: {
        type: String,
        default: ""
      },

      insuranceRequired: {
        type: Boolean,
        default: false
      },

      aiAnalysis: {
        riskLevel: String,
        freightEstimate: Number,
        estimatedTransit: String,
        requiredDocuments: [String],
        analyzedAt: Date
      },

      currentLocation: {
        country: String,
        city: String,
        latitude: Number,
        longitude: Number
      },

    awbNumber: String,
    
    incoterm: String,
    
    totalVolume: Number,
    
    transitTime: String,
    
    lastStatusUpdatedAt: {
      type: Date,
      default: Date.now
    },
  
  }, { timestamps: true });

shipmentSchema.index({ shipmentStatus: 1 });

shipmentSchema.index({ approvalStatus: 1 });

shipmentSchema.index({ userId: 1 });

shipmentSchema.index({ createdAt: -1 });

  module.exports = mongoose.model("Shipment", shipmentSchema);