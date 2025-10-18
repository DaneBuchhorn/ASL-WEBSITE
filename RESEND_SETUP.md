# Email Notifications Setup (Resend)

This guide will help you set up email notifications for form submissions using Resend.

## What You'll Get

Every time someone submits a form on your website, you'll receive an email at **dane@allseasonsliving.com.au** with:

- Contact information (name, email, phone, suburb)
- Product interest
- Marketing attribution (UTM parameters, Google/Facebook click IDs)
- Device and browser information
- Page behavior (time on page, scroll depth)
- Full tracking data for lead analysis

---

## Step 1: Create a Resend Account

1. Go to https://resend.com/
2. Click **"Sign Up"** (it's free to start - 100 emails/day, 3,000/month)
3. Sign up with your email or GitHub account

---

## Step 2: Verify Your Domain

For emails to work properly, you need to verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **"Add Domain"**
3. Enter: `allseasonsliving.com.au`
4. Resend will show you DNS records to add

**Add these DNS records to your domain:**
- **DKIM** records (usually 3 TXT records)
- **SPF** record (TXT record)
- **DMARC** record (TXT record - optional but recommended)

**Where to add DNS records:**
- Log into your domain registrar (where you bought allseasonsliving.com.au)
- Go to DNS settings
- Add the records Resend provides
- Wait 10-30 minutes for DNS propagation

---

## Step 3: Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Name it: "ASL Website Lead Notifications"
4. **Copy the API key** (you'll only see it once!)

---

## Step 4: Add API Key to Your Project

### For Local Development:

1. Open `.env` file in your project
2. Replace `your_resend_api_key_here` with your actual API key:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### For Vercel Production:

1. Go to https://vercel.com/
2. Select your project: **asl-website**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environment:** Select all (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy your site** for changes to take effect

---

## Step 5: Test It!

1. Go to your website: https://asl-website-opal.vercel.app/
2. Fill out and submit a form
3. Check your email at **dane@allseasonsliving.com.au**

**Expected result:**
- Email subject: `🎯 New Lead: [Name] - [Product]`
- Comprehensive lead details with full tracking data

---

## Troubleshooting

### Not receiving emails?

**Check:**
1. **Spam folder** - Resend emails might go to spam initially
2. **Domain verification** - Make sure DNS records are added and verified (green checkmark in Resend)
3. **API key** - Verify it's correctly added to Vercel environment variables
4. **Deployment** - Redeploy your Vercel site after adding the API key
5. **Logs** - Check Vercel function logs for errors

### How to check logs:

1. Go to Vercel dashboard → Your project
2. Click **Deployments** → Latest deployment
3. Click **Functions** → Find `/api/submit-lead`
4. Check for errors or email sending confirmations

---

## Pricing

**Resend Free Tier:**
- 100 emails per day
- 3,000 emails per month
- Perfect for lead notifications

**If you exceed limits:**
- Pay-as-you-go: $1 per 1,000 emails
- Or upgrade to paid plan for higher limits

For your use case (lead notifications), the free tier should be more than sufficient!

---

## Support

- Resend docs: https://resend.com/docs
- Resend support: support@resend.com
- Need help? Check Vercel logs or contact Resend support

---

**That's it!** Your form submissions will now be emailed to dane@allseasonsliving.com.au 🎉
