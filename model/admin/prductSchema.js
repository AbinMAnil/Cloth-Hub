const mongoose = require('mongoose');
const schema = mongoose.Schema;
// {{ creating the struecture of the size Varient array}}

const pruductScheme = new schema ( {
     productName: {
          type: String,
          required:true
     },
     brand: {
          required :true ,
          type : String
     },
     catagory:{
          type:String,
          required:true
     },
     subCatagory:{
          type:String,
          required:true
     },
     image:{
          type:Array,
          required:true
     },

     discription :{
          type:String,
          required:false
     },
     color:{
          required:true,
          type:Array
     },
     size:{
          required:true,
          type:Array
     },
     price : {
          required:true,
          type:Number
     },
     quantity : {
          required:true,
          type : Number
     }
} , {timestamps:true});

const productModel = mongoose.model('product', pruductScheme);
module.exports = productModel;