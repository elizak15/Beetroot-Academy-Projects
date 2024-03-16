
/*-------------------------------------------------Cart-------------------------*/

const products = [{
    "id": 1,
    "class": "item tisch itemPrice350 item1",
    "name": "Penta",
    "description": "Horizontale Schrankbetten",
    "price": 350,
    "image" : "/img/item_table.svg"
},
{
    "id": 2,
    "class": "item schrankbett itemPrice550 item2",
    "name": "Schrankbetten",
    "description": "Schrankbetten",
    "price": 550,
    "image" : "/img/item.svg"
},
{
    "id": 3,
    "class": "item tisch itemPrice350 item3",
    "name": "Penta",
    "description": "Schrankbetten PLUS",
    "price": 350,
    "image" : "/img/item_table.svg"
},
{
    "id": 4,
    "class": "item schrankbett itemPrice850 item4",
    "name": "Schrankbett",
    "description": "Vertikale Schrankbetten",
    "price": 850,
    "image" : "/img/item.svg"
}
] 

const cart = $(".cartTab");
const button = $(".cart__btn");
const darkOverlayCart = $(".dark-overlay-cart");
$(document).on("click", ".nav__cart", Cart);
$(document).on("click", ".dark-overlay-cart", closeCart);

// $(document).on("click", ".is-submenu", handleToggleMenu);
function Cart(e) {
  const cartOb = backupRepo.get("cart");
   if (!cartOb || !Object.keys(cartOb).length) {
    alert("Cart is empty");
    return;
  } else {
    button.removeClass("hidden")
  }
  e.preventDefault();
  showCartInfo()
  darkOverlayCart.toggleClass("visible");
  cart.toggleClass("visible");
  $("body").toggleClass("overflow");
}
function closeCart() {
  cart.removeClass("visible");
  darkOverlayCart.removeClass("visible");
  $("body").toggleClass("overflow");
}
const backupRepo = {
  set(ob, key) {
    localStorage.setItem(key, JSON.stringify(ob));
  },
  get(key) {
    const ob = localStorage.getItem(key);
    return ob ? JSON.parse(ob) : null;
  },
  has(key) {
    return localStorage.getItem(key) ? true : false;
  },
  delete(key) {
    if (this.has(key)) {
      localStorage.removeItem(key);
    }
  },
};
// const totalSum = $(".cart__total");
let totalSum = document.querySelector(".cart__total");
let items = document.querySelector(".items");
let countInCart = document.querySelector(".count-in-cart");
let cartList = document.querySelector(".listCart");
let quality = document.querySelector(".quality");
const cartOb = backupRepo.get("cart") || {};

function renderProducts() {
  let out = "";
  for (const id in products) {
    const p = products[id];
    out +=  ` <div class="${p.class}">
                <div class="item__i"><img class="img-item" src="${p.image}"></div>
                <div class="item__name name">${p.name}</div>
                <div class="item__description">${p.description}</div>
                <div class="item__price-cart">
                    <div class="item__price">€ <span class=" item__price number">${p.price}</span></div>
                    <button class="item__cart" data-price = ${p.price} data-id = ${p.id} data-image = ${p.image} data-name  = ${p.name} ><img  class="js-btn-product" src="/img/cart_item.svg"></button>
                </div>
            </div>`
  }
  return out;
}
items.innerHTML = renderProducts();

let clickCart = document.querySelector(".item__cart");
document.addEventListener("click", addToCart);
function addToCart(e) {
  const { target } = e;
  if (!target.classList.contains("js-btn-product")) {
    return;
  }
  const id = target.parentNode.dataset.id;
  if (cartOb[id]) {
    cartOb[id]++;
  } else {
    cartOb[id] = 1;
  }
    backupRepo.set(cartOb, "cart");
    showTotalN();
}


let plus = document.querySelector(".plus");
  let minus = document.querySelector("minus");
  let num = document.querySelector(".num");
  // add quantity of product in cart
  document.addEventListener("click", addQuantity);
  function addQuantity(e) {
    const { target } = e;
    if (!target.classList.contains("plus")) {
      return;
    }
    const product_id = target.dataset.id;
    
    const totalPrice = target.closest(".quantity").nextElementSibling;
    quantity = target.closest(".quantity").querySelector(".num");
    quantity.innerHTML = ++quantity.textContent;
    cartOb[+product_id] = +quantity.innerHTML;
    backupRepo.set(cartOb, "cart");

    totalPrice.innerHTML = quantity.textContent * totalPrice.dataset.price;
    showTotalN()
  }

  // decrease quantity of product in cart
  document.addEventListener("click", descreaseQuantity);
  function descreaseQuantity(e) {
    const { target } = e;
    if (!target.classList.contains("minus")) {
      return;
    }

    const product_id = target.dataset.id;
      
    const totalPrice = target.closest(".quantity").nextElementSibling;
    quantity = target.closest(".quantity").querySelector(".num");
    if (quantity.textContent > 1) {
        quantity.innerHTML = --quantity.textContent;
        cartOb[+product_id] = +quantity.innerHTML;
        backupRepo.set(cartOb, "cart");
        totalPrice.innerHTML = quantity.textContent * totalPrice.dataset.price;
        showTotalN()
    }
  }


function showCartInfo() {
  let cartList = document.querySelector(".listCart");
  const cartOb = backupRepo.get("cart");
  let out = "";
  out += Object.entries(cartOb).map(([id, quantity], i) => 
  ` <div class ="item-cart" data-id = ${products[id-1].id}>
                        <div class="item-col1">
                            <div class="image">
                                <img src="${products[id-1].image}">
                            </div>
                        </div>
                        <div class="item-col2">
                            <div class="name">${products[id-1].name}</div>
                            <div class="quantity">
                                <span class="minus" data-id = ${products[id-1].id}> - </span>
                                <span class="num">${cartOb[id]}</span>
                                <span class="plus" data-id = ${products[id-1].id}> + </span>
                            </div>
                            <div class="totalPrice" data-price="${products[id-1].price}">${products[id-1].price * cartOb[id]}</div>
                        </div>
                        <div class="item-col3"><img class="bin-img" src="img/bin.svg"></div>
                    </div>`
  ).join('');
  cartList.innerHTML = out;
  showTotalN();
}

  // remove product on bin click
  document.addEventListener("click", removeProduct);
    function removeProduct(e) {
    const { target } = e;
    if (!target.classList.contains("bin-img")) {
        return;
    }
      
    target.closest(".item-cart").remove();
    const remove_id = target.closest(".item-cart").dataset.id;
    if(!cartOb[remove_id]) {
      return;
    }
    delete cartOb[remove_id];
    backupRepo.set(cartOb, "cart");
    if (!cartOb || !Object.keys(cartOb).length) {
      button.addClass("hidden");
      darkOverlayCart.removeClass("visible");
      $("body").toggleClass("overflow");
    }
    showCartInfo();
}




function calculateInCart() {
  if (!backupRepo.has("cart")) {
    return [0, 0]
  }
  let n = 0;
  for(const id in cartOb) {
    n += cartOb[id];
  }
  let sum = 0;
  for(const id in cartOb){
    sum += products[id-1].price * cartOb[id];
  }
  backupRepo.set(n, "n");
 return [n, sum]
}

function showTotalN() {
  let [n, sum] = calculateInCart();
  backupRepo.set(sum, "sum");
  totalSum.textContent = "Total price = " + sum;
  n = backupRepo.get("n");
  quality.textContent = n;
}
showTotalN();
