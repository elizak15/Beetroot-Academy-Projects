/* --------------------------------Validation ---------------------- */
const form = document.getElementById("myform");

form.onsubmit = sendForm;

function sendForm() {
  const elements = this.elements;
  let isValid = true;

  const els = [...elements];
  els.forEach((el) => {
    el.onkeyup = handleClean;
    if (el.classList.contains("js-validate")) {
      if (!el.value.trim().length) {
        const error = `Feld ${el.name} darf nicht leer sein!`;
        el.nextElementSibling.textContent = error;
        isValid = false;
      }
    }
  });
  if (!isValid) {
    return false;
  }
}
function handleClean() {
  if (!this.value.trim().length) {
    const error = `Feld ${this.name} darf nicht leer sein!`;
    this.nextElementSibling.textContent = error;
    return;
  } else {
    this.nextElementSibling.textContent = "";
  }
}