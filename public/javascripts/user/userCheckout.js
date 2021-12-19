function preventNumber(e) {
     var keyCode = (e.keyCode ? e.keyCode : e.which);
     if (keyCode > 47 && keyCode < 58) {
         e.preventDefault();
     }
 }

 function addAddressAndProced(id , product){
     var err = document.getElementById('err')
     // empty validation 
     for(var i = 0 ;i< 9; i++ ){
          if(document.getElementById("input"+i).value == ""){
              err.innerHTML = "Plese Fill The all field";
              return ;
          }
     }
     

      err.innerHTML = ""
     //  number validateion
     var phone = document.getElementById("input2").value;
      if(phone.length < 10 ){
           err.innerHTML = "please Enter 10 digits In phone Number field";
           return;
      }
      
      err.innerHTML = ""

      // emil validation
      var email = document.getElementById("input3").value
    var result =  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if(result == null){err.innerHTML = "please Enter a Valid Email " ; return ;}
    err.innerHTML = ""

//   validateion postal code 

     var postal = document.getElementById("input7").value;
     if(postal.length < 6 ){err.innerHTML = "please Enter a Valid Postal Code" ; return ;}
    err.innerHTML = ""
     var saveAddress ;
     if(document.getElementById("checkBoxSave").checked)saveAddress = true
     else{saveAddress = false}
     var pack = {
          firstName : document.getElementById("input0").value,
          secondeName : document.getElementById("input1").value,
          phone : document.getElementById("input2").value,
          email : document.getElementById("input3").value,
          address : document.getElementById("input4").value,
          landMark : document.getElementById("input5").value,
          city : document.getElementById("input6").value,
          poatalCode : document.getElementById("input7").value,
          state : document.getElementById("input8").value,
          country : document.getElementById("input9").value,
          userId : id,
          paymentMethod : "cash on delevery",
          saveAddress : saveAddress
     }
     // to save the address ;
     
    if(document.getElementById('cashOnDelevary').checked){}
    else{
        err.innerHTML = "Please Select One Payment Method"
        return;
    }
//     alert(id); 
    console.log(typeof(product))
    err.innerHTML = ""
     $.ajax({
          url:"/checkout/placeOrder",
          data : pack,
          method:"post",
          success : (result)=>{

          }
     })

    
    
 };


