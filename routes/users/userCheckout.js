var express = require("express");
var router = express.Router();
const { route } = require("../../app");
const middleWare = require("../../middleWares/userAuth");
const  cart = require('../../controllers/user/cart')
const checkOut = require('../../controllers/user/checkout');

/*
router to show the chekout page of the user;
if the user is not signined it will send back to the signup page 
*/
router.get('/', checkOut.showCheckOut );
/*
router to place order with tempory address;
*/
router.post("/placeOrder", checkOut.placeOrder);

/* 
router to show the order history 
*/
router.get('/orderHistory' , checkOut.showHistory)
/*
router to cancel order for user 
*/
router.patch('/cancelOreder', checkOut.cancelorder)

module.exports = router;