
var sizeVarientArray1 = [];
var sizeVarientArray2 = [];
var colorSelector1 = document.getElementById('colorSelector1');
var colorSelector2 = document.getElementById('colorSelector2');
var imageArray1 = [];
var imageArray2 = [];
var addVarientChecker = false;
var varientSampleData1;
var varientSampleData2;
var speacility = [];
var varientArray = [];
var err = document.getElementById('mainErr');

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
//   end of the  size wise  array to the product list  //


function clearEroorAddSizeVarient(which){
     document.getElementById("sizeVarientError"+which).innerHTML = ""
}

function cleaerColorErr(id){
     document.getElementById("colorErr"+id).innerHTML = ""
}


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
    
     if(id== 1 && imageArray1.length <= 0) {swal.fire("Sorry " , "!you have to upload atleast one image of that product")  ; return}
     if(id== 2 && imageArray2.length <= 0) {swal.fire("Sorry " , "!you have to upload atleast one image of that product")  ; return}

     if( document.getElementById('colorSelector1').value ==  document.getElementById('colorSelector2').value){swal.fire("Sorry !" ,"The Color Varient You Already Added") ; return};

      if(id == 1){
          varientSampleData1 = {
               color: document.getElementById('colorSelector'+id).value,
               image: imageArray1 ,
               sizeVarient: sizeVarientArray1
          };
      }else{
          varientSampleData2 = {
               color: document.getElementById('colorSelector'+id).value,
               image: imageArray2 ,
               sizeVarient: sizeVarientArray2
          };
      }
       
      addVarientChecker = true;

    
}

var previewCheckerTags = true;
function prevewOfSearchTags(){

     var preview = document.getElementById("previewOfTags");
     var searchTag = document.getElementById('searchTags').value

     if(previewCheckerTags)preview.innerHTML = "";
     previewCheckerTags = false;
   

     if(searchTag ==  "")return;
     if(speacility.includes(searchTag)){swal.fire("Seriously " , "! The Search Tag is Alreday Exists "); return};
     speacility.push(searchTag);
     var a = document.createElement('a');
     a.innerHTML = searchTag
     preview.appendChild(a);
     var searchTag = document.getElementById('searchTags').value =""    
}

// cler button for clear the form//
function cancelButoonToVarientForm(id , start,end) {
     document.getElementById('previewSize'+id).innerHTML = 'Preview';
     $("#varientForm"+id).trigger('reset');
     document.getElementById('colorPreview'+id).style.backgroundColor = "white";
     if(id==1 ){imageArray1 = []; sizeVarientArray1 = [] ; varientSampleData1 = null  }
     else{imageArray2 = [] ;  sizeVarientArray2 = [] ; varientSampleData2 = null }
     for(var i =start ;i<=end ;i++){
          $('#chekPreview'+i).attr('src', "");
     }
}

// {{ for clear the  main error}}
function clearMainError(e){
  
     err.innerHTML = ""

}


function submitData(){

     //{{ delclaring the form fields }};
     var productName = document.getElementById('productName').value;
     var brand = document.getElementById('brandName').value;
     var catagory = document.getElementById('mainCat').value;
     var subCatagory = document.getElementById('subCatSel').value;
     var discription = document.getElementById('input_14').value;

     //{{ validation }}     
     if(productName == ""){err.innerHTML = "Plese Enter A Product Name" ; return};
     if(brand == ""){err.innerHTML = "Plese Enter A brand Name" ; return};
     if(catagory == ""){err.innerHTML = "Plese Select catagory " ; return};
     if(subCatagory == ""){err.innerHTML = "Plese Select A Sub Catagory " ; return};
     if(discription == ""){err.innerHTML = "Plese Enter some more data   in the discription " ; return};

     //{{ to Clear the all Error}};
     if(productName != "" && brand != "" &&  catagory != "" && subCatagory != "" && discription != ""){clearMainError()}; 



     // {{ pushing the varients into the vareint array }};
    if(varientSampleData2 == null &&  varientSampleData1 == null){swal.fire("Sorry !" ,"You have to Add Atleast One varient") ; return}

    if(varientSampleData1 != null)varientArray.push(varientSampleData1);
    if(varientSampleData2 != null)varientArray.push(varientSampleData2);

  ;
    // creating the basice structur of the data;
    var modelData = {
         varient : JSON.stringify(varientArray),
         productName : productName,
         brand : brand,
         catagory : catagory,
         subCatagory : subCatagory,
         discription : discription,
    }

document.getElementById('id01').style.display = "block";
    $.ajax({
     url: '/admin/products/addProduct',
     data: modelData,
     method: "post",
     success:(result)=>{
                document.getElementById('id01').style.display = "none";
                if(result.status == true){
                    Swal.fire(
                         'Success',
                         'Product Added success-fully ',
                         'success'
                       ).then(()=>{
                            location.href = "admin/products";
                       })
                }else{
                    Swal.fire({
                         icon: 'error',
                         title: 'Oops...',
                         text: 'Something went wrong!',
                       }).then(()=>{
                            location.reload()
                       })
                }
     
     }
    })
}
