const dotEnv = require("dotenv");
dotEnv.config();
var express = require("express");
const { route } = require("../../app");
var router = express.Router();
const middleWare = require("../../middleWares/userAuth");
const userEntryControllers = require("../../controllers/user/userEntry");
const catagory = require("../../controllers/admin/adminCatagory");
const cart = require("../../controllers/user/cart");
const gustUserCart = require("../../model/user/gustUser");
const userCart = require("../../model/user/cart");
const adminProducts = require("../../controllers/admin/adminProduct");
// --------------------END OF THE REQUIREMENTS------------------------------\\

// HOME PAGE RENDERNG
router.get("/", middleWare.getUser, async (req, res) => {
  req.session.lastRouter = "/";

  res.render("user/home", {
    logStatus: req.session.loginStatus,
    catagory: await catagory.getAllCatagory(),
    recentProducts: await adminProducts.sortDate(parseInt(-1)),
    trend: await adminProducts.trendingProduts(),
  });
});

// ROUTER T0 GET CART COUNT OF THE ALL  TYPE OF USER
router.post("/getCartCount", async (req, res) => {
  if (req.session.uid) {
    res.json({
      count: await userEntryControllers.getCartCount(req.session.uid, userCart),
    });
  } else {
    res.json({
      count: await userEntryControllers.getCartCount(req.body.id, gustUserCart),
    });
  }
});

// res.render("user/home");

// CREATE ACCOUNT PAGE RENDRING
router.get("/createAccount", middleWare.dontBringToSingupPage, (req, res) => {
  console.log(req.query.refId);

    res.render("user/createAccout", {refId : req.query.refId} );
  // console.log(req.cookies);
  // res.cookie("demo", "hello world", {
  //   maxAge: 100000000000000000000,
  // });
  
});

// SIGNUP PAGE RENDERING
router.get("/signup", middleWare.dontBringToSingupPage, (req, res) => {
  res.render("user/signup");
});

// TO CHECK THE PHONE NUMBER IS VALID OR NOT OF A NEW USER
router.post("/isValidPhone", async (req, res) => {
  
  try {
    res.json({
      status: await userEntryControllers.sendOtpToUser(req.body.phone),
    });
  } catch (err) {
    res.json({ status: err });
  }
});

// TO CHECK THE OTP
router.post("/otp", async (req, res) => {
  console.log(req.body.gustUserId);
  var result = await userEntryControllers.checkOtpforNewUser(
    req.body.phone,
    req.body.otp
  );
  res.json({ status: result.status, phone: req.body.phone });
});


//CREATE AN ACCOUNT FOR NEW USE IN THE CASE OF TEH PHONE NUMBER AN EMAIL ID IS NOT EXISTSING
router.post("/createAccountPost", async (req, res) => {
  req.body.password = await middleWare.hashPassword(req.body.password);
  try {
    var result = await userEntryControllers.insertUser(req.body);
    req.session.uid = result._id;
    res.json({ status: true });
  } catch (err) {
    res.json({ status: err });
  }
});

// SEND OTP FOR THE EXISTING USER TO LOGIN
router.post("/otpSignUp", async (req, res) => {
  var result = await userEntryControllers.sendOtpToExistingUser(req.body.phone);
  res.json({ status: result });
});
module.exports = router;

// OTP CHECKING FOR THE EXISTING USER AND GAVE JWT SESSION TO  THE USER ID
router.post("/otpCheckForExistUser", async (req, res) => {
  var result = await await userEntryControllers.checkOtp(
    req.body.phone,
    req.body.otp
  );


  req.session.uid = result.userId;
  res.json({ status: result.status  });
});

//TO CHECK THE USER SIGNUP WITH PASSWORD AND EMAIL;
router.post("/signupWithEmail", async (req, res) => {
  var result = await userEntryControllers.checkUserSignup(
    req.body.email,
    req.body.password
  );
  if (result.status == true) {
    req.session.uid = result.data._id;
    // function to shift item to gust cart to user actual cart;
    cart.shiftItem(req.body.gustUserId, req.session.uid);
    res.json({ status: result.status });
  } else {
    res.json({ status: result });
  }
});

// TO LOGOUT OF THE USER
router.get("/logout", (req, res) => {
  delete req.session.uid;
  res.redirect("/");
});

// TO RENDER THE  USER PROFILE
router.get("/userProfile", async (req, res) => {
  res.render("user/userProfile", {
    logStatus: req.session.loginStatus,
    catagory: await catagory.getAllCatagory(),
    user: await userEntryControllers.getUserById(req.session.uid),
  });
});

// TO EDIT THE USER PROFILE
router.post("/eidtProfile", (req, res) => {
  res.json({
    status: userEntryControllers.editProfile(req.session.uid, req.body),
  });
});

//ROUTER TO CHECK PASSWORD
router.post("/checkPassword", userEntryControllers.changePassword);

//ROTUER TO CHAGE THE PASSWORD
router.post("/changePassword", userEntryControllers.confirmPasswordLast);

//ROUTER TO GET DETAIL OF USE
router.post("/getDetailsOFUser", async (req, res) => {
  res.json({ data: await userEntryControllers.getUserById(req.session.uid) });
});

// ROUTER TO RENDER THEWISH LIST OF THE USER
router.get("/wishlist", userEntryControllers.showWishlist);

//ROUTER TO ADD TO WISH LIST IF USER IS LOGED IN ;
router.post("/addToWishlist", userEntryControllers.addToWishlist);

//ROUTER TO DELETE ITEM FORM WISHLIST
router.delete("/removeFormWishlist", userEntryControllers.removeFromWishlist);

// ROUTER TO SHOW CATAGORY WISE AND SUBCATAGORY ;
module.exports = router;
