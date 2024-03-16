/* -----------------------------------POPUP------------------------- */

const popup = $(".popup");
const btn = $(".btn");
const popup__close = $(".popup__close");
const popup__bg = $(".popup__dark-overlay");
popup__close.on("click", togglePopup);
popup__bg.on("click", togglePopup);
btn.on("click", togglePopup);

function togglePopup() {
  popup.toggleClass("visible");
  $("body").toggleClass("overflow");
}


