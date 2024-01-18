let uploadPayload = {
  name: "",
  desc: "",
  owner: "",
  price: "",
  image: [],
  quantity: "",
  category: "",
  tags: [],
  specs: [],
};

const specs = [];
const cloudName = "codewithmama"; // replace with your own cloud name
const uploadPreset = "wrapfileImg"; // replace with your own upload preset

document.querySelector("#uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  // alert("helo");

  // let user = getLoginUserFromLs();
  // if (!user) return;
  //   uploadPayload.name = document.value
  // uploadPayload.desc= document.qsl
  uploadPayload.name = document.querySelector("#name").value;
  uploadPayload.desc = document.querySelector("#desc").value;
  uploadPayload.price = document.querySelector("#price").value;
  uploadPayload.quantity = document.querySelector("#quantity").value;
  uploadPayload.category = document.querySelector("#category").value;
  // uploadPayload.owner = user._id;
  uploadPayload.tags = document.querySelector("#tags").value.split(",");
  document.querySelectorAll(".specsInputItem").forEach((sp) => {
    uploadPayload.specs.push(sp.value);
  });

  try {
    const { data, status } = await axios.post(
      `${backendUrl}/product/create`,
      uploadPayload
    );
    console.log(data, "img");
    if (status === 200) {
      document.querySelector("#name").value = "";
      document.querySelector("#desc").value = "";
      document.querySelector("#price").value = "";
      document.querySelector("#quantity").value = "";
      document.querySelector("#category").value = "";
      document.querySelector("#tags").value = "";
      document.querySelector(".specsContainer").innerHTML = "";
      document.querySelector(".productImagePreview").innerHTML = "";
      showToast("success", "uploaded successfully");
      location.href = `${frontendUrl}/index.html`;
    }
  } catch (error) {
    console.log(error);
  }
});

const getLoginUserFromLs = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  return user ?? null;
};

const fetchCategory = async () => {
  const { data, status } = await axios.get("/category");
  if (status === 200) {
    data.message.forEach((option) => {
      document.querySelector("#cateogory").innerHTML += `
        <option value=${option.categoryName}>${option.categoryName}</option>`;
    });
  }
  console.log(data.message);
};

const previewImages = () => {
  uploadPayload.image.forEach((img) => {
    document.querySelector(".productImagePreview").innerHTML += `
      <img src=${img} alt="productImg"/>
    `;
  });
};

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multiple: true, //restrict upload to a single file
    sources: ["local"],
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      uploadPayload.image.push(result.info.secure_url);
      document.querySelector(".productImagePreview").innerHTML += `
      <img src=${result.info.secure_url} alt="productImg"/>
    `;
    }
  }
);

document.querySelector(".selectImage").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

// specsContainer
document
  .querySelector(".addSpecsButton")
  .addEventListener("click", async () => {
    let html = `
      <input  type="text" placeholder="write about specs" />
    `;
    let input = document.createElement("input");
    input.classList.add("specsInputItem");
    input.setAttribute("placeholder", "write about specs");

    document.querySelector(".specsContainer").appendChild(input);
  });
fetchCategory();
