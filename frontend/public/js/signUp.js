

const handleSignup = async (e) => {
    e.preventDefault();
    alert("subminting")
    console.log("inside form");
    const username = document.querySelector("#signup_username");
    
    const email = document.querySelector("#signup_email");
    const country = document.querySelector("#signup_select");
    const password = document.querySelector("#signup_password");
    const confirmPassword = document.querySelector("#signup_confirm_password");
    const signupPayload = {
      username: username.value,
      email: email.value,
      country: country.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };
    
    try {
      if (signupPayload.password !== signupPayload.confirmPassword) {
        showToast("error","password doesn't match");
        return;
      }
      const { data, status } = await axios.post(
        `${backendUrl}/auth/register`,
        signupPayload
      );

      username.value = "";
      email.value = "";
      country.value = "";
      password.value = "";
      confirmPassword.value = "";





      if (status === 200) {
        setTimeout(() => {
          window.location.href =
            `${frontendUrl}/public/html/login.html`;
        }, 2000);
        showToast("success", "successfully registered");
      }
    } catch (error) {
      showToast("error",error.message)
      console.log(error);
    }
  };
  
  const fetchCountry = async () => {
    try {
      const { data, status } = await axios.get(
        "https://restcountries.com/v3.1/all"
      );
      console.log(data);
      data.forEach((country) => {
        document.querySelector(
          "#signup_select"
        ).innerHTML += ` <option value="${country.name.common}">${country.name.common}</option>`;
      });
    } catch (error) {
      console.log(error);
    }
  };
  fetchCountry();
  
  document.querySelector("#signupForm").addEventListener("submit", handleSignup);
  console.log(document.querySelector("#signupForm"));