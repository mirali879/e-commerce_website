// initializing the orderTab
let orderTab = "pending";

const goToOrderDetailsPage=(orderId)=>{

  location.href = `${frontendUrl}/public/html/orderDetails.html?orderId=${orderId}`

}


const fetchAdminProductsByStatus = async () => {
  try {
    const { data, status } = await axios.get(`${backendUrl}/order?status=${orderTab}`)
    document.querySelector(".orderAllList").innerHTML = "";
    if (status === 200) {
      data.message.forEach((order) => {
        document.querySelector(".orderAllList").innerHTML += `
        
        
        <tr onClick="goToOrderDetailsPage('${order._id}')">
        <td>${order._id}</td>
        <td>${order.buyer?.username}</td>
        <td>${order.buyer?.email}</td>
        <td>Rs.${order?.totalPrice}</td>
        <td> ${order.createdAt.split("T")[0]}  </td>
        </tr>
        
        
        
        `;
      });
    }
  } catch (error) {}
};


document.querySelectorAll(".statusTab").forEach((elm) => {
  elm.addEventListener("click", () => {
    // console.log(elm);
    document.querySelectorAll(".statusTab").forEach((el) => {
      el.classList.remove("active");
    });
    elm.classList.add("active");
    orderTab = elm.getAttribute("data-status");
    fetchAdminProductsByStatus();
  });
});

fetchAdminProductsByStatus();
addClickEventToAllOrders()