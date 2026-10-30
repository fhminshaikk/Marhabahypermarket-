/* =====================================================
   MARHABA HYPERMARKET - settings
   ===================================================== */
const SHOP = {
  name: "Marhaba Hypermarket",
  whatsapp: "919847283286",
  phoneDisplay: "9847283286",
};

const PRODUCTS = [
  // Vegetables (price per kg)
  { id: "tomato",   name: "Tomato",      ml: "തക്കാളി",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🍅", img: "", outOfStock: false },
  { id: "potato",   name: "Potato",      ml: "കിഴങ്ങ്",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🥔", img: "", outOfStock: false },
  { id: "onion",    name: "Big Onion",   ml: "വലിയ ഉള്ളി",   cat: "Vegetables", price: 55, unit: "kg", emoji: "🧅", img: "", outOfStock: false },
  { id: "okra",     name: "Ladies Finger", ml: "വെണ്ട",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🌿", img: "", outOfStock: false },
  { id: "beans",    name: "Long Beans",  ml: "പയർ",          cat: "Vegetables", price: 39, unit: "kg", emoji: "🫛", img: "", outOfStock: false },
  { id: "ilavan",   name: "Ilavan",      ml: "ഇളവൻ",         cat: "Vegetables", price: 29, unit: "kg", emoji: "🥒", img: "", outOfStock: false },
  { id: "cucumber", name: "Cucumber",    ml: "കക്കരി",       cat: "Vegetables", price: 19, unit: "kg", emoji: "🥒", img: "", outOfStock: false },
  { id: "cabbage",  name: "Cabbage",     ml: "കാബേജ്",       cat: "Vegetables", price: 19, unit: "kg", emoji: "🥬", img: "", outOfStock: false },
  { id: "pumpkin",  name: "Pumpkin",     ml: "മത്തൻ",        cat: "Vegetables", price: 19, unit: "kg", emoji: "🎃", img: "", outOfStock: false },

  // Rice, flour & staples
  { id: "ajmi-puttu",   name: "Ajmi Puttu Podi 5Kg",          cat: "Staples", price: 309, mrp: 447, unit: "pc", emoji: "🌾", img: "", outOfStock: false },
  { id: "bapco-rice",   name: "Bapco Rice Powder 5Kg",        cat: "Staples", price: 269, mrp: 335, unit: "pc", emoji: "🌾", img: "", outOfStock: false },
  { id: "swarnam",      name: "Swarnam Puttu Podi 1Kg",       cat: "Staples", price: 59,  mrp: 90,  unit: "pc", emoji: "🌾", img: "", outOfStock: false },
  { id: "heritage",     name: "Heritage Basmathi Rice 1kg",   cat: "Staples", price: 120, mrp: 229, unit: "pc", emoji: "🍚", img: "", outOfStock: false },
  { id: "quaker",       name: "Quaker Oats 1Kg",              cat: "Staples", price: 199, mrp: 210, unit: "pc", emoji: "🥣", img: "", outOfStock: false },
  { id: "milma-ghee",   name: "Milma Ghee",                   cat: "Staples", price: 359, mrp: 407, unit: "pc", emoji: "🧈", img: "", outOfStock: false },

  // Beverages
  { id: "guava",        name: "Real Pink Guava 1Ltr",         cat: "Beverages", price: 75,  mrp: 150, unit: "pc", emoji: "🧃", img: "", outOfStock: false },
  { id: "7up",          name: "7up / Pepsi 2.5 Ltr",          cat: "Beverages", price: 79,  mrp: 100, unit: "pc", emoji: "🥤", img: "", outOfStock: false },
  { id: "mango",        name: "Real Alphonso Mango 1Ltr",     cat: "Beverages", price: 100, mrp: 200, unit: "pc", emoji: "🥭", img: "", outOfStock: false },
  { id: "coconut-water",name: "Coconut Water",                cat: "Beverages", price: 49,  mrp: 60,  unit: "pc", emoji: "🥥", img: "", outOfStock: false },

  // Snacks & biscuits
  { id: "craze",        name: "Craze Grandmom 392gm",         cat: "Snacks", price: 99,  mrp: 170, unit: "pc", emoji: "🍪", img: "", outOfStock: false },
  { id: "unibic-oats",  name: "Unibic Digestive Oats 5x200gm",cat: "Snacks", price: 160, mrp: 320, unit: "pc", emoji: "🍪", img: "", outOfStock: false },
  { id: "unibic-choco", name: "Unibic Choco Nut Cookies 300gm",cat: "Snacks", price: 99, mrp: 170, unit: "pc", emoji: "🍪", img: "", outOfStock: false },
  { id: "munch",        name: "Munch Pouch",                  cat: "Snacks", price: 79,  mrp: 100, unit: "pc", emoji: "🍫", img: "", outOfStock: false },

  // Dairy
  { id: "everyday",     name: "Everyday Milk Powder 1Kg",     cat: "Dairy", price: 529, mrp: 580, unit: "pc", emoji: "🥛", img: "", outOfStock: false },
  { id: "goodlife",     name: "Good Life 1 Ltr",              cat: "Dairy", price: 66,  mrp: 70,  unit: "pc", emoji: "🥛", img: "", outOfStock: false },
  { id: "curd",         name: "Milky Mist Curd 1 kg",         cat: "Dairy", price: 99,  mrp: 150, unit: "pc", emoji: "🥣", img: "", outOfStock: false },
  { id: "milkmaid",     name: "Milk Maid 380gm",              cat: "Dairy", price: 129, mrp: 149, unit: "pc", emoji: "🥫", img: "", outOfStock: false },
  { id: "condensed",    name: "Milky Mist Condensed Milk 400gm", cat: "Dairy", price: 99, mrp: 120, unit: "pc", emoji: "🥫", img: "", outOfStock: false },

  // Spreads & frozen
  { id: "nuggets",      name: "Maximus Nuggets 1 kg",         cat: "Spreads & Frozen", price: 299, mrp: 655,  unit: "pc", emoji: "🍗", img: "", outOfStock: false },
  { id: "nutella-750",  name: "Nutella 750gm",                cat: "Spreads & Frozen", price: 599, mrp: 1100, unit: "pc", emoji: "🍫", img: "", outOfStock: false },
  { id: "nutella-350",  name: "Nutella 350gm",                cat: "Spreads & Frozen", price: 329, mrp: 429,  unit: "pc", emoji: "🍫", img: "", outOfStock: false },
  { id: "biscoff",      name: "Biscoff Spread 400gm",         cat: "Spreads & Frozen", price: 499, mrp: 649,  unit: "pc", emoji: "🍯", img: "", outOfStock: false },
  { id: "pistachio",    name: "Pistachio Spread",             cat: "Spreads & Frozen", price: 499, mrp: 599,  unit: "pc", emoji: "🥜", img: "", outOfStock: false},
];

const $ = (id) => document.getElementById(id);
const rupee = (n) => "₹" + (Math.round(n * 100) / 100).toString();

let activeCat = "All";
let query = "";
let current = null;
let qty = 1;
let cart = [];
let fulfillmentType = "Delivery";

const CATS = ["All", ...new Set(PRODUCTS.map((p) => p.cat))];

function mediaHTML(p) {
  return p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" />` : `<span>${p.emoji}</span>`;
}

function renderTabs() {
  $("tabs").innerHTML = CATS.map(
    (c) => `<button class="tab ${c === activeCat ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
}

function renderGrid() {
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) =>
      (activeCat === "All" || p.cat === activeCat) &&
      (!q || p.name.toLowerCase().includes(q) || (p.ml || "").includes(q))
  );

  $("grid").innerHTML = list
    .map((p, i) => {
      const off = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
      return `
      <article class="card ${p.outOfStock ? "out-of-stock" : ""}" data-id="${p.id}" style="animation-delay:${Math.min(i, 14) * 45}ms" tabindex="0">
        ${p.outOfStock ? `<span class="badge stock-badge">Out of Stock</span>` : off >= 5 ? `<span class="badge">${off}% OFF</span>` : ""}
        <div class="thumb">${mediaHTML(p)}</div>
        <h3>${p.name}</h3>
        <div class="ml">${p.ml || ""}</div>
        <div class="p-row">
          <span class="price">${rupee(p.price)}${p.unit === "kg" ? "/kg" : ""}</span>
          ${p.mrp ? `<span class="mrp">${rupee(p.mrp)}</span>` : ""}
        </div>
      </article>`;
    })
    .join("");

  $("count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  $("empty").hidden = list.length > 0;
}

function step(p) { return p.unit === "kg" ? 0.5 : 1; }
function qtyLabel(p, q) { return p.unit === "kg" ? `${q} kg` : `${q} ${q === 1 ? "pc" : "pcs"}`; }

function updateModal() {
  const p = current;
  $("qtyVal").textContent = qtyLabel(p, qty);
  $("mTotal").textContent = rupee(p.price * qty);
}

function openModal(id) {
  current = PRODUCTS.find((p) => p.id === id);
  if (!current || current.outOfStock) return;
  qty = current.unit === "kg" ? 1 : 1;
  const p = current;

  $("mMedia").innerHTML = mediaHTML(p);
  $("mCat").textContent = p.cat;
  $("mName").textContent = p.name;
  $("mMl").textContent = p.ml || "";
  $("mPrice").textContent = rupee(p.price) + (p.unit === "kg" ? " / kg" : "");
  $("mMrp").textContent = p.mrp ? rupee(p.mrp) : "";
  const save = p.mrp ? p.mrp - p.price : 0;
  $("mSave").textContent = save > 0 ? `You save ${rupee(save)}` : "";
  $("mSave").style.display = save > 0 ? "" : "none";
  updateModal();

  const m = $("modal");
  m.classList.remove("closing");
  m.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("open")));
}

function closeModal() {
  const m = $("modal");
  m.classList.remove("open");
  m.classList.add("closing");
  m.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  setTimeout(() => m.classList.remove("closing"), 450);
}

function changeQty(dir) {
  const s = step(current);
  const min = s;
  qty = Math.max(min, Math.round((qty + dir * s) * 10) / 10);
  updateModal();
  const el = $("qtyVal");
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function addToCartFromModal() {
  if (!current) return;
  const existing = cart.find(item => item.product.id === current.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ product: current, qty: qty });
  }
  closeModal();
  updateCartBadge();
  openCartDrawer();
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = $("cartCountBadge");
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

function openCartDrawer() {
  renderCartItems();
  const drawer = $("cartDrawer");
  drawer.classList.add("open");
  document.body.classList.add("locked");
}

function closeCartDrawer() {
  const drawer = $("cartDrawer");
  drawer.classList.remove("open");
  document.body.classList.remove("locked");
}

function renderCartItems() {
  const container = $("cartItemsList");
  const emptyMsg = $("cartEmpty");
  const checkoutSec = $("checkoutSection");
  const footer = $("cartFooter");

  if (cart.length === 0) {
    container.innerHTML = "";
    emptyMsg.style.display = "block";
    checkoutSec.style.display = "none";
    footer.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  checkoutSec.style.display = "block";
  footer.style.display = "block";

  container.innerHTML = cart.map(item => {
    const p = item.product;
    const itemTotal = p.price * item.qty;
    return `
      <div class="cart-item">
        <div class="cart-item-thumb">${p.emoji}</div>
        <div class="cart-item-details">
          <h4>${p.name}</h4>
          <div class="cart-item-price">${rupee(p.price)} × ${qtyLabel(p, item.qty)}</div>
        </div>
        <div class="cart-item-total"><strong>${rupee(itemTotal)}</strong></div>
        <button class="cart-item-remove" onclick="removeFromCart('${p.id}')" aria-label="Remove">✕</button>
      </div>
    `;
  }).join("");

  const grandTotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  $("cartGrandTotal").textContent = rupee(grandTotal);
}

window.removeFromCart = function(id) {
  cart = cart.filter(item => item.product.id !== id);
  updateCartBadge();
  renderCartItems();
};

function setFulfillment(type) {
  fulfillmentType = type;
  $("btnDelivery").classList.toggle("active", type === "Delivery");
  $("btnPickup").classList.toggle("active", type === "Pickup");
  $("addressGroup").style.display = type === "Delivery" ? "block" : "none";
}

function checkoutWhatsApp() {
  const name = $("customerName").value.trim();
  const phone = $("customerPhone").value.trim();
  const address = $("customerAddress").value.trim();

  if (!name) {
    alert("Please enter your name.");
    $("customerName").focus();
    return;
  }
  if (fulfillmentType === "Delivery" && !address) {
    alert("Please enter your delivery address.");
    $("customerAddress").focus();
    return;
  }

  const lines = [
    `Hello ${SHOP.name}, I would like to place an order:`,
    "",
    `👤 Name: ${name}`,
    phone ? `📱 Phone: ${phone}` : "",
    `🚚 Fulfillment: ${fulfillmentType}`,
    fulfillmentType === "Delivery" ? `📍 Address: ${address}` : "🏬 Pickup from Store (Thengol, Othukkungal)",
    "",
    "🛒 Order Items:",
  ].filter(Boolean);

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.product.name} (${qtyLabel(item.product, item.qty)}) - ${rupee(item.product.price * item.qty)}`);
  });

  const grandTotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  lines.push("");
  lines.push(`💰 Grand Total: ${rupee(grandTotal)}`);
  lines.push("", "Please confirm my order. Thank you!");

  const url = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank");
}

$("tabs").addEventListener("click", (e) => {
  const b = e.target.closest(".tab");
  if (!b) return;
  activeCat = b.dataset.cat;
  renderTabs();
  renderGrid();
});

$("search").addEventListener("input", (e) => {
  query = e.target.value;
  renderGrid();
});

$("grid").addEventListener("click", (e) => {
  const c = e.target.closest(".card");
  if (c) openModal(c.dataset.id);
});
$("grid").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const c = e.target.closest(".card");
    if (c) { e.preventDefault(); openModal(c.dataset.id); }
  }
});

$("modal").addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeCartDrawer(); } });

$("plus").addEventListener("click", () => changeQty(1));
$("minus").addEventListener("click", () => changeQty(-1));
$("addToCartBtn").addEventListener("click", addToCartFromModal);

$("cartBtn").addEventListener("click", openCartDrawer);
$("closeCart").addEventListener("click", closeCartDrawer);
$("cartBackdrop").addEventListener("click", closeCartDrawer);

$("btnDelivery").addEventListener("click", () => setFulfillment("Delivery"));
$("btnPickup").addEventListener("click", () => setFulfillment("Pickup"));
$("whatsappCheckoutBtn").addEventListener("click", checkoutWhatsApp);

const root = document.documentElement;

function applyTheme(t) {
  root.setAttribute("data-theme", t);
  const dark = t === "dark";
  $("themeBtn").setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#080b09" : "#0f7a3a");
}

$("themeBtn").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.classList.add("theme-anim");
  applyTheme(next);
  try { localStorage.setItem("marhaba-theme", next); } catch (e) {}
  setTimeout(() => root.classList.remove("theme-anim"), 500);
});

applyTheme(root.getAttribute("data-theme") || "light");

$("callLink").href = "tel:+" + SHOP.whatsapp;
$("footCall").href = "tel:+" + SHOP.whatsapp;
$("footCall").textContent = "📞 " + SHOP.phoneDisplay;
renderTabs();
renderGrid();
updateCartBadge();
   
