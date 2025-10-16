import { e as createComponent, f as createAstro, r as renderTemplate, u as unescapeHTML, h as addAttribute, n as renderSlot, o as renderHead, m as maybeRenderHead, k as renderComponent, l as renderScript } from './astro/server_B9RIwROo.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';

const offerBanner = {"text":"Limited Offer! Spring Special Now On – GET UP TO 30% OFF – CLICK HERE NOW! 🎁","link":"/contact","backgroundColor":"#ffd166","textColor":"#000000"};
const contact = {"phone":"0448 243 979","email":"info@allseasonsliving.com.au"};
const config = {
  offerBanner,
  contact};

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro();
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description,
    canonical = Astro2.url.href,
    ogImage = "/assets/images/general/Modern Home All Seasons Living.jpg",
    ogType = "website",
    noindex = false
  } = Astro2.props;
  const siteName = "All Seasons Living";
  const fullTitle = `${title} | ${siteName}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://allseasonsliving.com.au",
    name: "All Seasons Living",
    image: "https://allseasonsliving.com.au/assets/images/general/All Seasons Living SVG Logo.svg",
    description: "Canberra's trusted outdoor living specialists. Premium artificial lawn, roller shutters, outdoor blinds, and plantation shutters.",
    url: "https://allseasonsliving.com.au",
    telephone: config.contact.phone.replace(/\s/g, ""),
    email: config.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Canberra",
      addressRegion: "ACT",
      addressCountry: "AU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -35.2809,
      longitude: 149.13
    },
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: "Canberra"
      },
      {
        "@type": "State",
        name: "Australian Capital Territory"
      }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00"
      }
    ],
    sameAs: [
      // Add your social media URLs here when available
      // 'https://www.facebook.com/allseasonslivingau,
      // 'https://www.instagram.com/allseasonslivingau'
    ]
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "All Seasons Living",
    legalName: "All Seasons Living Australia Pty Ltd",
    url: "https://allseasonsliving.com.au",
    logo: "https://allseasonsliving.com.au/assets/images/general/All Seasons Living SVG Logo.svg",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.contact.phone.replace(/\s/g, ""),
      contactType: "Customer Service",
      email: config.contact.email,
      areaServed: "AU",
      availableLanguage: "English"
    }
  };
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<!-- Essential Meta Tags --><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0"><meta name="description"', ">", '<!-- Canonical URL --><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:site_name"', '><meta property="og:locale" content="en_AU"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Additional SEO --><meta name="theme-color" content="#54653d"><meta name="format-detection" content="telephone=yes"><!-- Geo Tags for Local SEO --><meta name="geo.region" content="AU-ACT"><meta name="geo.placename" content="Canberra"><meta name="geo.position" content="-35.2809;149.1300"><meta name="ICBM" content="-35.2809, 149.1300"><!-- Structured Data --><script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script><!-- Title --><title>", "</title>"])), addAttribute(description, "content"), noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, addAttribute(canonical, "href"), addAttribute(ogType, "content"), addAttribute(canonical, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site).href, "content"), addAttribute(siteName, "content"), addAttribute(canonical, "content"), addAttribute(fullTitle, "content"), addAttribute(description, "content"), addAttribute(new URL(ogImage, Astro2.site).href, "content"), unescapeHTML(JSON.stringify(localBusinessSchema)), unescapeHTML(JSON.stringify(organizationSchema)), fullTitle);
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/SEO.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Transform your home with All Seasons Living. Expert artificial lawn and roller shutter installations.",
    canonical,
    ogImage,
    noindex = false
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head>', `<!-- Favicon --><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/favicon.png"><!-- Performance: DNS prefetch --><link rel="dns-prefetch" href="https://fonts.googleapis.com"><link rel="dns-prefetch" href="https://fonts.gstatic.com"><!-- Google Fonts - DM Sans - Optimized loading with font-display --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">`, `<noscript><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"></noscript><!-- Performance hints --><link rel="preload" as="image" href="/assets/images/general/Modern Home All Seasons Living.jpg" fetchpriority="high"><!-- Google Analytics --><script async src="https://www.googletagmanager.com/gtag/js?id=G-CW5WNR8Z5Y"><\/script><script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-CW5WNR8Z5Y');
    <\/script>`, "</head> <body> ", " </body></html>"])), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "canonical": canonical, "ogImage": ogImage, "noindex": noindex }), maybeRenderHead(), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/layouts/Layout.astro", void 0);

const $$OfferBanner = createComponent(($$result, $$props, $$slots) => {
  const { offerBanner } = config;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<div class="offer-banner" id="offerBanner"${addAttribute(`background-color: ${offerBanner.backgroundColor}; color: ${offerBanner.textColor};`, "style")} data-astro-cid-fya3qomf><div class="container" data-astro-cid-fya3qomf><div class="banner-content" data-astro-cid-fya3qomf><a${addAttribute(offerBanner.link, "href")} class="offer-content" data-astro-cid-fya3qomf><span class="offer-text" data-astro-cid-fya3qomf>${offerBanner.text}</span></a><button class="close-banner" id="closeBanner" aria-label="Close banner" data-astro-cid-fya3qomf>✕</button></div></div></div>`}${renderScript($$result, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/OfferBanner.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/OfferBanner.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="header-top" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <div class="header-content" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2> <img src="/assets/images/general/All Seasons Living SVG Logo.svg" alt="All Seasons Living" data-astro-cid-3ef6ksr2> </a> <div class="header-actions" data-astro-cid-3ef6ksr2> <button class="btn btn-primary" id="quoteBtn" data-astro-cid-3ef6ksr2>
FREE MEASURE & QUOTE
</button> <a${addAttribute(`tel:${config.contact.phone.replace(/\s/g, "")}`, "href")} class="btn btn-secondary" data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" data-astro-cid-3ef6ksr2></path> </svg> ${config.contact.phone} </a> </div> <button class="mobile-menu-toggle" aria-label="Toggle menu" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> </button> </div> </div> </div> <nav class="nav" data-astro-cid-3ef6ksr2> <div class="container" data-astro-cid-3ef6ksr2> <ul class="nav-menu" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2>Home</a></li> <li class="has-dropdown" data-astro-cid-3ef6ksr2> <a href="#" class="dropdown-toggle" data-astro-cid-3ef6ksr2>
Our Products
<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" data-astro-cid-3ef6ksr2> <path d="M6 9L1 4h10L6 9z" data-astro-cid-3ef6ksr2></path> </svg> </a> <ul class="dropdown-menu" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/artificial-lawn" data-astro-cid-3ef6ksr2>Artificial Lawn</a></li> <li data-astro-cid-3ef6ksr2><a href="/roller-shutters" data-astro-cid-3ef6ksr2>Roller Shutters</a></li> <li data-astro-cid-3ef6ksr2><a href="#" class="coming-soon" data-astro-cid-3ef6ksr2>Outdoor Blinds <span data-astro-cid-3ef6ksr2>(Coming Soon)</span></a></li> <li data-astro-cid-3ef6ksr2><a href="#" class="coming-soon" data-astro-cid-3ef6ksr2>Plantation Shutters <span data-astro-cid-3ef6ksr2>(Coming Soon)</span></a></li> </ul> </li> <li data-astro-cid-3ef6ksr2><a href="/about" data-astro-cid-3ef6ksr2>About</a></li> <li data-astro-cid-3ef6ksr2><a href="/contact" data-astro-cid-3ef6ksr2>Contact</a></li> </ul> </div> </nav> ${renderComponent($$result, "OfferBanner", $$OfferBanner, { "data-astro-cid-3ef6ksr2": true })} </header>  ${renderScript($$result, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="footer-main" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-grid" data-astro-cid-sz7xmlte> <!-- Company Info --> <div class="footer-col" data-astro-cid-sz7xmlte> <img src="/assets/images/general/All Seasons Living SVG Logo.svg" alt="All Seasons Living" class="footer-logo" data-astro-cid-sz7xmlte> <p class="footer-contact" data-astro-cid-sz7xmlte> <a${addAttribute(`mailto:${config.contact.email}`, "href")} data-astro-cid-sz7xmlte>${config.contact.email}</a> </p> <p class="footer-contact" data-astro-cid-sz7xmlte> <a${addAttribute(`tel:${config.contact.phone.replace(/\s/g, "")}`, "href")} data-astro-cid-sz7xmlte>${config.contact.phone}</a> </p> <div class="newsletter" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Offers & Updates</h4> <p data-astro-cid-sz7xmlte>Sign up for Latest Offers</p> <form class="newsletter-form" data-astro-cid-sz7xmlte> <input type="email" placeholder="Email Address" required data-astro-cid-sz7xmlte> <button type="submit" class="btn btn-primary" data-astro-cid-sz7xmlte>→</button> </form> </div> </div> <!-- Site Map --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Site Map</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li> <li data-astro-cid-sz7xmlte><a href="/about" data-astro-cid-sz7xmlte>About</a></li> <li data-astro-cid-sz7xmlte><a href="/contact" data-astro-cid-sz7xmlte>Contact Us</a></li> <li data-astro-cid-sz7xmlte><a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a></li> <li data-astro-cid-sz7xmlte><a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms & Conditions</a></li> </ul> </div> <!-- Products --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Products</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/artificial-lawn" data-astro-cid-sz7xmlte>Artificial Lawn</a></li> <li data-astro-cid-sz7xmlte><a href="/roller-shutters" data-astro-cid-sz7xmlte>Roller Shutters</a></li> <li data-astro-cid-sz7xmlte><span class="coming-soon" data-astro-cid-sz7xmlte>Outdoor Blinds (Coming soon)</span></li> <li data-astro-cid-sz7xmlte><span class="coming-soon" data-astro-cid-sz7xmlte>Plantation Shutters (Coming soon)</span></li> </ul> </div> <!-- Support --> <div class="footer-col" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Support</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/contact" data-astro-cid-sz7xmlte>After Sales</a></li> <li data-astro-cid-sz7xmlte><a href="/contact" data-astro-cid-sz7xmlte>Product Enquiries</a></li> <li data-astro-cid-sz7xmlte><a href="/contact" data-astro-cid-sz7xmlte>FAQ</a></li> </ul> </div> </div> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; ${currentYear} All Seasons Living Australia Pty Ltd. | Trading as All Seasons Living Australia | ABN: 61 686 382 263 | ACN: 686 382 263 | <a href="/privacy-policy" data-astro-cid-sz7xmlte>Privacy Policy</a> | <a href="/terms-and-conditions" data-astro-cid-sz7xmlte>Terms & Conditions</a></p> </div> </div> </footer>  ${renderScript($$result, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Footer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Footer.astro", void 0);

export { $$Layout as $, $$Header as a, $$Footer as b };
