# Marhaba Hypermarket Website

Online catalogue and ordering site for Marhaba Hypermarket (MA Square, Thengol, Othukkungal).
It is a simple website, free to host on GitHub Pages. Orders are sent to the shop on WhatsApp.

## What customers can do

- Browse products by category, search, and switch between light and black theme.
- Tap **+** on a product (or open it) and **Add to cart**.
- Open the cart, choose **Home delivery** or **Store pickup**, enter name and address, and press
  **Send order on WhatsApp**. WhatsApp opens with the full order already typed for the shop.
- Or press **Order through WhatsApp** inside a product to order just that one item. This opens the same
  form (delivery or pickup, name, mobile number, address), so every order carries the customer's details.
- Rate products with 1 to 5 stars (needs the one-time setup below).

## Files

| File | What it is |
| --- | --- |
| `index.html`, `style.css`, `app.js` | the shop |
| `products.js` | the starter product list |
| `admin.html`, `admin.css`, `admin.js` | the owner's product editor (needs the setup below) |
| `cloud.js`, `firebase-config.js` | connect the site to the free Firebase database |
| `firestore.rules` | the security rules you paste into Firebase |

## Put it on GitHub

1. Create an account at github.com and click **New repository**. Name it `marhaba-hypermarket`, keep it **Public**.
   When asked about a README, choose **No** (you are uploading your own).
2. Click **uploading an existing file**, drag in **all the files above** (and the `images` folder if you have one), then **Commit changes**.
3. Go to **Settings > Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After about a minute your site is live at `https://YOUR-USERNAME.github.io/marhaba-hypermarket/`.

**When you get updated files:** upload every changed file with the same name (Add file > Upload files).
Always upload all files from the same update together, otherwise the site can look broken.

## Shop WhatsApp number

Set at the top of `app.js`:

```js
whatsapp: "919847283286",   // country code 91 + number, digits only
phoneDisplay: "9847283286",
```

## Marking a product out of stock

**Easiest (after the admin setup below):** open `admin.html` and flip the switch on that product.

**Without the admin setup:** in `app.js`, type the product ids inside the brackets and commit:

```js
outOfStock: ["tomato", "cabbage"],
```

Out-of-stock products show a label, move to the end of the list and cannot be ordered.

## Turn on ratings and the admin editor (one-time, about 10 minutes, free)

Star ratings from many customers and a product editor both need somewhere to store data, so they use
Google's free **Firebase** database. Until you finish this, the shop works normally without them.

1. Go to https://console.firebase.google.com and sign in with a Google account.
   Click **Create a project**, name it (for example `marhaba`), and turn Google Analytics **off**.
2. In the left menu open **Build > Firestore Database > Create database**.
   Choose a location near you (for example `asia-south1`, Mumbai) and **Start in production mode**.
3. Open **Build > Authentication > Get started**. Under **Sign-in method** enable **Email/Password**.
   Then open the **Users** tab > **Add user** and create the owner login (your email and a strong password).
4. Back in **Firestore Database > Rules**: delete everything, paste the contents of `firestore.rules`,
   replace `OWNER_EMAIL_HERE` with the **same email** as step 3, and press **Publish**.
5. Click the gear icon > **Project settings**. Under **Your apps** click the web icon `</>`,
   give the app a name, and register it. Copy the 4 values `apiKey`, `authDomain`, `projectId`, `appId`
   into `firebase-config.js`. (These values are not passwords. The rules in step 4 are what protect your data.)
6. Upload the edited `firebase-config.js` to GitHub.
7. Open `https://YOUR-USERNAME.github.io/marhaba-hypermarket/admin.html`, sign in, and press
   **Import starter products**. From now on the shop shows the products saved here.

If sign-in says the domain is not allowed, go to **Authentication > Settings > Authorized domains**
and add `YOUR-USERNAME.github.io`.

### Using the admin editor

- Open `admin.html` on your phone and bookmark it. It is not linked from the shop.
- **Switch on each row** = in stock or out of stock, saved instantly.
- **Tap a product** to edit its photo, name, category, price, offer price, unit and availability.
- **+ Add product** adds a new one. **Price** is the normal price and **Offer price** is the lower
  price customers pay; leave Offer price empty when there is no discount.
- Photos are shrunk on your phone automatically before saving.
- **Reset ratings** clears the ratings of one product.

### About ratings

Each phone can rate a product once. This stops accidental repeats but cannot stop someone determined
(for example using another phone), so treat ratings as a friendly guide, not an audit.

## Adding real product photos without the admin editor

Upload photos to an `images` folder and set `img: "images/tomato.jpg"` for the product in `products.js`.
For the logo, upload `images/logo.png` and in `index.html` replace
`<span class="logo-mark" ...>🍏</span>` with `<span class="logo-mark"><img src="images/logo.png" alt="Marhaba"></span>`.
