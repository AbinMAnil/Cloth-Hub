const express = require('express');
const router =  express.Router();
const fs = require("fs");
const catagory = require('../../controllers/admin/adminCatagory');

//RENDERING THE PRODUCT- LIST PAGE;
router.get('/',(req,res)=>{
     res.render("admin/productListAdmin");
})

//RENDERIN  THE PRODUCT - ADDING PAGE ;
router.get('/addproucts', async (req,res)=>{
     res.render('admin/addproducts' , {data: await catagory.getAllCatagory()});
})

//ADD PRODUCT ROUTER
router.post('/addProduct', async (req,res)=>{
     var obj =  JSON.parse( req.body.varient)
     let{image , color ,sizeVarient } = obj; 
    var base64  = image[0].split(';base64,').pop();
    fs.writeFile('./public/images/admin/productImages/img1.png', base64 , {encoding : 'base64'} ,(err)=>{
         if(err)console.log(err);
         else{
          console.log("Image Cateated");
         }
    })

    
})

module.exports = router
