const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");
console.log(backendUrl)
const fetchOrderDetails=async()=>{
    if(!orderId)return;
try {
   const {status,data}  = await   axios.get(`${backendUrl}/order?_id=${orderId}`)
    if(status===200){
        displayOrderData(data.message[0])
    }

} catch (error) {
    console.log(error)
}
}



const displayOrderData=(data)=>{

    document.querySelector(".customerImage").src = data.buyer?.image;
    document.querySelector(".customerUsername").innerText = data.buyer?.username;
    document.querySelector(".customerEmail").innerText = data.buyer?.email;
    document.querySelector(".order_details_status_select").value = data.status;
    document.querySelector(".orderDetailsOrderTime").innerText = data.createdAt;

    let totalQuantity=0;

    data.item?.forEach(product=>{
        totalQuantity += product.product?.price * product?.buyQuantity;
        document.querySelector(".orderDetailsProductList").innerHTML +=`
        
               <tr>
                                    <td >
                                    <div class="order_details_item_name_box">
                                    <img  src=${product?.product?.image[0]} alt="item">
                                    <p>${product?.product?.name}</p>
                                    </div>
                                    </td>
                                    <td>${product?.buyQuantity}</td>
                                    <td>Rs.${product?.product?.price}</td>
                                    <td>Rs.${product.product?.price * product?.buyQuantity}</td>
                                </tr>
        `

    })

    document.querySelector(".orderDetailsGrandTotal").innerText=`Rs. ${totalQuantity}`


}
const updateStatusOfOrder=async()=>{
    
    const orderStatus = document.querySelector(".order_details_status_select").value;


    try {
            const {status,data} = await axios.put(`${backendUrl}/order/${orderId}`,{
                status:orderStatus
            });

                if(status===200){
                    location.reload()
                }
    } catch (error) {
        
    }




}

document.querySelector(".orderDetailsSaveButton").addEventListener("click",updateStatusOfOrder)


const whetherToShowAactionButton=()=>{
   let user =  fetchLoggedInUser()
   if(user){
    if(user.isAdmin){

        document.querySelector(".order_details_status_change_box").style.display="flex"

    }
   }
}

fetchOrderDetails()
whetherToShowAactionButton()