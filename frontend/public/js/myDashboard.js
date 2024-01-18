let editMode = false;
let showOrder = false;
const urlParams = new URLSearchParams(window.location.search);
const order = urlParams.get("order");

if (order) {
  showOrder = true;
}

const displayUserInfo = () => {
  if (fetchLoggedInUser()) {
    let user = fetchLoggedInUser();

    document.querySelector(".user_name").innerText = user.username;
    document.querySelector(".user_email").innerText = user.email;
  }
};
const handleLogout = () => {
  removeUserFromLs();
  displayCartItems();
  location.href = frontendUrl;
};
const handleUpdateUser = async () => {
  let user = fetchLoggedInUser();
  const userData = {
    username: document.querySelector(".edit_username").value,
    email: document.querySelector(".edit_useremail").value,
  };
  try {
    const { data, status } = await axios.put(
      `${backendUrl}/user/${user?._id}`,
      userData
    );
    if (status === 200) {
      localStorage.setItem("user", JSON.stringify(data.message));
      displayUserInfo();
    }
  } catch (error) {
    console.log(error);
  }
};
const goToOrderDetailsPage = (orderId) => {
  location.href = `${frontendUrl}/public/html/orderDetails.html?orderId=${orderId}`;
};
const displayMyOrders = async () => {
  const user = fetchLoggedInUser();

  try {
    const { data, status } = await axios.get(
      `${backendUrl}/order?buyer=${user._id}`
    );
    document.querySelector(".orderAllList").innerHTML = "";
    if (status === 200) {
      data.message.forEach((order) => {
        document.querySelector(".orderAllList").innerHTML += `
        <tr onClick="goToOrderDetailsPage('${order._id}')" >
        <td>${order._id}</td>
        <td>${order.address}</td>
        <td>${order.item.length}</td>
        <td>Rs.${order?.totalPrice}</td>
        <td>${order?.status}</td>
        <td> ${order.createdAt.split("T")[0]}  </td>
        </tr>
        
        
        
        `;
      });
    }
  } catch (error) {}
};

const handleDisplayData = () => {
  if (editMode) {
    handleUpdateUser();
    document.querySelector(".account_information_info_para").style.display =
      "block";
    document.querySelector(".account_information_edit_acccount").style.display =
      "none";
    document.querySelector(".editBtn").innerText = "Edit";
    editMode = false;
  } else {
    const user = fetchLoggedInUser();
    document.querySelector(".account_information_info_para").style.display =
      "none";
    document.querySelector(".account_information_edit_acccount").style.display =
      "block";
    document.querySelector(".edit_username").value = user.username;
    document.querySelector(".edit_useremail").value = user.email;
    document.querySelector(".editBtn").innerText = "Save";
    editMode = true;
    displayUserInfo();
  }
};

document.querySelector(".editBtn").addEventListener("click", handleDisplayData);

const handleSection = () => {
  if (showOrder) {
    document.querySelector(".orderInfoBox").style.display = "block";
    document.querySelector(".accountInfoBox").style.display = "none";
    displayMyOrders();
  } else {
    document.querySelector(".orderInfoBox").style.display = "none";
    document.querySelector(".accountInfoBox").style.display = "block";
    displayUserInfo();
  }
};

document.querySelectorAll(".myDashboardSidebarItem").forEach((sec) => {
  sec.addEventListener("click", (e) => {
    let id = e.currentTarget.getAttribute("id");
    console.log(id);
    if (id === "account") {
      showOrder = false;
    } else {
      showOrder = true;
    }

    handleSection();
  });
});
let user = fetchLoggedInUser();
console.log("user", user);
if (user && user?.isAdmin) {
  document.querySelector(".adminPanelList").style.display = "block";
}

document.querySelector(".logutBtn").addEventListener("click", handleLogout);
handleSection();
