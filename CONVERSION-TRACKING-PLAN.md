# Lead Generation Conversion Tracking & Analytics Plan
## All Seasons Living Website

---

## Executive Summary

This document outlines a comprehensive conversion tracking strategy for All Seasons Living's lead generation website. Our **#1 goal is generating qualified leads through form submissions** for free measure and quote bookings. The implementation focuses on tracking every step of the customer journey from first visit to form submission, enabling data-driven optimization to maximize lead volume and quality.

---

## 1. Core Conversion Events

### 1.1 Primary Conversions (Lead Generation)

| Event Name | Description | Priority | Current Status |
|------------|-------------|----------|----------------|
| `generate_lead` | Any form submission (quote forms, contact form) | Critical | ✅ Implemented |
| `form_submit_homepage` | Homepage quote form submission | High | ⚠️ Partial |
| `form_submit_artificial_lawn` | Artificial lawn inline form | High | ⚠️ Partial |
| `form_submit_roller_shutters` | Roller shutters inline form | High | ⚠️ Partial |
| `form_submit_contact` | Contact page form | High | ⚠️ Partial |
| `phone_call_click` | User clicks phone number | High | ❌ Not Implemented |
| `quote_modal_submit` | Quote modal form submission | High | ❌ Not Implemented |

### 1.2 Micro Conversions (Engagement)

| Event Name | Description | Priority | Current Status |
|------------|-------------|----------|----------------|
| `product_view` | User views product page | Medium | ❌ Not Implemented |
| `product_icon_click` | Click on homepage product icons | Medium | ❌ Not Implemented |
| `cta_button_click` | Click on any CTA button | Medium | ❌ Not Implemented |
| `scroll_depth` | Page scroll depth (25%, 50%, 75%, 100%) | Medium | ❌ Not Implemented |
| `time_on_site` | User engagement time milestones | Low | ❌ Not Implemented |
| `video_play` | If videos are added | Low | N/A |

### 1.3 Navigation Events

| Event Name | Description | Priority | Current Status |
|------------|-------------|----------|----------------|
| `nav_click` | Header navigation clicks | Low | ❌ Not Implemented |
| `footer_link_click` | Footer link clicks | Low | ❌ Not Implemented |
| `external_link_click` | Clicks to external sites | Medium | ❌ Not Implemented |

---

## 2. Lead Quality Indicators

### 2.1 Lead Source Tracking

**Track which marketing channels generate the highest quality leads:**

```javascript
// Capture lead source with every form submission
const leadData = {
  source: sessionStorage.getItem('trafficSource'), // google, facebook, direct, referral
  medium: sessionStorage.getItem('trafficMedium'), // organic, cpc, social, email
  campaign: sessionStorage.getItem('campaign'),
  landing_page: sessionStorage.getItem('landingPage'),
  product_interest: 'artificial-lawn', // from form
  form_location: 'inline_section'
};
```

### 2.2 Lead Engagement Scoring

**Behavioral signals indicating high-intent leads:**

| Signal | Points | Why It Matters |
|--------|--------|----------------|
| Viewed 3+ pages | +10 | Actively researching |
| Time on site >3 min | +15 | High engagement |
| Visited product page | +20 | Product-specific interest |
| Clicked phone number | +25 | Ready to talk |
| Returned visitor | +15 | Strong consideration |
| Filled out message field | +10 | Detailed requirements |

**Use this scoring to:**
- Prioritize sales follow-up
- Identify best-performing marketing channels
- Optimize ad spend toward high-quality sources

---

## 3. User Journey Tracking

### 3.1 Session-Based Tracking

**What to Track:**
- Entry page (landing page)
- Traffic source/medium (UTM parameters)
- Device type (mobile, tablet, desktop)
- Browser/OS
- Geographic location
- Time of day/day of week
- Session duration
- Pages per session
- Exit page

**Implementation:**
```javascript
// Already implemented in formTracking.ts
// Captured in sessionStorage and sent with form submissions
```

### 3.2 Multi-Touch Attribution

**Track user touchpoints:**
1. First visit source
2. All intermediate visits (return visits)
3. Final converting visit
4. Days to conversion
5. Number of sessions before conversion

---

## 4. Form Analytics

### 4.1 Form Field Tracking

| Metric | Description | Priority |
|--------|-------------|----------|
| Form Start | User interacts with first field | High |
| Field Completion Rate | % of users completing each field | Medium |
| Form Abandonment | Users who start but don't submit | High |
| Error Rate | Form validation errors by field | Medium |
| Time to Complete | How long users take to fill form | Low |

### 4.2 Form-Specific Events

```javascript
// Form interaction started
gtag('event', 'form_start', {
  form_name: 'artificial_lawn_quote',
  form_location: 'inline_section'
});

// Form field completed
gtag('event', 'form_field_complete', {
  form_name: 'artificial_lawn_quote',
  field_name: 'email'
});

// Form abandoned
gtag('event', 'form_abandon', {
  form_name: 'artificial_lawn_quote',
  fields_completed: 3,
  total_fields: 6
});

// Form error
gtag('event', 'form_error', {
  form_name: 'artificial_lawn_quote',
  field_name: 'phone',
  error_type: 'invalid_format'
});
```

---

## 5. Phone Call Tracking

### 5.1 Click-to-Call Events

```javascript
// Track phone number clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    gtag('event', 'phone_call', {
      event_category: 'Contact',
      event_label: link.href.replace('tel:', ''),
      location: 'header' // or 'hero', 'cta', 'footer'
    });
  });
});
```

### 5.2 Call Tracking Integration

**Recommended Solutions:**
- CallRail (Dynamic Number Insertion)
- CallTrackingMetrics
- Google Ads Call Extensions with conversion import

**Benefits:**
- Track which marketing channels drive phone calls
- Record calls for quality assurance
- Attribute phone conversions to specific campaigns
- Integrate with CRM

---

## 6. A/B Testing & Optimization Events

### 6.1 Test Variant Tracking

```javascript
// Track which variant user sees
gtag('event', 'experiment_impression', {
  experiment_id: 'homepage_cta_test',
  variant_id: 'variant_b'
});

// Track conversions per variant
gtag('event', 'conversion', {
  experiment_id: 'homepage_cta_test',
  variant_id: 'variant_b'
});
```

### 6.2 Recommended Tests

1. **Homepage Hero CTA** - Button text variations
2. **Form Length** - Short vs. detailed forms
3. **Product Images** - Lifestyle vs. product-focused
4. **Social Proof** - Testimonials placement
5. **Pricing Transparency** - Show ranges vs. "Get Quote"

---

## 7. Marketing Channel Attribution

### 7.1 UTM Parameter Structure

**Standard UTM Format:**
```
?utm_source={source}&utm_medium={medium}&utm_campaign={campaign}&utm_content={content}&utm_term={term}
```

**Examples:**

| Channel | URL |
|---------|-----|
| Google Ads | `?utm_source=google&utm_medium=cpc&utm_campaign=artificial_lawn_brand&utm_content=ad_v1&utm_term=artificial+lawn+canberra` |
| Facebook Ads | `?utm_source=facebook&utm_medium=paid_social&utm_campaign=roller_shutters_awareness&utm_content=carousel_ad` |
| Email Newsletter | `?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_october&utm_content=cta_button` |
| Local Directory | `?utm_source=yellowpages&utm_medium=referral&utm_campaign=directory_listing` |

### 7.2 Channel Performance Metrics

Track for each channel:
- Sessions
- New users
- Bounce rate
- Pages per session
- Average session duration
- Lead conversion rate
- Cost per lead (for paid channels)
- Lead-to-customer rate

---

## 8. Lead-to-Customer Lifecycle

### 8.1 Lead Stages (Track in CRM)

**Stage 1: Website Visitor**
- Browsing, researching products
- **Goal:** Get them to submit a form

**Stage 2: Lead Generated** 🎯 **PRIMARY CONVERSION**
- Form submitted for free measure & quote
- **Tracking:** `generate_lead` event in GA4
- **Action:** Immediate email confirmation + sales follow-up

**Stage 3: Contacted**
- Sales team reaches out within 24 hours
- **Tracking:** Log in CRM with lead source data

**Stage 4: Measure Booked**
- On-site consultation scheduled
- **Tracking:** Update CRM status

**Stage 5: Quote Provided**
- Formal quote sent to customer
- **Tracking:** Note quote value in CRM

**Stage 6: Customer Won** 💰 **ULTIMATE GOAL**
- Customer accepts quote, job scheduled
- **Tracking:** Import as conversion to Google Ads
- **Revenue Attribution:** Match to original lead source

**Stage 7: Job Completed**
- Installation finished, payment collected
- **Tracking:** Record actual revenue in CRM

### 8.2 Connecting Website Leads to Revenue

**Critical Data to Capture with Every Lead:**
1. Google Analytics Client ID (for matching)
2. Lead Source (Google Ads, Facebook, Organic, etc.)
3. UTM Parameters (campaign, content, term)
4. Product Interest
5. Submission Timestamp

**Monthly Reporting:**
- Export won customers from CRM
- Match to original website lead data
- Import conversions back to Google Ads
- Calculate **true ROI** by marketing channel

**Example:**
```
Google Ads Spend: $2,000
Leads Generated: 40
Cost per Lead: $50
Customers Won: 8 (20% conversion rate)
Average Job Value: $4,500
Total Revenue: $36,000
ROI: 1,700% (17x return)
```

---

## 9. Technical Implementation

### 9.1 Google Tag Manager (GTM) Setup

**Benefits:**
- No code deployment needed for new tags
- Version control for tracking changes
- Built-in debugging tools
- A/B testing integration
- Advanced event listeners

**Container Structure:**
```
GTM Container
├── Tags
│   ├── Google Analytics 4
│   ├── Google Ads Conversion
│   ├── Facebook Pixel
│   └── LinkedIn Insight Tag
├── Triggers
│   ├── All Pages
│   ├── Form Submissions
│   ├── Button Clicks
│   └── Scroll Depth
└── Variables
    ├── Form Name
    ├── Product Type
    └── User ID
```

### 9.2 Google Analytics 4 (GA4) Configuration

**Custom Dimensions:**
- Lead Source (organic, paid, referral, direct)
- Product Interest (artificial-lawn, roller-shutters, etc.)
- Form Type (inline, modal, contact page)
- Session Count (1st visit, returning)
- Days Since First Visit

**Custom Metrics:**
- Lead Value (future)
- Quote Value (future)
- Customer Lifetime Value (future)

### 9.3 Event Data Layer

```javascript
// Push events to data layer for GTM
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'form_submission',
  'formName': 'artificial_lawn_quote',
  'formLocation': 'inline_section',
  'productInterest': 'artificial-lawn',
  'leadSource': sessionStorage.getItem('trafficSource'),
  'sessionNumber': parseInt(sessionStorage.getItem('sessionCount') || '1')
});
```

---

## 10. Privacy & Compliance

### 10.1 GDPR/Privacy Compliance

**Requirements:**
- ✅ Cookie consent banner (before tracking)
- ✅ Privacy policy page
- ✅ Data retention policies
- ✅ User data deletion requests
- ✅ Anonymous IP addresses in GA4

**Implementation:**
```javascript
// Only initialize tracking after consent
function initializeTracking() {
  if (hasUserConsent()) {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
}
```

### 10.2 Data Retention

- GA4: Set to 14 months (max)
- Form submissions: Store lead data per privacy policy
- Delete user data upon request within 30 days

---

## 11. Reporting & Dashboards

### 11.1 Executive Dashboard (Weekly)

**KPIs:**
- Total Leads
- Leads by Product
- Leads by Source
- Conversion Rate
- Cost per Lead
- Lead Quality Score
- Week-over-week growth

### 11.2 Marketing Dashboard (Daily)

**Metrics:**
- Sessions by Channel
- New vs. Returning Users
- Top Landing Pages
- Form Conversion Rate by Page
- Phone Call Clicks
- Bounce Rate by Source

### 11.3 Product Performance Dashboard

**Metrics per Product:**
- Page Views
- Time on Page
- Quote Form Submissions
- Conversion Rate
- Exit Rate
- Top Entry Sources

---

## 12. Integration Roadmap

### Phase 1: Foundation (Week 1-2) ✅ CURRENT
- [x] Basic Google Analytics 4
- [x] Form submission tracking
- [x] Session tracking in formTracking.ts
- [ ] Enhanced form events (start, abandon, errors)

### Phase 2: Enhanced Tracking (Week 3-4) 📋 RECOMMENDED
- [ ] Phone call click tracking
- [ ] Product view events
- [ ] Scroll depth tracking
- [ ] CTA button tracking
- [ ] Quote modal tracking

### Phase 3: Advanced Analytics (Week 5-6) 🎯 ADVANCED
- [ ] Google Tag Manager implementation
- [ ] Facebook Pixel
- [ ] LinkedIn Insight Tag
- [ ] Enhanced e-commerce events
- [ ] Form field-level analytics

### Phase 4: Attribution & CRM (Week 7-8) 🚀 ENTERPRISE
- [ ] Multi-touch attribution model
- [ ] CRM integration (HubSpot/Salesforce)
- [ ] Offline conversion import
- [ ] Call tracking integration
- [ ] Customer lifecycle tracking

### Phase 5: Optimization (Ongoing) 📈
- [ ] Custom dashboards in Looker Studio
- [ ] Automated reporting
- [ ] A/B testing framework
- [ ] Predictive lead scoring
- [ ] Revenue attribution

---

## 13. Recommended Tools & Platforms

### Analytics & Tag Management
- **Google Analytics 4** - Free, enterprise-grade analytics ✅
- **Google Tag Manager** - Tag management without code changes 📋
- **Hotjar** - Heatmaps, session recordings, user feedback 🎯
- **Microsoft Clarity** - Free alternative to Hotjar ✅

### Call Tracking
- **CallRail** - Dynamic number insertion, call recording 🎯
- **CallTrackingMetrics** - Enterprise solution with CRM integration 🚀
- **Google Ads Call Extensions** - Basic call tracking ✅

### CRM & Lead Management
- **HubSpot** - All-in-one CRM with marketing automation 🚀
- **Salesforce** - Enterprise CRM 🚀
- **Pipedrive** - Simple sales CRM 📋
- **Monday.com** - Visual pipeline management 📋

### A/B Testing
- **Google Optimize** (Deprecated - alternatives below)
- **VWO** - Visual Website Optimizer 🎯
- **Optimizely** - Enterprise testing platform 🚀
- **AB Tasty** - Testing + personalization 🎯

### Conversion Optimization
- **Unbounce** - Landing page builder 📋
- **Leadfeeder** - Website visitor identification 🎯
- **Lucky Orange** - Conversion funnels, form analytics 📋

---

## 14. Success Metrics & Goals

### Baseline Metrics (Current)
- Collect 1 month of data to establish baselines
- Identify top-performing pages
- Determine average conversion rates

### Target Improvements (6 months)
- **Overall Conversion Rate:** +25%
- **Form Completion Rate:** +15%
- **Phone Call Conversions:** Track and optimize
- **Bounce Rate:** -10%
- **Pages per Session:** +20%
- **Cost per Lead:** -20% (paid channels)

### Long-term Goals (12 months)
- Attribution model with 90%+ accuracy
- Predictive lead scoring implementation
- Automated lead nurturing based on behavior
- Customer lifetime value tracking
- Revenue attribution to marketing channels

---

## 15. Budget Considerations

### Free Tier (Current)
- Google Analytics 4 ✅
- Microsoft Clarity
- Google Search Console
- **Monthly Cost:** $0

### Starter Tier ($200-500/month)
- Hotjar or Lucky Orange
- Basic CallRail plan
- HubSpot Free + paid features
- **Recommended for:** Growing businesses

### Professional Tier ($500-2000/month)
- Full Hotjar or VWO
- CallRail Professional
- HubSpot Professional
- Facebook Ads tracking
- **Recommended for:** Scaling operations

### Enterprise Tier ($2000+/month)
- Full analytics suite
- Salesforce or HubSpot Enterprise
- CallTrackingMetrics
- Optimizely
- Custom integrations
- **Recommended for:** High-volume lead generation

---

## 16. Implementation Checklist

### Immediate Actions
- [ ] Enhance existing form tracking with form start/abandon events
- [ ] Implement phone call click tracking
- [ ] Add product view events
- [ ] Set up scroll depth tracking
- [ ] Create basic GA4 dashboard

### Short-term (1-2 weeks)
- [ ] Install Microsoft Clarity for heatmaps
- [ ] Set up Google Tag Manager
- [ ] Implement CTA button tracking
- [ ] Create weekly automated reports
- [ ] Document baseline conversion rates

### Medium-term (1-2 months)
- [ ] Research and select CRM platform
- [ ] Implement call tracking solution
- [ ] Set up multi-touch attribution
- [ ] Create custom GA4 reports
- [ ] Begin A/B testing program

### Long-term (3-6 months)
- [ ] Full CRM integration
- [ ] Offline conversion import
- [ ] Advanced segmentation
- [ ] Predictive analytics
- [ ] Revenue attribution model

---

## 17. Key Performance Indicators (KPIs)

### Primary KPI: Lead Generation 🎯

**The metrics that matter most:**

| Metric | Target | How to Track |
|--------|--------|--------------|
| **Total Leads/Month** | 50+ | GA4 Events Dashboard |
| **Website Conversion Rate** | 3-5% | Sessions ÷ Leads |
| **Cost Per Lead** | <$75 | Ad Spend ÷ Leads |
| **Lead Response Time** | <2 hours | CRM timestamps |
| **Lead-to-Customer Rate** | 15-25% | CRM reports |

### Secondary KPIs: Traffic Quality

| Metric | Target | Purpose |
|--------|--------|---------|
| Bounce Rate | <50% | Are visitors engaged? |
| Pages per Session | 2.5+ | Content engagement |
| Avg. Session Duration | 2+ min | Quality traffic |
| Return Visitor Rate | 30%+ | Brand awareness |
| Mobile Conversion Rate | Match desktop | Mobile UX check |

### Channel Performance KPIs

**For each marketing channel, track:**

1. **Traffic Volume** - Sessions from source
2. **Lead Volume** - Forms submitted from source
3. **Conversion Rate** - % of sessions that convert
4. **Cost Per Lead** - Ad spend ÷ leads (paid channels)
5. **Lead Quality** - % that become customers

**Example Channel Scorecard:**

```
Google Ads (Branded)
├── Sessions: 500
├── Leads: 25
├── Conversion Rate: 5.0% ⭐ High
├── Cost Per Lead: $40
└── Customer Rate: 28% ⭐ Best quality

Google Ads (Non-Branded)
├── Sessions: 1,200
├── Leads: 36
├── Conversion Rate: 3.0%
├── Cost Per Lead: $83
└── Customer Rate: 15%

Organic Search
├── Sessions: 2,000
├── Leads: 60
├── Conversion Rate: 3.0%
├── Cost Per Lead: $0 (free)
└── Customer Rate: 22% ⭐ High quality

Facebook Ads
├── Sessions: 800
├── Leads: 12
├── Conversion Rate: 1.5% ⚠️ Low
├── Cost Per Lead: $125 ⚠️ High
└── Customer Rate: 10% ⚠️ Needs improvement
```

### Product Performance KPIs

| Product | Target Leads/Month | Tracking |
|---------|-------------------|----------|
| Artificial Lawn | 20+ | Product field in forms |
| Roller Shutters | 15+ | Product field in forms |
| Outdoor Blinds | 10+ | Product field in forms |
| Plantation Shutters | 5+ | Product field in forms |

---

## Conclusion

This lead generation tracking strategy is laser-focused on **maximizing form submissions** and measuring the quality of leads from each marketing channel.

### Success Looks Like:

**Month 1-2:** Baseline Established
- ✅ Track all form submissions by source
- ✅ Know which pages convert best
- ✅ Identify drop-off points in user journey
- ✅ Measure phone call engagement

**Month 3-4:** Optimization Phase
- 📈 Increase form conversion rate by 25%
- 💰 Reduce cost per lead by 20%
- 📊 A/B test top-performing pages
- 🎯 Double down on best-performing channels

**Month 5-6:** Revenue Attribution
- 💎 Connect website leads to revenue
- 📉 Cut spending on low-quality channels
- 📈 Scale budget on high-ROI channels
- 🚀 Predictable, profitable lead generation

### The Bottom Line

**Every dollar spent on marketing should:**
1. Be tracked back to specific leads
2. Be measured against lead quality
3. Be optimized based on data
4. Generate a positive ROI

**This tracking plan gives you:**
- Complete visibility into what's working
- Data to make confident marketing decisions
- Ability to prove ROI to stakeholders
- Foundation for scaling profitably

---

## Next Steps

1. **This Week:** Implement Phase 2 tracking (phone calls, CTAs, scroll depth)
2. **Next Week:** Set up Google Tag Manager for easier tracking management
3. **Within 30 Days:** Establish baseline metrics and reporting dashboards
4. **Ongoing:** Monthly review of channel performance and optimization

**Remember:** The goal isn't just more leads—it's more *qualified* leads that turn into paying customers. Track everything, measure what matters, and optimize ruthlessly.

---

**Document Version:** 1.0
**Last Updated:** 2025-10-18
**Next Review:** 2025-11-18
