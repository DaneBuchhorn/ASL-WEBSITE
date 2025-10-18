/**
 * Enhanced Conversion Tracking
 * Phase 2 Implementation for All Seasons Living
 *
 * Tracks:
 * - Phone call clicks
 * - CTA button clicks
 * - Scroll depth
 * - Form interactions (start, abandon)
 * - Product page views
 */

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track phone number clicks
 */
export function initPhoneTracking() {
  // Track all phone links
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const phoneNumber = (e.currentTarget as HTMLAnchorElement).href.replace('tel:', '');
      const location = (e.currentTarget as HTMLElement).getAttribute('data-location') || 'unknown';

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'phone_call_click', {
          event_category: 'Contact',
          event_label: phoneNumber,
          phone_location: location,
          value: 1
        });
      }

      console.log('📞 Phone Click:', { phoneNumber, location });
    });
  });
}

/**
 * Track CTA button clicks
 */
export function initCTATracking() {
  // Track all buttons with specific classes
  const ctaSelectors = [
    '.btn-primary',
    '.btn-secondary',
    '.quote-trigger',
    '.form-submit-btn'
  ];

  ctaSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const buttonText = target.textContent?.trim() || '';
        const buttonType = target.className;
        const pageUrl = window.location.pathname;

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'cta_click', {
            event_category: 'Engagement',
            event_label: buttonText,
            button_type: buttonType,
            page_location: pageUrl,
            value: 1
          });
        }

        console.log('🎯 CTA Click:', { buttonText, buttonType, pageUrl });
      });
    });
  });
}

/**
 * Track scroll depth
 */
export function initScrollTracking() {
  const scrollDepths = [25, 50, 75, 100];
  const reached: { [key: number]: boolean } = {};

  const checkScrollDepth = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercent >= depth && !reached[depth]) {
        reached[depth] = true;

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'scroll_depth', {
            event_category: 'Engagement',
            event_label: `${depth}%`,
            scroll_depth: depth,
            page_location: window.location.pathname,
            value: depth / 100
          });
        }

        console.log('📜 Scroll Depth:', `${depth}%`, window.location.pathname);
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Track form interactions (start & abandon)
 */
export function initFormInteractionTracking(formId: string, formName: string) {
  const form = document.getElementById(formId) as HTMLFormElement;
  if (!form) return;

  let formStarted = false;
  let formAbandoned = false;
  let fieldsCompleted = 0;

  // Track form start
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      if (!formStarted) {
        formStarted = true;

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'form_start', {
            event_category: 'Form',
            event_label: formName,
            form_name: formName,
            form_location: window.location.pathname,
            value: 1
          });
        }

        console.log('📝 Form Start:', formName);
      }
    });

    // Track field completion
    input.addEventListener('blur', () => {
      const value = (input as HTMLInputElement).value.trim();
      if (value.length > 0) {
        fieldsCompleted++;
      }
    });
  });

  // Track form abandonment (user leaves without submitting)
  let isSubmitting = false;

  form.addEventListener('submit', () => {
    isSubmitting = true;
  });

  window.addEventListener('beforeunload', () => {
    if (formStarted && !isSubmitting && !formAbandoned) {
      formAbandoned = true;
      const totalFields = inputs.length;

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'form_abandon', {
          event_category: 'Form',
          event_label: formName,
          form_name: formName,
          fields_completed: fieldsCompleted,
          total_fields: totalFields,
          completion_rate: Math.round((fieldsCompleted / totalFields) * 100),
          value: 0
        });
      }

      console.log('⚠️ Form Abandoned:', formName, `${fieldsCompleted}/${totalFields} fields`);
    }
  });
}

/**
 * Track product page views
 */
export function trackProductView(productName: string, productCategory: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'product_view', {
      event_category: 'Product',
      event_label: productName,
      product_name: productName,
      product_category: productCategory,
      page_location: window.location.pathname,
      value: 1
    });
  }

  console.log('👀 Product View:', productName, productCategory);
}

/**
 * Track product icon clicks (homepage navigation)
 */
export function initProductIconTracking() {
  document.querySelectorAll('.product-icon-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const productName = target.querySelector('span')?.textContent?.trim() || '';
      const href = (target as HTMLAnchorElement).href || '';

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'product_icon_click', {
          event_category: 'Navigation',
          event_label: productName,
          product_name: productName,
          destination_url: href,
          value: 1
        });
      }

      console.log('🔲 Product Icon Click:', productName);
    });
  });
}

/**
 * Track time on site milestones
 */
export function initTimeOnSiteTracking() {
  const milestones = [30, 60, 120, 300]; // seconds
  const reached: { [key: number]: boolean } = {};
  const startTime = Date.now();

  milestones.forEach(milestone => {
    setTimeout(() => {
      if (!reached[milestone]) {
        reached[milestone] = true;

        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'time_on_site', {
            event_category: 'Engagement',
            event_label: `${milestone} seconds`,
            time_seconds: milestone,
            page_location: window.location.pathname,
            value: milestone
          });
        }

        console.log('⏱️ Time on Site:', `${milestone}s`);
      }
    }, milestone * 1000);
  });
}

/**
 * Track modal opens (quote modal, offer modal)
 */
export function trackModalOpen(modalName: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'modal_open', {
      event_category: 'Engagement',
      event_label: modalName,
      modal_name: modalName,
      value: 1
    });
  }

  console.log('📋 Modal Opened:', modalName);
}

/**
 * Track external link clicks
 */
export function initExternalLinkTracking() {
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    const href = (link as HTMLAnchorElement).href;
    const currentDomain = window.location.hostname;

    // Check if it's external
    if (!href.includes(currentDomain)) {
      link.addEventListener('click', () => {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'external_link_click', {
            event_category: 'Outbound',
            event_label: href,
            destination_url: href,
            value: 1
          });
        }

        console.log('🔗 External Link:', href);
      });
    }
  });
}

/**
 * Initialize all enhanced tracking
 */
export function initAllEnhancedTracking() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupTracking();
    });
  } else {
    setupTracking();
  }
}

function setupTracking() {
  console.log('🚀 Initializing Enhanced Tracking...');

  // Core tracking
  initPhoneTracking();
  initCTATracking();
  initScrollTracking();
  initProductIconTracking();
  initExternalLinkTracking();
  initTimeOnSiteTracking();

  // Form-specific tracking (check which forms exist on page)
  const forms = [
    { id: 'mainQuoteForm', name: 'homepage-quote-form' },
    { id: 'artificialLawnQuoteForm', name: 'artificial-lawn-inline-form' },
    { id: 'rollerShuttersQuoteForm', name: 'roller-shutters-inline-form' },
    { id: 'contactForm', name: 'contact-page-form' }
  ];

  forms.forEach(({ id, name }) => {
    if (document.getElementById(id)) {
      initFormInteractionTracking(id, name);
    }
  });

  console.log('✅ Enhanced Tracking Initialized');
}
