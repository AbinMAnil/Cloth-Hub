var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const crypto = require("crypto")
const bcrypt = require('bcrypt');
const session = require('express-session');
const dotEnv = require('dotenv');
dotEnv.config();
// ----- routers initilizing for user----
const userEntry = require('./routes/users/userEntry');
const userProducts = require('./routes/users/products');
const userCart = require('./routes/users/userCart');
const userProfile  = require('./routes/users/userProfile')
const userCheckOut = require('./routes/users/userCheckout')

// -----  end of routers initilizing for user----//

// ---------router initilizing for admin -------
const adminCatagory = require('./routes/admin/adminCatagory');
const adminPoduct = require('./routes/admin/adminProduct');
const adminEntry = require('./routes/admin/adminEntry');
const adminDashBord = require('./routes/admin/adminDashbord');
const adminUserManageMent  = require('./routes/admin/adminUserManageMent');
const adminOffer = require('./routes/admin/adminOffers');
const adminCoupones  = require('./routes/admin/adminCoupones');
const adminSalesReport = require('./routes/admin/adminSalesReprort');
//end of roter initilizing of admin --------




var app = express();

app.use(session({
  secret:' cookie_secret',
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//admin page routes only 
app.use('/',userEntry);
app.use('/admin',adminEntry);
app.use('/admin/userManage', adminUserManageMent);
app.use('/admin/catagory',adminCatagory);
app.use('/admin/products',adminPoduct);
//end of the admin-page routes





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// connect to mongodb atles //

mongoose
  .connect(process.env.MONGODB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databse connected  sucesssufully");
  })
  .catch((err) => {
    // console.log(err);
  });






module.exports = app;
