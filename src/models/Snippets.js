const mongoose=require('mongoose');
const codeSchema=new mongoose.Schema({
    title:{type:String,required:true},
    code:{type:String,required:true},
})
module.exports=mongoose.model('Snippets',codeSchema,'codes');