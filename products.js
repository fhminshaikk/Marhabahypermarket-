/* Starter product list. Used by the shop until the admin editor is set up,
   and by admin.html for the one-time "Import starter products" button.
   (Once the admin editor is on, change products from admin.html instead.) */
/* =====================================================
   PRODUCTS
   - emoji is used as a picture until you add a real photo.
   - To use real photos: put the file in /images and set img: "images/tomato.jpg"
   - unit "kg" = sold by weight, "pc" = sold per piece/pack
   - mrp is optional (shows a strike-through price + discount badge)
   ===================================================== */
window.DEFAULT_PRODUCTS = [
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
