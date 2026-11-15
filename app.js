/* ArubaBeachFood.com — customer marketplace preview.
 * All restaurant, menu and price data below is SAMPLE DATA for preview only.
 * Money is stored in integer minor units with a per-currency precision table. */
(() => {
"use strict";

const CURRENCIES = { USD: { symbol: "$", digits: 2 }, AWG: { symbol: "Afl.", digits: 2 } };
const fmt = (minor, cur = "USD") => { const c = CURRENCIES[cur]; return `${c.symbol}${cur === "AWG" ? " " : ""}${(minor / 10 ** c.digits).toFixed(c.digits)}`; };
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

/* Delivery coverage: every zone is "pending" until the operator confirms it. */
const BEACHES = [
  { id: "palm-beach", name: "Palm Beach", area: "High-rise hotel area", img: "1500375592092-40eb2168fd21" },
  { id: "eagle-beach", name: "Eagle Beach", area: "Wide white-sand beach", img: "1510414842594-a61c69b5ae57" },
  { id: "baby-beach", name: "Baby Beach", area: "San Nicolas, south coast", img: "1507525428034-b723cf961d3e" },
  { id: "arashi-beach", name: "Arashi Beach", area: "Northwest coast", img: "1473116763249-2faaef81ccda" },
  { id: "tres-trapi", name: "Tres Trapi", area: "Northwest coast steps", img: "1544551763-46a013bb70d5" },
  { id: "boca-catalina", name: "Boca Catalina", area: "Snorkelling cove", img: "1506929562872-bb421503ef21" },
  { id: "malmok-beach", name: "Malmok Beach", area: "Coastal coves", img: "1519046904884-53103b34b206" },
  { id: "hadicurari-beach", name: "Hadicurari Beach", area: "Fisherman's Huts", img: "1501785888041-af3ef285b470" },
  { id: "manchebo-beach", name: "Manchebo Beach", area: "Low-rise resort area", img: "1499793983690-e29da59ef1c2" },
  { id: "rodgers-beach", name: "Rodgers Beach", area: "South coast", img: "1500530855697-b586d89ba3ee" },
  { id: "surfside-beach", name: "Surfside Beach", area: "Near Oranjestad", img: "1507525428034-b723cf961d3e" },
  { id: "druif-beach", name: "Druif Beach", area: "Divi resort area", img: "1473116763249-2faaef81ccda" },
].map(b => ({ ...b, coverage: "pending" }));

const CATEGORIES = ["Caribbean", "Seafood", "Burgers", "Pizza", "Italian", "Asian", "Mexican", "Healthy Food", "Breakfast", "Desserts", "Drinks"];

const BEACH_MENU = [
  { id: "chicken-burger", cat: "Burgers", name: "Chicken Burger", desc: "Crispy chicken, lettuce, tomato and house sauce on a toasted bun.", price: 1200, img: "1550547660-d9450f859349", extras: [["Extra cheese", 150], ["Bacon", 250], ["Avocado", 200]] },
  { id: "cheeseburger", cat: "Burgers", name: "Cheeseburger", desc: "Beef patty, cheddar, pickles and onions.", price: 1300, img: "1568901346375-23c9450c58cd", extras: [["Extra patty", 400], ["Bacon", 250]] },
  { id: "fish-sandwich", cat: "Sandwiches & Wraps", name: "Fish Sandwich", desc: "Local catch, citrus slaw and tartar sauce.", price: 1500, img: "1519708227418-c8fd9a32b7a2", extras: [["Extra tartar", 0]] },
  { id: "chicken-wrap", cat: "Sandwiches & Wraps", name: "Chicken Wrap", desc: "Grilled chicken, greens and garlic sauce in a soft wrap.", price: 1200, img: "1626700051175-6818013e1d4f", extras: [["Add fries inside", 150]] },
  { id: "caesar-salad", cat: "Salads & Sides", name: "Caesar Salad", desc: "Romaine, parmesan, croutons and Caesar dressing.", price: 1100, img: "1546793665-c74683f339c1", extras: [["Add grilled chicken", 400], ["Add shrimp", 600]] },
  { id: "french-fries", cat: "Salads & Sides", name: "French Fries", desc: "Golden fries with sea salt.", price: 500, img: "1573080496219-bb080dd4f877", extras: [["Truffle oil", 200]] },
  { id: "fresh-juice", cat: "Drinks", name: "Fresh Juice", desc: "Seasonal fruit, pressed fresh. Ask for today's flavour.", price: 600, img: "1600271886742-f049cd451bba", extras: [] },
  { id: "water", cat: "Drinks", name: "Water", desc: "Chilled bottled water, 500 ml.", price: 300, img: "1548839140-29a749e1cf4d", extras: [] },
];

const HOURS = (o, c) => [0, 1, 2, 3, 4, 5, 6].map(() => [o, c]);
const RESTAURANTS = [
  { id: "coastline-burger-co", name: "Coastline Burger Co.", initials: "CB", cuisine: ["Burgers", "Healthy Food", "Drinks"], desc: "Beach-day classics: burgers, wraps, salads and fresh juice.", cover: "1568901346375-23c9450c58cd", currency: "USD", prep: "20–30 min", min: 1500, fee: null, hours: HOURS(10, 21), status: "active", menu: BEACH_MENU },
  { id: "local-store-aruba", name: "Local Store Aruba", initials: "LS", cuisine: ["Burgers", "Caribbean"], desc: "Local favourite known for its signature burgers.", cover: "1550547660-d9450f859349", currency: "AWG", prep: "Estimate pending", min: null, fee: null, hours: HOURS(11, 22), status: "active",
    menu: [{ id: "local-store-aruba-001", cat: "Burgers", name: "CHUBATO BURGER", desc: "Restaurant-provided description pending.", price: 3802, img: null, imageStatus: "pending_restaurant_approval", extras: [] }] },
  { id: "island-grill-kitchen", name: "Island Grill Kitchen", initials: "IG", cuisine: ["Caribbean", "Seafood"], desc: "Grilled island favourites and keshi-inspired plates.", cover: "1544025162-d76694265947", currency: "USD", prep: "Estimate pending", min: null, fee: null, hours: HOURS(12, 22), status: "active", menu: [] },
  { id: "the-fresh-catch", name: "The Fresh Catch", initials: "FC", cuisine: ["Seafood"], desc: "Seafood from the morning boats. Menu to be confirmed.", cover: "1519708227418-c8fd9a32b7a2", currency: "USD", prep: "Estimate pending", min: null, fee: null, hours: HOURS(12, 21), status: "unavailable", menu: [] },
  { id: "sunset-pizza-house", name: "Sunset Pizza House", initials: "SP", cuisine: ["Pizza", "Italian"], desc: "Wood-fired pizzas made to share at sunset.", cover: "1513104890138-7c749659a591", currency: "USD", prep: "Estimate pending", min: null, fee: null, hours: HOURS(16, 23), status: "active", menu: [] },
  { id: "green-island-bowls", name: "Green Island Bowls", initials: "GI", cuisine: ["Healthy Food", "Breakfast"], desc: "Fresh bowls, salads and smoothies for active beach days.", cover: "1512621776951-a57141f2eefd", currency: "USD", prep: "Estimate pending", min: null, fee: null, hours: HOURS(7, 17), status: "active", menu: [] },
];

/* Opening status computed in Aruba time (AST, UTC−4, no DST). */
function arubaHour() { const d = new Date(Date.now() - 4 * 3600e3); return [d.getUTCDay(), d.getUTCHours() + d.getUTCMinutes() / 60]; }
function statusOf(r) {
  if (r.status === "unavailable") return { key: "unavailable", label: "Temporarily Unavailable", cls: "warn" };
  const [day, h] = arubaHour(); const [o, c] = r.hours[day];
  return h >= o && h < c ? { key: "open", label: "Open", cls: "ok" } : { key: "closed", label: `Closed · opens ${o}:00`, cls: "bad" };
}

/* ---------- State (persisted) ---------- */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem("abf_" + k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem("abf_" + k, JSON.stringify(v)); },
};
let cart = store.get("cart", { restaurantId: null, lines: [] });
let beachId = store.get("beach", null);
let delivery = store.get("delivery", { type: "beach" });
const saveCart = () => { store.set("cart", cart); renderCartUI(); };

const findR = id => RESTAURANTS.find(r => r.id === id);
const lineUnit = l => { const r = findR(cart.restaurantId); const it = r?.menu.find(m => m.id === l.itemId); if (!it) return 0; return it.price + l.extras.reduce((s, e) => s + (it.extras.find(x => x[0] === e)?.[1] || 0), 0); };
const subtotal = () => cart.lines.reduce((s, l) => s + lineUnit(l) * l.qty, 0);
const count = () => cart.lines.reduce((s, l) => s + l.qty, 0);

/* ---------- UI helpers ---------- */
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2800); }
function openModal(html) { $("#modalCard").innerHTML = html; $("#modal").classList.add("open"); document.body.style.overflow = "hidden"; $("#modalCard").querySelector("button, input, a")?.focus(); }
function closeModal() { $("#modal").classList.remove("open"); document.body.style.overflow = ""; }
const icon = {
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  bag: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
  truck: '<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>',
};
const img = (id, alt, w) => id ? `<img src="${U(id, w)}" alt="${esc(alt)}" loading="lazy" decoding="async">` : `<div class="skeleton" style="width:100%;height:100%;display:grid;place-items:center;color:var(--text-muted);font-size:13px">Photo pending approval</div>`;

/* ---------- Components ---------- */
function beachCard(b) {
  return `<button class="beach-card ${beachId === b.id ? "selected" : ""}" data-beach="${b.id}" aria-pressed="${beachId === b.id}">
    <img src="${U(b.img, 600)}" alt="${esc(b.name)}, Aruba" loading="lazy">
    <span class="status"><span class="tag dark">Coverage pending</span></span>
    <span class="check">${icon.check}</span>
    <span class="info"><strong>${esc(b.name)}</strong><small>${esc(b.area)}</small></span></button>`;
}
function restoCard(r) {
  const s = statusOf(r);
  return `<a class="resto-card" href="#/restaurant/${r.id}">
    <div class="resto-cover">${img(r.cover, r.name, 700)}<div class="tags"><span class="tag ${s.cls}">${s.label}</span><span class="tag sample">Sample</span></div><div class="resto-logo">${r.initials}</div></div>
    <div class="resto-body"><h3>${esc(r.name)}</h3><p>${esc(r.desc)}</p>
    <div class="meta"><span>${esc(r.cuisine.join(" · "))}</span><span>${icon.clock}${esc(r.prep)}</span><span>${r.menu.length ? r.menu.length + " items" : "Menu coming soon"}</span></div></div></a>`;
}
function dishCard(r, it) {
  return `<article class="dish"><div class="dish-img">${img(it.img, it.name, 600)}<span class="tag sample">Sample menu</span></div>
    <div class="dish-body"><h3>${esc(it.name)}</h3><p>${esc(it.desc)} <br><small>${esc(r.name)}</small></p>
    <div class="dish-foot"><span class="price">${fmt(it.price, r.currency)}</span><button class="btn sm" data-item="${r.id}|${it.id}">Add</button></div></div></article>`;
}

/* ---------- Views ---------- */
const views = {
  home() {
    const featured = RESTAURANTS.slice(0, 3), coast = RESTAURANTS[0];
    return `
    <section class="hero"><div class="hero-bg" role="img" aria-label="Eagle Beach, Aruba"></div><div class="wrap"><div class="hero-content">
      <span class="hero-pill"><i></i> Beach & hotel delivery across Aruba</span>
      <h1>Your Beach Day.<br><span>Food Delivered.</span></h1>
      <p>Order from Aruba's local restaurants and have your meal brought to your umbrella, hotel, resort or vacation rental.</p>
      <div class="hero-actions"><a class="btn coral" href="#/order">Order Food Now</a><a class="btn white" href="#/how">How it works</a></div>
      <div class="hero-search"><select id="heroBeach" aria-label="Choose your beach"><option value="">Where are you today?</option>${BEACHES.map(b => `<option value="${b.id}" ${beachId === b.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select><button class="btn" id="heroGo">Find food</button></div>
    </div></div></section>

    <section class="block" id="beaches"><div class="wrap">
      <div class="section-head reveal"><div><span class="eyebrow">Step 1 · Choose your spot</span><h2>Where should we deliver?</h2></div><p>Pick your beach. Delivery coverage for each beach is being confirmed with our delivery partner and will be verified before checkout.</p></div>
      <div class="beach-grid reveal">${BEACHES.map(beachCard).join("")}</div>
    </div></section>

    <section class="block alt"><div class="wrap">
      <div class="section-head reveal"><div><span class="eyebrow">Featured</span><h2>Restaurants on the island</h2></div><a class="btn ghost" href="#/restaurants">View all restaurants</a></div>
      <div class="resto-grid reveal">${featured.map(restoCard).join("")}</div>
    </div></section>

    <section class="block"><div class="wrap">
      <div class="section-head reveal"><div><span class="eyebrow">Popular dishes</span><h2>Beach-day favourites</h2></div><p>Sample menu items shown for preview. Real partner menus replace these at launch.</p></div>
      <div class="dish-grid reveal">${coast.menu.slice(0, 4).map(it => dishCard(coast, it)).join("")}</div>
    </div></section>

    ${howSection()}

    <section class="block"><div class="wrap"><div class="info-band reveal">
      <img src="${U("1559339352-11d035aa65de", 1200)}" alt="Restaurant kitchen preparing food" loading="lazy">
      <div class="txt"><span class="eyebrow" style="color:#7fd6df">Delivery information</span><h2>Delivered with care, wherever you are.</h2>
      <ul><li>${icon.pin}<span>Beaches, hotels, resorts, vacation rentals and homes in approved zones.</span></li>
      <li>${icon.clock}<span>Delivery estimates are shown only once the restaurant and driver confirm — never guessed.</span></li>
      <li>${icon.truck}<span>Deliveries planned with VapVap Eats, Aruba's local delivery partner.</span></li>
      <li>${icon.shield}<span>Prices are checked against the restaurant's live menu before your order is created.</span></li></ul></div>
    </div></div></section>

    <section class="block alt"><div class="wrap">
      <div class="section-head reveal"><div><span class="eyebrow">Testimonials</span><h2>What guests will say</h2></div><p>These are clearly-labelled sample testimonials. Verified reviews will appear here once real orders are delivered.</p></div>
      <div class="testimonials reveal">${[["Lunch arrived right at our palapa on Eagle Beach. We didn't have to leave the sand.", "Sample guest · Eagle Beach"], ["Being able to choose the restaurant and see the menu before ordering made it so easy.", "Sample guest · Palm Beach"], ["Perfect for a family beach day at Baby Beach with the kids.", "Sample guest · Baby Beach"]].map(([q, a]) => `<blockquote class="quote"><p>“${q}”</p><footer><span>${a}</span><span class="tag sample">Sample</span></footer></blockquote>`).join("")}</div>
    </div></section>

    <section class="block"><div class="wrap"><div class="section-head reveal" style="justify-content:center;text-align:center"><div><span class="eyebrow">FAQ</span><h2>Good to know</h2></div></div>
      <div class="faq reveal">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>

    <section class="block" style="padding-top:0"><div class="wrap"><div class="cta reveal"><h2>Hungry already?</h2><p>Choose your beach, pick a restaurant and we'll take care of the rest.</p><a class="btn coral" href="#/order">Order Food Now</a></div></div></section>`;
  },

  order() {
    const b = BEACHES.find(x => x.id === beachId);
    return `<div class="wrap page-title"><span class="eyebrow">Order food</span><h2>${b ? `Delivering to ${esc(b.name)}` : "Choose where you are"}</h2><p class="muted">${b ? "Now pick a restaurant below, or change your beach." : "Select your beach to see restaurants."} Coverage is verified before checkout.</p></div>
      <section class="block" style="padding-top:24px"><div class="wrap"><div class="beach-grid">${BEACHES.map(beachCard).join("")}</div>
      <div style="margin-top:48px" class="section-head"><div><h2>Restaurants</h2></div></div>${restoBrowser()}</div></section>`;
  },

  restaurants() { return `<div class="wrap page-title"><span class="eyebrow">Marketplace</span><h2>Restaurants</h2><p class="muted">Browse participating restaurants. All listings are sample data until partner agreements are signed.</p></div><section class="block" style="padding-top:24px"><div class="wrap">${restoBrowser()}</div></section>`; },

  restaurant(id) {
    const r = findR(id); if (!r) return notFound();
    const s = statusOf(r); const cats = [...new Set(r.menu.map(m => m.cat))];
    return `<div class="page-hero">${img(r.cover, r.name, 1800)}</div>
    <div class="wrap"><div class="resto-head"><div class="resto-logo">${r.initials}</div><div class="grow">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px"><span class="tag ${s.cls}">${s.label}</span><span class="tag sample">Sample listing</span></div>
      <h2 style="margin-bottom:6px">${esc(r.name)}</h2><p class="muted" style="margin:0">${esc(r.desc)}</p>
      <div class="facts"><div class="fact"><small>Cuisine</small><strong>${esc(r.cuisine.join(", "))}</strong></div>
      <div class="fact"><small>Hours (today)</small><strong>${r.hours[arubaHour()[0]].map(h => h + ":00").join(" – ")}</strong></div>
      <div class="fact"><small>Preparation</small><strong>${esc(r.prep)}</strong></div>
      <div class="fact"><small>Minimum order</small><strong>${r.min ? fmt(r.min, r.currency) : "None"}</strong></div>
      <div class="fact"><small>Delivery fee</small><strong>${r.fee == null ? "Set by zone" : fmt(r.fee, r.currency)}</strong></div>
      <div class="fact"><small>Currency</small><strong>${r.currency}</strong></div></div>
    </div></div>
    ${r.menu.length ? `<div class="menu-layout"><nav class="menu-cats" aria-label="Menu categories">${cats.map(c => `<a href="#/restaurant/${r.id}" data-jump="${esc(c)}">${esc(c)}</a>`).join("")}</nav><div>
      <div class="notice" style="margin-bottom:24px"><strong>Sample menu data.</strong> Items and prices are for preview and will be replaced by the restaurant's approved menu.</div>
      ${cats.map(c => `<section class="menu-section" id="cat-${esc(c).replace(/\W/g, "")}"><h3 style="font-size:22px">${esc(c)}</h3>${r.menu.filter(m => m.cat === c).map(it => `
        <button class="menu-item" data-open="${r.id}|${it.id}"><div><h3>${esc(it.name)}</h3><p>${esc(it.desc)}</p>${it.imageStatus ? '<span class="tag warn">Photo pending restaurant approval</span> ' : ""}<span class="price">${fmt(it.price, r.currency)}</span></div><div style="width:100%;height:100%;min-height:90px;border-radius:12px;overflow:hidden">${img(it.img, it.name, 300)}</div></button>`).join("")}</section>`).join("")}
    </div></div>` : `<div class="page"><div class="card narrow empty">${icon.bag}<h3>Menu coming soon</h3><p>This restaurant hasn't published its menu yet. Try <a href="#/restaurant/coastline-burger-co">Coastline Burger Co.</a> to preview ordering.</p></div></div>`}
    </div>`;
  },

  checkout() {
    if (!cart.lines.length) return `<div class="wrap page"><div class="card narrow empty">${icon.bag}<h3>Your cart is empty</h3><p>Add something delicious first.</p><a class="btn" href="#/restaurants">Browse restaurants</a></div></div>`;
    const r = findR(cart.restaurantId), d = delivery, t = d.type;
    const field = (id, label, req, ph = "", type = "text") => `<div><label for="${id}">${label}${req ? " *" : ""}</label><input id="${id}" name="${id}" type="${type}" ${req ? "required" : ""} placeholder="${ph}" value="${esc(d[id] || "")}" autocomplete="${id === "name" ? "name" : id === "phone" ? "tel" : id === "email" ? "email" : "off"}"></div>`;
    const typeFields = {
      beach: `<label for="beach">Beach *</label><select id="beach" name="beach" required><option value="">Select beach</option>${BEACHES.map(b => `<option value="${b.id}" ${(d.beach || beachId) === b.id ? "selected" : ""}>${esc(b.name)}</option>`).join("")}</select>
        <div class="grid-2">${field("landmark", "Hotel, resort, beach bar or landmark", true, "e.g. in front of the Hilton")}${field("umbrella", "Umbrella / chair / palapa number", false, "e.g. Palapa 14")}</div>
        <button type="button" class="btn ghost sm" id="shareLoc" style="margin-bottom:16px">${icon.pin} Share my location (optional)</button><div id="locOut" class="muted" style="font-size:13px;margin:-8px 0 12px"></div>`,
      hotel: `<div class="grid-2">${field("hotel", "Hotel or resort name", true)}${field("room", "Room / building number", true)}</div>${field("address", "Hotel address", false)}`,
      rental: `${field("address", "Vacation rental address", true)}<div class="grid-2">${field("unit", "Apartment / villa number", false)}${field("landmark", "Nearby landmark", false)}</div>`,
      home: `${field("address", "Home address", true)}${field("landmark", "Nearby landmark", false)}`,
      pickup: `<div class="notice info">You'll collect your order at ${esc(r.name)}. Pickup instructions are sent once the restaurant accepts.</div><br>`,
    };
    return `<div class="wrap"><div class="page-title"><span class="eyebrow">Checkout</span><h2>Almost there</h2></div>
    <form class="checkout" id="checkoutForm" novalidate><div>
      <div class="panel"><h3><span class="n">1</span>Your details</h3><div class="grid-2">${field("name", "Full name", true)}${field("phone", "Phone (WhatsApp preferred)", true, "+297 …", "tel")}</div>${field("email", "Email for receipt", false, "", "email")}<p class="muted" style="font-size:13px;margin:0">Guest checkout — no account needed.</p></div>
      <div class="panel"><h3><span class="n">2</span>Delivery location</h3>
        <div class="seg" role="radiogroup">${[["beach", "Beach", icon.sun], ["hotel", "Hotel / Resort", icon.pin], ["rental", "Vacation rental", icon.pin], ["home", "Home", icon.pin], ["pickup", "Pickup", icon.bag]].map(([k, l, ic]) => `<button type="button" role="radio" aria-checked="${t === k}" class="${t === k ? "active" : ""}" data-type="${k}">${ic}${l}</button>`).join("")}</div>
        ${typeFields[t]}<label for="notes">Delivery instructions (optional)</label><textarea id="notes" name="notes" placeholder="Anything that helps us find you">${esc(d.notes || "")}</textarea>
        <div id="coverage"></div></div>
      <div class="panel"><h3><span class="n">3</span>Payment</h3>
        <label class="pay-opt disabled"><input type="radio" name="pay" disabled><div><strong>Card — Visa, Mastercard, American Express</strong><small>Payment provider not yet connected. Awaiting merchant account confirmation.</small></div></label>
        <label class="pay-opt disabled"><input type="radio" name="pay" disabled><div><strong>Cash on delivery</strong><small>Not enabled yet. Will be marked unpaid until collected.</small></div></label></div>
    </div>
    <aside class="summary"><div class="panel"><h3>${esc(r.name)}</h3>
      ${cart.lines.map(l => { const it = r.menu.find(m => m.id === l.itemId); return `<div class="line"><span>${l.qty} × ${esc(it.name)}${l.extras.length ? `<br><small class="muted">${esc(l.extras.join(", "))}</small>` : ""}</span><span>${fmt(lineUnit(l) * l.qty, r.currency)}</span></div>`; }).join("")}
      <div class="line" style="border-top:1px solid var(--border);margin-top:8px;padding-top:12px"><span>Subtotal</span><span>${fmt(subtotal(), r.currency)}</span></div>
      <div class="line muted"><span>Delivery fee</span><span>Set after zone confirmation</span></div>
      <div class="line muted"><span>Service fee & taxes</span><span>Not configured</span></div>
      <div class="line total"><span>Estimated total</span><span>${fmt(subtotal(), r.currency)}+</span></div>
      ${r.min && subtotal() < r.min ? `<div class="notice bad" style="margin:12px 0">Minimum order is ${fmt(r.min, r.currency)}.</div>` : ""}
      <button class="btn coral block" type="submit" style="margin-top:16px">Review order</button>
      <p class="muted" style="font-size:12.5px;margin:12px 0 0">Final prices are recalculated on our server from the restaurant's live menu before an order is created.</p></div></aside>
    </form></div>`;
  },

  how() { return `<div class="wrap page-title"><span class="eyebrow">How it works</span><h2>From menu to sand in four steps</h2></div>${howSection(true)}<div class="wrap" style="padding-bottom:96px"><div class="faq">${FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div>`; },

  track() {
    return `<div class="wrap page"><div class="card narrow"><span class="eyebrow">Track my order</span><h2>Where's my food?</h2>
      <form id="trackForm" novalidate><label for="orderNo">Order number</label><input id="orderNo" placeholder="e.g. ABF-24816" required pattern="[A-Za-z]{3}-?[0-9A-Za-z]{4,}"><label for="trackPhone">Phone number used at checkout</label><input id="trackPhone" type="tel" required><button class="btn block">Track order</button></form>
      <div id="trackOut" style="margin-top:20px"></div>
      <h3 style="margin-top:32px">Order stages</h3><p class="muted" style="font-size:14px">This is how your order will progress. Live status appears above once you look up a real order.</p>
      <ol class="tracker">${["Paid", "Sent to Restaurant", "Accepted", "Preparing", "Ready for Pickup", "Dispatched", "Delivered"].map(s => `<li><span class="dot"></span><strong>${s}</strong></li>`).join("")}</ol></div></div>`;
  },

  contact() { return `<div class="wrap page"><div class="card narrow"><span class="eyebrow">Contact</span><h2>Talk to ArubaBeachFood.com</h2><p class="muted">Official customer support, restaurant partnership and email/WhatsApp contact details will be published here before launch.</p><div class="notice info"><strong>Restaurant owner?</strong> We're onboarding partners across Aruba. Partner applications open with the restaurant dashboard release.</div></div></div>`; },

  account() { return `<div class="wrap page"><div class="card narrow"><span class="eyebrow">Customer account</span><h2>Your account</h2><p class="muted">Accounts let you save addresses, view past orders and reorder in one tap. Sign-in is being set up and will be enabled with the live ordering system.</p><div class="notice">You never need an account to order — guest checkout is always available.</div><br><a class="btn" href="#/order">Order as guest</a></div></div>`; },

  legal(which) { return `<div class="wrap page"><div class="card narrow"><span class="eyebrow">Legal</span><h2>${which === "privacy" ? "Privacy Policy" : "Terms of Service"}</h2><p class="muted">The final ${which === "privacy" ? "privacy policy" : "terms of service, cancellation and refund policy"} will be published here before ArubaBeachFood.com accepts real orders.</p></div></div>`; },
};
function notFound() { return `<div class="wrap page"><div class="card narrow empty"><h3>Page not found</h3><a class="btn" href="#/">Back home</a></div></div>`; }

const FAQ = [
  ["Which beaches do you deliver to?", "We're preparing delivery to Palm, Eagle, Baby, Arashi, Malmok, Manchebo, Druif and more. Each zone is activated only after our delivery partner confirms coverage — checkout always verifies your location first."],
  ["Do I need an account to order?", "No. Guest checkout is always available. An account simply lets you save locations and reorder faster."],
  ["How do you find me on the beach?", "Tell us the nearest hotel, beach bar or landmark and your umbrella or palapa number. You can also share your phone's location."],
  ["Which payment methods are accepted?", "We plan to accept Visa, Mastercard and American Express, plus cash where enabled. Payments are not live in this preview."],
  ["Which currency are prices in?", "Each restaurant lists prices in its own currency (USD or AWG). Your order is charged in that same currency."],
  ["How long does delivery take?", "We only show a delivery time once the restaurant and driver confirm it — we never guess."],
];
function howSection(page) {
  return `<section class="block ${page ? "" : "alt"}" ${page ? 'style="padding-top:24px"' : ""}><div class="wrap">${page ? "" : `<div class="section-head reveal"><div><span class="eyebrow">How it works</span><h2>From menu to sand in four steps</h2></div></div>`}
  <div class="steps reveal">${[[icon.sun, "Choose your beach", "Pick your beach, hotel or rental. We check delivery coverage for your spot."], [icon.search, "Pick a restaurant", "Browse local restaurants and their menus, all in one place."], [icon.bag, "Order & pay securely", "Customise your meal. Prices are verified on our server."], [icon.truck, "Enjoy the delivery", "Follow your order live until it reaches your umbrella."]].map(([i, h, p]) => `<div class="step"><div class="num">${i}</div><h3>${h}</h3><p>${p}</p></div>`).join("")}</div></div></section>`;
}

let filter = { q: "", cat: "All", openOnly: false };
function restoBrowser() {
  return `<div class="filters"><div class="search">${icon.search}<input id="rq" type="search" placeholder="Search restaurants, cuisine or dishes" value="${esc(filter.q)}" aria-label="Search restaurants"></div>
    <label class="chip" style="display:flex;gap:8px;align-items:center;margin:0"><input type="checkbox" id="openOnly" ${filter.openOnly ? "checked" : ""} style="width:18px;min-height:18px;height:18px;margin:0;accent-color:var(--primary)"> Open now</label></div>
    <div class="chips" style="margin-bottom:28px">${["All", ...CATEGORIES].map(c => `<button class="chip ${filter.cat === c ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}</div>
    <div class="resto-grid" id="restoGrid">${restoList()}</div>`;
}
function restoList() {
  const q = filter.q.toLowerCase();
  const list = RESTAURANTS.filter(r => (filter.cat === "All" || r.cuisine.includes(filter.cat)) && (!filter.openOnly || statusOf(r).key === "open") &&
    (!q || [r.name, r.desc, ...r.cuisine, ...r.menu.map(m => m.name)].join(" ").toLowerCase().includes(q)));
  return list.length ? list.map(restoCard).join("") : `<div class="card empty" style="grid-column:1/-1">${icon.search}<h3>No restaurants match</h3><p>Try another cuisine or clear your search.</p></div>`;
}

/* ---------- Item modal & cart ---------- */
function openItem(rid, iid) {
  const r = findR(rid), it = r.menu.find(m => m.id === iid);
  openModal(`${it.img ? `<img class="modal-img" src="${U(it.img, 900)}" alt="${esc(it.name)}">` : ""}<div class="modal-body">
    <div class="row" style="display:flex;justify-content:space-between;gap:12px"><h2 style="font-size:26px">${esc(it.name)}</h2><button class="icon-btn" data-close aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <p class="muted">${esc(it.desc)}</p><span class="tag sample">Sample menu data</span>
    ${it.extras.length ? `<h4 style="margin-top:20px">Extras</h4>${it.extras.map(([n, p], i) => `<div class="opt"><label><input type="checkbox" name="ex" value="${esc(n)}">${esc(n)}</label><span class="muted">${p ? "+" + fmt(p, r.currency) : "Free"}</span></div>`).join("")}` : ""}
    <label for="itemNote" style="margin-top:20px">Special instructions</label><textarea id="itemNote" maxlength="200" placeholder="e.g. no onions"></textarea>
    <div style="display:flex;gap:12px;align-items:center"><div class="qty" style="margin:0"><button type="button" data-q="-1" aria-label="Decrease">−</button><span id="mq">1</span><button type="button" data-q="1" aria-label="Increase">+</button></div>
    <button class="btn block" id="addBtn">Add to order · <span id="mp">${fmt(it.price, r.currency)}</span></button></div></div>`);
  let q = 1; const card = $("#modalCard");
  const upd = () => { const ex = [...card.querySelectorAll("[name=ex]:checked")].reduce((s, e) => s + it.extras.find(x => x[0] === e.value)[1], 0); $("#mq").textContent = q; $("#mp").textContent = fmt((it.price + ex) * q, r.currency); };
  card.querySelectorAll("[data-q]").forEach(b => b.onclick = () => { q = Math.max(1, Math.min(20, q + +b.dataset.q)); upd(); });
  card.querySelectorAll("[name=ex]").forEach(b => b.onchange = upd);
  $("#addBtn").onclick = () => addToCart(r, it, q, [...card.querySelectorAll("[name=ex]:checked")].map(e => e.value), $("#itemNote").value.trim());
}
function addToCart(r, it, qty = 1, extras = [], note = "") {
  if (statusOf(r).key === "unavailable") return toast(`${r.name} is temporarily unavailable.`);
  if (cart.restaurantId && cart.restaurantId !== r.id && cart.lines.length) {
    const cur = findR(cart.restaurantId);
    return openModal(`<div class="modal-body"><h3>Start a new order?</h3><p class="muted">Your cart has items from <strong>${esc(cur.name)}</strong>. Each order comes from one restaurant so it can be delivered fresh. Clear your cart and start a new order from <strong>${esc(r.name)}</strong>?</p>
      <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn ghost" data-close>Keep current cart</button><button class="btn coral" id="clearGo">Clear & add</button></div></div>`), $("#clearGo").onclick = () => { cart = { restaurantId: null, lines: [] }; addToCart(r, it, qty, extras, note); };
  }
  cart.restaurantId = r.id;
  const key = it.id + "|" + extras.slice().sort().join(",") + "|" + note;
  const ex = cart.lines.find(l => l.key === key);
  ex ? ex.qty = Math.min(20, ex.qty + qty) : cart.lines.push({ key, itemId: it.id, qty, extras, note });
  saveCart(); closeModal(); toast(`${it.name} added to your order`);
}
function renderCartUI() {
  const n = count(), r = findR(cart.restaurantId);
  $("#cartCount").textContent = n;
  $("#cartBody").innerHTML = !n ? `<div class="empty">${icon.bag}<h3>Your cart is empty</h3><p>Pick a restaurant and add something delicious.</p><a class="btn" href="#/restaurants" data-closecart>Browse restaurants</a></div>` :
    `<p class="muted" style="margin:0 0 4px">From <strong>${esc(r.name)}</strong></p>${cart.lines.map((l, i) => { const it = r.menu.find(m => m.id === l.itemId); return `<div class="cart-line">${it.img ? `<img src="${U(it.img, 160)}" alt="">` : `<div class="skeleton" style="width:64px;height:64px"></div>`}<div><strong>${esc(it.name)}</strong>${l.extras.length ? `<small>${esc(l.extras.join(", "))}</small>` : ""}${l.note ? `<small>“${esc(l.note)}”</small>` : ""}<div class="qty"><button data-dec="${i}" aria-label="Decrease">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="Increase">+</button></div><br><button class="link-btn" data-rm="${i}">Remove</button></div><strong>${fmt(lineUnit(l) * l.qty, r.currency)}</strong></div>`; }).join("")}
    <div style="margin-top:auto;padding-top:20px"><div class="line"><span>Subtotal</span><strong>${fmt(subtotal(), r.currency)}</strong></div><div class="line muted" style="font-size:13.5px"><span>Delivery fee</span><span>Calculated at checkout</span></div><a class="btn coral block" href="#/checkout" data-closecart style="margin-top:14px">Go to checkout</a></div>`;
  const mc = $("#mobileCart");
  mc.classList.toggle("show", n > 0 && !location.hash.startsWith("#/checkout"));
  document.body.classList.toggle("has-cart", n > 0);
  mc.innerHTML = n ? `<button class="btn coral" id="mcBtn"><span>View order · ${n} item${n > 1 ? "s" : ""}</span><span>${fmt(subtotal(), r.currency)}</span></button>` : "";
}
function openCart() { $("#drawer").classList.add("open"); $("#drawer").setAttribute("aria-hidden", "false"); $("#backdrop").classList.add("open"); }
function closeCart() { $("#drawer").classList.remove("open"); $("#drawer").setAttribute("aria-hidden", "true"); $("#backdrop").classList.remove("open"); }

/* ---------- Checkout validation ---------- */
function collectDelivery() { const f = $("#checkoutForm"); if (!f) return; [...f.querySelectorAll("input[id], select[id], textarea[id]")].forEach(el => delivery[el.id] = el.value); store.set("delivery", delivery); }
function validateCheckout() {
  const f = $("#checkoutForm"); let ok = true;
  f.querySelectorAll(".field-error").forEach(e => e.remove());
  f.querySelectorAll("[required]").forEach(el => {
    let msg = "";
    if (!el.value.trim()) msg = "This field is required.";
    else if (el.id === "phone" && !/^\+?[0-9\s()-]{7,20}$/.test(el.value)) msg = "Enter a valid phone number, e.g. +297 560 1234.";
    el.classList.toggle("invalid", !!msg);
    if (msg) { ok = false; el.insertAdjacentHTML("afterend", `<div class="field-error">${msg}</div>`); }
  });
  const em = $("#email"); if (em.value && !/^\S+@\S+\.\S+$/.test(em.value)) { ok = false; em.classList.add("invalid"); em.insertAdjacentHTML("afterend", '<div class="field-error">Enter a valid email address.</div>'); }
  if (!ok) f.querySelector(".invalid")?.focus();
  return ok;
}
function reviewOrder() {
  const r = findR(cart.restaurantId), d = delivery;
  const where = { beach: () => `${BEACHES.find(b => b.id === d.beach)?.name} — ${d.landmark}${d.umbrella ? ", " + d.umbrella : ""}`, hotel: () => `${d.hotel}, room ${d.room}`, rental: () => `${d.address}${d.unit ? ", " + d.unit : ""}`, home: () => d.address, pickup: () => `Pickup at ${r.name}` }[d.type]();
  openModal(`<div class="modal-body"><span class="eyebrow">Order review</span><h2 style="font-size:26px">Confirm your details</h2>
    <div class="line"><span class="muted">Name</span><span>${esc(d.name)}</span></div><div class="line"><span class="muted">Phone</span><span>${esc(d.phone)}</span></div>
    <div class="line"><span class="muted">Restaurant</span><span>${esc(r.name)}</span></div><div class="line"><span class="muted">Deliver to</span><span style="text-align:right">${esc(where)}</span></div>
    <div class="line"><span class="muted">Items</span><span>${count()}</span></div><div class="line total"><span>Subtotal</span><span>${fmt(subtotal(), r.currency)}</span></div>
    <div class="notice" style="margin:16px 0"><strong>Ordering isn't live yet.</strong> Delivery coverage for this location hasn't been confirmed and no payment provider is connected, so no order was created and nothing was charged. Your cart and details are saved on this device.</div>
    <button class="btn block" data-close>Back to checkout</button></div>`);
}

/* ---------- Assistant (data-grounded fallback; AI backend not configured) ---------- */
function openAssistant() {
  openModal(`<div class="modal-body"><div style="display:flex;justify-content:space-between;align-items:center"><h3 style="margin:0">Food assistant</h3><button class="icon-btn" data-close aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <p class="muted" style="font-size:13px">AI service not connected yet — answers come directly from our restaurant and menu listings.</p>
    <div class="chat-log" id="chatLog"><div class="msg bot">Hi! Ask me about restaurants, dishes, beaches or delivery. Try “burgers”, “what's open” or “Eagle Beach”.</div></div>
    <div class="suggest">${["What's open now?", "Burgers", "Something healthy", "Do you deliver to Palm Beach?"].map(s => `<button class="chip" data-ask="${s}">${s}</button>`).join("")}</div>
    <form id="chatForm" style="display:flex;gap:8px"><input id="chatIn" placeholder="Ask a question…" style="margin:0" maxlength="200" aria-label="Message"><button class="btn">Send</button></form></div>`);
}
function answer(q) {
  const s = q.toLowerCase();
  const beach = BEACHES.find(b => s.includes(b.name.toLowerCase().split(" ")[0].toLowerCase()));
  if (beach) return `${beach.name} is on our list, but delivery coverage there is still being confirmed with our delivery partner. Checkout will verify it before any order is placed.`;
  if (/open|now/.test(s)) { const o = RESTAURANTS.filter(r => statusOf(r).key === "open"); return o.length ? `Open right now (Aruba time): ${o.map(r => r.name).join(", ")}.` : "No listed restaurants are open right now."; }
  if (/pay|card|cash/.test(s)) return "Card (Visa, Mastercard, Amex) and cash are planned, but no payment method is live in this preview.";
  if (/time|long|eta/.test(s)) return "We only show delivery times once the restaurant and driver confirm them — no guesses.";
  if (/order|track/.test(s)) return "You can look up an order on the Track My Order page using your order number and phone.";
  const words = s.replace(/healthy/, "healthy salad").split(/\W+/).filter(w => w.length > 2);
  const hits = []; RESTAURANTS.forEach(r => r.menu.forEach(m => { const hay = (m.name + " " + m.cat + " " + m.desc + " " + r.cuisine.join(" ")).toLowerCase(); if (words.some(w => hay.includes(w.replace(/s$/, "")))) hits.push(`${m.name} (${fmt(m.price, r.currency)}) at ${r.name}`); }));
  if (hits.length) return "From our sample menus: " + hits.slice(0, 5).join("; ") + ".";
  const rs = RESTAURANTS.filter(r => words.some(w => (r.name + r.cuisine.join(" ")).toLowerCase().includes(w.replace(/s$/, ""))));
  return rs.length ? `Try ${rs.map(r => r.name).join(", ")}.` : "I couldn't find that in our listings. Try a cuisine like burgers, seafood or pizza.";
}
function chat(q) { const log = $("#chatLog"); if (!log || !q.trim()) return; log.insertAdjacentHTML("beforeend", `<div class="msg me">${esc(q)}</div><div class="msg bot">${esc(answer(q))}</div>`); log.scrollTop = log.scrollHeight; }

/* ---------- Router ---------- */
function route() {
  const [, name = "", arg] = (location.hash || "#/").split("/");
  const v = name === "" ? views.home() : views[name] ? views[name](arg) : notFound();
  $("#app").innerHTML = v;
  $$(".main-nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === (name || "home") || (name === "restaurant" && a.dataset.nav === "restaurants")));
  $("#mainNav").classList.remove("open");
  document.title = ({ "": "ArubaBeachFood.com — Food Delivered to Your Beach in Aruba", restaurant: (findR(arg)?.name || "Restaurant") + " — ArubaBeachFood.com" })[name] ?? `${name.charAt(0).toUpperCase() + name.slice(1)} — ArubaBeachFood.com`;
  window.scrollTo(0, 0); closeCart(); renderCartUI(); reveal();
  if (name === "checkout" && $("#checkoutForm")) checkCoverage();
}
function checkCoverage() {
  const el = $("#coverage"); if (!el) return;
  const t = delivery.type, b = BEACHES.find(x => x.id === ($("#beach")?.value));
  el.innerHTML = t === "pickup" ? "" : `<div class="notice" style="margin-top:4px">${icon.pin} ${t === "beach" && b ? `Delivery to <strong>${esc(b.name)}</strong> is pending confirmation.` : "Delivery coverage for this area is pending confirmation."} We'll never accept an order for a location we can't serve.</div>`;
}
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .08 }) : null;
function reveal() { $$(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("in")); }

/* ---------- Events ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("button, a"); if (!t) return;
  if (t.matches("[data-close]")) return closeModal();
  if (t.dataset.beach) { beachId = t.dataset.beach; store.set("beach", beachId); delivery.beach = beachId; store.set("delivery", delivery); $$(".beach-card").forEach(c => { c.classList.toggle("selected", c.dataset.beach === beachId); c.setAttribute("aria-pressed", c.dataset.beach === beachId); }); return toast(`${BEACHES.find(b => b.id === beachId).name} selected — coverage is checked at checkout`); }
  if (t.dataset.cat) { filter.cat = t.dataset.cat; $$("[data-cat]").forEach(c => c.classList.toggle("active", c === t)); $("#restoGrid").innerHTML = restoList(); return; }
  if (t.dataset.item) { const [rid, iid] = t.dataset.item.split("|"); return openItem(rid, iid); }
  if (t.dataset.open) { const [rid, iid] = t.dataset.open.split("|"); return openItem(rid, iid); }
  if (t.dataset.jump) { e.preventDefault(); return document.getElementById("cat-" + t.dataset.jump.replace(/\W/g, ""))?.scrollIntoView({ behavior: "smooth" }); }
  if (t.dataset.inc || t.dataset.dec || t.dataset.rm) {
    const i = +(t.dataset.inc ?? t.dataset.dec ?? t.dataset.rm), l = cart.lines[i];
    if (t.dataset.inc) l.qty = Math.min(20, l.qty + 1); else if (t.dataset.dec) l.qty--;
    if (t.dataset.rm || l.qty < 1) cart.lines.splice(i, 1);
    if (!cart.lines.length) cart.restaurantId = null;
    saveCart(); if (location.hash.startsWith("#/checkout")) route(); return;
  }
  if (t.dataset.type) { collectDelivery(); delivery.type = t.dataset.type; store.set("delivery", delivery); return route(); }
  if (t.dataset.ask) return chat(t.dataset.ask);
  if (t.matches("[data-closecart]")) return closeCart();
  if (t.id === "mcBtn") return openCart();
  if (t.id === "heroGo") { const v = $("#heroBeach").value; if (v) { beachId = v; store.set("beach", v); } location.hash = "#/order"; return; }
  if (t.id === "shareLoc") {
    if (!navigator.geolocation) return ($("#locOut").textContent = "Location sharing isn't supported on this device.");
    $("#locOut").textContent = "Requesting location…";
    navigator.geolocation.getCurrentPosition(p => { delivery.geo = [p.coords.latitude.toFixed(5), p.coords.longitude.toFixed(5)]; store.set("delivery", delivery); $("#locOut").textContent = `Location attached (±${Math.round(p.coords.accuracy)} m).`; }, () => ($("#locOut").textContent = "Location permission denied — that's fine, your landmark is enough."), { timeout: 10000 });
  }
});
document.addEventListener("input", e => {
  if (e.target.id === "rq") { filter.q = e.target.value; $("#restoGrid").innerHTML = restoList(); }
  if (e.target.closest("#checkoutForm")) { collectDelivery(); e.target.classList.remove("invalid"); }
});
document.addEventListener("change", e => {
  if (e.target.id === "openOnly") { filter.openOnly = e.target.checked; $("#restoGrid").innerHTML = restoList(); }
  if (e.target.id === "beach") { collectDelivery(); checkCoverage(); }
});
document.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.id === "checkoutForm") { collectDelivery(); const r = findR(cart.restaurantId); if (r.min && subtotal() < r.min) return toast(`Minimum order is ${fmt(r.min, r.currency)}`); if (validateCheckout()) reviewOrder(); }
  if (e.target.id === "trackForm") {
    const no = $("#orderNo"), ph = $("#trackPhone");
    if (!no.value.trim() || !ph.value.trim()) { [no, ph].forEach(x => x.classList.toggle("invalid", !x.value.trim())); return; }
    $("#trackOut").innerHTML = `<div class="notice">We couldn't find order <strong>${esc(no.value.trim())}</strong>. Live ordering hasn't launched yet, so no orders exist in the system.</div>`;
  }
  if (e.target.id === "chatForm") { chat($("#chatIn").value); $("#chatIn").value = ""; }
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); closeCart(); } });
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
$("#cartOpen").onclick = openCart; $("#cartClose").onclick = closeCart; $("#backdrop").onclick = closeCart;
$("#assistantOpen").onclick = openAssistant;
$("#menuToggle").onclick = () => { const o = $("#mainNav").classList.toggle("open"); $("#menuToggle").setAttribute("aria-expanded", o); };
$("#year").textContent = new Date().getFullYear();
window.addEventListener("hashchange", route);
// Drop cart lines that reference items no longer on the menu.
if (cart.restaurantId && !findR(cart.restaurantId)) cart = { restaurantId: null, lines: [] };
cart.lines = cart.lines.filter(l => findR(cart.restaurantId)?.menu.some(m => m.id === l.itemId));
route();
})();
