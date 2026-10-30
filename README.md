Marhaba Hypermarket Website
Simple online catalogue and shopping web app for Marhaba Hypermarket (MA Square, Thengol, Othukkungal).
Customers browse products, add items to their cart, select Home Delivery or Store Pickup, enter their name and address, and send the complete order directly to WhatsApp.
No backend database or server is required, making it completely free to host on GitHub Pages.
Key Features
Interactive Shopping Cart: Slide-in cart drawer with smooth animations, badge counter, item totals, and grand total calculations.
Delivery or Pickup Choice: Customers choose between Home Delivery (with address entry) or Store Pickup during checkout.
Out of Stock Toggle: Easily mark items unavailable in app.js. Unavailable items display an "Out of Stock" badge and cannot be added to cart.
WhatsApp Order Integration: Generates a structured, pre-formatted order summary including customer info, items, quantities, totals, and fulfillment type sent directly to WhatsApp.
Dark / Light Mode: Built-in theme switch with system preference detection and smooth transition animations.
Responsive Design: Optimized for mobile phones and desktop displays.
Files Structure
index.html – Main layout, product grid, product modal, and shopping cart drawer.
style.css – Modern styling, CSS variables, dark/light themes, and smooth slide/fade animations.
app.js – Shop configuration, product inventory list, cart state, and WhatsApp link generator.
README.md – Documentation and setup guide.
Shop WhatsApp Configuration
The shop contact number is configured at the top of app.js:
const SHOP = {
  name: "Marhaba Hypermarket",
  whatsapp: "919847283286",   // Country code 91 + 10-digit number (digits only)
  phoneDisplay: "9847283286",
};
To update the WhatsApp receiving phone number, simply edit the whatsapp string in app.js.
Managing Products & Inventory
Edit the PRODUCTS array in app.js to manage items, pricing, and stock status:
{ 
  id: "beans", 
  name: "Long Beans", 
  ml: "പയർ", 
  cat: "Vegetables", 
  price: 39, 
  unit: "kg", 
  emoji: "🫛", 
  img: "", 
  outOfStock: true // Set to true to disable ordering for sold-out items
}
Product Fields:
unit: "kg" – Quantities adjust in 0.5 kg increments.
unit: "pc" – Quantities adjust in single-unit increments (pcs).
mrp: 100 – Optional original price (displays strikethrough price and calculates % OFF badge automatically).
outOfStock: true – Marks item as "Out of Stock", grays out the card, and disables ordering.
Deploying to GitHub Pages
Go to github.com and create a New repository.
Name the repository marhaba-hypermarket, ensure it is set to Public, and click Create repository.
Click uploading an existing file and drag in your updated files:
index.html
style.css
app.js
README.md
Click Commit changes.
Navigate to Settings > Pages.
Under Build and deployment > Branch, select main (or master) and / (root), then click Save.
Wait ~1 minute. Your website will be live at:
https://YOUR-USERNAME.github.io/marhaba-hypermarket/
Adding Product Images and Logo
