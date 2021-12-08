const product = require("../../model/admin/prductSchema");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId();
const cloudinary = require("../../API/cloudnary");

// {{ to chekck that the product is already exist in the collections}};

function getProduct(productName, brand) {
  return new Promise(async (resolve, reject) => {
    var reuslt;
    if (productName != "" && brand != "") {
      result = await product.find({
        productName: productName,
        brand: brand,
      });
    } else {
      reuslt = await product.find();
    }
    if (result == "") resolve(null);
    else {
      resolve(result);
    }
  });
}

module.exports = {
  addProduct: (data) => {
    return new Promise(async (reslove, reject) => {
      let { productName, brand, catagory, subCatagory, discription, varient } =data;
     var obj = JSON.parse(varient);
     // the only way is use notation;
     var fistVarientImageArray = [];
     var secondVarientImageArray = [];
     var mainVarient = [];

     console.log(obj[0].image.length);
     for(var i =0 ;i< obj[0].image.length ;i++){
          var base64  = obj[0].image[i].split(';base64,').pop();
           var uploadStr = "data:image/jpeg;base64," +base64;
          cloudinary.uploader.upload(uploadStr , (err , result)=>{
               if(err)console.log(err);
               else{
                    console.log(result.secure_url);
                    fistVarientImageArray.push(result.secure_url);
               }
          })
     }
     for(var i =0 ;i< obj[1].image.length ;i++){
          var base64  = obj[1].image[i].split(';base64,').pop();
           var uploadStr = "data:image/jpeg;base64," +base64;
          cloudinary.uploader.upload(uploadStr , (err , result)=>{
               if(err)console.log(err);
               else{
                    console.log(result.secure_url);
                    secondVarientImageArray.push(result.secure_url);
               }
          })

     }
     if(obj.length == 1){
     var mainVarient1 =  {
          color:obj[0].color,
          images:firstVareintImageArray,
          sizeVarient : obj[0].sizeVarient,
     }
     mainVarient.push(mainVarient1)
    }else{
     var mainVarient2 =  {
          color:obj[1].color,
          images:firstVareintImageArray,
          sizeVarient : obj[1].sizeVarient,
     }
     mainVarient.push(mainVarient2);
    } ; 

    // saving products 
    var addPro = product({
         
    })
     

    });
  },
};
