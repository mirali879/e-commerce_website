let isDrawerOpen = false;

// let frontendUrl = "https://miralimammad.netlify.app";
let frontendUrl = "http://127.0.0.1:5500/frontend";
// let backendUrl = "https://mirali.onrender.com/api";
let backendUrl = "http://localhost:8000/api";
// console.log("stripe key",STRIPE_PK)
//stripe: An instance of the Stripe API for handling payments.
const stripe = Stripe(
  "pk_test_51OOfAiCBSYxR411iCdN4WIRTrOavlsgy9WRuPasn50Fw5eRNuyXoeP7xgxqYIuBVIxe02LI8yxUbd6DnhC3AOlLy007dWcMWF6"
);

//buyProductPayload: An object used to store data related to buying a product.
let buyProductPayload = {};

//displayCartCount: Updates the displayed cart count in the UI.
const displayCartCount = () => {
  document.querySelector(".cartCount").innerText = getCartItems().length;
};

//fetchLoggedInUser: Retrieves the logged-in user from local storage.
const fetchLoggedInUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};

//displayLoginUser: Updates the UI based on whether a user is logged in.
const displayLoginUser = () => {
  if (fetchLoggedInUser()) {
    let user = fetchLoggedInUser();
    if (document.querySelector(".navbar_loginBtn")) {
      document.querySelector(".navbar_loginBtn").style.display = "none";
    }
    document.querySelector(".userImg").style.display = "block";
    document.querySelector(".userImg").src = user.image;
  } else {
    document.querySelector(".navbar_loginBtn").style.display = "block";
    document.querySelector(".userImg").style.display = "none";
  }
};
const displayCartItems = () => {
  if (!fetchLoggedInUser()) {
    document.querySelector(".cartCount").style.display = "none";
  }
};
displayLoginUser();
displayCartCount();
displayCartItems();
const handleOpenSearchModal = () => {
  document.querySelector(".searchModal").style.display = "flex";
};
//Listens for changes in the search input and fetches search results from the backend API.
document
  .querySelector(".searchModalInput")
  ?.addEventListener("change", async (e) => {
    const { data, status } = await axios.get(
      `${backendUrl}/product/search?search_query=${e.target.value}`
    );
    document.querySelector(".modalSearchItemWrapper").innerHTML = "";
    data.message.forEach((p) => {
      document.querySelector(".modalSearchItemWrapper").innerHTML += `
                <a href="${frontendUrl}/public/html/productDetail.html?productId=${p._id}" class="searchedProducts">
                        <img class="searchProductImg" src=${p.image[0]} alt="">
                        <div class="productInfo">
                            <p class="searchProductName">${p.name} </p>
                            <p>In stock - 5</p>
                            <p class="searchProductPrice">$${p.price}</p>
                        </div>
                    </a>
        `;
    });
  });

//// Event listeners for search and navigation icons

//Handles opening and closing the search modal and navigation drawer.
document
  .querySelector(".nav_searchIconDrawer")
  .addEventListener("click", () => {
    document.querySelector(".drawer").style.width = "0%";
    document.querySelector(".searchModal").style.display = "flex";
  });
document
  .querySelector(".nav_searchIcon")
  ?.addEventListener("click", handleOpenSearchModal);
document.querySelector(".closeModalButton")?.addEventListener("click", () => {
  document.querySelector(".searchModal").style.display = "none";
});
document
  .querySelector(".search_product_banner_black_bg_button")
  ?.addEventListener("click", handleOpenSearchModal);

//Fetches top-selling products from the backend and dynamically creates HTML elements to display them.
const fetchTopSellingProopducts = async () => {
  // topSelling

  try {
    const { data, status } = await axios.get(
      `${backendUrl}/product/topSelling`
    );
    data.message.forEach((product) => {
      const productCardHtml = document.createElement("div");
      productCardHtml.classList.add("newProducts_card");
      productCardHtml.addEventListener("click", () => {
        location.href = `${frontendUrl}/public/html/productDetail.html?productId=${product._id}`;
      });
      productCardHtml.innerHTML = `
                <p class="newProducts_stockInfo_para">✅ in stock</p>
                <div class="newProducts_imgWrapper">
                <img class="newProducts_Img" src=${product.image[0]}>
                </div>
                <div class="newProduct_review_box">
                Reviews
                </div>
                <div class="newProduct_details">
                <p>${product.name}</p>
                <p class="productDesc">${product.desc}</p>
            
                </div>
                <div class="newProduct_priceBox">
                <h2 class="newProduct_price">$${product.price}</h2>
                </div>
                `;
      const addToCartButton = document.createElement("button");
      addToCartButton.className = "addToCart_btn";
      addToCartButton.innerHTML = `
                   <img width="20" height="20" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                    <p>Add to Cart</p>
                `;

      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);
      document.querySelector("#topSellingWrapper").appendChild(productCardHtml);
    });
  } catch (error) {}
};
document.querySelector(".navMenuIcon").addEventListener("click", () => {
  if (isDrawerOpen) {
    document.querySelector(".drawer").style.width = "0%";
    isDrawerOpen = false;
    document.querySelector(".navMenuIcon").src =
      "https://img.icons8.com/ios-filled/50/menu--v6.png";
  } else {
    isDrawerOpen = true;
    document.querySelector(".navMenuIcon").src =
      "https://img.icons8.com/hatch/64/delete-sign.png";
    document.querySelector(".drawer").style.width = "80%";
  }
});
document.querySelector(".closeDrawer").addEventListener("click", () => {
  document.querySelector(".drawer").style.width = "0%";
});

//This code manages the user interface, handles user authentication, displays products, and provides search functionality. It also includes navigation and drawer handling for a responsive user experience.
