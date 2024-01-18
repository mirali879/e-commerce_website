let avatar = document.querySelector(".avatar_img");


document.querySelector(".navbar_search_btn").addEventListener("click", () => {
  let searchQuery = document.querySelector("#navSearchInput").value;
  location.href = `http://127.0.0.1:5500/frontend/public/html/categoryCard.html?searchName=${searchQuery}`;
});

const checkIfToShowLoginToast = () => {
  const isTrue = localStorage.getItem("first");
  if (isTrue) {
    showToast("success", "successfully logged in");
    localStorage.removeItem("first");
  }
};

checkIfToShowLoginToast();

const axiosInstance = axios.create({
  baseURL: `${api}/api`,

  withCredentials: true,

  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

let cart = [
  {
    category: "t-shirt",
    createdAt: "2023-09-26T12:08:38.450Z",
    desc: "trip hop 90s music - glory box - music concert t-shirt",
    image:
      "https://res.cloudinary.com/onlinecoder/image/upload/v1695462411/ducqisqfhzjfu3vyfir0.png",
    name: "Portishead t shirt - Dummy",

    price: 1400,
    quantity: 4,
    updatedAt: "2023-09-26T12:08:38.450Z",
    __v: 0,
    _id: "6512c9c6c0ef27ad319b04ef",
  },
];

const fetchCategoryItems = async () => {
  try {
    const { status, data } = await axiosInstance.get("/category")
    console.log(data);
    if (status === 200) {
      data.message.forEach((cat) => {
        document.querySelector(
          ".category_list"
        ).innerHTML += ` <li><a href="http://127.0.0.1:5500/frontend/public/html/categoryCard.html?categoryName=${cat.categoryName}">${cat.categoryName}</a></li>`;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const fetchAllProducts = async () => {
  try {
    const { status, data } = await axios.get(`${backendUrl}/product`);
    console.log(data.message);
    if (status === 200) {
      data.message.forEach((product) => {
        document.querySelector(
          ".allProducts_card_container"
        ).innerHTML += ` <a href="http://127.0.0.1:5500/frontend/public/html/singleProduct.html?productId=${product._id}" class="all_products_card">
        <div class="all_product_card_img_wrapper">
            <img src=${product.image[0]} alt="pant">
        </div>
        <div class="all_product_card_details">

            <p class="all_product_name">${product.name}</p>
         
            <h3 class="all_product_price">Rs. ${product.price}</h3>
        </div>
      
    </a>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchBestCategoryProducts = async () => {
  try {
    const { status, data } = await aios.get("/product")
    // console.log("hello", data.message);
    if (status === 200) {
      data.message.forEach((product) => {
        document.querySelector(
          ".best_category_products_card_container"
        ).innerHTML += ` <a   href="http://127.0.0.1:5500/frontend/public/html/singleProduct.html?productId=${product._id}" class="best_category_products_card">
        <div class="best_category_product_card_img_wrapper">
            <img src=${product.image[0]} alt="pant">
        </div>
        <div class="best_category_product_card_details">

            <p class="best_category_product_name">${product.name}</p>
         
            <h3 class="best_category_product_price">Rs. ${product.price}</h3>
        </div>
      
    </a>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchSessinUser = async () => {
  try {
    axiosInstance.get("/user/sessionUser");
  } catch (error) {}
};
const getLoginUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};

const handleLogout = () => {
  localStorage.setItem("user", null);
  showToast("success", "Logged out successfully");
  setTimeout(() => {
    location.reload();
  }, 2000);
};
const addUserDataInNavbar = () => {

  
  const user = getLoginUser();
  if (user) {
    document.querySelector(".logoutButton").style.display = "flex";
    document.querySelector(".navCartButton").style.display = "block";
    document.querySelector(".profile_wrapper").style.display = "flex";
    document.querySelector(".username").innerText = user.username;
    document.querySelector(".useremail").innerText = user.email;
    avatar.src = user.image;
    if(user.isAdmin){
      console.log("inside main",document.querySelector(".adminIconButton"))
      let adminIconButton = document.querySelector(".adminIconButton")
      if(!adminIconButton)return;
        adminIconButton.style.display="block"
    }

    document
      .querySelector(".logoutButton")
      .addEventListener("click", handleLogout);
    const currentUrl = location.href;
  } else {
    document.querySelector(".navCartButton").style.display = "none";
    document.querySelector(".profile_wrapper").style.display = "none";
    document.querySelector(".navbar_button_wrapper").style.display = "flex";
    document.querySelector(".logoutButton").style.display = "none";
  }
}

const setActiveSidebarInAdminDash=()=>{
  const sideList = document.querySelectorAll(".adminSideListitem");
  if(sideList.length>0){
    // const location = location.l;
     const fileName =  location.href.split("/")[location.href.split("/").length-1]
    sideList.forEach((list)=>{
      const attr = list.getAttribute("data-sidebarItem");
      if(attr ===fileName){
        list.classList.add("adminActiveSidebar")
      }
    })
  }

}
const addCartCount=()=>{
  let  cart = localStorage.getItem("cart");
  if(cart){
    cart = JSON.parse(cart)
  }
  cart =   cart ?? [];
  if(cart.length >0){   
       document.querySelector(".cartCount").textContent = cart.length.toString() ;
  }
}


addCartCount()
setActiveSidebarInAdminDash()
addUserDataInNavbar();
fetchCategoryItems();
fetchAllProducts();
fetchBestCategoryProducts();
fetchSessinUser();