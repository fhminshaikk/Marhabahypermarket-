/* =====================================================
   MARHABA HYPERMARKET - settings
   ===================================================== */
const SHOP = {
  name: "Marhaba Hypermarket",
  // WhatsApp number with country code, digits only (India = 91).
  whatsapp: "919847283286",
  phoneDisplay: "9847283286",
  address: "MA Square, Thengol, Othukkungal",

  /* ---------- OUT OF STOCK ----------
     Type the product ids that are finished today, inside the brackets.
     Example:  outOfStock: ["tomato", "cabbage", "nutella-750"],
     Those products show "Out of stock" and cannot be ordered.
     To put one back on sale, delete its id and commit the change. */
  outOfStock: [],
};

/* Products come from products.js (or from the admin editor once it is set up) */
const DEFAULT_PRODUCTS = window.DEFAULT_PRODUCTS || [];

/* =====================================================
   App code
   ===================================================== */
const $ = (id) => document.getElementById(id);
const rnd = (n) => Math.round(n * 100) / 100;
const rupee = (n) => "₹" + rnd(n).toString();
// PRODUCTS starts as the built-in list above. If the cloud backend is set up
// (see README), the live list saved from the admin page replaces it.
let PRODUCTS = DEFAULT_PRODUCTS.slice();
let BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
const isOut = (p) => p.available === false || SHOP.outOfStock.includes(p.id);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const step = (p) => (p.unit === "kg" ? 0.5 : 1);
const qtyText = (p, q) => (p.unit === "kg" ? `${q} kg` : `${q} ${q === 1 ? "pc" : "pcs"}`);
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Safe wrapper around localStorage (can be blocked in private mode)
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};

let activeCat = "All";
let query = "";
let current = null;
let qty = 1;
let mode = "delivery"; // "delivery" | "pickup"
let direct = null;      // set when ordering ONE item straight from its popup: { items: { id: qty } }
let drawerSession = 0;  // lets a closing drawer know if it was re-opened meanwhile
let CLOUD_ON = false;   // true once the cloud backend (ratings + live products) is connected
let RATINGS = {};       // { productId: { sum, count } }
const myRatings = store.get("marhaba-rated", {}); // ratings this device already gave

// Cart = { productId: quantity }. Items that are now out of stock are dropped.
let cart = (() => {
  const saved = store.get("marhaba-cart", {});
  const clean = {};
  for (const id in saved) {
    const p = BY_ID[id];
    if (p && !isOut(p) && saved[id] > 0) clean[id] = saved[id];
  }
  return clean;
})();
const saveCart = () => store.set("marhaba-cart", cart);
const cartIds = () => Object.keys(cart);
const cartTotal = () => cartIds().reduce((s, id) => s + BY_ID[id].price * cart[id], 0);

// What the checkout drawer is showing: the whole cart, or a single "order now" item
const items = () => (direct ? direct.items : cart);
const itemIds = () => Object.keys(items());
const itemsTotal = () => itemIds().reduce((s, id) => s + BY_ID[id].price * items()[id], 0);

let CATS = ["All", ...new Set(PRODUCTS.map((p) => p.cat))];

function mediaHTML(p) {
  return p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy" />` : `<span>${esc(p.emoji || "🛒")}</span>`;
}

function setProducts(list) {
  PRODUCTS = list;
  BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  CATS = ["All", ...new Set(PRODUCTS.map((p) => p.cat))];
  if (!CATS.includes(activeCat)) activeCat = "All";
  for (const id of Object.keys(cart)) {
    const p = BY_ID[id];
    if (!p || isOut(p)) delete cart[id];
  }
  saveCart();
}

/* ---------- Tabs + product grid ---------- */
function renderTabs() {
  $("tabs").innerHTML = CATS.map(
    (c) => `<button class="tab ${c === activeCat ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
  ).join("");
}

function renderGrid() {
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) =>
      (activeCat === "All" || p.cat === activeCat) &&
      (!q || p.name.toLowerCase().includes(q) || (p.ml || "").includes(q))
  ).sort((a, b) => isOut(a) - isOut(b)); // out-of-stock items go last

  $("grid").innerHTML = list
    .map((p, i) => {
      const out = isOut(p);
      const off = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
      return `
      <article class="card ${out ? "out" : ""}" data-id="${p.id}" style="animation-delay:${Math.min(i, 14) * 45}ms" tabindex="0">
        ${!out && off >= 5 ? `<span class="badge">${off}% OFF</span>` : ""}
        <span class="incart" data-incart="${p.id}"></span>
        <div class="thumb">
          ${mediaHTML(p)}
          ${out
            ? `<div class="oos">Out of stock</div>`
            : `<button class="quick-add" type="button" data-add="${p.id}" aria-label="Add ${esc(p.name)} to cart">+</button>`}
        </div>
        <h3>${esc(p.name)}</h3>
        <div class="ml">${esc(p.ml || "")}</div>
        ${CLOUD_ON ? `<div class="stars-mini" data-rating="${p.id}"></div>` : ""}
        <div class="p-row">
          <span class="price">${rupee(p.price)}${p.unit === "kg" ? "/kg" : ""}</span>
          ${p.mrp ? `<span class="mrp">${rupee(p.mrp)}</span>` : ""}
        </div>
      </article>`;
    })
    .join("");

  $("count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  $("empty").hidden = list.length > 0;
  updateCardChips();
  updateCardRatings();
}

function updateCardChips() {
  document.querySelectorAll("[data-incart]").forEach((el) => {
    const q = cart[el.dataset.incart];
    el.classList.toggle("on", !!q);
    if (q) el.textContent = "In cart · " + qtyText(BY_ID[el.dataset.incart], q);
  });
}

/* ---------- Product popup ---------- */
function updateModal() {
  const p = current;
  $("qtyVal").textContent = qtyText(p, qty);
  $("mTotal").textContent = rupee(p.price * qty);
}

function openModal(id) {
  current = BY_ID[id];
  if (!current) return;
  qty = 1;
  const p = current;
  const out = isOut(p);

  $("mMedia").innerHTML = mediaHTML(p);
  $("mCat").textContent = p.cat;
  $("mName").textContent = p.name;
  $("mMl").textContent = p.ml || "";
  $("mPrice").textContent = rupee(p.price) + (p.unit === "kg" ? " / kg" : "");
  $("mMrp").textContent = p.mrp ? rupee(p.mrp) : "";
  const save = p.mrp ? p.mrp - p.price : 0;
  $("mSave").textContent = save > 0 ? `You save ${rupee(save)}` : "";
  $("mSave").style.display = save > 0 && !out ? "" : "none";

  $("mBody").classList.toggle("is-out", out);
  $("addBtn").disabled = out;
  $("orderBtn").disabled = out;
  updateModal();
  renderRating(p);

  const m = $("modal");
  m.classList.remove("closing");
  m.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  requestAnimationFrame(() => requestAnimationFrame(() => m.classList.add("open")));
}

function closeModal() {
  const m = $("modal");
  if (!m.classList.contains("open")) return;
  m.classList.remove("open");
  m.classList.add("closing");
  m.setAttribute("aria-hidden", "true");
  if (!$("drawer").classList.contains("open")) document.body.classList.remove("locked");
  setTimeout(() => m.classList.remove("closing"), 450);
}

function changeQty(dir) {
  qty = Math.max(step(current), rnd(qty + dir * step(current)));
  updateModal();
  bump($("qtyVal"));
}

function bump(el) {
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- Fly-to-cart animation ---------- */
function fly(p, srcEl) {
  if (reduceMotion() || !srcEl) return;
  const r = srcEl.getBoundingClientRect();
  const mobile = window.innerWidth <= 640;
  let tx, ty;
  if (mobile) {
    tx = window.innerWidth / 2;
    ty = window.innerHeight - 40;
  } else {
    const t = $("cartBtn").getBoundingClientRect();
    tx = t.left + t.width / 2;
    ty = t.top + t.height / 2;
  }
  const sx = r.left + r.width / 2;
  const sy = r.top + r.height / 2;
  const el = document.createElement("div");
  el.className = "fly";
  el.innerHTML = mediaHTML(p);
  el.style.left = sx - 28 + "px";
  el.style.top = sy - 28 + "px";
  document.body.appendChild(el);
  const dx = tx - sx, dy = ty - sy;
  const anim = el.animate(
    [
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 70}px) scale(.85)`, opacity: 1, offset: 0.45 },
      { transform: `translate(${dx}px, ${dy}px) scale(.2)`, opacity: 0.3 },
    ],
    { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" }
  );
  anim.onfinish = () => {
    el.remove();
    bump($("cartBadge"));
    bump($("cbIcon"));
  };
}

/* ---------- Cart ---------- */
function addToCart(id, amount, srcEl) {
  const p = BY_ID[id];
  if (!p || isOut(p)) return;
  cart[id] = rnd((cart[id] || 0) + amount);
  saveCart();
  updateCartUI();
  renderCartList();
  fly(p, srcEl);
  toast(`${p.name} added to cart`);
}

// Updates badge, bottom bar, total and "in cart" chips (not the list itself)
function updateCartUI() {
  const n = cartIds().length;
  const total = cartTotal();
  $("cartBadge").textContent = n;
  $("cartBadge").classList.toggle("on", n > 0);
  $("cbText").textContent = `${n} item${n === 1 ? "" : "s"} · ${rupee(total)}`;
  const bar = $("cartBar");
  bar.classList.toggle("show", n > 0);
  bar.tabIndex = n > 0 ? 0 : -1;
  bar.setAttribute("aria-hidden", n > 0 ? "false" : "true");
  document.body.classList.toggle("has-cart", n > 0);
  $("cartTotal").textContent = rupee(itemsTotal());
  $("panel").classList.toggle("empty", !direct && itemIds().length === 0);
  updateCardChips();
}

function renderCartList() {
  $("cartList").innerHTML = itemIds()
    .map((id, i) => {
      const p = BY_ID[id];
      return `
      <li class="ci" data-id="${id}" style="animation-delay:${i * 50}ms">
        <div class="ci-img">${mediaHTML(p)}</div>
        <div class="ci-info">
          <strong>${esc(p.name)}</strong>
          <span class="ci-sub">${rupee(p.price)}${p.unit === "kg" ? " / kg" : " each"}</span>
          <button class="ci-rm" type="button" data-rm>Remove</button>
        </div>
        <div class="ci-side">
          <div class="qty sm">
            <button type="button" data-dec aria-label="Decrease">−</button>
            <span class="q">${qtyText(p, items()[id])}</span>
            <button type="button" data-inc aria-label="Increase">+</button>
          </div>
          <b class="ci-total">${rupee(p.price * items()[id])}</b>
        </div>
      </li>`;
    })
    .join("");
}

function changeLine(id, dir) {
  const p = BY_ID[id];
  const q = rnd(items()[id] + dir * step(p));
  if (q <= 0) return removeLine(id);
  items()[id] = q;
  if (!direct) saveCart();
  updateCartUI();
  const li = $("cartList").querySelector(`[data-id="${id}"]`);
  if (li) {
    li.querySelector(".q").textContent = qtyText(p, q);
    li.querySelector(".ci-total").textContent = rupee(p.price * q);
    bump(li.querySelector(".q"));
  }
}

function removeLine(id) {
  const li = $("cartList").querySelector(`[data-id="${id}"]`);
  const finish = () => {
    delete items()[id];
    if (!direct) saveCart();
    if (li) li.remove();
    updateCartUI();
    if (direct && !itemIds().length) closeCart(); // removed the only item of a direct order
  };
  if (!li || reduceMotion()) return finish();
  const h = li.offsetHeight;
  li.style.animation = "none";
  li.animate(
    [
      { opacity: 1, height: h + "px", transform: "none" },
      { opacity: 0, height: "0px", paddingTop: "0px", paddingBottom: "0px", transform: "translateX(40px)" },
    ],
    { duration: 300, easing: "cubic-bezier(.22,.8,.24,1)", fill: "forwards" }
  ).onfinish = finish;
}

function clearCart() {
  if (direct) return;
  cart = {};
  saveCart();
  renderCartList();
  updateCartUI();
}

/* ---------- Cart / checkout drawer ---------- */
function showDrawer() {
  drawerSession++;
  closeModal();
  $("toast").classList.remove("show");
  $("cartTitle").textContent = direct ? "Order now" : "Your cart";
  $("clearBtn").hidden = !!direct;
  renderCartList();
  updateCartUI();
  const d = $("drawer");
  d.classList.remove("closing");
  d.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add("open")));
}

function openCart() {
  direct = null;
  showDrawer();
}

// "Order through WhatsApp" on a product: same checkout form, but only this one item
function openDirect(id, amount) {
  const p = BY_ID[id];
  if (!p || isOut(p)) return;
  direct = { items: { [id]: amount } };
  showDrawer();
}

function closeCart() {
  const d = $("drawer");
  if (!d.classList.contains("open")) return;
  const session = drawerSession;
  d.classList.remove("open");
  d.classList.add("closing");
  d.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  setTimeout(() => {
    d.classList.remove("closing");
    if (direct && session === drawerSession) {
      direct = null; // back to the normal cart once the drawer has slid away
      $("cartTitle").textContent = "Your cart";
      $("clearBtn").hidden = false;
      renderCartList();
      updateCartUI();
    }
  }, 500);
}

/* ---------- Checkout: delivery / pickup + customer details ---------- */
function setMode(m) {
  mode = m;
  document.querySelectorAll("#seg [data-mode]").forEach((b) => {
    const on = b.dataset.mode === m;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });
  $("segPill").style.transform = m === "pickup" ? "translateX(100%)" : "none";
  $("addrWrap").classList.toggle("open", m === "delivery");
  $("pickupWrap").classList.toggle("open", m === "pickup");
  saveCustomer();
}

function saveCustomer() {
  store.set("marhaba-customer", { name: $("fName").value, phone: $("fPhone").value, addr: $("fAddr").value, mode });
}

// Returns the 10-digit mobile number, or "" if it does not look valid
function cleanPhone(v) {
  let d = String(v).replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : "";
}

function shake(field) {
  field.classList.remove("invalid");
  void field.offsetWidth;
  field.classList.add("invalid");
}

function buildOrderMessage() {
  const lines = itemIds().map((id, i) => {
    const p = BY_ID[id];
    const q = items()[id];
    return `${i + 1}. ${p.name}${p.ml ? " (" + p.ml + ")" : ""} - ${qtyText(p, q)} x ${rupee(p.price)}${p.unit === "kg" ? "/kg" : ""} = ${rupee(p.price * q)}`;
  });
  const msg = [
    `Hello ${SHOP.name}, I would like to place an order:`,
    "",
    ...lines,
    "",
    `Total: ${rupee(itemsTotal())}`,
    "",
    `Order type: ${mode === "delivery" ? "Home delivery" : "Store pickup"}`,
    `Name: ${$("fName").value.trim()}`,
    `Phone: ${cleanPhone($("fPhone").value)}`,
  ];
  if (mode === "delivery") msg.push(`Address: ${$("fAddr").value.trim()}`);
  const note = $("fNote").value.trim();
  if (note) msg.push(`Note: ${note}`);
  msg.push("", "Please confirm availability. Thank you!");
  return msg.join("\n");
}

function sendOrder() {
  if (!itemIds().length) return;
  const nameF = $("fName"), phoneF = $("fPhone"), addrF = $("fAddr");
  let bad = null, why = "";
  if (!nameF.value.trim()) { bad = nameF; why = "Please enter your name"; }
  else if (!cleanPhone(phoneF.value)) { bad = phoneF; why = "Please enter a valid 10-digit mobile number"; }
  else if (mode === "delivery" && !addrF.value.trim()) { bad = addrF; why = "Please enter your delivery address"; }
  if (bad) {
    shake(bad.closest(".field"));
    bad.focus();
    toast(why);
    return;
  }
  saveCustomer();
  const url = `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(buildOrderMessage())}`;
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast("Opening WhatsApp… press Send there to place your order");
}

/* ---------- Ratings ---------- */
function ratingOf(id) {
  const r = RATINGS[id];
  if (!r || !r.count) return { avg: 0, count: 0 };
  return { avg: r.sum / r.count, count: r.count };
}

const starString = (avg) => {
  const n = Math.round(avg);
  return "★".repeat(n) + "☆".repeat(5 - n);
};

// Small "★ 4.3 (12)" line under each product card
function updateCardRatings() {
  document.querySelectorAll("[data-rating]").forEach((el) => {
    const { avg, count } = ratingOf(el.dataset.rating);
    el.innerHTML = count ? `★ ${avg.toFixed(1)} <span>(${count})</span>` : "";
  });
}

// Rating summary + "rate this product" stars inside the popup
function renderRating(p) {
  const box = $("rateBox"), sum = $("mRateSum");
  box.hidden = sum.hidden = !CLOUD_ON;
  if (!CLOUD_ON) return;
  const { avg, count } = ratingOf(p.id);
  sum.innerHTML = count
    ? `<span class="st">${starString(avg)}</span><b>${avg.toFixed(1)}</b> · ${count} rating${count === 1 ? "" : "s"}`
    : "No ratings yet";
  const mine = myRatings[p.id] || 0;
  $("stars").classList.toggle("done", !!mine);
  $("stars").querySelectorAll("button").forEach((b) => b.classList.toggle("on", +b.dataset.star <= mine));
  $("rateLabel").textContent = mine ? `Thanks! You rated ${mine} star${mine === 1 ? "" : "s"}` : "Rate this product";
}

function giveRating(stars) {
  const p = current;
  if (!p || !CLOUD_ON || myRatings[p.id]) return;
  const before = RATINGS[p.id] ? { ...RATINGS[p.id] } : null;
  const r = RATINGS[p.id] || (RATINGS[p.id] = { sum: 0, count: 0 });
  r.sum += stars;
  r.count += 1;
  myRatings[p.id] = stars;
  store.set("marhaba-rated", myRatings);
  renderRating(p);
  updateCardRatings();
  const btn = $("stars").querySelector(`[data-star="${stars}"]`);
  if (btn && !reduceMotion()) { btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop"); }
  toast("Thanks for rating!");
  window.Cloud.rate(p.id, stars).catch(() => {
    // roll back so the customer can try again
    if (before) RATINGS[p.id] = before; else delete RATINGS[p.id];
    delete myRatings[p.id];
    store.set("marhaba-rated", myRatings);
    if (current === p) renderRating(p);
    updateCardRatings();
    toast("Could not save your rating. Please try again.");
  });
}

/* ---------- Cloud (live products + ratings) ---------- */
function initCloud() {
  const C = window.Cloud;
  if (!C || !C.enabled || CLOUD_ON) return;
  CLOUD_ON = true;
  Promise.all([C.loadProducts().catch(() => null), C.loadRatings().catch(() => ({}))]).then(([list, ratings]) => {
    RATINGS = ratings || {};
    if (list && list.length) setProducts(list);
    renderTabs();
    renderGrid();
    renderCartList();
    updateCartUI();
  });
}

/* ---------- Events ---------- */
$("stars").addEventListener("click", (e) => {
  const b = e.target.closest("[data-star]");
  if (b) giveRating(+b.dataset.star);
});

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
  const add = e.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add, 1, add.closest(".thumb"));
    return;
  }
  const c = e.target.closest(".card");
  if (c) openModal(c.dataset.id);
});
$("grid").addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && !e.target.closest("[data-add]")) {
    const c = e.target.closest(".card");
    if (c) { e.preventDefault(); openModal(c.dataset.id); }
  }
});

$("modal").addEventListener("click", (e) => { if (e.target.hasAttribute("data-close")) closeModal(); });
$("plus").addEventListener("click", () => changeQty(1));
$("minus").addEventListener("click", () => changeQty(-1));
$("addBtn").addEventListener("click", () => {
  if (!current || isOut(current)) return;
  addToCart(current.id, qty, $("mMedia"));
  closeModal();
});
$("orderBtn").addEventListener("click", () => {
  if (!current || isOut(current)) return;
  openDirect(current.id, qty);
});

$("cartBtn").addEventListener("click", openCart);
$("cartBar").addEventListener("click", openCart);
$("drawer").addEventListener("click", (e) => { if (e.target.hasAttribute("data-cart-close")) closeCart(); });
$("cartList").addEventListener("click", (e) => {
  const li = e.target.closest(".ci");
  if (!li) return;
  if (e.target.closest("[data-inc]")) changeLine(li.dataset.id, 1);
  else if (e.target.closest("[data-dec]")) changeLine(li.dataset.id, -1);
  else if (e.target.closest("[data-rm]")) removeLine(li.dataset.id);
});
$("clearBtn").addEventListener("click", clearCart);
$("sendBtn").addEventListener("click", sendOrder);
$("seg").addEventListener("click", (e) => {
  const b = e.target.closest("[data-mode]");
  if (b) setMode(b.dataset.mode);
});
["fName", "fPhone", "fAddr"].forEach((id) =>
  $(id).addEventListener("input", (e) => {
    e.target.closest(".field").classList.remove("invalid");
    saveCustomer();
  })
);

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if ($("drawer").classList.contains("open")) closeCart();
  else closeModal();
});

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
$("pickupAddr").textContent = SHOP.address;

const saved = store.get("marhaba-customer", {});
$("fName").value = saved.name || "";
$("fPhone").value = saved.phone || "";
$("fAddr").value = saved.addr || "";
setMode(saved.mode === "pickup" ? "pickup" : "delivery");

renderTabs();
renderGrid();
renderCartList();
updateCartUI();

// cloud.js (loaded after this file) announces itself when ready
window.addEventListener("cloud-ready", initCloud);
if (window.Cloud) initCloud();
