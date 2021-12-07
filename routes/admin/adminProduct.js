const express = require('express');
const router =  express.Router();


//RENDERING THE PRODUCT- LIST PAGE;
router.get('/',(req,res)=>{
     res.render("admin/productListAdmin");
})

//RENDERIN  THE PRODUCT - ADDING PAGE ;
router.get('/addproucts',(req,res)=>{
     res.render('admin/addproducts' , {data:[]});
})

module.exports = router
