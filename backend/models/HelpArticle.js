const mongoose=require("mongoose");

const helpArticleSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    slug:{
        type:String,
        unique:true
    },

    category:{
        type:String
    },

    content:String,

    views:{
        type:Number,
        default:0
    }

},{
    timestamps:true
});

module.exports=mongoose.model(
    "HelpArticle",
    helpArticleSchema
);