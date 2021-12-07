const dotEnv = require('dotenv');
dotEnv.config();
var express = require("express");
const { route } = require("../../app");
var router = express.Router();
const middleWare = require("../../middleWares/userAuth");
const userEntryControllers = require('../../controllers/user/userEntry')
// --------------------END OF THE REQUIREMENTS------------------------------\\

// HOME PAGE RENDERNG 
router.get("/", middleWare.getUser, (req, res) => {
  req.session.lastRouter = '/';

   res.render("user/home" , {logStatus:req.session.loginStatus ,});
});

// res.render("user/home");

// CREATE ACCOUNT PAGE RENDRING
router.get("/createAccount", middleWare.dontBringToSingupPage, (req, res) => {
  res.render("user/createAccout");
});

// SIGNUP PAGE RENDERING 
router.get("/signup", middleWare.dontBringToSingupPage, (req, res) => {
  res.render("user/signup");
});

// TO CHECK THE PHONE NUMBER IS VALID OR NOT OF A NEW USER
router.post('/isValidPhone', async (req, res)=>{
  console.log("hellow router are wornng")
   try{
   res.json({status: await userEntryControllers.sendOtpToUser(req.body.phone)}); 
   }catch(err){
    res.json({status:err});
   }
})

// TO CHECK THE OTP 
router.post('/otp', async (req,res)=>{
      var result = await userEntryControllers.checkOtp(req.body.phone , req.body.otp)
      res.json({status : result.status  , phone:req.body.phone });
})

//CREATE AN ACCOUNT FOR NEW USE IN THE CASE OF TEH PHONE NUMBER AN EMAIL ID IS NOT EXISTSING
router.post("/createAccountPost", async (req, res) => {
  console.table(req.body);
  req.body.password = await middleWare.hashPassword(req.body.password);
  try{
      var result = await userEntryControllers.insertUser(req.body)
      res.json({status : true});
  }catch(err){
    res.json({ status : err})
  }
    
});

// SEND OTP FOR THE EXISTING USER TO LOGIN
router.post("/otpSignUp" , async(req,res)=>{
  var result = await userEntryControllers.sendOtpToExistingUser(req.body.phone);
  res.json({status:result });
})
module.exports = router;

// OTP CHECKING FOR THE EXISTING USER AND GAVE JWT SESSION TO  THE USER ID 
router.post('/otpCheckForExistUser', async (req,res)=>{
  var result = await await userEntryControllers.checkOtp(req.body.phone , req.body.otp) ;
  req.session.uid = result.userId;
  res.json({status :result.status});
})

//TO CHECK THE USER SIGNUP WITH PASSWORD AND EMAIL;
router.post('/signupWithEmail', async (req,res)=>{
  var result =  await userEntryControllers.checkUserSignup(req.body.email , req.body.password)
  if(result.status == true ){
    req.session.uid = result.data._id;
    res.json({status:result.status})
  }else{
      res.json({status:result});
  }
})

// TO LOGOUT OF THE USER
router.get('/logout', (req,res)=>{
    delete  req.session.uid;
})


