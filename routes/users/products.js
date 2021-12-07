var express = require("express");
const { route } = require("../../app");
var router = express.Router();

router.get('/',(req,res)=>{
     res.send("welcome form scratch ");
})



module.exports = router;