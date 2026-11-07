document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#menu");

menuButton.addEventListener("click", function () {
  const isOpen = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});
