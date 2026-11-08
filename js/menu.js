document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#menu");

menuButton.addEventListener("click", function () {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && menu.classList.contains("is-open")) {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.focus();
  }
});
