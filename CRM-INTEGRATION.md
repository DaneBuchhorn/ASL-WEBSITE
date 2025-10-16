# CRM Integration Documentation

## Overview

This document details the integration between the All Seasons Living website and the ASL CRM system. The integration ensures that all form submissions from the new website are automatically sent to the CRM for lead management.

---

## Architecture

### Flow Diagram

```
Website Form Submission
        ↓
Client-side Tracking (50+ data points captured)
        ↓
POST /api/submit-lead
        ↓
Data Transformation (map to CRM format)
        ↓
POST https://crm.allseasonsliving.com.au/api/webhooks/enquiry
        ↓
CRM Creates Enquiry Record (status: "new", source: "New Website")
        ↓
Success Response → Redirect to /thank-you
```

---

## Integration Components

### 1. Form Tracking System
**File:** `/src/utils/formTracking.ts`

**Captures 50+ Data Points:**
- Lead information (name, email, phone, suburb, product, message)
- Marketing attribution (UTM parameters, gclid, fbclid)
- Device & browser information
- User behavior (scroll depth, time on page)
- Session data (landing page, referrer)

### 2. API Endpoint
**File:** `/src/pages/api/submit-lead.ts`

**Responsibilities:**
1. Receives form submission data
2. Adds server-side data (IP address, timestamp)
3. Transforms data to CRM webhook format
4. Sends to CRM webhook endpoint
5. Returns success/error response

### 3. CRM Webhook Endpoint
**URL:** `https://crm.allseasonsliving.com.au/api/webhooks/enquiry`

**Authentication:** API key via `x-api-key` header

**Creates:** Enquiry record in CRM database with status "new"

---

## Field Mapping

| Website Field | CRM Field | Notes |
|--------------|-----------|-------|
| `lead.name` | `firstName` | Direct mapping |
| `lead.email` | `email` | Direct mapping |
| `lead.phone` | `phone1` | Direct mapping |
| `lead.suburb` | `suburb` | Direct mapping |
| `lead.product` | `product` | Direct mapping |
| `lead.bestTime` + `lead.message` | `notes` | Combined with line break |
| (hardcoded) | `source` | Set to "New Website" |
| `tracking.utmCampaign` | `campaign` | Marketing attribution |
| `tracking.utmSource` OR `tracking.utmMedium` | `subSource` | Fallback logic |
| `tracking.sourcePage` | `landingPage` | Page URL |
| `tracking.ipAddress` | `ipAddress` | Server-side capture |
| `tracking.referrer` | `referrer` | HTTP referrer |
| `tracking.userAgent` | `userAgent` | Browser info |
| `tracking.utmTerm` | `utmTerm` | Search keywords |
| `tracking.utmContent` | `utmContent` | Ad variation |
| `tracking.gclid` | (metadata) | Google Ads tracking |
| `tracking.fbclid` | (metadata) | Facebook Ads tracking |

---

## Environment Variables

### Required Variables (.env)

```bash
# CRM Integration
CRM_WEBHOOK_URL=https://crm.allseasonsliving.com.au/api/webhooks/enquiry
CRM_WEBHOOK_API_KEY=D4gF7hJ0kL3nM6pR9sT2vX5yA8cE1fH4jK7mP0qS3u6=

# Site Configuration
SITE_URL=https://allseasonsliving.com.au
```

### Vercel Environment Variables

When deploying to Vercel, add these variables in the Vercel dashboard:

1. **CRM_WEBHOOK_URL**
   - Value: `https://crm.allseasonsliving.com.au/api/webhooks/enquiry`
   - Environment: Production, Preview, Development

2. **CRM_WEBHOOK_API_KEY**
   - Value: `D4gF7hJ0kL3nM6pR9sT2vX5yA8cE1fH4jK7mP0qS3u6=`
   - Environment: Production, Preview, Development

---

## Deployment Configuration

### Vercel Setup

**File:** `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**Astro Config:** `astro.config.mjs`
```javascript
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  // ... rest of config
});
```

### Deployment Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Add CRM integration"
   git push
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your repository
   - Vercel auto-detects Astro configuration

3. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_API_KEY`
   - Apply to all environments (Production, Preview, Development)

4. **Deploy**
   - Vercel automatically deploys on push
   - Or manually deploy from dashboard

---

## Testing the Integration

### Test Form Submission

1. **Local Testing**
   ```bash
   npm run dev
   ```
   - Fill out the form at http://localhost:4321
   - Check browser console for logs
   - Check terminal for API endpoint logs

2. **Production Testing**
   - Submit a test form on the live site
   - Check CRM dashboard at https://crm.allseasonsliving.com.au
   - Look for enquiry with source "New Website"

### Expected CRM Enquiry Record

```javascript
{
  enquiryNumber: 123 (auto-increment),
  firstName: "John",
  email: "john@example.com",
  phone1: "0400000000",
  suburb: "Canberra",
  product: "Outdoor Blinds",
  notes: "Best time to call: Morning\n\nI'm interested in outdoor blinds for my deck",
  source: "New Website",
  status: "new",
  campaign: "Summer Campaign",
  subSource: "Google Ads",
  landingPage: "https://allseasonsliving.com.au",
  ipAddress: "203.123.45.67",
  referrer: "https://google.com",
  userAgent: "Mozilla/5.0...",
  utmTerm: "outdoor blinds canberra",
  utmContent: "ad-variation-1",
  createdAt: "2025-01-16T12:00:00Z"
}
```

---

## Safety Measures

### WordPress Integration Preserved

✅ **The existing WordPress webhook integration is completely safe**

- Different source identifier: "Website" vs "New Website"
- Same webhook endpoint handles both
- No database schema changes required
- WordPress forms continue working unchanged

### Error Handling

The API endpoint includes comprehensive error handling:

1. **Missing Configuration**
   - Checks for `CRM_WEBHOOK_URL` and `CRM_WEBHOOK_API_KEY`
   - Throws error if not configured

2. **CRM Webhook Failure**
   - Logs error details to console
   - Returns 500 error to client with error message
   - User sees friendly error message

3. **Network Issues**
   - Fetch timeout handling
   - Retry logic can be added if needed

---

## Monitoring & Debugging

### Client-Side Logs

Open browser console to see:
- Form submission data being captured
- API request being sent
- Success/error responses

### Server-Side Logs

Check Vercel function logs to see:
- Incoming form submissions
- CRM payload being sent
- CRM response status
- Any errors encountered

### CRM Dashboard

Check CRM enquiries page to verify:
- New enquiry created
- Source = "New Website"
- All fields populated correctly
- Tracking data preserved

---

## Lead Identification in CRM

### How to Identify New Website Leads

All leads from the new website have:
- **Source:** "New Website"
- **Campaign:** (if UTM parameters present)
- **Sub Source:** (if UTM parameters present)

### Existing WordPress Leads

All leads from WordPress have:
- **Source:** "Website" (without "New")

This distinction allows you to:
- Track new vs old website performance
- Compare conversion rates
- Measure migration success

---

## Troubleshooting

### Issue: Form submission fails

**Check:**
1. Environment variables are set correctly in Vercel
2. CRM webhook endpoint is accessible
3. API key matches CRM configuration
4. Browser console for client-side errors
5. Vercel function logs for server-side errors

### Issue: Enquiry created but missing data

**Check:**
1. Field mapping in `/src/pages/api/submit-lead.ts`
2. Form inputs are sending correct data
3. CRM database schema accepts all fields
4. Console logs for data transformation

### Issue: Redirect to thank-you page fails

**Check:**
1. `/thank-you` page exists
2. Form redirect URL is correct in `/src/pages/index.astro`
3. No JavaScript errors in console

---

## Future Enhancements

### Potential Improvements

1. **Retry Logic**
   - Auto-retry failed CRM submissions
   - Queue submissions during CRM downtime

2. **Duplicate Detection**
   - Check for recent submissions from same email/phone
   - Prevent double submissions

3. **Email Notifications**
   - Send confirmation email to customer
   - Notify sales team of new lead

4. **Enhanced Tracking**
   - Add Facebook Pixel events
   - Implement Google Ads Enhanced Conversions
   - Send conversion data to Google Analytics 4

5. **Lead Scoring**
   - Score leads based on product interest
   - Prioritize high-value leads in CRM

---

## Contact

For questions or issues with the CRM integration:

- **Technical Issues:** Check Vercel logs and CRM error logs
- **Field Mapping Changes:** Edit `/src/pages/api/submit-lead.ts`
- **CRM Webhook Issues:** Check ASL CRM repository

---

**Last Updated:** January 16, 2025
**Integration Status:** ✅ Complete & Production Ready
