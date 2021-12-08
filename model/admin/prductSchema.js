const mongoose = require('mongoose');
const schema = mongoose.Schema;
// {{ creating the struecture of the size Varient array}}

const sizeVarient = new schema({
     // sizeVarientId : mongoose.Types.ObjectId(),

     size:{
          type:Number,
          required:true,
     },
     quantity:{
          type:Number,
          required:true,
     },
     price:{
          type:Number,
          required:true
     }
})

//  {{ creating the structure of the reviews  array}}

const reviews = new schema({
     uid:{
          type:String,
          required:true
     },
     review:{
          type:String,
          required:true
     },
})



//  {{ creatating the structure of the varient array object}}

const varentSchema = new schema({
     // varientUniqueId:mongoose.Types.ObjectId(),//  to make every objectid uinque;

     color:{
          type:String,
          required:true
     },
     Image:{
          imageId: mongoose.Types.ObjectId(),
          type:Array,
          required:true
     },
     sizeVarient:[sizeVarient], 

     reviews:[reviews],

     starRating:{
          type:Object,
          required:false
     },
     status:{
          type:String,
          required:false
     }
})


// {{ creating the schema of the prducts }};

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
     qualities:{
          type:Array,
          required:false
     },
     varients:[varentSchema],

     discription :{
          type:String,
          required:true
     }
})

const productModel = mongoose.model('product', pruductScheme);
module.exports = productModel;