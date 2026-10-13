# Cozy Soap Co. — free starter storefront

A responsive, botanical-style handmade soap website built with plain HTML, CSS, and JavaScript. No build step or paid hosting is required.

## Files
- `index.html` — page content and checkout form
- `styles.css` — responsive styling and layout
- `script.js` — product catalogue, shopping cart, and WhatsApp order flow

## Before publishing
1. Open `script.js`.
2. Replace `REPLACE_WITH_YOUR_WHATSAPP_NUMBER` with your business WhatsApp number in international format, digits only. For example, an Indian number would look like `919876543210`.
3. Replace the Instagram URL with your real profile.
4. Edit the `products` array: names, descriptions, prices, tags, and images. Product details and prices included here are demo examples.
5. Replace the brand story in `index.html` with your real story.
6. Check every ingredient, benefit, and product claim. Do not publish claims you cannot substantiate.
7. Add your own privacy, shipping, return/refund, cancellation, and terms information as appropriate for your business.

## How the cart and checkout work
- Customers can add products, change quantities, and see the subtotal.
- Checkout collects customer and delivery details in the browser, then opens a prefilled WhatsApp message to your configured business number.
- This is **not** a payment gateway. It does not charge cards, accept UPI payments automatically, store orders in a database, calculate shipping, or send order emails. Confirm orders and payment safely with customers. For online payment processing, connect a payment provider and suitable backend/commerce platform.

## Preview on your computer
1. Extract the ZIP.
2. Open `index.html` in a modern browser. An internet connection is needed for the hosted fonts and product images.
3. For a more reliable local preview, use a simple local web server, but no build tools are needed.

## Publish free with GitHub Pages
1. Sign in or create an account at https://github.com/
2. Create a new public repository, e.g. `cozy-soap-co`.
3. Upload `index.html`, `styles.css`, `script.js`, and this README at the repository root.
4. Open **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
6. Wait for GitHub Pages to publish the site. The Pages panel will show the live URL, usually `https://YOUR-USERNAME.github.io/cozy-soap-co/`.

## Alternative: Netlify Drop
1. Visit https://app.netlify.com/drop
2. Sign in if prompted.
3. Drag the extracted website folder (containing the three site files) into the drop area.
4. Netlify will publish it at a free `netlify.app` address. You can change the generated site name in Netlify settings if available.

## Important notes
- Free hosting gives you a platform subdomain; a custom domain is optional and costs extra.
- The catalogue uses remote sample photography. Replace it with photos you own or are licensed to use.
- The newsletter form is a visual demo and does not collect or store email addresses.
- Customer information is only assembled into a WhatsApp message after checkout submission. Do not treat this static site as secure order-management software.

