var sizeVarientArray1 = [];
var sizeVarientArray2 = [];
var colorSelector1 = document.getElementById('colorSelector1');
var colorSelector2 = document.getElementById('colorSelector2');
var firstVareintImageArray = [];
var secondVarientImageArray = [];
var mainVareints = [];

function insertImageBase64IntoArray(id, start , end){
    if(id == 1){
     firstVareintImageArray = []
     for(var i = start ;i<=end ;i++){
          if(document.getElementById("imageValue" + i ).value != ""){
               firstVareintImageArray.push(document.getElementById("imageValue" + i ).value);
          };
     }
     }else{
          secondVarientImageArray = []
          for(var i = start ;i<=end ;i++){
               if(document.getElementById("imageValue" + i ).value != ""){
                    secondVarientImageArray.push(document.getElementById("imageValue" + i ).value);
               };
          } 
     }

}

// the  size wise  array to the product list
function shallowEqual(object1, object2) {
     const keys1 = Object.keys(object1);
     const keys2 = Object.keys(object2);
     if (keys1.length !== keys2.length) {
       return false;
     }
     for (let key of keys1) {
       if (object1[key] !== object2[key]) {
         return false;
       }
     }
     return true;
   }
  var clearPreview = true; 

function addSizeVarient (which){
 var addCheker = true;
 var addCheker2 = true;
 
if(clearPreview){ document.getElementById("previewSize1").innerHTML =''
document.getElementById("previewSize2").innerHTML =''}
var clearPreview = false;

     var proSize = document.getElementById("proSize"+which);
     var proQuantity = document.getElementById('proQuantity' + which);
     var proPrice = document.getElementById('proPrice' + which);
    if(proQuantity.value !==""  && proSize.value !== ""  && proPrice.value != ""){

          var data = {
               productSize:proSize.value,
               productQuantity:proQuantity.value,
               productPrice:proPrice.value
          };
          if(which == 1){
               for(var i =0 ;i<sizeVarientArray1.length;i++){
                    if(shallowEqual(data, sizeVarientArray1[i])){
                       swal.fire('Seriously', " same stock left ");
                         addCheker = false;
                         break;
                    }else{
                         addCheker = true;
                    }
                    
               }
               if(addCheker){
               sizeVarientArray1.push(data);
               document.getElementById("previewSize1").innerHTML += "size : "+ proSize.value +" - " +"Quantity : " + proQuantity.value + " - " + "Price :  ₹ " + proPrice.value + " <-||-> "
               }
          }else{


               for(var i =0 ;i<sizeVarientArray2.length;i++){
                    if(shallowEqual(data, sizeVarientArray2[i])){
                       swal.fire('Seriously', " same stock left ");
                         addCheker2 = false;
                         break;
                    }else{
                         addCheker2 = true;
                    }
                    
               }
               if(addCheker2){
               sizeVarientArray2.push(data);
               document.getElementById("previewSize2").innerHTML += "size : "+ proSize.value +" - " +"Quantity : " + proQuantity.value + " - " + "Price :  ₹ " + proPrice.value + " <-||-> "
               }

          }
    }else{
         document.getElementById("sizeVarientError"+which).innerHTML = "Please Keep All There Fields Fill";
    }
}

function clearEroorAddSizeVarient(which){

     document.getElementById("sizeVarientError"+which).innerHTML = ""
}

function cleaerColorErr(id){
     document.getElementById("colorErr"+id).innerHTML = ""
}
//   end of the  size wise  array to the product list  //

// start of the the insert of varient array 

function addVarent(id){
      // validation of the  color field;
     if(document.getElementById('colorSelector'+id).value == ""){
         document.getElementById("colorErr"+id).innerHTML = "Please Select One Color";
         return;
     }
//     vlaidateion of  the size vise array
     if(id== 1){
          if(sizeVarientArray1.length <= 0 ){document.getElementById("sizeVarientError"+id).innerHTML = "You Have To Enter Atlest One size Vice Varient" ; return}
         
     } else{
          if(sizeVarientArray2.length <= 0 ){document.getElementById("sizeVarientError"+id).innerHTML = "You Have To Enter Atlest One size Vice Varient" ; return}

     }
     if(id == 1){insertImageBase64IntoArray(1 , 1 , 3)}
     if(id == 2){insertImageBase64IntoArray(2 , 4 , 6)}
    
     if(id== 1 && firstVareintImageArray.length <= 0) {swal.fire("Sorry " , "!you have to upload atleast one image of that product")  ; return}
     if(id== 2 && secondVarientImageArray.length <= 0) {swal.fire("Sorry " , "!you have to upload atleast one image of that product")  ; return}

     if(id == 1){
          var currentArray = firstVareintImageArray;
          var currentVarientArray = sizeVarientArray1;
     }
     else{
          var currentArray = secondVarientImageArray;
          var currentVarientArray = sizeVarientArray2;

     }

     var varientSampleData = {
          color: document.getElementById('colorSelector'+id).value,
          image: currentArray,
          sizeVarient:currentVarientArray
          
     }

    

     console.log(varientSampleData);
     
}
