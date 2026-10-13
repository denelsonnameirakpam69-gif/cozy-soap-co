// Cozy Soap Co. starter storefront. Update the configuration below before publishing.
const CONFIG = {
  // Enter your business WhatsApp number in international format, digits only, e.g. 919876543210.
  whatsappNumber: "REPLACE_WITH_YOUR_WHATSAPP_NUMBER",
  instagramUrl: "https://www.instagram.com/REPLACE_WITH_YOUR_HANDLE/",
  currency: "INR"
};

// Replace demo products, prices, descriptions, and images with your real catalogue.
const products = [
  {id:"oat",name:"Oat & Honey",subtitle:"A warm, comforting everyday bar.",price:199,tag:"Everyday favourite",image:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=700&q=85",alt:"Cream handmade soap bar with botanical styling"},
  {id:"botanical",name:"Garden Calm",subtitle:"A botanical-inspired bathing ritual.",price:219,tag:"Botanical",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",alt:"Natural skincare and handmade soap arrangement"},
  {id:"clay",name:"Earth & Clay",subtitle:"An earthy bar with a simple look.",price:189,tag:"Small batch",image:"https://images.unsplash.com/photo-1607006344380-b6775a0824ce?auto=format&fit=crop&w=700&q=85",alt:"Artisan soap bars in earthy tones"},
  {id:"rose",name:"Rose Petal",subtitle:"A soft, floral-inspired favourite.",price:229,tag:"Giftable",image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=85",alt:"Soap and floral skincare still life"}
];
let cart = JSON.parse(localStorage.getItem("cozySoapCart") || "[]");
const $ = (id) => document.getElementById(id);
const money = (amount) => new Intl.NumberFormat("en-IN",{style:"currency",currency:CONFIG.currency,maximumFractionDigits:0}).format(amount);
function saveCart(){localStorage.setItem("cozySoapCart",JSON.stringify(cart));renderCart();}
function cartQty(){return cart.reduce((sum,item)=>sum+item.qty,0)}
function total(){return cart.reduce((sum,item)=>sum+product(item.id).price*item.qty,0)}
function product(id){return products.find(p=>p.id===id)}
function renderProducts(){
  $("productGrid").innerHTML=products.map(p=>`<article class="product-card">
    <div class="product-image"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="product-tag">${p.tag}</span></div>
    <div class="product-meta"><h3>${p.name}</h3><p>${p.subtitle}</p><div class="product-buy"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}">Add to bag +</button></div></div>
  </article>`).join("");
}
function renderCart(){
  $("cartCount").textContent=cartQty();$("drawerCount").textContent=`(${cartQty()})`;
  $("cartItems").innerHTML=cart.map(item=>{const p=product(item.id);if(!p)return "";return `<div class="cart-row">
    <img src="${p.image}" alt=""><div><h3>${p.name}</h3><small>${money(p.price)} each</small><div class="qty-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Remove one ${p.name}">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Add one ${p.name}">+</button></div></div>
    <span class="cart-line-total">${money(p.price*item.qty)}</span></div>`}).join("");
  const isEmpty=cart.length===0;$("emptyCart").style.display=isEmpty?"block":"none";$("cartBottom").hidden=isEmpty;
  $("subtotal").textContent=money(total());$("checkoutSubtotal").textContent=money(total());
}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function openCart(){$("overlay").hidden=false;$("cartDrawer").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$("closeCart").focus()}
function closeCart(){$("overlay").hidden=true;$("cartDrawer").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function addToCart(id){const found=cart.find(i=>i.id===id);found?found.qty++:cart.push({id,qty:1});saveCart();toast(`${product(id).name} added to your bag`)}
function changeQty(id,change){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=change;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);saveCart()}
function openCheckout(){if(!cart.length){toast("Your bag is empty");return}closeCart();$("checkoutModal").hidden=false;document.body.style.overflow="hidden";$("customerName").focus()}
function closeCheckout(){$("checkoutModal").hidden=true;document.body.style.overflow=""}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add)addToCart(add.dataset.add);
  const qty=e.target.closest("[data-qty]");if(qty)changeQty(qty.dataset.qty,Number(qty.dataset.change));
  if(e.target.closest("#openCart"))openCart();
  if(e.target.closest("#closeCart")||e.target.id==="overlay")closeCart();
  if(e.target.closest("#browseProducts")){closeCart();$("shop").scrollIntoView({behavior:"smooth"})}
  if(e.target.closest("#checkoutButton"))openCheckout();
  if(e.target.matches("[data-close-checkout]"))closeCheckout();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeCheckout()}});
$("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();if(!cart.length){toast("Your bag is empty");closeCheckout();return}
  if(!/^\d{10,15}$/.test(CONFIG.whatsappNumber)){toast("Please set your business WhatsApp number in script.js first.");return}
  const fd=new FormData(e.currentTarget);
  const lines=cart.map(i=>`${product(i.id).name} x ${i.qty} — ${money(product(i.id).price*i.qty)}`);
  const message=["Hello Cozy Soap Co.! I'd like to place an order:","",...lines,"",`Subtotal: ${money(total())}`,"",`Name: ${fd.get("name")}`,`Phone: ${fd.get("phone")}`,`Email: ${fd.get("email")||"Not provided"}`,`Delivery address: ${fd.get("address")}`,`Notes: ${fd.get("notes")||"None"}`,"","Please confirm shipping costs, availability, and payment instructions."].join("\n");
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  // Cart is intentionally not cleared automatically; wait until the seller confirms the order.
});
$("newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("newsletterMessage").textContent="Thanks! This demo doesn't store email addresses yet—connect a newsletter service before launch.";});
$("menuToggle").addEventListener("click",()=>{const nav=$("mainNav");const open=nav.classList.toggle("open");$("menuToggle").setAttribute("aria-expanded",String(open));$("menuToggle").setAttribute("aria-label",open?"Close navigation":"Open navigation")});
$("mainNav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{$("mainNav").classList.remove("open");$("menuToggle").setAttribute("aria-expanded","false")}));
$("instagramLink").href=CONFIG.instagramUrl;
$("whatsappLink").href=CONFIG.whatsappNumber.startsWith("REPLACE")?"#":`https://wa.me/${CONFIG.whatsappNumber}`;
$("year").textContent=new Date().getFullYear();
renderProducts();renderCart();