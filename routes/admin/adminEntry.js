const express = require('express')
const router = express.Router();
const middleWare = require('../../middleWares/adminAuth')


//HOME PAGE OF ADMIN
router.get('/' ,middleWare.adminCheck, (req,res)=>{
       req.session.adminLastRoute = "/"
       res.render("admin/homepage");

           
          
})

// SIGN UP PAGE OF ADMIN
router.get('/signup',( req,res , next)=>{
     res.render('admin/signup');
    
})

//SINGUP POST METHOD TO CHECK THE FORM 
router.post("/formSumbit", async (  req,res)=>{
     try{
     var result = await  middleWare.signUPAdmin(req.body.userName,req.body.password)
     req.session.adminId = result;
     res.json({status:true});
     }catch(err){
          console.log(err);
          res.json({status:err});
     }

})

router.get("/logout",(req,res)=>{
     delete req.session.adminId;
     res.json({status:true});
})



module.exports = router