
const product = require("../../controllers/admin/adminProduct");
const porductModel = require('../../model/admin/prductSchema');
const catagory = require("../../controllers/admin/adminCatagory");
const cart = require("../../model/user/cart");
const mongoose = require("mongoose");
const productModel = require("../../model/admin/prductSchema");
const cartController = require('../../controllers/user/cart');
const userModel = require('../../model/user/userDataSchema');
const objectId = mongoose.Types.ObjectId;
const orderModel = require('../../model/admin/orderSchama')


 function generateUniqueId(){
     return Date.now().toString(36) + Math.random().toString(36).substr(2);
 }

 async  function addAddress(address , id){
     var toatalAddressCount = await userModel.findOne({_id: objectId(id)});
     if(toatalAddressCount.address.length >= 4 ) orderModel.updateOne(

          {
               _id: objectId(id)
          },
          {
              $unset : {
               'address.1' : 1
              }
          }
     )
     
     // save the address into users address array;
     var addressUpdate  = await userModel.updateOne(
          {
               _id : objectId(id),
          },
          {
               $addToSet:{
                    address:address
               }
          }
     
     ) 
 }
  
//  function to clear cart of the ordered users 
 async function clearCart(id){
     var result = await cart.updateOne(
          {
               userId : id
          },
          {
               product : []
          }
     )
}


//  function to reEntry of quantity of the ordered products
async function canelProductQuantityUpdate(product){
    
     for(var i = 0 ;i< product.length ;i++){
     var result = await productModel.updateOne(
          {
               _id : objectId(product[i].productId)
          },
          {
               $inc:{
                    quantity: product[i].quantity
               }
          }
     )
   


     }
}
 

module.exports = {
     // to show the checkout page 
     showCheckOut : async (req, res)=>{
          if(req.session.uid){
              
          res.render('user/checkOut' , {logStatus: req.session.loginStatus,
               catagory: await catagory.getAllCatagory(),
               
               product : await cartController.getCartForCheckOut(req.session.uid),
               user : await userModel.findOne({_id : objectId(req.session.uid)})
          }

               );
          }
          else{
               res.redirect('/signup')
          }
     },

     placeOrder : async (req,res)=>{
         var userId = req.body.userId;
         var paymentMethod = req.body.paymentMethod;
         var saveAddress =req.body.saveAddress ;
         delete req.body['saveAddress'];
         delete req.body['userId']
         delete req.body['paymentMethod']
          var cartProduct = await cartController.getCartForCheckOut(userId);
         try{
          var confirmOrder = orderModel({
               userId : objectId(userId),
               product: cartProduct.product,
               totalPrice : parseInt(cartProduct.grandTotal),
               paymentMethod : paymentMethod,
               address : req.body ,
               status : ['pending']
          
          });
          var result = await confirmOrder.save();
         
          // decrease the quantity of  the products from the product collections
         
         
          for(var i = 0 ;i< cartProduct.product.length ;i++){
               // decrease the quaitity
              productModel.updateOne(
                    {
                         _id : objectId(cartProduct.product[i].productId)
                    },
                    {
                         $inc :{
                              quantity: -parseInt(cartProduct.product[i].quantity)
                         }
                    }    
               );
          }

          // to clear the cart of the user;
          clearCart(userId)


          // to save the  address;
          if(saveAddress){
               req.body.addressUniqueId =  generateUniqueId()
               addAddress(req.body, userId);
          }
          res.json({status : true});

         // 
         }catch(err){
         res.json({status : false});
              
              console.log(err);
         }

     }, 

     showHistory :async (req,res)=>{
          
          res.render("user/orderConfirmed" ,{logStatus: req.session.loginStatus,
               catagory: await catagory.getAllCatagory() , 
               orders : await  orderModel.find({userId : req.session.uid})
          });
     },

     cancelorder :async (req,res)=>{

          // update the ordre status into cancel ;
          var result = await orderModel.updateOne(
               {
                    _id : objectId(req.body.orderId)
               },
               {
                    $push:{
                         status : "Cancel"
                    }
               }
          );
          var orderProduct = await orderModel.findOne({_id: objectId(req.body.orderId)});



          canelProductQuantityUpdate(orderProduct.product)
          if(result.modifiedCount == 1){
               res.json({status : true});
          }
     }

     
}