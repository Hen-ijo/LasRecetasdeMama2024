/* Variables */
const currentLocation = window.location.pathname;
const menuLinks = document.querySelectorAll(".menu a");
const menuLinksDesktop = document.querySelectorAll(".menu-desktop a");
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const body = document.body;
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
/* Variables */

// Verifica si el año actual es diferente a 2024
if (currentYear !== 2024) {
  yearElement.innerHTML = `Desarrollado por el grupo 5 &copy; 2024 - ${currentYear}`;
}

// Marcar el enlace activo según la ubicación actual
const setActiveLink = (links) => {
  links.forEach((link) => {
    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active");
    }
  });
};

setActiveLink(menuLinks);
setActiveLink(menuLinksDesktop);

/* Mobile Menu */
menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  body.classList.toggle("no-scroll");

  const menuIcon = menuBtn.querySelector("i");
  if (menuIcon.classList.contains("fa-bars")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-close");
  } else {
    menuIcon.classList.remove("fa-close");
    menuIcon.classList.add("fa-bars");
  }
});
/* Mobile Menu */

/* Scroll Top Btn */
document.addEventListener("DOMContentLoaded", () => {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
/* Scroll Top Btn */
