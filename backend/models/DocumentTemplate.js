const mongoose=require("mongoose");

const documentTemplateSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    category:String,

    fileUrl:String,

    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }

},{
    timestamps:true
});

module.exports=mongoose.model(
    "DocumentTemplate",
    documentTemplateSchema
);