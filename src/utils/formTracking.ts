/**
 * Comprehensive Form Tracking Utility
 * Captures maximum data for CRM integration and marketing attribution
 */

export interface LeadData {
  // Form Fields
  name: string;
  email: string;
  phone: string;
  suburb: string;
  product: string;
  bestTime?: string;
  message?: string;
}

export interface TrackingData {
  // Timestamp & Session
  submissionTimestamp: string;
  submissionDate: string;
  submissionTime: string;
  submissionDayOfWeek: string;
  timezone: string;
  sessionDuration?: number;

  // Page & Source
  sourcePage: string;
  pageTitle: string;
  formId: string;
  formType: string;
  referrer: string;
  landingPage?: string;

  // UTM Parameters (Google Ads, Facebook Ads)
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;

  // Google Ads Specific
  gclid?: string; // Google Click ID
  gbraid?: string; // Google Ads iOS tracking
  wbraid?: string; // Google Ads Web to App

  // Facebook/Meta Ads Specific
  fbclid?: string; // Facebook Click ID
  fbp?: string; // Facebook Browser ID (from cookie)
  fbc?: string; // Facebook Click ID (from cookie)

  // Device & Browser
  deviceType: 'mobile' | 'tablet' | 'desktop';
  operatingSystem: string;
  browser: string;
  browserVersion: string;
  screenResolution: string;
  viewportSize: string;
  userAgent: string;

  // Network & Location
  ipAddress?: string; // Will be captured server-side
  language: string;
  languages: string[];
  connectionType?: string;

  // Behavior & Engagement
  scrollDepth: number;
  timeOnPage: number;
  clicksBeforeSubmission?: number;
  previousPages?: string[];

  // Client ID (for cross-session tracking)
  gaClientId?: string; // Google Analytics Client ID
  sessionId?: string;

  // Additional Marketing Data
  adPosition?: string;
  keyword?: string;
  matchType?: string;
  network?: string;
  placement?: string;
  deviceModel?: string;
}

export interface FormSubmission {
  lead: LeadData;
  tracking: TrackingData;
}

/**
 * Get Facebook Pixel data from cookies
 */
function getFacebookPixelData(): { fbp?: string; fbc?: string } {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbp: cookies['_fbp'],
    fbc: cookies['_fbc']
  };
}

/**
 * Get Google Analytics Client ID
 */
function getGoogleAnalyticsClientId(): string | undefined {
  try {
    // Try to get GA4 client ID
    const cookies = document.cookie.split(';');
    const gaCookie = cookies.find(c => c.trim().startsWith('_ga='));
    if (gaCookie) {
      const parts = gaCookie.split('.');
      if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
      }
    }
  } catch (e) {
    console.error('Error getting GA Client ID:', e);
  }
  return undefined;
}

/**
 * Detect device type
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Get browser name and version
 */
function getBrowserInfo(): { browser: string; version: string } {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';

  if (ua.indexOf('Firefox') > -1) {
    browser = 'Firefox';
    version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('SamsungBrowser') > -1) {
    browser = 'Samsung Internet';
    version = ua.match(/SamsungBrowser\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) {
    browser = 'Opera';
    version = ua.match(/(?:Opera|OPR)\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
    version = ua.match(/rv:([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edge') > -1) {
    browser = 'Edge (Legacy)';
    version = ua.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Edg') > -1) {
    browser = 'Edge (Chromium)';
    version = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Chrome') > -1) {
    browser = 'Chrome';
    version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
  } else if (ua.indexOf('Safari') > -1) {
    browser = 'Safari';
    version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
  }

  return { browser, version };
}

/**
 * Get operating system
 */
function getOperatingSystem(): string {
  const ua = navigator.userAgent;

  if (ua.indexOf('Win') > -1) return 'Windows';
  if (ua.indexOf('Mac') > -1) return 'macOS';
  if (ua.indexOf('Linux') > -1) return 'Linux';
  if (ua.indexOf('Android') > -1) return 'Android';
  if (ua.indexOf('iOS') > -1 || ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';

  return 'Unknown';
}

/**
 * Get scroll depth percentage
 */
function getScrollDepth(): number {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  return Math.min(Math.round(scrollPercent), 100);
}

/**
 * Get connection type (if available)
 */
function getConnectionType(): string | undefined {
  const nav = navigator as any;
  if (nav.connection) {
    return nav.connection.effectiveType || nav.connection.type;
  }
  return undefined;
}

/**
 * Parse URL parameters
 */
function getUrlParameters(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Get session storage data
 */
function getSessionData(): { landingPage?: string; previousPages?: string[]; sessionStart?: number } {
  try {
    return {
      landingPage: sessionStorage.getItem('landingPage') || undefined,
      previousPages: JSON.parse(sessionStorage.getItem('previousPages') || '[]'),
      sessionStart: parseInt(sessionStorage.getItem('sessionStart') || '0') || undefined
    };
  } catch {
    return {};
  }
}

/**
 * Main tracking function - captures all data
 */
export function captureFormData(formData: LeadData, formId: string, formType: string): FormSubmission {
  const urlParams = getUrlParameters();
  const { browser, version: browserVersion } = getBrowserInfo();
  const fbData = getFacebookPixelData();
  const sessionData = getSessionData();
  const now = new Date();

  // Calculate session duration
  const sessionDuration = sessionData.sessionStart
    ? Math.round((Date.now() - sessionData.sessionStart) / 1000)
    : undefined;

  // Calculate time on page
  const timeOnPage = sessionData.sessionStart
    ? Math.round((Date.now() - sessionData.sessionStart) / 1000)
    : 0;

  const tracking: TrackingData = {
    // Timestamp & Session
    submissionTimestamp: now.toISOString(),
    submissionDate: now.toLocaleDateString('en-AU'),
    submissionTime: now.toLocaleTimeString('en-AU'),
    submissionDayOfWeek: now.toLocaleDateString('en-AU', { weekday: 'long' }),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionDuration,

    // Page & Source
    sourcePage: window.location.href,
    pageTitle: document.title,
    formId,
    formType,
    referrer: document.referrer || 'Direct',
    landingPage: sessionData.landingPage,

    // UTM Parameters
    utmSource: urlParams.utm_source,
    utmMedium: urlParams.utm_medium,
    utmCampaign: urlParams.utm_campaign,
    utmTerm: urlParams.utm_term,
    utmContent: urlParams.utm_content,

    // Google Ads Specific
    gclid: urlParams.gclid,
    gbraid: urlParams.gbraid,
    wbraid: urlParams.wbraid,

    // Facebook/Meta Ads Specific
    fbclid: urlParams.fbclid,
    fbp: fbData.fbp,
    fbc: fbData.fbc,

    // Device & Browser
    deviceType: getDeviceType(),
    operatingSystem: getOperatingSystem(),
    browser,
    browserVersion,
    screenResolution: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent,

    // Network & Location
    language: navigator.language,
    languages: navigator.languages ? Array.from(navigator.languages) : [navigator.language],
    connectionType: getConnectionType(),

    // Behavior & Engagement
    scrollDepth: getScrollDepth(),
    timeOnPage,
    previousPages: sessionData.previousPages,

    // Client ID
    gaClientId: getGoogleAnalyticsClientId(),
    sessionId: sessionStorage.getItem('sessionId') || undefined,

    // Additional Marketing Data
    adPosition: urlParams.position,
    keyword: urlParams.keyword,
    matchType: urlParams.matchtype,
    network: urlParams.network,
    placement: urlParams.placement,
    deviceModel: urlParams.device,
  };

  return {
    lead: formData,
    tracking
  };
}

/**
 * Initialize session tracking
 * Call this on page load
 */
export function initializeSessionTracking(): void {
  try {
    // Set landing page if not already set
    if (!sessionStorage.getItem('landingPage')) {
      sessionStorage.setItem('landingPage', window.location.href);
    }

    // Set session start time
    if (!sessionStorage.getItem('sessionStart')) {
      sessionStorage.setItem('sessionStart', Date.now().toString());
    }

    // Generate or retrieve session ID
    if (!sessionStorage.getItem('sessionId')) {
      const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }

    // Track page views in session
    const previousPages = JSON.parse(sessionStorage.getItem('previousPages') || '[]');
    if (!previousPages.includes(window.location.href)) {
      previousPages.push(window.location.href);
      sessionStorage.setItem('previousPages', JSON.stringify(previousPages));
    }

    // Store UTM parameters in session for attribution
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

    utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value && !sessionStorage.getItem(param)) {
        sessionStorage.setItem(param, value);
      }
    });

  } catch (e) {
    console.error('Error initializing session tracking:', e);
  }
}
