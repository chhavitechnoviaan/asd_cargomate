const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
      url:{
          type:String,
          default:""
      },
  
      public_id:{
          type:String,
          default:""
      }
  
  },
  { _id:false }
  );

const generalSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "CargoMate",
      trim: true,
    },

    websiteTitle: {
      type: String,
      default: "CargoMate Logistics",
    },

    description: {
      type: String,
      default: "",
    },

    socialUrl: {
      type: String,
      default: "",
    },

    systemLogo: imageSchema,

    loadingLogo: imageSchema,

    maintenanceMode: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const socialProviderSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: false,
    },

    clientId: {
      type: String,
      default: "",
    },

    clientSecret: {
      type: String,
      default: "",
    },

    redirectUrl: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const socialLoginSchema = new mongoose.Schema(
  {
    facebook: socialProviderSchema,
    google: socialProviderSchema,
  },
  { _id: false }
);

const aiSettingsSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      enum: ["Open AI", "Anthropic(Claude)", "Google AI"],
      default: "Open AI"
  },

    model: {
      type: String,
      default: "GPT-4",
    },

    apiKey: {
      type: String,
      default: "",
    },

    customInstructions: {
      type: String,
      default: "",
    },

    forceInstructions: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const smtpSchema = new mongoose.Schema({

  host:{
      type:String,
      default:""
  },

  port:{
      type:Number,
      default:587
  },

  encryption:{
      type:String,
      enum:["TLS","SSL","None"],
      default:"TLS"
  },

  username:{
      type:String,
      default:""
  },

  password:{
      type:String,
      default:""
  }

},{_id:false});



const smsSchema = new mongoose.Schema({

  provider:{
      type:String,
      default:"Twilio"
  },

  accountSID:{
      type:String,
      default:""
  },

  authToken:{
      type:String,
      default:""
  }

},{_id:false});

const emailSmsSchema = new mongoose.Schema(
  {
    smtp: smtpSchema,
    sms: smsSchema,
  },
  { _id: false }
);

const subscriptionSchema = new mongoose.Schema(
  {
    autoRenewal: {
      type: Boolean,
      default: true,
    },

    trialPeriod:{
      type:Number,
      default:14,
      min:0
  },
  },
  { _id: false }
);

const gatewaySchema=new mongoose.Schema({

  enabled:{
      type:Boolean,
      default:false
  },

  key:{
      type:String,
      default:""
  },

  secret:{
      type:String,
      default:""
  }

},{_id:false});

const paymentGatewaySchema=new mongoose.Schema({

  stripe:{
      type:gatewaySchema,
      default:()=>({})
  },

  razorpay:{
      type:gatewaySchema,
      default:()=>({})
  },

  paypal:{
      type:gatewaySchema,
      default:()=>({})
  }

},{_id:false});

const documentSchema = new mongoose.Schema(
  {
    invoiceTemplate: {
      type: String,
      default: "Template 1 - Modern",
    },

    documentPrefix: {
      type: String,
      default: "INV-",
    },
  },
  { _id: false }
);

const featureSchema=new mongoose.Schema({

  customers:{
      type:Boolean,
      default:true
  },

  tasks:{
      type:Boolean,
      default:true
  },

  support:{
      type:Boolean,
      default:true
  },

  leads:{
      type:Boolean,
      default:true
  }

},{_id:false});

const securitySchema = new mongoose.Schema(
  {
    authToken: String,

    captchaToken: String,

    reservedUsernames: {
      type: [String],
      default: ["admin", "root", "support"],
    },

    rememberMe: {
      type: Boolean,
      default: true,
    },

    autoLogin: {
      type: Boolean,
      default: true,
    },

    logoutOnPasswordChange: {
      type: Boolean,
      default: true,
    },

    autoLogoutTime: {
      type: String,
      default: "7 days",
    },

    maxActiveSessions: {
      type: Number,
      default: 3,
    },
  },
  { _id: false }
);

const miscSchema = new mongoose.Schema(
  {
    cronInterval: {
      type: String,
      default: "Every 5 minutes",
    },

    enableMailbox: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const noticeSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: true,
    },

    displayMode: {
      type: String,
      default: "List",
    },

    expirySystem: {
      type: String,
      default: "Never Expire",
    },

    visibilityControl: {
      type: String,
      default: "Staff",
    },

    priorityPinSystem: {
      type: String,
      default: "Priority",
    },
  },
  { _id: false }
);

const whatsappSchema = new mongoose.Schema({

  enabled: {
      type: Boolean,
      default: true
  },

  phoneNumberId: {
      type: String,
      default: ""
  },

  businessAccountId: {
      type: String,
      default: ""
  },

  appId: {
      type: String,
      default: ""
  },

  appSecret: {
      type: String,
      default: ""
  },

  accessToken: {
      type: String,
      default: ""
  },

  webhookVerifyToken: {
      type: String,
      default: ""
  }

}, { _id: false });

const adminSettingsSchema = new mongoose.Schema(
  {
    singleton:{
      type:String,
      unique:true,
      index:true,
      default:"ADMIN_SETTINGS"
  },

    general: {
      type: generalSettingsSchema,
      default: () => ({})
  },
  
  socialLogin: {
      type: socialLoginSchema,
      default: () => ({})
  },
  
  ai: {
      type: aiSettingsSchema,
      default: () => ({})
  },
  
  emailSms: {
      type: emailSmsSchema,
      default: () => ({})
  },
  
  subscription: {
      type: subscriptionSchema,
      default: () => ({})
  },
  
  paymentGateway: {
      type: paymentGatewaySchema,
      default: () => ({})
  },
  
  documents: {
      type: documentSchema,
      default: () => ({})
  },
  
  features: {
      type: featureSchema,
      default: () => ({})
  },
  
  security: {
      type: securitySchema,
      default: () => ({})
  },
  
  miscellaneous: {
      type: miscSchema,
      default: () => ({})
  },
  
  noticeBoard: {
      type: noticeSchema,
      default: () => ({})
  },
  
  whatsapp: {
      type: whatsappSchema,
      default: () => ({})
  },
  },
  {
    timestamps: true,
  }
);

adminSettingsSchema.statics.getSingleton = async function () {

  let settings = await this.findOne({
      singleton: "ADMIN_SETTINGS"
  });

  if (!settings) {
      settings = await this.create({});
  }

  return settings;
};

module.exports = mongoose.model("AdminSettings", adminSettingsSchema);