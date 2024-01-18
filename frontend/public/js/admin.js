// fetching all products in the admin panel
const fetchAdminProducts = async () => {
    try {
      const { status, data } = await axios.get(`${backendUrl}/product`)
      console.log(data.message, "hi");
      if (status === 200) {
        document.querySelector(".admin_product_card_container").innerHTML = "";
        data.message.forEach((product) => {
          document.querySelector(
            ".admin_product_card_container"
          ).innerHTML += `<a href="${frontendUrl}/public/html/productDetail.html?productId=${product._id}" class="admin_product_card">
              <div class="admin_product_card_img_wrapper">
                  <img src=${product.image[0]} alt="productImg">
              </div>
              <div class="admin_product_card_detail">
  
                  <p class="admin_product_product_name">${product.name} </p>
                  <h3 class="admin_product_product_price">Rs. ${product.price}</h3>
              </div>
              <div class="admin_product_card_button_wrapper">
          
                  <button class="deleteProductButtonAdmin" onclick="handleAdminCartDelete('${product._id}')">
                      <p class="admin_product_del_txt">Delete</p>
                  </button>
              </div>
          </a>`;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // deleting the product card from the database
  const handleAdminCartDelete = async (id) => {
    try {
      const { data, status } = await axios.delete(`${backendUrl}/product/${id}`)
      if (status === 200) {
        showToast("success", "deleted successfully");
        setTimeout(() => {
          fetchAdminProducts();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // fetching category
  const fetchAllCategory = async () => {
    try {
      const { data, status } = await axios.get(`${backendUrl}/category`)
      if (status === 200) {
        data.message.forEach((ca) => {
          document.querySelector(".admin_product_select").innerHTML += `
          <option value=${ca.categoryName}>${ca.categoryName}</option>
          `;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  fetchAdminProducts();
  fetchAllCategory();