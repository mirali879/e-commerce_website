let showToast = async (type, message) => {
    if (type === "error") {
      toastr.error(message);
    } else {
      toastr.success(message);
    }
};



