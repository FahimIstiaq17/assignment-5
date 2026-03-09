let currentTab = "all";
const tabActive = ["bg-[#4A00FF]", "text-white"];
const tabInactive = ["bg-white", "text-[#64748B]"];

// SignIn page
document.getElementById("sign-btn").addEventListener("click", function (){
    // console.log("sign button clicked");
    // get the username 
    const usernameInput = document.getElementById("input-username");
    const username = usernameInput.value;
    console.log(username);
    
    // get the pass
    const pinInput = document.getElementById("input-pin");
    const pin = pinInput.value;
    console.log(pin);
    
    // match username & pass
    if(username=="admin" && pin=="admin123"){
        // true> alert > homepage
        alert("SignIn Successful");
        window.location.assign("/home.html");
    } else{
        // false> alert >return
        alert("SignIn Failed");
        return;
    }
});



function switchTab(tab) {
  const Tabs = ["all", "open", "closed"];
  currentTab = tab;
  for (const ttab of Tabs) {
    const tabName = document.getElementById("tab-" + ttab);
    if (ttab === tab) {
      tabName.classList.add(...tabActive);
      tabName.classList.remove(...tabInactive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
    }
  }
}

switchTab(currentTab);