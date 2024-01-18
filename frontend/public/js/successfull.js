let shippingDetails = localStorage.getItem("shippingDetails") ?? {};
if (shippingDetails) {
  shippingDetails = JSON.parse(shippingDetails);
}
let clientSecret = new URLSearchParams(window.location.search).get(
  "payment_intent_client_secret"
);

checkStatus();
async function checkStatus() {
  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  console.log("payment intent status: " + paymentIntent.status);

  switch (paymentIntent.status) {
    case "succeeded":
      checkIfOrderIsDone();
      break;
  }
}

async function checkIfOrderIsDone() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  try {
    const { data, status } = await axios.get(
      `${backendUrl}/order/checkIsOrderIsDone/${clientSecret}`
    );
    if (status === 200) {
      if (data.message === false) {
        handleCreateOrder();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const handleCreateOrder = async () => {
  const cart = getCartItems();
  const user = fetchLoggedInUser();
  let totalPrice = 0;

  const item = cart.map((item) => {
    totalPrice += item.price;
    return {
      product: item._id,
      buyQuantity: item.cartQuantity,
    };
  });

  const orderPayload = {
    item,
    order_intent_secret: clientSecret,
    totalPrice,
    buyer: user._id,
    ...shippingDetails,
  };

  try {
    const { status } = await axios.post(
      `${backendUrl}/order/create`,
      orderPayload
    );
    console.log("create order status", status);

    if (status === 200) {
      console.log("removing all carts");
      removeAllCart();
      localStorage.removeItem("orderDetails");
    }
  } catch (error) {
    console.log(error);
  }
};
