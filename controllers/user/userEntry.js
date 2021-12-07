const mongoose = require("mongoose");
const user = require('../../model/user/userDataSchema');
const API = require('../../API/twilio');
const { findById } = require("../../model/user/userDataSchema");
const { response } = require("../../app");
const middleWare = require("../../middleWares/userAuth");




// function to check the user is exists;
function findUserByMail(email){
    return new Promise( async (resolve, reject)=>{
    var result = await user.findOne(
          {
               email:email,  
              
          }
     )
     
     if(result == "")resolve(null)
     else{
          resolve(result);
     }
    })
}

//function to check the users phone number is exists or not
function findUserByPhone(phone){
    
     return new Promise( async (resolve,reject)=>{
          var result = await user.findOne(
               {
                    phone:parseInt(phone)
               }
          )
         
          if(result == "")resolve(null)
          else{
               resolve(result);
          }
     })
}

// function  to  inser user FullData 
function insertDataOfUser(data){
     return new Promise( async (resolve,reject)=>{
          var newUser = user(data);
         resolve(await  newUser.save());
     })
};

//function to check the use is blocked or not
function isUserblocked (){}


module.exports = {

     // the insert data of  the user;
     insertUser: async  (data)=>{
      return new Promise( async (resolve, reject)=>{
          if(await findUserByMail(data.email) === null){
               var result =  await insertDataOfUser(data)
               console.log(result);
               resolve(result._id)
           }else{
               reject("Data are Existing ! Plese do signup");
           }
            
      })
     },

     sendOtpToUser:(phone)=>{
          return new Promise( async (resolve , reject)=>{
             if(await findUserByPhone(phone) === null){
               try{
                    resolve(  await  API.sendOtp(phone));
                   }catch(err){
                        console.log(err);
                    reject("sorry somthing went wrong ");
                   }
             }else{
                  reject("The Phone number is already exists Please Do login ")
             }

          
          })
     },

     checkOtp:(phone, otp)=>{
          console.log(phone , otp);
          return new Promise( async (resolve, reject)=>{
              try{
               var result = await  API.checkOtp(otp , phone);

               if(result) { 
                    var userData =  await findUserByPhone(phone)
                    if(userData !== null){
                       
                         var resoponseData = {
                              status:true,
                              userId: userData._id
                         }
                         resolve(resoponseData);
                    }else{
                         
                         var resoponseData = {
                              status:true,
                              userId: ""
                         }
                         resolve(resoponseData);
                    }
                    
               }
               else {resolve("Wrong  OTP try again !")}
              }catch(err){
               console.log("error in  the otp validtion");
                 console.log(err);
                 location.reload();
              }
              
          })
     },

     sendOtpToExistingUser:(phone)=>{
          return new Promise(async (resolve, reject)=>{
               try{
                    var result = await  findUserByPhone(phone)
                    console.log(result);
                  if(await result   !== null){
                       if(result.blockStatus === false){
                      resolve( await  API.sendOtp(phone) )
                       }else{
                            resolve("Sorry You Are Blocked By the Admin");
                       }
                  }else{
                    resolve("This phone number is not Exists Please Create An Account")
                  }
               }catch(err){
                    console.log(err);
                    location.reload();
               }
          })
     },

     checkUserSignup :(email , password)=>{
          return new Promise( async (resolve , reject)=>{
                    var result = await findUserByMail(email);

                   if(result === null) {

                   resolve("sorry ! cannot find The Email ID ")
                   }
                   else{
                        if(result.blockStatus === false){
                         // NOW COMPARE THE PASSWORDS;
                         var finalData = await middleWare.comparePassword(password , result.password)
                         if (finalData ){
                            
                             var data = {
                                   status : true,
                                   data : await findUserByMail(email)
                             } 
                              resolve(data);
                         }
                         else{
                              resolve("Wrong  password ");
                         }
                    }else{
                         resolve('You are Blocked By the admin ');
                    }
                   }
          })
     }
}