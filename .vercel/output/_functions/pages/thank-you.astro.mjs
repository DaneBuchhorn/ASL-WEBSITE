import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B9RIwROo.mjs';
import 'kleur/colors';
import { $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_C3XmZRoY.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$ThankYou = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank You - All Seasons Living", "description": "Thank you for your enquiry. We'll be in touch soon to discuss your project.", "data-astro-cid-reykoxrt": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-reykoxrt": true })} ${maybeRenderHead()}<main class="thank-you-page" data-astro-cid-reykoxrt> <div class="container" data-astro-cid-reykoxrt> <div class="thank-you-content" data-astro-cid-reykoxrt> <div class="success-icon" data-astro-cid-reykoxrt> <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-reykoxrt> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-reykoxrt></path> <polyline points="22 4 12 14.01 9 11.01" data-astro-cid-reykoxrt></polyline> </svg> </div> <h1 data-astro-cid-reykoxrt>Thank You!</h1> <p class="lead-text" data-astro-cid-reykoxrt>Your enquiry has been successfully submitted.</p> <div class="info-box" data-astro-cid-reykoxrt> <p data-astro-cid-reykoxrt>We've received your request and one of our team members will be in touch with you shortly to discuss your project.</p> <p class="response-time" data-astro-cid-reykoxrt>Our typical response time is within 1-2 business hours.</p> </div> <div class="next-steps" data-astro-cid-reykoxrt> <h2 data-astro-cid-reykoxrt>What Happens Next?</h2> <div class="steps-grid" data-astro-cid-reykoxrt> <div class="step" data-astro-cid-reykoxrt> <div class="step-number" data-astro-cid-reykoxrt>1</div> <h3 data-astro-cid-reykoxrt>Review</h3> <p data-astro-cid-reykoxrt>We'll review your enquiry and product requirements</p> </div> <div class="step" data-astro-cid-reykoxrt> <div class="step-number" data-astro-cid-reykoxrt>2</div> <h3 data-astro-cid-reykoxrt>Contact</h3> <p data-astro-cid-reykoxrt>A specialist will call you at your preferred time</p> </div> <div class="step" data-astro-cid-reykoxrt> <div class="step-number" data-astro-cid-reykoxrt>3</div> <h3 data-astro-cid-reykoxrt>Measure & Quote</h3> <p data-astro-cid-reykoxrt>We'll arrange a free measure and provide a detailed quote</p> </div> </div> </div> <div class="cta-buttons" data-astro-cid-reykoxrt> <a href="/" class="btn-primary" data-astro-cid-reykoxrt>Return to Home</a> <a href="tel:0448243979" class="btn-secondary" data-astro-cid-reykoxrt> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-reykoxrt> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-reykoxrt></path> </svg>
Call Us Now
</a> </div> <div class="contact-info" data-astro-cid-reykoxrt> <p data-astro-cid-reykoxrt><strong data-astro-cid-reykoxrt>Need immediate assistance?</strong></p> <p data-astro-cid-reykoxrt>Call us on <a href="tel:0448243979" data-astro-cid-reykoxrt>0448 243 979</a></p> <p data-astro-cid-reykoxrt>Email: <a href="mailto:info@allseasonsliving.com.au" data-astro-cid-reykoxrt>info@allseasonsliving.com.au</a></p> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-reykoxrt": true })} ` })}  ${renderScript($$result, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro", void 0);

const $$file = "/Users/dane/Documents/ASL-Digital/Web Files/asl-website/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
