let shippingDetails = localStorage.getItem("shippingDetails") ?? {};
if (shippingDetails) {
  shippingDetails = JSON.parse(shippingDetails);
}

const displayCarItem = () => {
  const cart = getCartItems();
  const user = fetchLoggedInUser();
  let totalAmount = 0;

  cart.forEach((c) => {
    totalAmount += c.cartQuantity * Number(c.price);
    document.querySelector(".productsDetails").innerHTML += `
                         <div class="productItem">
                                <p class="productName">Monitor 24inch widescreen lovely hai feri</p>
                                <p class="productCount">x${c.cartQuantity}</p>
                            </div>  
        `;
  });
  document.querySelector(".username").innerText = user.username;
  document.querySelector(
    ".summarySubTotalAmount"
  ).innerText = `$${totalAmount}`;
  document.querySelector(".number").innerText = shippingDetails.number;
  document.querySelector(".address").innerText = shippingDetails.address;
};

displayCarItem();

const handleBuyclick = async (e) => {
  e.preventDefault();

  let user = fetchLoggedInUser();

  if (!user) {
    alert("You need to login first ");
    return;
  }

  location.href = `${frontendUrl}/public/html/paypal.html`;

  // try {
  //     const {status,data} = await axios.post(`${backendUrl}/order/create`, orderPayload);

  //     console.log("done",data,status)

  //     if(status === 200){
  //         showToast("success", "Product bought successfully");
  //         removeAllCart()
  //         displayCarItem()
  //         setTimeout(()=>{
  //             location.href=`${frontendUrl}/public/html/successfull.html`
  //         },2000)
  //     }
  // } catch (error) {
  //     console.log(error)
  // }
};

document.querySelector(".buyButton").addEventListener("click", handleBuyclick);
