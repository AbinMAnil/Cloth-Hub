// function to  chage the quantity;

function chageQuantity(change , id , productId){
     var qButton = document.getElementById('quantity'+id);
      var x = parseInt(qButton.innerHTML)
      if(x == 1  && parseInt(change ) == -1){document.getElementById('minusButton'+id).style.visibility = "hidden" ; return  }
     document.getElementById('minusButton'+id).style.visibility = "visible"; 
      
      if(x > 1 || parseInt(change) == 1){
          $.ajax({
               url:"cart/chageQuantity",
               data : {change : change , id : id , userId : localStorage.getItem("userId") , pid: productId},
               method:'post',
               success : (result)=>{
                    console.log(result.status.product.grandTotal)
                    document.getElementById('grandTotal').innerHTML = result.status.product.grandTotal
                    document.getElementById('finalPrice').innerHTML = result.status.product.grandTotal


                  for(var i = 0 ; i< result.status.product.product.length ;i++){
                       if(result.status.product.product[i].vaientId == id){
                         // console.log(result.status.product.product[i].vaientId)
                         document.getElementById("price"+id).innerHTML = result.status.product.product[i].totalPrice
                            break;

                       }
                  }
                    if(result.status.status == true){
                        
                         var y =  x +  parseInt(1)
                         qButton.innerHTML = y+""
                    }else if(result.status.status == false){
                         var y =  x -  parseInt(1)
                         qButton.innerHTML = y+""
                    }else{
                         swal.fire("Error" , result.status.status)
                         .then(()=>{
                              location.reload();
                         })
                    }
               }
          })
     }
}

function deleteItem(varientId , productId){
     Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
               var row = document.getElementById('tableRow'+varientId);
               $.ajax({
                    url:'cart/delteItem',
                    data : {varientId : varientId ,userId : localStorage.getItem('userId') , productId  : productId} ,
                    method:'delete',
                    success:(result)=>{
                         if(result.status.process == true){
                              row.style.display = "none";

                              const Toast = Swal.mixin({
                                   toast: true,
                                   position: 'botton-end',
                                   showConfirmButton: false,
                                   timer: 2000,
                                   timerProgressBar: true,
                                   didOpen: (toast) => {
                                     toast.addEventListener('mouseenter', Swal.stopTimer)
                                     toast.addEventListener('mouseleave', Swal.resumeTimer)
                                   }
                                 })
                                 
                                 Toast.fire({
                                   icon: 'success',
                                   title: 'Item Deleted  successfully'
                                 })
                         };
                         if(result.status.emptyCart){
                              
                              document.getElementById('cartItems').style.display = "none"
                              document.getElementById('emptyCart').style.display = "block"
                         }
                    }

               })
          }
        })
     
}