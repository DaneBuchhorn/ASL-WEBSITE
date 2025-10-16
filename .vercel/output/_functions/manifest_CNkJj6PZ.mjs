import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_B9RIwROo.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_pKyGBLkM.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/","cacheDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/node_modules/.astro/","outDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/dist/","srcDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/src/","publicDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/public/","buildClientDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/dist/client/","buildServerDir":"file:///Users/dane/Documents/ASL-Digital/Web%20Files/asl-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"thank-you/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thank-you","isIndex":false,"type":"page","pattern":"^\\/thank-you\\/?$","segments":[[{"content":"thank-you","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thank-you.astro","pathname":"/thank-you","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/submit-lead","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-lead\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-lead","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-lead.ts","pathname":"/api/submit-lead","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://allseasonsliving.com.au","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/submit-lead@_@ts":"pages/api/submit-lead.astro.mjs","\u0000@astro-page:src/pages/thank-you@_@astro":"pages/thank-you.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CNkJj6PZ.mjs","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B9Z6t3vi.mjs","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.e4li_5A7.js","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro?astro&type=script&index=0&lang.ts":"_astro/thank-you.astro_astro_type_script_index_0_lang.DJx3YQpe.js","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BRrES6WQ.js","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Footer.astro?astro&type=script&index=0&lang.ts":"_astro/Footer.astro_astro_type_script_index_0_lang.F-sNJOgz.js","/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/OfferBanner.astro?astro&type=script&index=0&lang.ts":"_astro/OfferBanner.astro_astro_type_script_index_0_lang.CL5TNY2x.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro?astro&type=script&index=0&lang.ts","\"undefined\"!=typeof gtag&&gtag(\"event\",\"page_view\",{page_title:\"Thank You\",page_location:window.location.href,page_path:\"/thank-you\"});"],["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"quoteBtn\");e&&e.addEventListener(\"click\",()=>{const e=document.getElementById(\"mainQuoteForm\");e&&e.scrollIntoView({behavior:\"smooth\"})});const t=document.querySelector(\".mobile-menu-toggle\"),o=document.querySelector(\".nav\"),n=document.body;t&&o&&t.addEventListener(\"click\",()=>{const e=o.classList.toggle(\"active\");t.classList.toggle(\"active\"),window.innerWidth<1025&&(n.style.overflow=e?\"hidden\":\"\")});document.querySelectorAll(\".dropdown-toggle\").forEach(e=>{e.addEventListener(\"click\",t=>{if(window.innerWidth<1025){t.preventDefault();e.closest(\".has-dropdown\").classList.toggle(\"active\")}})}),document.addEventListener(\"click\",e=>{window.innerWidth<1025&&o&&t&&!e.target.closest(\".header\")&&o.classList.contains(\"active\")&&(o.classList.remove(\"active\"),t.classList.remove(\"active\"),n.style.overflow=\"\")}),window.addEventListener(\"resize\",()=>{window.innerWidth>=1025&&o&&(o.classList.remove(\"active\"),t&&t.classList.remove(\"active\"),n.style.overflow=\"\")});const i=window.location.pathname;document.querySelectorAll(\".nav-menu > li > a:not(.dropdown-toggle)\").forEach(e=>{const t=e.getAttribute(\"href\");(t===i||\"/\"===i&&\"/\"===t)&&e.classList.add(\"active\")});"],["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/Footer.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".newsletter-form\");e&&e.addEventListener(\"submit\",async t=>{t.preventDefault();e.querySelector(\"input\").value;alert(\"Thank you for subscribing!\"),e.reset()});"],["/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/components/OfferBanner.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"closeBanner\"),n=document.getElementById(\"offerBanner\");e&&n&&e.addEventListener(\"click\",()=>{n.style.display=\"none\",sessionStorage.setItem(\"offerBannerClosed\",\"true\")}),\"true\"===sessionStorage.getItem(\"offerBannerClosed\")&&n&&(n.style.display=\"none\");"]],"assets":["/_astro/index.XjL2S7fR.css","/_astro/index.L8YVqIhp.css","/Screenshot 2025-10-16 at 8.24.38 pm.png","/favicon.png","/favicon.svg","/robots.txt","/_astro/index.astro_astro_type_script_index_0_lang.e4li_5A7.js","/assets/icons/Artificial_Lawn_inline_image.svg","/assets/icons/australia (4).png","/assets/icons/australia.svg","/assets/icons/car.png","/assets/icons/cloud-rain-svgrepo-com.svg","/assets/icons/diamond-svgrepo-com.svg","/assets/icons/ear-sound (1).svg","/assets/icons/ear-sound.svg","/assets/icons/eye-crossed.svg","/assets/icons/golf-ball_1120613.png","/assets/icons/grass (1).png","/assets/icons/grass.png","/assets/icons/grass.svg","/assets/icons/grass_17161087.png","/assets/icons/grass_17371528.png","/assets/icons/grass_17371528.svg","/assets/icons/guarantee-certificate.png","/assets/icons/guarantee-certificate.svg","/assets/icons/home-temperature-out.svg","/assets/icons/icons8-dog-64.png","/assets/icons/kangaroo-illustration-3-svgrepo-com.svg","/assets/icons/key (1).svg","/assets/icons/key.svg","/assets/icons/light-switch.svg","/assets/icons/mail.png","/assets/icons/measure.png","/assets/icons/measure.svg","/assets/icons/outdoor-blinds.svg","/assets/icons/padlock-check (1).png","/assets/icons/padlock-check.png","/assets/icons/padlock-check.svg","/assets/icons/paw-svgrepo-com.svg","/assets/icons/phone-call.png","/assets/icons/piggy-bank.svg","/assets/icons/plantation-shutters.svg","/assets/icons/remote-control.svg","/assets/icons/roller-shutters.svg","/assets/icons/sketch (1).png","/assets/icons/slider-vertical-minimalistic-svgrepo-com.svg","/assets/icons/smart-home-svgrepo-com.svg","/assets/icons/smart-home.svg","/assets/icons/sparkles-outline-svgrepo-com.svg","/assets/icons/stack-svgrepo-com.svg","/assets/icons/sun-2-svgrepo-com.svg","/assets/icons/tape (1).svg","/assets/icons/tape.svg","/assets/icons/temperature-frigid.svg","/assets/icons/walking-the-dog.png","/assets/icons/water.png","/assets/icons/wildfire.svg","/assets/icons/wind-svgrepo-com.svg","/assets/icons/www.png","/assets/icons/yoga.png","/assets/images/outdoor-blinds/ASL - Outdoor Blinds.jpeg","/assets/images/outdoor-blinds/Outdoor Motorised Blinds.png","/assets/images/outdoor-blinds/Outdoor Motorised Blinds.webp","/assets/images/artificial-lawn/Artificial-lawn-asl-media.png","/assets/images/artificial-lawn/Artificial-lawn-asl-media.webp","/assets/images/artificial-lawn/asl-artificial-lawn-close-up-2.png","/assets/images/artificial-lawn/asl-artificial-lawn-family.png","/assets/images/artificial-lawn/asl-artificial-lawn-hero.png","/assets/images/artificial-lawn/asl-artificial-lawn-picnic2.png","/assets/images/artificial-lawn/asl-artificial-lawn-puppy.png","/assets/images/general/All Seasons Living SVG Logo.svg","/assets/images/general/Logo.png","/assets/images/general/Modern Home All Seasons Living.jpg","/assets/images/general/Modern Home All Seasons Living.webp","/assets/images/roller-shutters/ASL Shutters.png","/assets/images/roller-shutters/All Seasons Living -Roller Shutters.png","/assets/images/roller-shutters/All Seasons Living -Roller Shutters.webp","/assets/images/roller-shutters/Horizontal Roller Shutters - ASL.png","/assets/images/roller-shutters/RS-Image1.png","/assets/images/roller-shutters/Roller Shutter Render.png","/thank-you/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"qj6w5MeJI8O6WetZDEBKM1ybb0xsIlbAcDf+I7ama4k="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
