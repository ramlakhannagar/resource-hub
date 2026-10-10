// 1. Starter resources (used only the first time, before anything is saved)
const defaultResources = [
  {
    title: "MDN Web Docs",
    category: "Web Dev",
    description: "The best place to learn HTML, CSS and JavaScript.",
    link: "https://developer.mozilla.org",
    votes: 0
  },
  {
    title: "Flutter Docs",
    category: "App Dev",
    description: "Official guides for building mobile apps with Flutter.",
    link: "https://docs.flutter.dev",
    votes: 0
  },
  {
    title: "Kaggle Learn",
    category: "AI/ML",
    description: "Free short courses on Python, data and machine learning.",
    link: "https://www.kaggle.com/learn",
    votes: 0
  },
  {
    title: "VS Code",
    category: "Tools",
    description: "The free code editor you are using right now.",
    link: "https://code.visualstudio.com",
    votes: 0
  }
];

// 2. Load saved resources from the browser. If nothing is saved yet, use the starter list.
const saved = localStorage.getItem("resources");
const resources = saved ? JSON.parse(saved) : defaultResources;

// 3. Save the current list into the browser
function saveResources() {
  localStorage.setItem("resources", JSON.stringify(resources));
}

// 4. Turn special characters into harmless text, so typed text can never act as code
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 5. Find the elements on the page that we need
const resourceList = document.getElementById("resourceList");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const addForm = document.getElementById("addForm");

// 6. Draw cards for whatever list we give this function
function renderResources(list) {
  resourceList.innerHTML = "";

  if (list.length === 0) {
    resourceList.innerHTML = '<p class="empty">No resources found.</p>';
    return;
  }

  list.forEach(function (item) {
    // Position of this resource in the full list (the upvote button needs it)
    const index = resources.indexOf(item);

    resourceList.innerHTML += `
      <div class="card">
        <h3>${escapeHTML(item.title)}</h3>
        <span class="category">${escapeHTML(item.category)}</span>
        <p>${escapeHTML(item.description)}</p>
        <div class="card-footer">
          <a href="${escapeHTML(item.link)}" target="_blank">Visit</a>
          <button type="button" class="upvote-btn" data-index="${index}">▲ ${item.votes || 0}</button>
        </div>
      </div>
    `;
  });
}

// 7. Check the search text AND the chosen category, then draw
function applyFilters() {
  const text = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = resources.filter(function (item) {
    const matchesText =
      item.title.toLowerCase().includes(text) ||
      item.description.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text);

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    return matchesText && matchesCategory;
  });

  renderResources(filtered);
}

// 8. When the form is submitted, add the new resource and save it
addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newResource = {
    title: document.getElementById("newTitle").value.trim(),
    category: document.getElementById("newCategory").value,
    description: document.getElementById("newDescription").value.trim(),
    link: document.getElementById("newLink").value.trim(),
    votes: 0
  };

  if (!newResource.link.startsWith("http")) {
    alert("Please enter a link that starts with http:// or https://");
    return;
  }

  resources.unshift(newResource);
  saveResources();

  addForm.reset();
  searchInput.value = "";
  categorySelect.value = "All";
  applyFilters();
});

// 9. When an upvote button is clicked, add one vote and save
resourceList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("upvote-btn")) {
    return;
  }

  const index = Number(event.target.dataset.index);
  resources[index].votes = (resources[index].votes || 0) + 1;

  saveResources();
  applyFilters();
});

// 10. Run applyFilters when the user types or changes the dropdown
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

// 11. Show everything when the page first loads
renderResources(resources);

// 12. Dark / light mode
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "Dark mode";
  }
}

// When the page loads, use the saved choice (light if nothing is saved)
applyTheme(localStorage.getItem("theme") || "light");

// When the button is clicked, switch the theme and save it
themeToggle.addEventListener("click", function () {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});