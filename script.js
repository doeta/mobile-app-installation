document.addEventListener("DOMContentLoaded", () => {
  injectNavbar();
  initEvents();
});

function injectNavbar() {
  const path = window.location.pathname;
  const isPagesDir = path.includes("/pages/") || path.includes("\\pages\\");
  const basePath = isPagesDir ? "../" : "";
  const pagesPath = isPagesDir ? "" : "pages/";
  const currentPage = path.split("/").pop().split("\\").pop() || "index.html";

  const navHtml = `
    <nav class="navbar">
        <div class="container">
            <a href="${basePath}index.html" class="logo">PebePE</a>
            <ul class="nav-links">
                <li><a href="${basePath}index.html" data-page="index.html">Home</a></li>
                <li><a href="${pagesPath}about.html" data-page="about.html">About</a></li>
                <li class="dropdown">
                    <a href="#" class="dropbtn">Tutorials ▾</a>
                    <div class="dropdown-content">
                        <a href="${pagesPath}android.html" data-page="android.html">Android Studio</a>
                        <a href="${pagesPath}ios.html" data-page="ios.html">iOS (XCode)</a>
                        <a href="${pagesPath}reactnative.html" data-page="reactnative.html">React Native</a>
                        <a href="${pagesPath}flutter.html" data-page="flutter.html">Flutter</a>
                        <a href="${pagesPath}kmm.html" data-page="kmm.html">Kotlin Multiplatform</a>
                    </div>
                </li>
            </ul>
            <div class="nav-right">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode">
                    <span>🌙</span>
                </button>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
    `;

  document.body.insertAdjacentHTML("afterbegin", navHtml);

  let pageName = currentPage;
  if (pageName === "" || pageName === "tugas%20install")
    pageName = "index.html";

  const activeLink = document.querySelector(
    `.nav-links a[data-page="${pageName}"]`
  );
  if (activeLink) {
    activeLink.classList.add("active");
    // Highlight parent dropdown if child is active
    const parentDropdown = activeLink.closest(".dropdown");
    if (parentDropdown) {
      const dropBtn = parentDropdown.querySelector(".dropbtn");
      if (dropBtn) dropBtn.classList.add("active");
    }
  } else if (pageName === "index.html") {
    const homeLink = document.querySelector(
      '.nav-links a[data-page="index.html"]'
    );
    if (homeLink) homeLink.classList.add("active");
  }
}

function initEvents() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const dropBtn = dropdown.querySelector(".dropbtn");
    if (dropBtn) {
      dropBtn.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("active");
        }
      });
    }
  });

  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const setTheme = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "dark" ? "light" : "dark"} mode`
      );
    }
  };

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(systemTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }
}
