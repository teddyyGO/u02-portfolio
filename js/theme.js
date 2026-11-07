const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (savedTheme === null && prefersDark)) {
  document.documentElement.classList.add("dark");
}

document.addEventListener("DOMContentLoaded", function () {
  const themeButton = document.querySelector(".theme-button");
  themeButton.setAttribute("aria-pressed", document.documentElement.classList.contains("dark"));

  themeButton.addEventListener("click", function () {
    const isDark = document.documentElement.classList.toggle("dark");
    themeButton.setAttribute("aria-pressed", isDark);

    if (isDark) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});
