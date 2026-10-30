# Marhaba Hypermarket Website

Simple online catalogue for Marhaba Hypermarket (MA Square, Thengol, Othukkungal).
Customers tap a product, see its price, choose a quantity and press **Order through WhatsApp**.
WhatsApp opens with the product details already typed for the shop owner.

No server or database is needed, so it is free to host on GitHub Pages.

## Files

- `index.html` page layout
- `style.css` design and smooth animations
- `app.js` shop settings, product list and WhatsApp logic

## Shop WhatsApp number

The number is set at the top of `app.js` (taken from the shop flyer):

```js
whatsapp: "919847283286",   // country code 91 + number, digits only
phoneDisplay: "9847283286",
```

To change it later, edit these two lines.

## Put it on GitHub

1. Create an account at github.com and click **New repository**. Name it `marhaba-hypermarket`, keep it **Public**, then **Create**.
2. Click **uploading an existing file**, drag in `index.html`, `style.css`, `app.js` and `README.md`, then **Commit changes**.
3. Go to **Settings > Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After about a minute your site is live at `https://YOUR-USERNAME.github.io/marhaba-hypermarket/`.

Share that link with customers, or make a QR code from it for the shop.

## Adding real product photos and the logo

1. Create an `images` folder in the repository and upload your photos (for example `tomato.jpg`).
2. In `app.js`, set that product's `img` value: `img: "images/tomato.jpg"`.
   Products with no `img` show an emoji instead.
3. For the logo, upload `images/logo.png` and in `index.html` replace
   `<span class="logo-mark" ...>🍏</span>` with `<span class="logo-mark"><img src="images/logo.png" alt="Marhaba"></span>`.

## Changing prices or adding products

Edit the `PRODUCTS` list in `app.js`. Each product looks like this:

```js
{ id: "tomato", name: "Tomato", ml: "തക്കാളി", cat: "Vegetables", price: 29, unit: "kg", emoji: "🍅", img: "" }
```

- `unit: "kg"` sells by weight (0.5 kg steps), `unit: "pc"` sells per pack.
- Add `mrp: 100` to show the old price and a discount badge.
- Commit the change on GitHub and the site updates in a minute.
