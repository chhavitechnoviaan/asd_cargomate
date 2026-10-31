const mongoose=require("mongoose");

const notificationSettingSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        unique:true
    },

    shipment:{
        type:Boolean,
        default:true
    },

    compliance:{
        type:Boolean,
        default:true
    },

    finance:{
        type:Boolean,
        default:true
    },

    system:{
        type:Boolean,
        default:true
    },

    email:{
        type:Boolean,
        default:true
    },

    push:{
        type:Boolean,
        default:true
    },

    smartDigest:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

module.exports=mongoose.model(
    "NotificationSetting",
    notificationSettingSchema
);