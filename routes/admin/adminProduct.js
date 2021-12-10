const express = require('express');
const router =  express.Router();
const fs = require("fs");
const catagory = require('../../controllers/admin/adminCatagory');
const product = require('../../controllers/admin/adminProduct')

//RENDERING THE PRODUCT- LIST PAGE;
router.get('/',async (req,res)=>{
     res.render("admin/productListAdmin" , {data : await product.getProduct()});
})

//RENDERIN  THE PRODUCT - ADDING PAGE ;
router.get('/addproucts', async (req,res)=>{
     res.render('admin/addproducts' , {data: await catagory.getAllCatagory()});
})

//ADD PRODUCT ROUTER
router.post('/addProduct', async (req,res)=>{
    res.json({status :await   product.addProduct(req.body)});  
})

//ROUTER TO ADD IMAGE IN COLUDNARY 
router.post('/uploadImage',async (req,res)=>{
     res.json({status: await product.uploadImage(req.body)})
})

module.exports = router
