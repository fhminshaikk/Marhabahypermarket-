/* =====================================================
   cloud.js - talks to Firebase (free "Firestore" database)
   Used by the shop (ratings + live product list) and by admin.html.
   If firebase-config.js is not filled in, this file does nothing.
   ===================================================== */

const cfg = window.FIREBASE_CONFIG || {};
const configured =
  cfg.apiKey && cfg.projectId && !/^YOUR_/.test(cfg.apiKey) && !/^YOUR_/.test(cfg.projectId);

const VERSION = "10.12.2";
const CDN = `https://www.gstatic.com/firebasejs/${VERSION}/`;

// admin.html waits on this promise; the shop listens for the "cloud-ready" event
let resolveReady;
window.CloudReady = new Promise((r) => (resolveReady = r));

function announce(cloud) {
  window.Cloud = cloud;
  resolveReady(cloud);
  window.dispatchEvent(new Event("cloud-ready"));
}

// Turn a saved database record into the shape the shop uses
function normalise(id, d) {
  const p = {
    id,
    name: String(d.name || id),
    ml: String(d.ml || ""),
    cat: String(d.cat || "Other"),
    price: Number(d.price) || 0,
    unit: d.unit === "kg" ? "kg" : "pc",
    emoji: String(d.emoji || "🛒"),
    img: String(d.img || ""),
    available: d.available !== false,
    order: Number(d.order) || 0,
  };
  if (Number(d.mrp) > p.price) p.mrp = Number(d.mrp);
  return p;
}

async function boot() {
  if (!configured) return { enabled: false };

  const [appMod, fs] = await Promise.all([
    import(CDN + "firebase-app.js"),
    import(CDN + "firebase-firestore.js"),
  ]);
  const app = appMod.initializeApp(cfg);
  const db = fs.getFirestore(app);

  const cloud = {
    enabled: true,

    /* ----- used by the shop ----- */
    async loadProducts() {
      const snap = await fs.getDocs(fs.collection(db, "products"));
      const list = [];
      snap.forEach((d) => list.push(normalise(d.id, d.data())));
      list.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
      return list;
    },

    async loadRatings() {
      const snap = await fs.getDocs(fs.collection(db, "ratings"));
      const out = {};
      snap.forEach((d) => {
        const v = d.data();
        out[d.id] = { sum: Number(v.sum) || 0, count: Number(v.count) || 0 };
      });
      return out;
    },

    // Adds one star rating (1-5) to a product's running total
    async rate(id, stars) {
      stars = Math.max(1, Math.min(5, Math.round(stars)));
      const ref = fs.doc(db, "ratings", id);
      await fs.runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        if (!snap.exists()) tx.set(ref, { sum: stars, count: 1 });
        else {
          const d = snap.data();
          tx.update(ref, { sum: d.sum + stars, count: d.count + 1 });
        }
      });
    },

    /* ----- used by admin.html (needs the owner to be signed in) ----- */
    async auth() {
      const m = await import(CDN + "firebase-auth.js");
      const a = m.getAuth(app);
      return {
        onChange: (cb) => m.onAuthStateChanged(a, cb),
        signIn: (email, pw) => m.signInWithEmailAndPassword(a, email, pw),
        signOut: () => m.signOut(a),
      };
    },

    // Replaces the whole product record (fields you leave out are removed)
    saveProduct(p) {
      const data = {
        name: p.name, ml: p.ml || "", cat: p.cat, price: p.price, unit: p.unit,
        emoji: p.emoji || "🛒", img: p.img || "", available: p.available !== false, order: p.order || 0,
      };
      if (p.mrp && p.mrp > p.price) data.mrp = p.mrp;
      return fs.setDoc(fs.doc(db, "products", p.id), data);
    },

    setAvailable(id, available) {
      return fs.updateDoc(fs.doc(db, "products", id), { available: !!available });
    },

    deleteProduct(id) {
      return fs.deleteDoc(fs.doc(db, "products", id));
    },

    resetRatings(id) {
      return fs.deleteDoc(fs.doc(db, "ratings", id));
    },

    // Copies the built-in starter list into the database (first-time setup)
    async importProducts(list) {
      const batch = fs.writeBatch(db);
      list.forEach((p, i) => {
        const data = {
          name: p.name, ml: p.ml || "", cat: p.cat, price: p.price, unit: p.unit,
          emoji: p.emoji || "🛒", img: p.img || "", available: true, order: i + 1,
        };
        if (p.mrp && p.mrp > p.price) data.mrp = p.mrp;
        batch.set(fs.doc(db, "products", p.id), data);
      });
      await batch.commit();
    },
  };
  return cloud;
}

boot()
  .then(announce)
  .catch((err) => {
    console.warn("Cloud features unavailable:", err);
    announce({ enabled: false, failed: true });
  });
