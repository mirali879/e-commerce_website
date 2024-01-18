const getCartItems = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    cart = JSON.parse(cart);
  }
  return cart ?? [];
};

const checkIfAlreadyExist = (product) => {
  const allProducts = getCartItems();
  return allProducts.some((p) => p._id === product._id);
};

const addToCart = (newCart) => {
  let prev = getCartItems();
  let allProducts = [];

  if (checkIfAlreadyExist(newCart)) {
    allProducts = prev.map((prod) => {
      if (prod._id === newCart._id) {
        return {
          ...prod,
          cartQuantity:
            Number(prod.cartQuantity) + Number(newCart.cartQuantity),
        };
      } else {
        return prod;
      }
    });
  } else {
    allProducts = [...prev, newCart];
  }
  console.log("setting", newCart);
  localStorage.setItem("cart", JSON.stringify(allProducts));
};
// The selected code is a function that removes all items from the user's cart. It does this by removing the "cart" key from local storage. This function is used when the user clicks the "Clear Cart" button.
// This function is used to clear the cart in case the user wants to start over, or if there was an error and they want to start again.

function removeAllCart() {
  localStorage.removeItem("cart");
}

const removeUserFromLs = () => {
  localStorage.removeItem("user");
};

const removeProductFromCart = (id) => {
  const cart = getCartItems();
  const products = cart.filter((item) => item._id !== id);

  localStorage.setItem("cart", JSON.stringify(products));
};
