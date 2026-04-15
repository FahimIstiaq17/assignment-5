let allIssues = [];

const loadingSpinner = document.getElementById("loadingSpinner");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalAuthor = document.getElementById("modalAuthor");
const modalCreated = document.getElementById("modalCreated");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", async () => {
  const searchText = searchInput.value.trim();
  // console.log("btn clicked");
  if (searchText === "") {
    displayIssues(allIssues);
    return;
  }
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  );
  const data = await res.json();
  const issues = data.data;
  const filtered = issues.filter((issue) =>
    issue.title.toLowerCase().includes(searchText.toLowerCase()),
  );
  displayIssues(filtered);
});

// data from API
async function loadIssues() {
  loadingSpinner.classList.remove("hidden");
  loadingSpinner.classList.add("flex");

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();

  loadingSpinner.classList.add("hidden");
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
    // console.log(issue);

    const div = document.createElement("div");

    const borderColor =
      issue.status.toLowerCase() === "open"
        ? "border-t-5 border-[#00A96E]"
        : "border-t-5 border-[#A855F7]";

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
      <div class="bg-[#FEECEC] rounded-full py-1.5 px-2 font-medium text-[#EF4444] text-sm outline-1">
        <span>
          <i class="fa-solid fa-bug"></i>
          <span>${label.toUpperCase()}</span>
        </span>
      </div>
    `;
        } else if (l === "documentation") {
          return `
      <div class="bg-[#FFF8DB] rounded-full py-1.5 px-2 font-medium text-[#D97706] text-sm outline-1">
        <span>
          <i class="fa-solid fa-book"></i>
          <span>${label.toUpperCase()}</span>
        </span>
      </div>
    `;
        } else if (l === "enhancement") {
          return `
      <div class="bg-[#cbeaff] rounded-full py-1.5 px-2 font-medium text-[#2398f7] text-sm outline-1">
        <span>
          <i class="fa-solid fa-hand-sparkles"></i>
          <span>${label.toUpperCase()}</span>
        </span>
      </div>
    `;
        } else if (l === "good first issue") {
          return `
      <div class="bg-[#EDE9FE] rounded-full py-1.5 px-2 font-medium text-[#7C3AED] text-sm outline-1">
        <span>
          <i class="fa-solid fa-file-circle-exclamation"></i>
          <span>${label.toUpperCase()}</span>
        </span>
      </div>
    `;
        } else if (l === "help wanted") {
          return `
      <div class="bg-[#DCFCE7] rounded-full py-1.5 px-2 font-medium text-[#16A34A] text-sm outline-1">
        <span>
          <i class="fa-solid fa-handshake"></i>
          <span>${label.toUpperCase()}</span>
        </span>
      </div>
    `;
        }
      })
      .join("");

    div.innerHTML = `
          <div id="card1" class="bg-[#FFFFFF] p-4 rounded-md shadow-md" onclick="openIssueModal (${issue.id})" >
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

function activeButton(activated) {
  const buttons = document.querySelectorAll(".tab-btn");

  // all buttons inactive
  buttons.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white");
    btn.classList.add("bg-white", "text-gray-700");
  });

  // selected button active
  const activeBtn = document.getElementById(activated);
  activeBtn.classList.remove("bg-white", "text-gray-700");
  activeBtn.classList.add("bg-[#4A00FF]", "text-white");
}

function issueCount(issues) {
  document.getElementById("total-count").innerText = issues.length;
}

// Switch tabs
function switchTab(type) {
  const container = document.getElementById("issuesContainer");

  loadingSpinner.classList.remove("hidden");
  container.classList.add("hidden");

  setTimeout(() => {
    if (type === "all") {
      activeButton("issuesAll");
      displayIssues(allIssues);
      issueCount(allIssues);
    } else if (type === "open") {
      activeButton("tab-open");
      const openIssues = allIssues.filter(
        (issue) => issue.status.toLowerCase() === "open",
      );
      displayIssues(openIssues);
      issueCount(openIssues);
    } else if (type === "closed") {
      activeButton("tab-closed");
      const closedIssues = allIssues.filter(
        (issue) => issue.status.toLowerCase() === "closed",
      );
      displayIssues(closedIssues);
      issueCount(closedIssues);
    }

    loadingSpinner.classList.add("hidden");
    container.classList.remove("hidden");
  }, 0);
}

// issue modal
const openModal = document.getElementById("issueModal");

async function openIssueModal(issueId) {
  console.log(issueId, "issueId");
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
  );
  const data = await res.json();
  const dataDetails = data.data;
  console.log(dataDetails, "data");

  openModal.showModal();

  modalTitle.textContent = dataDetails.title;
  modalStatus.textContent = dataDetails.status;
  modalAuthor.textContent = dataDetails.author;
  modalCreated.textContent = dataDetails.createdAt;
  modalLabels.textContent = dataDetails.labels;
  modalDescription.textContent = dataDetails.description;
  modalAssignee.textContent = dataDetails.assignee;
  modalPriority.textContent = dataDetails.priority;

  modalLabels.innerHTML = "";

  modalLabels.innerHTML = dataDetails.labels
    .map((label) => {
      let color = "";
      let icon = "";

      if (label.toLowerCase() === "bug") {
        color = "bg-[#FEECEC] text-[#EF4444]";
        icon = "fa-bug";
      } else if (label.toLowerCase() === "help wanted") {
        color = "bg-[#DCFCE7] text-[#16A34A]";
        icon = "fa-handshake";
      } else if (label.toLowerCase() === "documentation") {
        color = "bg-[#FFF8DB] text-[#D97706]";
        icon = "fa-book";
      } else if (label.toLowerCase() === "enhancement") {
        color = "bg-[#E0F2FE] text-[#0284C7]";
        icon = "fa-hand-sparkles";
      } else if (label.toLowerCase() === "good first issue") {
        color = "bg-[#EDE9FE] text-[#7C3AED]";
        icon = "fa-file-circle-exclamation";
      } else {
        color = "bg-gray-200 text-gray-700";
        icon = "fa-tag";
      }

      return `
      <button class="rounded-full py-1.5 px-2 font-medium text-sm outline-1 ${color}">
        <i class="fa-solid ${icon}"></i> ${label.toUpperCase()}
      </button>
    `;
    })
    .join("");
}

loadIssues();