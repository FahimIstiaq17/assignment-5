// SignIn page
const signBtn = document.getElementById("sign-btn");

if (signBtn) {
  signBtn.addEventListener("click", function () {
    const username = document.getElementById("input-username").value.trim();
    const pin = document.getElementById("input-pin").value.trim();

    if (username === "admin" && pin === "admin123") {
      alert("SignIn Successful");
      window.location.assign("home.html");
    } else {
      alert("SignIn Failed");
    }
  });
}
