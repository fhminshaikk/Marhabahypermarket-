/* =====================================================
   MARHABA HYPERMARKET - settings
   ===================================================== */
const SHOP = {
  name: "Marhaba Hypermarket",
  // WhatsApp number with country code, digits only (India = 91).
  whatsapp: "919847283286",
  phoneDisplay: "9847283286",
};

/* =====================================================
   PRODUCTS
   - emoji is used as a picture until you add a real photo.
   - To use real photos: put the file in /images and set img: "images/tomato.jpg"
   - unit "kg" = sold by weight, "pc" = sold per piece/pack
   - mrp is optional (shows a strike-through price + discount badge)
   ===================================================== */
const PRODUCTS = [
  // Vegetables (price per kg)
  { id: "tomato",   name: "Tomato",      ml: "തക്കാളി",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🍅", img: "" },
  { id: "potato",   name: "Potato",      ml: "കിഴങ്ങ്",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🥔", img: "" },
  { id: "onion",    name: "Big Onion",   ml: "വലിയ ഉള്ളി",   cat: "Vegetables", price: 55, unit: "kg", emoji: "🧅", img: "" },
  { id: "okra",     name: "Ladies Finger", ml: "വെണ്ട",      cat: "Vegetables", price: 29, unit: "kg", emoji: "🌿", img: "" },
  { id: "beans",    name: "Long Beans",  ml: "പയർ",          cat: "Vegetables", price: 39, unit: "kg", emoji: "🫛", img: "" },
  { id: "ilavan",   name: "Ilavan",      ml: "ഇളവൻ",         cat: "Vegetables", price: 29, unit: "kg", emoji: "🥒", img: "" },
  { id: "cucumber", name: "Cucumber",    ml: "കക്കരി",       cat: "Vegetables", price: 19, unit: "kg", emoji: "🥒", img: "" },
  { id: "cabbage",  name: "Cabbage",     ml: "കാബേജ്",       cat: "Vegetables", price: 19, unit: "kg", emoji: "🥬", img: "" },
  { id: "pumpkin",  name: "Pumpkin",     ml: "മത്തൻ",        cat: "Vegetables", price: 19, unit: "kg", emoji: "🎃", img: "" },

  // Rice, flour & staples
  { id: "ajmi-puttu",   name: "Ajmi Puttu Podi 5Kg",          cat: "Staples", price: 309, mrp: 447, unit: "pc", emoji: "🌾", img: "" },
  { id: "bapco-rice",   name: "Bapco Rice Powder 5Kg",        cat: "Staples", price: 269, mrp: 335, unit: "pc", emoji: "🌾", img: "" },
  { id: "swarnam",      name: "Swarnam Puttu Podi 1Kg",       cat: "Staples", price: 59,  mrp: 90,  unit: "pc", emoji: "🌾", img: "" },
  { id: "heritage",     name: "Heritage Basmathi Rice 1kg",   cat: "Staples", price: 120, mrp: 229, unit: "pc", emoji: "🍚", img: "" },
  { id: "quaker",       name: "Quaker Oats 1Kg",              cat: "Staples", price: 199, mrp: 210, unit: "pc", emoji: "🥣", img: "" },
  { id: "milma-ghee",   name: "Milma Ghee",                   cat: "Staples", price: 359, mrp: 407, unit: "pc", emoji: "🧈", img: "" },

  // Beverages
  { id: "guava",        name: "Real Pink Guava 1Ltr",         cat: "Beverages", price: 75,  mrp: 150, unit: "pc", emoji: "🧃", img: "" },
  { id: "7up",          name: "7up / Pepsi 2.5 Ltr",          cat: "Beverages", price: 79,  mrp: 100, unit: "pc", emoji: "🥤", img: "" },
  { id: "mango",        name: "Real Alphonso Mango 1Ltr",     cat: "Beverages", price: 100, mrp: 200, unit: "pc", emoji: "🥭", img: "" },
  { id: "coconut-water",name: "Coconut Water",                cat: "Beverages", price: 49,  mrp: 60,  unit: "pc", emoji: "🥥", img: "" },

  // Snacks & biscuits
  { id: "craze",        name: "Craze Grandmom 392gm",         cat: "Snacks", price: 99,  mrp: 170, unit: "pc", emoji: "🍪", img: "" },
  { id: "unibic-oats",  name: "Unibic Digestive Oats 5x200gm",cat: "Snacks", price: 160, mrp: 320, unit: "pc", emoji: "🍪", img: "" },
  { id: "unibic-choco", name: "Unibic Choco Nut Cookies 300gm",cat: "Snacks", price: 99, mrp: 170, unit: "pc", emoji: "🍪", img: "" },
  { id: "munch",        name: "Munch Pouch",                  cat: "Snacks", price: 79,  mrp: 100, unit: "pc", emoji: "🍫", img: "" },

  // Dairy
  { id: "everyday",     name: "Everyday Milk Powder 1Kg",     cat: "Dairy", price: 529, mrp: 580, unit: "pc", emoji: "🥛", img: "" },
  { id: "goodlife",     name: "Good Life 1 Ltr",              cat: "Dairy", price: 66,  mrp: 70,  unit: "pc", emoji: "🥛", img: "" },
  { id: "curd",         name: "Milky Mist Curd 1 kg",         cat: "Dairy", price: 99,  mrp: 150, unit: "pc", emoji: "🥣", img: "" },
  { id: "milkmaid",     name: "Milk Maid 380gm",              cat: "Dairy", price: 129, mrp: 149, unit: "pc", emoji: "🥫", img: "" },
  { id: "condensed",    name: "Milky Mist Condensed Milk 400gm", cat: "Dairy", price: 99, mrp: 120, unit: "pc", emoji: "🥫", img: "" },

  // Spreads & frozen
  { id: "nuggets",      name: "Maximus Nuggets 1 kg",         cat: "Spreads & Frozen", price: 299, mrp: 655,  unit: "pc", emoji: "🍗", img: "" },
  { id: "nutella-750",  name: "Nutella 750gm",                cat: "Spreads & Frozen", price: 599, mrp: 1100, unit: "pc", emoji: "🍫", img: "" },
  { id: "nutella-350",  name: "Nutella 350gm",                cat: "Spreads & Frozen", price: 329, mrp: 429,  unit: "pc", emoji: "🍫", img: "" },
  { id: "biscoff",      name: "Biscoff Spread 400gm",         cat: "Spreads & Frozen", price: 499, mrp: 649,  unit: "pc", emoji: "🍯", img: "" },
  { id: "pistachio",    name: "Pistachio Spread",             cat: "Spreads & Frozen", price: 499, mrp: 599,  unit: "pc", emoji: "🥜", img: "" },
];

/* =====================================================
   App code
   ===================================================== */
const $ = (id) => document.getElementById(id);
const rupee = (n) => "₹" + (Math.round(n * 100) / 100).toString();

let activeCat = "All";
let query = "";
let current = null;
let qty = 1;

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
      <article class="card" data-id="${p.id}" style="animation-delay:${Math.min(i, 14) * 45}ms" tabindex="0">
        ${off >= 5 ? `<span class="badge">${off}% OFF</span>` : ""}
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

/* ---------- Modal ---------- */
function step(p) { return p.unit === "kg" ? 0.5 : 1; }
function qtyLabel(p) { return p.unit === "kg" ? `${qty} kg` : `${qty} ${qty === 1 ? "pc" : "pcs"}`; }

function updateModal() {
  const p = current;
  $("qtyVal").textContent = qtyLabel(p);
  $("mTotal").textContent = rupee(p.price * qty);
  $("orderBtn").href = whatsappLink(p);
}

function whatsappLink(p) {
  const lines = [
    `Hello ${SHOP.name}, I would like to order:`,
    "",
    `Product: ${p.name}${p.ml ? " (" + p.ml + ")" : ""}`,
    `Price: ${rupee(p.price)}${p.unit === "kg" ? " per kg" : " each"}`,
    `Quantity: ${qtyLabel(p)}`,
    `Total: ${rupee(p.price * qty)}`,
    "",
    "Please confirm availability. Thank you!",
  ];
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function openModal(id) {
  current = PRODUCTS.find((p) => p.id === id);
  if (!current) return;
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

/* ---------- Events ---------- */
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
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
$("plus").addEventListener("click", () => changeQty(1));
$("minus").addEventListener("click", () => changeQty(-1));

/* ---------- Dark / light theme ---------- */
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

/* ---------- Init ---------- */
$("callLink").href = "tel:+" + SHOP.whatsapp;
$("footCall").href = "tel:+" + SHOP.whatsapp;
$("footCall").textContent = "📞 " + SHOP.phoneDisplay;
renderTabs();
renderGrid();
