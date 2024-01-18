const fetchAllProducts = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/product`);

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
                    <img src="./public/icons/cartIconBLue.png" alt="cart">
                    <p>Add to Cart</p>
                `;

      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);

      document.querySelector(".homeAllProducts").appendChild(productCardHtml);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchAllProducts();

const handleAddToCart = (event, product) => {
  event.stopPropagation();
  if (!fetchLoggedInUser()) {
    showToast("error", "You need to login to add to cart");
    return;
  }
  let cartData = { ...product, cartQuantity: 1 };
  addToCart(cartData);
  displayCartCount();
};
const FetchAllMonitors = async () => {
  try {
    const { data, status } = await axios.get(
      `${backendUrl}/product/search?search_query=Monitor`
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
                <p>${product.desc}</p>
                <p>All-In-One</p>
                </div>
                <div class="newProduct_priceBox">
                <h2 class="newProduct_price">$${product.price}</h2>
                </div>
                `;
      const addToCartButton = document.createElement("button");
      addToCartButton.className = "addToCart_btn";
      addToCartButton.innerHTML = `
                    <img src="./public/icons/cartIconBLue.png" alt="cart">
                    <p>Add to Cart</p>
                `;
      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);

      document.querySelector(".allMonitors").appendChild(productCardHtml);
    });
  } catch (error) {}
};
const FetchAllLaptops = async () => {
  try {
    const { data, status } = await axios.get(
      `${backendUrl}/product/search?search_query=Laptop`
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
                <p>${product.desc}</p>
                <p>All-In-One</p>
                </div>
                <div class="newProduct_priceBox">
                <h2 class="newProduct_price">$${product.price}</h2>
                </div>
                `;
      const addToCartButton = document.createElement("button");
      addToCartButton.className = "addToCart_btn";
      addToCartButton.innerHTML = `
                    <img src="./public/icons/cartIconBLue.png" alt="cart">
                    <p>Add to Cart</p>
                `;

      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);

      document.querySelector(".allLaptops").appendChild(productCardHtml);
    });
  } catch (error) {}
};
const FetchAllDesktops = async () => {
  try {
    const { data, status } = await axios.get(
      `${backendUrl}/product/search?search_query=Desktop`
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
                    <img src="./public/icons/cartIconBLue.png" alt="cart">
                    <p>Add to Cart</p>
                `;

      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);

      document.querySelector(".allDesktops").appendChild(productCardHtml);
    });
  } catch (error) {}
};

fetchTopSellingProopducts();
FetchAllDesktops();
FetchAllLaptops();
FetchAllMonitors();
