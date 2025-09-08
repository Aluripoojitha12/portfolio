/* =========
   Utilities
========= */

// Get current file name (e.g., "index.html")
function currentPage() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return file;
}

/* =========
   Footer year
========= */
(function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* =========
   Active nav link
========= */
(function setActiveNav() {
  const file = currentPage();
  document.querySelectorAll(".nav-link").forEach((a) => {
    if (a.getAttribute("href") === file) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    }
  });
})();

/* =========
   Theme toggle (persists)
========= */
(function themeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  // Load persisted theme
  const stored = localStorage.getItem("theme") || "light";
  if (stored === "dark") {
    document.body.classList.add("dark");
    btn.textContent = "Light";
    btn.setAttribute("aria-pressed", "true");
  } else {
    btn.textContent = "Dark";
    btn.setAttribute("aria-pressed", "false");
  }

  btn.addEventListener("click", () => {
    const willBeDark = !document.body.classList.contains("dark");
    document.body.classList.toggle("dark", willBeDark);
    localStorage.setItem("theme", willBeDark ? "dark" : "light");
    btn.textContent = willBeDark ? "Light" : "Dark";
    btn.setAttribute("aria-pressed", willBeDark ? "true" : "false");
  });
})();

/* =========
   Bootstrap form validation (Contact page)
========= */
(function contactValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // TODO: Replace with your email/back-end handler
        alert("Thanks! Your message has been sent (demo).");
        form.reset();
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

/* =========
   Projects search filter (Projects page)
========= */
(function projectSearch() {
  const input = document.getElementById("projectSearch");
  if (!input) return;

  const cards = document.querySelectorAll(".project-card");
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const tags = (card.getAttribute("data-tags") || "").toLowerCase();
      const show = text.includes(q) || tags.includes(q);
      card.style.display = show ? "" : "none";
    });
  });
})();
