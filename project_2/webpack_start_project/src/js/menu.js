/* -----------------------------------MENU------------------------- */
const menuBtn = $(".nav__burger");
const darkOverlay = $(".dark-overlay");
const mobileMenu = $(".mobile-menu");
const li = $(".nav-desktop-li");

$(document).on("click", ".menu-button", handleMenu);
$(document).on("click", ".nav-desktop-li", closeMenu);
$(document).on("click", ".dark-overlay", closeMenu);
// $(document).on("click", ".is-submenu", handleToggleMenu);

function handleMenu(e) {
  e.preventDefault();
  darkOverlay.toggleClass("visible");
  mobileMenu.toggleClass("visible");
}
function closeMenu() {
  darkOverlay.removeClass("visible");
  mobileMenu.removeClass("visible");
}

function initMobile() {
  console.log("is-mobile");
}

function initDesktop() {
  console.log("is-desktop");
  resetMobileMenu();
}

function resetMobileMenu() {
  darkOverlay.removeClass("visible");
  mobileMenu.removeClass("visible");
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 767px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 960px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);
/* -----------------------------------MENU------------------------- */