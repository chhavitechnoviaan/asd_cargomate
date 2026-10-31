const mongoose=require("mongoose");

const helpCategorySchema=new mongoose.Schema({

    name:String,

    icon:String,

    description:String

});

module.exports=mongoose.model(
    "HelpCategory",
    helpCategorySchema
);