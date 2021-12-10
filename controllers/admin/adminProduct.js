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


// function to upload the image to cloudinary;
function uploadImage(){
     return  new Promise((resolve ,reject)=>{

     })
}


module.exports = {
  addProduct: (data) => {
    return new Promise(async (resolve, reject) => {
     //  let { productName, brand, catagory, subCatagory, discription, varient } =data;
      data.varient = JSON.parse(data.varient);
      console.log(typeof(data));
     
       try{
          var packProduct = product(data);
          var result = await packProduct.save()
          resolve(true);
       }catch(err){
           console.log(err)
           resolve("sorry somthing went wrong  please try againg ");
           location.reload();
       }
       
    });
  },

  // {{ to upload image while selecting the image }};
  uploadImage:(data)=>{
       return new Promise((resolve, reject)=>{
            // {{if the  an image id is existing it will distroy first the iamge form cloudnary }}
            if(data.productId != ""){
               cloudinary.uploader.destroy(data.productId, function(error,result) {
                    console.log(result, error) });
            }
          var temData  = data.base64.split(';base64,').pop();
          var uploadStr = "data:image/jpeg;base64," +temData;
         cloudinary.uploader.upload(uploadStr , (err , result)=>{
              if(err)console.log(err);
              else{
                   var urlAndId ={
                        url:result.secure_url,
                        publicId : result.public_id
                   }
                  resolve(urlAndId);
              }
       })
    })
  },

  getProduct:()=>{
    return new Promise(async (resolve , reject)=>{
      resolve(
      await product.find()
      )
    })
  }

    

  }
