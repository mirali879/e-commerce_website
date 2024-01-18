const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("search");
const category = urlParams.get("category");

let min = 0;
let max = 0;
const handleAddToCart = (event, product) => {
  event.stopPropagation();
  let cartData = { ...product, cartQuantity: 1 };
  addToCart(cartData);
  displayCartCount();
};
const fetchAllProducts = async () => {
  try {
    if (category) return;
    const res = await axios.get(`${backendUrl}/product`);
    let data = res.data;
    data.message.forEach((product) => {
      const productCardHtml = document.createElement("div");
      productCardHtml.classList.add("newProducts_card");

      productCardHtml.addEventListener("click", () => {
        location.href = `${frontendUrl}/public/html/productDetail.html?productId=${product._id}`;
      });

      productCardHtml.innerHTML = `
                <p class="newProducts_stockInfo_para"> ✅ in stock</p>
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
                   <img src="../icons/cartIconBLue.png" alt="cart">
                   <p>Add to Cart</p>
                `;
      addToCartButton.addEventListener("click", (e) =>
        handleAddToCart(e, product)
      );
      productCardHtml.append(addToCartButton);

      document
        .querySelector(".allProducts_card_wrapper")
        .append(productCardHtml);
    });
  } catch (error) {
    console.log(error);
  }
};
const bannerImageMapping = {
  phone: "../images/mobile.jpeg",
  watch: "../images/watch.jpeg",
  headphone: "../images/headphone.jpeg",
  gaming: "../images/gaming.jpeg",
  computer: "../images/computer.jpg",
  camera: "../images/camera.jpeg",
};
const fetchDataWithFilter = async () => {
  try {
    document.querySelector(".allProducts_card_wrapper").innerHTML = "";
    const { data, status } = await axios.get(
      `${backendUrl}/product/find?category=${category}`
    );
    if (status === 200) {
      data.message.forEach((product) => {
        const productCardHtml = document.createElement("div");
        productCardHtml.classList.add("newProducts_card");

        productCardHtml.addEventListener("click", () => {
          location.href = `${frontendUrl}/public/html/productDetail.html?productId=${product._id}`;
        });

        productCardHtml.innerHTML = `
                <p class="newProducts_stockInfo_para"> ✅ in stock</p>
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
                   <img src="../icons/cartIconBLue.png" alt="cart">
                   <p>Add to Cart</p>
                `;
        addToCartButton.addEventListener("click", (e) =>
          handleAddToCart(e, product)
        );
        productCardHtml.append(addToCartButton);

        document
          .querySelector(".allProducts_card_wrapper")
          .appendChild(productCardHtml);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const searchProductInAllProducts =async()=>{
//     try {
//       const {data,status} = await  axios.get(`${backendUrl}/product/search?search_query=${searchQuery}`)
//         if(status===200){

//             if(status===200){

//         data.message.forEach(product=>{

//             const productCardHtml = document.createElement("div");
//                 productCardHtml.classList.add("newProducts_card");
//                 productCardHtml.addEventListener("click",()=>{
//                     location.href=  `${frontendUrl}/public/html/productDetail.html?productId=${product._id}`
//                 })

//                 productCardHtml.innerHTML = `
//                 <p class="newProducts_stockInfo_para">✅ in stock</p>
//                 <div class="newProducts_imgWrapper">
//                 <img class="newProducts_Img" src=${product.image[0]}>
//                 </div>
//                 <div class="newProduct_review_box">
//                 Reviews
//                 </div>
//                 <div class="newProduct_details">
//                 <p class="productName">${product.name}</p>
//                 <p class="productDesc">${product.desc}</p>
//                 </div>
//                 <div class="newProduct_priceBox">
//                 <h2 class="newProduct_price">$${product.price}</h2>
//                 </div>
//                 `
//                 const addToCartButton = document.createElement("button");
//                 addToCartButton.className = "addToCart_btn";
//                 addToCartButton.innerHTML = `
//                     <img src="../icons/cartIconBLue.png" alt="cart">
//                     <p>Add to Cart</p>
//                 `;

//                 addToCartButton.addEventListener("click",(e)=>handleAddToCart(e,product))
//                 productCardHtml.append(addToCartButton)

//                 document.querySelector(".allProducts_card_wrapper").appendChild(productCardHtml);

//         })
//     }

//         }
//     } catch (error) {
//         console.log(error)
//     }

// }
// document.querySelectorAll(".priceItemFilter").forEach(item=>{
//     item.addEventListener("click",(e)=>{
//        const minPrice =  e.currentTarget.getAttribute("data-min")
//        const maxPrice =  e.currentTarget.getAttribute("data-max")
//        min = Number(minPrice)|| 1
//        max = Number(maxPrice)
//        fetchDataWithFilter()

//     })
// })
// document.querySelector(".clear_filter_btn").addEventListener("click",()=>{
//     category="";
//     min = 0;
//     max = 0;
//     fetchDataWithFilter()
// })

if (searchQuery) {
  searchProductInAllProducts();
} else if (category) {
  fetchDataWithFilter();
}
const addBanner = () => {
  document.querySelector(".categoryImage").src =
    bannerImageMapping[category?.toLowerCase()] ?? "../images/allproducts.jpeg";
};
addBanner();
fetchAllProducts();
fetchTopSellingProopducts();
