const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");
let currenTab = "about";
let userQuantity = 1;
let productData = {};

document
  .querySelector(".addToCartQuantityInput")
  .addEventListener("change", (e) => {
    let quantity = +e.target.value;
    quantity++;
    if (quantity > Number(productData?.quantity)) {
      document.querySelector(".addToCartQuantityInput").value = userQuantity;
      alert("out of stock");
    } else if (quantity < 1) {
      document.querySelector(".addToCartQuantityInput").value = userQuantity;
    } else {
      userQuantity = quantity;
      document.querySelector(".addToCartQuantityInput").value = quantity;
    }
  });

const getProductById = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/product?_id=${productId}`);
    productData = data.message[0];
    displayProductData();
  } catch (error) {
    console.log(error);
  }
};

getProductById();

const displayProductData = () => {
  document.querySelector(".product-price").innerText = productData.price;

  productData.image.forEach((image) => {
    document.querySelector(".swiper-wrapper").innerHTML += `
      
      <div class="swiper-slide">
      <img
      src=${image}
      alt="slider1"
      class="slider_img"
      />
      </div>
      
      `;
  });

  handleDetailsTab();
};
const handleDetailsTab = () => {
  document.querySelectorAll(".details_tab").forEach((tab) => {
    tab.classList.remove("activeDetailsTab");
  });
  if (currenTab === "about") {
    document.querySelector(".productDetail_spec_list").innerHTML = "";
    document.querySelector(".product-name").innerText = productData.name;
    document.querySelector(".product-detail-info").innerText = productData.desc;
    document.querySelector("#about").classList.add("activeDetailsTab");
  } else {
    document.querySelector(".product-name").innerText = "";
    document.querySelector(".product-detail-info").innerText = "";
    document.querySelector("#details").classList.add("activeDetailsTab");
    productData.specs.forEach((sp) => {
      document.querySelector(".productDetail_spec_list").innerHTML += `
      
          <li>

          ${sp}
          
          </li>
      `;
    });
  }
};

const handleAddToCart = () => {
  if (!fetchLoggedInUser()) {
    showToast("error", "You must be logged in");
    return;
  }
  const cartQuantity = document.querySelector(".addToCartQuantityInput").value;
  const cartDatat = { ...productData, cartQuantity: Number(cartQuantity) };
  addToCart(cartDatat);
  displayCartCount();
};
const handleEventHandlerToDetailsTab = () => {
  document.querySelectorAll(".details_tab").forEach((tab) => {
    tab.addEventListener("click", handleDetailsTabChange);
  });
};
const handleEventHandlerToAddToCartButton = () => {
  document
    .querySelector(".addToCard_button_product")
    .addEventListener("click", handleAddToCart);
};

const handleDetailsTabChange = (e) => {
  const tabName = e.target.getAttribute("id");
  currenTab = tabName;
  handleDetailsTab();
};

handleEventHandlerToAddToCartButton();
handleEventHandlerToDetailsTab();
