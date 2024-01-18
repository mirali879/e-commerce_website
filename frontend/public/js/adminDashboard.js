const goToOrderDetailsPage=(orderId)=>{

    location.href = `${frontendUrl}/public/html/orderDetails.html?orderId=${orderId}`
  
  }
  
  
  // this function fetches all orders
  const fetchAllOrders = async () => {
    try {
      const { data, status } = await axios.get(`${backendUrl}/order`);
      if (status === 200) {
        data.message.forEach((order) => {
          document.querySelector(".orderList").innerHTML += `
              <tr onClick="goToOrderDetailsPage('${order._id}')">
      <td>${order._id}</td>
      <td>${order.buyer?.username}</td>
      <td>${order.buyer?.email}</td>
      <td>Rs. ${order.totalPrice}</td>
      <td class="admin_dashboard_order_status">${order.status}</td>
      <td>${order.createdAt}</td>
      </tr>
      `;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchAppStatistics=async()=>{
    try {
     const {data,status} =  await axios.get(`${backendUrl}/product/stats`);
     if(status===200){
      const {product,order,sale} = data.message
      document.querySelector(".productCount").innerText = product;
      document.querySelector(".orderCount").innerText = order;
      document.querySelector(".totalSale").innerText = `Rs.${sale}`;
  
     }
    } catch (error) {
      
    }
  }
  // calling the function
  fetchAllOrders();
  fetchAppStatistics()