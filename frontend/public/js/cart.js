let cartItem = getCartItems();//This line initializes a variable cartItem by calling the getCartItems function, presumably fetching the items in the user's shopping cart.

const displayAllCarts = () => {
  // Fetching cart items again (refreshing the cart)
  cartItem = getCartItems();

  // Checking if the cart is empty
  if (!cartItem.length) {
     // If empty, hide the shopping cart content and display a message for an empty cart
    document.querySelector(".shoppingCart_innerContent").style.display = "none";
    document.querySelector(".empty_shopping_cart_content").style.display =
      "flex";
  } else {
     // If not empty, show the shopping cart content and hide the empty cart message
    document.querySelector(".shoppingCart_innerContent").style.display = "flex";
    document.querySelector(".empty_shopping_cart_content").style.display =
      "none";
  }

    // Initializing total amount
  let totalAmount = 0;

  // Updating "Buy Now" button text if the cart is empty
  if (!cartItem.length) {
    document.querySelector(".buyNowButton").innerText = "Your cart is empty";
  }
    // Clearing the product list HTML
  document.querySelector(".shoppingCartProductList").innerHTML = "";
  // Iterating through each item in the cart and updating the display
  cartItem.forEach((cart) => {
      // Calculating the total amount
    totalAmount += cart.cartQuantity * Number(cart.price);
      // Updating the product list HTML
    document.querySelector(".shoppingCartProductList").innerHTML += `
                                <tr class="cart_product_item">
                                    <td >
                                    <div class="shoppingCart_item_name_box">
                                        <div class="shoppingCart_item_img_box">
                                            <img  src=${
                                              cart.image[0]
                                            } alt="item">
                                        </div>
                                    <p class="shopping_item_para">${
                                      cart.name
                                    }</p>
                                    </div>
                                    </td>
                                    <td>${cart.price}</td>
                                    <td><input disabled type="number" value="${
                                      cart.cartQuantity
                                    }"/></td>
                                    <td>${
                                      cart.cartQuantity * Number(cart.price)
                                    }</td>
                                    <td>
                                      <button id=${
                                        cart._id
                                      } class="removeCartButton">remove</button>
                                    </td>
                                </tr>
        `;
  });

  // Displaying total amount and updating the display
  document.querySelector(
    ".summarySubTotalAmount"
  ).innerText = `$${totalAmount}`;
  document.querySelector("#shoppingOrder_total_cost").innerText = `$${
    totalAmount + 10
  }`;

   // Adding event listeners to the "remove" buttons for each product
  document.querySelectorAll(".removeCartButton").forEach((element) => {
    element.addEventListener("click", () => {
      const id = element.getAttribute("id");
      const cartItem = element.closest(".cart_product_item");
      cartItem.remove();
      removeProductFromCart(id);
      displayAllCarts();
      displayCartCount();
    });
  });
};
const handleBuyclick = (e) => {
  e.preventDefault();
  // Checking if a user is logged in
  let user = fetchLoggedInUser();

  if (!user) {
    alert(" you  need to login first ");
    return;
  }
 // Checking if the cart is empty
  if (!cartItem.length) {
    alert("Your cart is empty");
    return;
  }
    // Saving shipping details to local storage and redirecting to the checkout page
  let shippingPayload = {
    address: document.querySelector("#shipping_address_input").value,
    number: document.querySelector("#shipping_phone_input").value,
  };

  localStorage.setItem("shippingDetails", JSON.stringify(shippingPayload));
  location.href = `${frontendUrl}/public/html/checkout.html`;
};

displayAllCarts();

document
  .querySelector(".summaryCart_summary_box")
  .addEventListener("submit", handleBuyclick);

document
  .querySelector(".clear_shoppingCart_btn")
  .addEventListener("click", () => {
    removeAllCart();
    displayAllCarts();
    displayCartCount();
  });
// Adjusting the display based on whether a user is logged in or not
if (fetchLoggedInUser()) {
  document.querySelector(".shoppingCartLoginButton").style.display = "none";
  document.querySelector(".buyNowButton").style.display = "block";
} else {
  document.querySelector(".shoppingCartLoginButton").style.display = "block";
  document.querySelector(".buyNowButton").style.display = "none";
}


//This code manages the display of shopping cart items, allows users to remove items, and handles the process of initiating a purchase. The code also considers user authentication and updates the UI accordingly. 
