/* =====================================================
   admin.js - the shop owner's product editor
   ===================================================== */
import "./cloud.js?v=6";

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rupee = (n) => "₹" + Math.round(n * 100) / 100;

let Cloud = null;
let products = [];
let ratings = {};
let query = "";
const ed = { id: null, order: 0, img: "", unit: "kg" };

/* ---------- small helpers ---------- */
function show(view) {
  ["viewLoading", "viewSetup", "viewLogin", "viewApp"].forEach((v) => ($(v).hidden = v !== view));
  $("aRight").hidden = view !== "viewApp";
}

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

function friendlyError(err) {
  const code = (err && err.code) || "";
  if (code.includes("permission-denied")) return "Not allowed. Make sure you are signed in with the shop owner email used in the Firebase rules.";
  if (code.includes("unavailable") || code.includes("network")) return "No internet connection. Please try again.";
  return "Something went wrong. Please try again.";
}

const mediaHTML = (p) =>
  p.img ? `<img src="${esc(p.img)}" alt="" />` : `<span>${esc(p.emoji || "🛒")}</span>`;

/* ---------- product list ---------- */
function render() {
  const q = query.trim().toLowerCase();
  const list = products.filter((p) => !q || p.name.toLowerCase().includes(q) || (p.ml || "").includes(q) || p.cat.toLowerCase().includes(q));

  $("importBox").hidden = products.length > 0;
  $("aCount").textContent = products.length ? `${list.length} of ${products.length} products` : "";

  $("aList").innerHTML = list
    .map((p, i) => {
      const r = ratings[p.id];
      const rating = r && r.count ? `<span class="rt">★ ${(r.sum / r.count).toFixed(1)} (${r.count})</span>` : "";
      const on = p.available !== false;
      return `
      <li class="row ${on ? "" : "off"}" data-id="${esc(p.id)}" style="animation-delay:${Math.min(i, 12) * 35}ms">
        <div class="thumb2">${mediaHTML(p)}</div>
        <div class="info">
          <strong>${esc(p.name)}</strong>
          <span class="sub">${esc(p.cat)} · ${rupee(p.price)}${p.unit === "kg" ? "/kg" : ""}${p.mrp ? ` <s>${rupee(p.mrp)}</s>` : ""}</span>
          ${rating}
        </div>
        <div class="stock">
          <label class="switch" title="Available"><input type="checkbox" data-avail ${on ? "checked" : ""} aria-label="Available"><i></i></label>
          <small>${on ? "In stock" : "Out of stock"}</small>
        </div>
      </li>`;
    })
    .join("");

  $("catList").innerHTML = [...new Set(products.map((p) => p.cat))].map((c) => `<option value="${esc(c)}">`).join("");
}

async function load() {
  try {
    [products, ratings] = await Promise.all([Cloud.loadProducts(), Cloud.loadRatings()]);
  } catch (err) {
    toast(friendlyError(err));
    products = [];
  }
  render();
}

/* ---------- editor ---------- */
function setUnit(u) {
  ed.unit = u;
  document.querySelectorAll("#eUnit [data-unit]").forEach((b) => {
    const on = b.dataset.unit === u;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });
  $("eUnitPill").style.transform = u === "pc" ? "translateX(100%)" : "none";
}

function setPhoto(dataUrl, emoji) {
  ed.img = dataUrl || "";
  $("photoPreview").innerHTML = ed.img ? `<img src="${esc(ed.img)}" alt="" />` : esc(emoji || "📷");
  $("photoBtn").classList.toggle("has", !!ed.img);
  $("photoClear").hidden = !ed.img;
}

function setAvailUI(on) {
  $("eAvail").checked = on;
  $("availText").textContent = on ? "Available" : "Out of stock";
  $("edTitle").closest(".ed-sheet").querySelector(".avail-row").classList.toggle("is-off", !on);
}

function openEditor(id) {
  const p = id ? products.find((x) => x.id === id) : null;
  ed.id = p ? p.id : null;
  ed.order = p ? p.order || 0 : Math.max(0, ...products.map((x) => x.order || 0)) + 1;

  $("edTitle").textContent = p ? "Edit product" : "Add product";
  $("eName").value = p ? p.name : "";
  $("eMl").value = p ? p.ml || "" : "";
  $("eCat").value = p ? p.cat : "";
  $("eEmoji").value = p ? p.emoji || "" : "";
  // Price = original price, Offer price = the discounted selling price
  $("ePrice").value = p ? (p.mrp ? p.mrp : p.price) : "";
  $("eOffer").value = p && p.mrp ? p.price : "";
  setUnit(p ? p.unit : "kg");
  setPhoto(p ? p.img : "", p ? p.emoji : "");
  setAvailUI(p ? p.available !== false : true);

  const r = p && ratings[p.id];
  $("delBtn").hidden = !p;
  $("resetRate").hidden = !(r && r.count);
  $("edErr").hidden = true;
  $("saveBtn").disabled = false;

  const el = $("ed");
  el.classList.remove("closing");
  el.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("open")));
  if (!p) setTimeout(() => $("eName").focus(), 350);
}

function closeEditor() {
  const el = $("ed");
  if (!el.classList.contains("open")) return;
  el.classList.remove("open");
  el.classList.add("closing");
  el.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  setTimeout(() => el.classList.remove("closing"), 450);
}

function editorError(msg, field) {
  $("edErr").textContent = msg;
  $("edErr").hidden = false;
  if (field) {
    const wrap = field.closest(".field");
    wrap.classList.remove("invalid");
    void wrap.offsetWidth;
    wrap.classList.add("invalid");
    field.focus();
  }
}

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30) || "item";

async function saveProduct() {
  const name = $("eName").value.trim();
  const cat = $("eCat").value.trim();
  const price = parseFloat($("ePrice").value);
  const offerText = $("eOffer").value.trim();
  const offer = offerText === "" ? null : parseFloat(offerText);

  if (!name) return editorError("Please enter the product name.", $("eName"));
  if (!cat) return editorError("Please enter a category (for example Fruits).", $("eCat"));
  if (!(price > 0)) return editorError("Please enter the price.", $("ePrice"));
  if (offer !== null && !(offer > 0 && offer < price))
    return editorError("Offer price must be lower than the price. Leave it empty if there is no offer.", $("eOffer"));

  const p = {
    id: ed.id || `${slug(name)}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    ml: $("eMl").value.trim(),
    cat,
    unit: ed.unit,
    price: offer !== null ? offer : price,
    emoji: $("eEmoji").value.trim() || "🛒",
    img: ed.img,
    available: $("eAvail").checked,
    order: ed.order,
  };
  if (offer !== null) p.mrp = price;

  $("saveBtn").disabled = true;
  try {
    await Cloud.saveProduct(p);
  } catch (err) {
    $("saveBtn").disabled = false;
    return editorError(friendlyError(err));
  }
  const i = products.findIndex((x) => x.id === p.id);
  if (i >= 0) products[i] = p; else products.push(p);
  products.sort((a, b) => (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name));
  render();
  closeEditor();
  toast(i >= 0 ? "Changes saved" : "Product added");
}

async function deleteProduct() {
  const p = products.find((x) => x.id === ed.id);
  if (!p || !confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
  try {
    await Cloud.deleteProduct(p.id);
  } catch (err) {
    return editorError(friendlyError(err));
  }
  products = products.filter((x) => x.id !== p.id);
  render();
  closeEditor();
  toast("Product deleted");
}

async function resetRatings() {
  const p = products.find((x) => x.id === ed.id);
  if (!p || !confirm(`Remove all customer ratings for "${p.name}"?`)) return;
  try {
    await Cloud.resetRatings(p.id);
  } catch (err) {
    return editorError(friendlyError(err));
  }
  delete ratings[p.id];
  $("resetRate").hidden = true;
  render();
  toast("Ratings reset");
}

/* ---------- photo: shrink on the phone before saving ---------- */
function shrinkImage(file, max = 480) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * s));
      c.height = Math.max(1, Math.round(img.height * s));
      const g = c.getContext("2d");
      g.fillStyle = "#fff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      let q = 0.82;
      let out = c.toDataURL("image/jpeg", q);
      while (out.length > 140000 && q > 0.4) { q -= 0.1; out = c.toDataURL("image/jpeg", q); }
      resolve(out);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}

/* ---------- events ---------- */
$("aSearch").addEventListener("input", (e) => { query = e.target.value; render(); });
$("addNew").addEventListener("click", () => openEditor(null));

$("aList").addEventListener("click", (e) => {
  const row = e.target.closest(".row");
  if (!row || e.target.closest(".switch")) return;
  openEditor(row.dataset.id);
});

// quick in-stock / out-of-stock switch on each row
$("aList").addEventListener("change", async (e) => {
  const box = e.target.closest("[data-avail]");
  if (!box) return;
  const row = box.closest(".row");
  const p = products.find((x) => x.id === row.dataset.id);
  const on = box.checked;
  row.classList.toggle("off", !on);
  row.querySelector(".stock small").textContent = on ? "In stock" : "Out of stock";
  try {
    await Cloud.setAvailable(p.id, on);
    p.available = on;
    toast(`${p.name}: ${on ? "back in stock" : "marked out of stock"}`);
  } catch (err) {
    box.checked = !on; // undo
    row.classList.toggle("off", on);
    row.querySelector(".stock small").textContent = !on ? "In stock" : "Out of stock";
    toast(friendlyError(err));
  }
});

$("importBtn").addEventListener("click", async () => {
  const btn = $("importBtn");
  btn.disabled = true;
  try {
    await Cloud.importProducts(window.DEFAULT_PRODUCTS || []);
    toast("Starter products imported");
    await load();
  } catch (err) {
    toast(friendlyError(err));
  }
  btn.disabled = false;
});

document.querySelectorAll("[data-ed-close]").forEach((b) => b.addEventListener("click", closeEditor));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeEditor(); });
$("saveBtn").addEventListener("click", saveProduct);
$("delBtn").addEventListener("click", deleteProduct);
$("resetRate").addEventListener("click", resetRatings);
$("eUnit").addEventListener("click", (e) => {
  const b = e.target.closest("[data-unit]");
  if (b) setUnit(b.dataset.unit);
});
$("eAvail").addEventListener("change", (e) => setAvailUI(e.target.checked));
$("eEmoji").addEventListener("input", () => { if (!ed.img) $("photoPreview").textContent = $("eEmoji").value.trim() || "📷"; });
["eName", "eCat", "ePrice", "eOffer"].forEach((id) =>
  $(id).addEventListener("input", (e) => {
    e.target.closest(".field").classList.remove("invalid");
    $("edErr").hidden = true;
  })
);

$("photoBtn").addEventListener("click", () => $("photoFile").click());
$("photoFile").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  e.target.value = "";
  if (!f) return;
  try {
    setPhoto(await shrinkImage(f), "");
  } catch (err) {
    toast("Could not read that photo. Try another one.");
  }
});
$("photoClear").addEventListener("click", () => setPhoto("", $("eEmoji").value.trim()));

/* ---------- start ---------- */
(async function start() {
  Cloud = await window.CloudReady;
  if (!Cloud.enabled) {
    $("setupFail").hidden = !Cloud.failed;
    return show("viewSetup");
  }
  const auth = await Cloud.auth();

  $("signOut").addEventListener("click", () => auth.signOut());

  $("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = $("lEmail").value.trim();
    const pass = $("lPass").value;
    const err = $("lErr");
    err.hidden = true;
    if (!email || !pass) {
      err.textContent = "Please enter your email and password.";
      err.hidden = false;
      return;
    }
    $("lBtn").disabled = true;
    try {
      await auth.signIn(email, pass);
    } catch (ex) {
      const c = (ex && ex.code) || "";
      err.textContent = c.includes("too-many")
        ? "Too many attempts. Please wait a few minutes and try again."
        : c.includes("network")
        ? "No internet connection. Please try again."
        : "Wrong email or password.";
      err.hidden = false;
    }
    $("lBtn").disabled = false;
  });

  auth.onChange((user) => {
    if (user) {
      $("who").textContent = user.email || "";
      show("viewApp");
      load();
    } else {
      products = [];
      show("viewLogin");
    }
  });
})();
