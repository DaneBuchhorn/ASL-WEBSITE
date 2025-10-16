# 📊 Form Tracking Data Capture - All Seasons Living

## Overview
This document outlines **ALL** data captured when a user submits a form on the website. This comprehensive tracking enables:
- **Marketing attribution** (which ads/campaigns drive leads)
- **Audience building** for Google Ads & Facebook Ads
- **Performance optimization** (best times to advertise, device targeting)
- **CRM enrichment** (detailed lead intelligence)

---

## 🎯 Lead Information (User-Entered Data)

| Field | Description | Example |
|-------|-------------|---------|
| **name** | Full name | "John Smith" |
| **email** | Email address | "john@example.com" |
| **phone** | Phone number | "0412 345 678" |
| **suburb** | Suburb/location | "Canberra" |
| **product** | Product interested in | "artificial-lawn" |
| **bestTime** | Best time to call (optional) | "morning" |
| **message** | Custom message (optional) | "Looking for 50sqm install" |

---

## 🕐 Timestamp & Session Data

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **submissionTimestamp** | ISO 8601 timestamp | "2025-01-16T14:30:45.123Z" | Exact submission time |
| **submissionDate** | Date in AU format | "16/01/2025" | Daily performance analysis |
| **submissionTime** | Time in AU format | "2:30:45 PM" | Best time to advertise |
| **submissionDayOfWeek** | Day name | "Monday" | Day-of-week performance |
| **timezone** | User's timezone | "Australia/Canberra" | Geographic targeting |
| **sessionDuration** | Seconds on site | 245 | Engagement quality |

**Marketing Insight:** Identify peak conversion times to schedule ads and optimize bidding strategies.

---

## 📍 Page & Source Tracking

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **sourcePage** | Full URL where form submitted | "https://allseasonsliving.com.au/" | Page performance |
| **pageTitle** | Page title | "Home \| All Seasons Living" | Content effectiveness |
| **formId** | HTML form ID | "mainQuoteForm" | Form optimization |
| **formType** | Form type identifier | "homepage-quote-form" | Conversion funnel |
| **referrer** | Previous page URL | "https://google.com/" | Traffic source |
| **landingPage** | First page visited | "https://allseasonsliving.com.au/outdoor-blinds" | Landing page effectiveness |

**Marketing Insight:** Track which pages convert best and optimize underperforming pages.

---

## 🎯 UTM Parameters (Campaign Tracking)

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **utmSource** | Traffic source | "google", "facebook" | Platform performance |
| **utmMedium** | Marketing medium | "cpc", "social", "email" | Channel effectiveness |
| **utmCampaign** | Campaign name | "summer_artificial_lawn" | Campaign ROI |
| **utmTerm** | Keyword/search term | "artificial lawn canberra" | Keyword performance |
| **utmContent** | Ad variation | "green_ad", "family_ad" | Creative testing |

**Marketing Insight:** Essential for attribution - know exactly which campaigns drive leads and revenue.

**Example URL:**
```
https://allseasonsliving.com.au/?utm_source=google&utm_medium=cpc&utm_campaign=summer_lawn&utm_term=artificial+lawn&utm_content=green_ad
```

---

## 🎯 Google Ads Tracking

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **gclid** | Google Click ID | "Cj0KCQiA..." | Google Ads conversion tracking |
| **gbraid** | Google Ads iOS tracking | "1234567890" | iOS app conversion tracking |
| **wbraid** | Google Ads Web-to-App | "1234567890" | Web-to-app conversion |

**Marketing Insight:**
- **gclid** is **CRITICAL** for Google Ads conversion tracking
- Upload leads with gclid to Google Ads for:
  - Enhanced conversions
  - Automated bidding optimization
  - Customer Match audiences
  - Similar Audiences

**How to use:**
1. Import leads with gclid into Google Ads
2. Google automatically attributes the conversion to the specific ad/keyword
3. Smart Bidding uses this data to optimize bids in real-time

---

## 📱 Facebook/Meta Ads Tracking

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **fbclid** | Facebook Click ID | "IwAR1..." | Facebook Ads conversion tracking |
| **fbp** | Facebook Browser ID | "_fbp=fb.1.1234567890123" | User identification (cookie) |
| **fbc** | Facebook Click ID (cookie) | "_fbc=fb.1.1234567890123" | Click attribution (cookie) |

**Marketing Insight:**
- **fbclid** in URL = Facebook Ad click
- **fbp** = Facebook pixel user identifier (tracks across sessions)
- **fbc** = Facebook click tracking cookie

**How to use:**
1. Send leads with fbclid/fbp/fbc to Facebook Conversions API
2. Facebook attributes conversion to specific ad/audience
3. Enables:
   - Lookalike Audiences (find similar customers)
   - Custom Audiences (retargeting)
   - Ad optimization for conversions

---

## 📱 Device & Browser Information

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **deviceType** | Device category | "mobile", "tablet", "desktop" | Device-specific bidding |
| **operatingSystem** | OS name | "iOS", "Android", "Windows" | OS targeting |
| **browser** | Browser name | "Chrome", "Safari", "Edge" | Cross-browser optimization |
| **browserVersion** | Browser version | "120.0.6099.109" | Tech stack planning |
| **screenResolution** | Screen dimensions | "1920x1080" | Responsive design insights |
| **viewportSize** | Viewport dimensions | "390x844" | Mobile optimization |
| **userAgent** | Full user agent string | "Mozilla/5.0..." | Detailed device intelligence |

**Marketing Insight:**
- **Mobile vs Desktop:** Adjust bids based on which converts better
- **iOS vs Android:** Different audience targeting strategies
- **Screen Size:** Optimize ad creatives for most common sizes

**Example Strategy:**
- If mobile converts at 4%, desktop at 2% → Increase mobile bids by 100%
- If iOS users spend 30% more → Create iOS-specific audiences

---

## 🌐 Network & Location

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **ipAddress** | User IP (server-side) | "203.123.45.67" | Geographic location |
| **language** | Primary language | "en-AU" | Language targeting |
| **languages** | All languages | ["en-AU", "en-US"] | Multilingual audience |
| **connectionType** | Network speed | "4g" | Connection quality |

**Marketing Insight:**
- **IP Address:** Can be used for:
  - City/region targeting
  - Fraud detection
  - CRM enrichment (append location data)

---

## 📊 Behavior & Engagement

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **scrollDepth** | How far user scrolled (%) | 85 | Content engagement |
| **timeOnPage** | Seconds before submit | 120 | Lead quality indicator |
| **clicksBeforeSubmission** | Number of clicks | 5 | Engagement level |
| **previousPages** | Pages viewed in session | ["/outdoor-blinds", "/"] | Navigation path |

**Marketing Insight:**
- **High scroll depth + long time on page = High intent leads**
- **Multiple page views = Research phase → Follow-up accordingly**
- **Quick conversions (<30s) = Urgent need or returning visitor**

**Example Segmentation:**
- **Hot Leads:** timeOnPage > 60s, scrollDepth > 70%, multiple pages
- **Warm Leads:** timeOnPage 30-60s, single page visit
- **Cold Leads:** timeOnPage < 30s (may be low quality)

---

## 🔑 Client & Session IDs

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **gaClientId** | Google Analytics Client ID | "123456789.1234567890" | Cross-session tracking |
| **sessionId** | Unique session identifier | "1705394445123-abc123xyz" | Session analysis |

**Marketing Insight:**
- **gaClientId:** Links form submissions to GA4 data
- **sessionId:** Track user journey within single visit

---

## 🎯 Additional Marketing Data

| Field | Description | Example | Marketing Use |
|-------|-------------|---------|---------------|
| **adPosition** | Ad position in search | "1t1" (top position 1) | Position performance |
| **keyword** | Matched keyword | "outdoor blinds canberra" | Keyword ROI |
| **matchType** | Keyword match type | "exact", "phrase", "broad" | Match type optimization |
| **network** | Ad network | "Search", "Display" | Network performance |
| **placement** | Where ad showed | "youtube.com" | Placement optimization |
| **deviceModel** | Specific device | "iPhone 15 Pro" | Device-level insights |

**Marketing Insight:** Fine-tune campaigns based on granular performance data.

---

## 💰 Real-World Marketing Applications

### 1. **Google Ads Enhanced Conversions**
```javascript
// Upload leads with gclid to Google Ads
// Result: 20-30% improvement in conversion tracking accuracy
```

**Setup:**
1. Enable Enhanced Conversions in Google Ads
2. Send leads with email + phone + gclid to Google Ads
3. Google matches leads to ad clicks for perfect attribution

### 2. **Facebook Conversions API**
```javascript
// Send leads with fbclid/fbp to Meta
// Result: 25% better ad performance due to better signal
```

**Setup:**
1. Set up Meta Conversions API
2. Send server-side events with fbclid, fbp, fbc
3. Meta optimizes ads for high-quality leads

### 3. **Custom Audiences (Retargeting)**
**Segments to create:**

**Based on Product Interest:**
- Artificial Lawn Leads → Show lawn ads
- Roller Shutters Leads → Show shutter ads

**Based on Engagement:**
- High Intent (>60s, >70% scroll) → Aggressive retargeting
- Low Intent (<30s) → Educational content

**Based on Device:**
- Mobile users → Mobile-optimized ads
- Desktop users → Detailed product pages

**Based on Timing:**
- Weekend converters → Increase weekend bids
- Weekday morning → Target morning commuters

### 4. **Lookalike Audiences**
**Best practices:**
1. Create seed audience from high-value leads:
   - timeOnPage > 90s
   - scrollDepth > 80%
   - Multiple page views
   - Converted within 7 days

2. Upload to Google/Facebook
3. Create 1% lookalike → Highest quality
4. Scale to 3-5% for broader reach

### 5. **Bid Adjustments**
**Example strategy based on captured data:**

```
Device Adjustments:
- Mobile: +50% (if CVR is 4% vs 2% desktop)
- Tablet: -20% (if CVR is lower)

Time of Day:
- Weekdays 9am-5pm: +30%
- Evenings 6pm-9pm: +20%
- Overnight: -50%

Day of Week:
- Monday-Thursday: Base bid
- Friday: +15%
- Weekend: -10%

Location:
- Canberra CBD: +40%
- Surrounding suburbs: Base
- Outside ACT: -30%
```

### 6. **Campaign Optimization**
**Use UTM data to calculate:**

**Cost per Lead by Campaign:**
```
Campaign A: $50 CPL (pause or optimize)
Campaign B: $25 CPL (scale up!)
Campaign C: $75 CPL (pause immediately)
```

**ROAS (Return on Ad Spend):**
```
Campaign ROI = (Revenue from leads / Ad spend) × 100
Target: 300-500% ROAS
```

---

## 🔌 CRM Integration Options

### Option 1: **Zapier** (Easiest - No Code)
**Steps:**
1. Create Zapier webhook trigger
2. Connect to your CRM (HubSpot, Salesforce, Pipedrive, etc.)
3. Map all fields automatically
4. Enable in `/src/pages/api/submit-lead.ts`

**Cost:** $20-70/month depending on volume

### Option 2: **Make.com (Integromat)** (More Powerful)
**Steps:**
1. Create Make.com webhook
2. Build automation flows:
   - Send to CRM
   - Send email notification
   - Update Google Sheets
   - Post to Slack
   - Upload to Google Ads
   - Send to Facebook Conversions API
3. Enable webhook in API file

**Cost:** $9-29/month

### Option 3: **Google Sheets** (Free - Great for Starting)
**Steps:**
1. Create Google Sheets spreadsheet
2. Use Apps Script to create web app endpoint
3. Each submission creates new row with all data
4. Use for manual follow-up or export to CRM

**Cost:** Free

### Option 4: **Direct CRM API** (Best Performance)
Examples:
- **HubSpot API**
- **Salesforce API**
- **Pipedrive API**
- **Zoho CRM API**

**Setup:** Add API key to environment variables, enable in `/src/pages/api/submit-lead.ts`

### Option 5: **Supabase/Firebase** (Full Database)
**Use case:** Want to store all leads in your own database
**Benefits:**
- Full control
- Historical data
- Build custom dashboards
- Real-time notifications

---

## 📈 Sample Lead Data (What You'll Receive)

```json
{
  "lead": {
    "name": "Sarah Johnson",
    "email": "sarah.j@email.com",
    "phone": "0412 345 678",
    "suburb": "Belconnen",
    "product": "artificial-lawn",
    "bestTime": "morning",
    "message": "Need quote for 40sqm front yard"
  },
  "tracking": {
    "submissionTimestamp": "2025-01-16T09:15:30.456Z",
    "submissionDate": "16/01/2025",
    "submissionTime": "9:15:30 AM",
    "submissionDayOfWeek": "Monday",
    "timezone": "Australia/Sydney",
    "sessionDuration": 185,

    "sourcePage": "https://allseasonsliving.com.au/",
    "pageTitle": "Home | All Seasons Living",
    "formId": "mainQuoteForm",
    "formType": "homepage-quote-form",
    "referrer": "https://www.google.com/",
    "landingPage": "https://allseasonsliving.com.au/",

    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "artificial_lawn_canberra",
    "utmTerm": "fake lawn installation",
    "utmContent": "ad_green_family",

    "gclid": "Cj0KCQiAyKurBhD5ARIsALamXaEabcdefgh...",
    "gbraid": undefined,
    "wbraid": undefined,

    "fbclid": undefined,
    "fbp": "_fbp=fb.1.1705394445123.123456789",
    "fbc": undefined,

    "deviceType": "mobile",
    "operatingSystem": "iOS",
    "browser": "Safari",
    "browserVersion": "17.2",
    "screenResolution": "1179x2556",
    "viewportSize": "390x844",
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X)...",

    "ipAddress": "203.123.45.67",
    "language": "en-AU",
    "languages": ["en-AU", "en-US"],
    "connectionType": "4g",

    "scrollDepth": 88,
    "timeOnPage": 185,
    "clicksBeforeSubmission": undefined,
    "previousPages": ["https://allseasonsliving.com.au/"],

    "gaClientId": "123456789.1234567890",
    "sessionId": "1705394445123-xyz789abc",

    "adPosition": "1t1",
    "keyword": "fake lawn installation",
    "matchType": "phrase",
    "network": "Search",
    "placement": undefined,
    "deviceModel": "iPhone 15 Pro"
  }
}
```

---

## 🎯 Next Steps to Implement

### Immediate (Do Today):
1. ✅ Form tracking is installed and working
2. ⏳ **Choose CRM integration** (Zapier, Make, Google Sheets)
3. ⏳ **Enable webhook in** `/src/pages/api/submit-lead.ts`
4. ⏳ **Test form submission** to verify data flows to CRM

### Week 1:
1. **Google Ads Enhanced Conversions:**
   - Enable in Google Ads settings
   - Import leads with gclid weekly

2. **Facebook Conversions API:**
   - Set up Meta Events Manager
   - Configure server-side events

### Week 2-4:
1. **Build audiences:**
   - Create custom audiences from leads
   - Build lookalike audiences

2. **Optimize campaigns:**
   - Analyze performance by device, time, campaign
   - Adjust bids based on data

### Ongoing:
1. **Weekly:** Review lead quality metrics
2. **Monthly:** Analyze conversion patterns and optimize
3. **Quarterly:** Build new lookalike audiences from best customers

---

## 📞 Support

All code is documented and ready to use. To enable CRM integration:

1. Open `/src/pages/api/submit-lead.ts`
2. Uncomment your preferred CRM option (Zapier, Make, Google Sheets, etc.)
3. Add your webhook URL or API key
4. Test with a form submission

**Example URLs in file will work once you create the webhooks!**

---

## 🎉 Benefits Summary

With this tracking system, you can:

✅ Know **exactly** which ads drive leads (UTM + gclid + fbclid)
✅ Build **custom audiences** for retargeting
✅ Create **lookalike audiences** to find more customers
✅ Optimize **bids by device, time, location**
✅ Track **lead quality** (engagement, time on site)
✅ Improve **Google Ads Smart Bidding** with better data
✅ Enhance **Facebook ad delivery** with Conversions API
✅ Calculate **true ROI** for every campaign
✅ Make **data-driven decisions** on where to spend budget

**This is enterprise-level tracking typically costing $5,000-$10,000 to implement!** 🚀
