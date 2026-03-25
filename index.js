
let allIssues = [];

// data from API
async function loadIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const data = await res.json();

  // store all issues
  allIssues = data.data;

  // show all by default
  switchTab("all");
  displayIssues(allIssues);
}

//  Display issues
function displayIssues(issues) {
  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  if (issues.length === 0) {
    container.innerHTML = "<p>No issues found</p>";
    return;
  }

  issues.forEach((issue) => {
    console.log(issue);

    const div = document.createElement("div");

    const borderColor =
      issue.status.toLowerCase() === "open" ? "border-t-5 border-[#00A96E]" : "border-t-5 border-[#A855F7]";

    div.className = `${borderColor} pt-1.5 rounded-xl`;

    const statusUI =
      issue.status.toLowerCase() === "open"
        ? `<div class="w-8 h-8 bg-[#CBFADB] rounded-full flex items-center justify-center">
       <i class="fa-solid fa-circle-notch text-[#00A96E]"></i>
     </div>`
        : `<div class="w-8 h-8 bg-[#F0E2FF] rounded-full flex items-center justify-center">
        <i class="fa-solid fa-circle-check text-[#A855F7]"></i>
        </div>`;

    const priorityColor =
      issue.priority.toLowerCase() === "high"
        ? `bg-[#FEECEC] rounded-full text-[#EF4444] py-1.5 px-6`
        : issue.priority.toLowerCase() === "medium"
          ? `bg-[#FFF6D1] rounded-full text-[#F59E0B] py-1.5 px-6`
          : `bg-[#EEEFF2] rounded-full text-[#9CA3AF] py-1.5 px-6`;

          // LABELS
    const labelsHtml = issue.labels
      .map((label) => {
        const l = label.toLowerCase();

        if (l === "bug") {
          return `
      <div class="bg-[#FEECEC] rounded-full py-1.5 px-3 font-medium text-[#EF4444] outline-1">
        <span class="space-x-1.5">
          <i class="fa-solid fa-bug"></i>
          <span>${label}</span>
        </span>
      </div>
    `;
        } else if (l === "documentation") {
          return `
      <div class="bg-[#FFF8DB] rounded-full py-1.5 px-3 font-medium text-[#D97706] outline-1">
        <span class="space-x-1.5">
          <i class="fa-solid fa-book"></i>
          <span>${label}</span>
        </span>
      </div>
    `;
        } else if (l === "enhancement") {
          return `
      <div class="bg-[#cbeaff] rounded-full py-1.5 px-3 font-medium text-[#2398f7] outline-1">
        <span class="space-x-1.5">
          <i class="fa-solid fa-hand-sparkles"></i>
          <span>${label}</span>
        </span>
      </div>
    `;
        } else if (l === "good first issue") {
          return `
      <div class="bg-[#EDE9FE] rounded-full py-1.5 px-3 font-medium text-[#7C3AED] outline-1">
        <span class="space-x-1.5">
          <i class="fa-solid fa-file-circle-exclamation"></i>
          <span>${label}</span>
        </span>
      </div>
    `;
        } else if (l === "help wanted") {
          return `
      <div class="bg-[#DCFCE7] rounded-full py-1.5 px-3 font-medium text-[#16A34A] outline-1">
        <span class="space-x-1.5">
          <i class="fa-solid fa-handshake"></i>
          <span>${label}</span>
        </span>
      </div>
    `;
        }   
      }).join("");

    div.innerHTML = `
              <div id="card1" class="bg-[#FFFFFF] p-4 rounded-md shadow-md ">
            <!-- status & Priority -->
            <div class="flex items-center justify-between">
              ${statusUI}
              <p class="${priorityColor} rounded-full py-1.5 px-6">
                ${issue.priority}
              </p>
            </div>

            <div class="my-4 space-y-2">
              <h1 class="font-semibold text-[#1F2937] text-[20px] line-clamp-1">
                ${issue.title}
              </h1>
              <p class="text-[#64748B] line-clamp-2">
                ${issue.description}
              </p>

              <div class="Button flex flex-wrap gap-3">
                ${labelsHtml}
              </div>

            </div>

            <hr class="border-gray-300 pb-4" />

            <div class="text-[#64748B]">
              <div class = "flex justify-between">
              <p class="text-[13px]">#${issue.id} by ${issue.author}</p>
              <p class="text-[13px]">${issue.createdAt}</p>
              </div>

              <div class = "flex justify-between">
              <p class="text-[13px]">Assignee:${issue.assignee}</p>
              <p class="text-[13px]">Updated :${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    `;

    container.appendChild(div);
  });
}

// document.getElementById("issuesAll").classList.remove("bg-red-700" , "text-white");
// document.getElementById("tab-open").classList.remove("bg-[#4A00FF]" , "text-white");
// document.getElementById("tab-closed").classList.remove("bg-[#4A00FF]" , "text-white");

function activeButton(activated) {
  const buttons = document.querySelectorAll(".tab-btn");

  // all buttons inactive
  buttons.forEach(btn => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
    btn.classList.add("bg-white", "text-gray-700");
  });

  // selected button active
  const activeBtn = document.getElementById(activated);
  activeBtn.classList.remove("bg-white", "text-gray-700");
  activeBtn.classList.add("bg-[#4A00FF]", "text-white");
}

// Switch tabs
function switchTab(type) {
  if (type === "all") {
    activeButton("issuesAll");
    displayIssues(allIssues);
  } 
  else if (type === "open") {
    activeButton("tab-open");
    const openIssues = allIssues.filter(
      (issue) => issue.status.toLowerCase() === "open",
    );
    displayIssues(openIssues);
  } 
  else if (type === "closed") {
    activeButton("tab-closed");
    const closedIssues = allIssues.filter(
      (issue) => issue.status.toLowerCase() === "closed",
    );
    displayIssues(closedIssues);
  }
}

loadIssues();

// SignIn page
document.getElementById("sign-btn").addEventListener("click", function () {
  // get the username
  const usernameInput = document.getElementById("input-username");
  const username = usernameInput.value;
  console.log(username);

  // get the pass
  const pinInput = document.getElementById("input-pin");
  const pin = pinInput.value;
  console.log(pin);

  // match username & pass
  if (username == "admin" && pin == "admin123") {
    // true> alert > homepage
    alert("SignIn Successful");
    window.location.assign("/home.html");
  } else {
    // false> alert >return
    alert("SignIn Failed");
    return;
  }
});

