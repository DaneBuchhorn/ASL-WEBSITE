/**
 * API Endpoint for Lead Submission
 * Handles form submissions with comprehensive tracking data
 *
 * POST /api/submit-lead
 */

import type { APIRoute } from 'astro';
import type { FormSubmission } from '../../utils/formTracking';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Parse the request body
    const submission: FormSubmission = await request.json();

    // Add server-side data
    const enrichedSubmission = {
      ...submission,
      tracking: {
        ...submission.tracking,
        ipAddress: clientAddress, // Server-side IP capture
        serverTimestamp: new Date().toISOString(),
      }
    };

    // Log to console for debugging
    console.log('=== NEW LEAD SUBMISSION ===');
    console.log(JSON.stringify(enrichedSubmission, null, 2));
    console.log('===========================');

    // Transform data to match CRM webhook expected format
    const crmPayload = {
      // Contact Information
      firstName: enrichedSubmission.lead.name,
      email: enrichedSubmission.lead.email,
      phone1: enrichedSubmission.lead.phone,
      suburb: enrichedSubmission.lead.suburb,
      product: enrichedSubmission.lead.product,

      // Combine bestTime and message into notes field
      notes: [
        enrichedSubmission.lead.bestTime ? `Best time to call: ${enrichedSubmission.lead.bestTime}` : null,
        enrichedSubmission.lead.message || null
      ].filter(Boolean).join('\n\n') || null,

      // Source identification
      source: 'New Website',

      // Lead Source Tracking (mapped to CRM fields)
      campaign: enrichedSubmission.tracking.utmCampaign || null,
      subSource: enrichedSubmission.tracking.utmSource || enrichedSubmission.tracking.utmMedium || null,
      landingPage: enrichedSubmission.tracking.sourcePage || null,
      ipAddress: enrichedSubmission.tracking.ipAddress || null,

      // Additional Tracking Data (CRM dedicated fields)
      referrer: enrichedSubmission.tracking.referrer || null,
      userAgent: enrichedSubmission.tracking.userAgent || null,
      utmTerm: enrichedSubmission.tracking.utmTerm || null,
      utmContent: enrichedSubmission.tracking.utmContent || null,

      // Comprehensive Tracking Data (all fields from formTracking.ts)
      submissionTimestamp: enrichedSubmission.tracking.submissionTimestamp || null,
      submissionDate: enrichedSubmission.tracking.submissionDate || null,
      submissionTime: enrichedSubmission.tracking.submissionTime || null,
      submissionDayOfWeek: enrichedSubmission.tracking.submissionDayOfWeek || null,
      timezone: enrichedSubmission.tracking.timezone || null,
      sessionDuration: enrichedSubmission.tracking.sessionDuration || null,
      sourcePage: enrichedSubmission.tracking.sourcePage || null,
      pageTitle: enrichedSubmission.tracking.pageTitle || null,
      formId: enrichedSubmission.tracking.formId || null,
      formType: enrichedSubmission.tracking.formType || null,
      utmSource: enrichedSubmission.tracking.utmSource || null,
      utmMedium: enrichedSubmission.tracking.utmMedium || null,
      utmCampaign: enrichedSubmission.tracking.utmCampaign || null,
      gclid: enrichedSubmission.tracking.gclid || null,
      gbraid: enrichedSubmission.tracking.gbraid || null,
      wbraid: enrichedSubmission.tracking.wbraid || null,
      fbclid: enrichedSubmission.tracking.fbclid || null,
      fbp: enrichedSubmission.tracking.fbp || null,
      fbc: enrichedSubmission.tracking.fbc || null,
      deviceType: enrichedSubmission.tracking.deviceType || null,
      operatingSystem: enrichedSubmission.tracking.operatingSystem || null,
      browser: enrichedSubmission.tracking.browser || null,
      browserVersion: enrichedSubmission.tracking.browserVersion || null,
      screenResolution: enrichedSubmission.tracking.screenResolution || null,
      viewportSize: enrichedSubmission.tracking.viewportSize || null,
      language: enrichedSubmission.tracking.language || null,
      languages: Array.isArray(enrichedSubmission.tracking.languages)
        ? enrichedSubmission.tracking.languages.join(', ')
        : enrichedSubmission.tracking.languages || null,
      connectionType: enrichedSubmission.tracking.connectionType || null,
      scrollDepth: enrichedSubmission.tracking.scrollDepth || null,
      timeOnPage: enrichedSubmission.tracking.timeOnPage || null,
      gaClientId: enrichedSubmission.tracking.gaClientId || null,
      sessionId: enrichedSubmission.tracking.sessionId || null,
      adPosition: enrichedSubmission.tracking.adPosition || null,
      keyword: enrichedSubmission.tracking.keyword || null,
      matchType: enrichedSubmission.tracking.matchType || null,
      network: enrichedSubmission.tracking.network || null,
      placement: enrichedSubmission.tracking.placement || null,
      deviceModel: enrichedSubmission.tracking.deviceModel || null,
    };

    // Send to ASL CRM webhook endpoint
    const crmApiKey = import.meta.env.CRM_WEBHOOK_API_KEY;
    const crmEndpoint = import.meta.env.CRM_WEBHOOK_URL;

    if (!crmApiKey || !crmEndpoint) {
      console.error('CRM configuration missing! Check .env file for CRM_WEBHOOK_API_KEY and CRM_WEBHOOK_URL');
      throw new Error('CRM integration not configured');
    }

    const crmResponse = await fetch(crmEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': crmApiKey
      },
      body: JSON.stringify(crmPayload)
    });

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error('CRM webhook error:', errorText);
      throw new Error(`CRM webhook failed: ${crmResponse.status} ${errorText}`);
    }

    const crmResult = await crmResponse.json();
    console.log('✅ Successfully sent to CRM:', crmResult);

    // Send email notification
    try {
      const resendApiKey = import.meta.env.RESEND_API_KEY;

      if (resendApiKey) {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from: 'All Seasons Living <leads@allseasonsliving.com.au>',
          to: ['dane@allseasonsliving.com.au'],
          subject: `🎯 New Lead: ${enrichedSubmission.lead.name} - ${enrichedSubmission.lead.product}`,
          html: formatLeadEmail(enrichedSubmission)
        });

        console.log('✅ Email notification sent to dane@allseasonsliving.com.au');
      } else {
        console.warn('⚠️  RESEND_API_KEY not configured - skipping email notification');
      }
    } catch (emailError) {
      console.error('❌ Failed to send email notification:', emailError);
      // Don't fail the entire request if email fails
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Lead submitted successfully',
        leadId: `LEAD-${Date.now()}` // Generate a unique ID
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error processing lead submission:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error processing submission',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

/**
 * Format lead data into HTML email with logo and structured layout
 */
function formatLeadEmail(submission: FormSubmission): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #5a6e45 0%, #4a5c38 100%);
          padding: 30px 20px;
          text-align: center;
        }
        .logo {
          max-width: 200px;
          height: auto;
        }
        .title {
          background-color: #5a6e45;
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .section {
          padding: 0 20px 10px;
        }
        .section-title {
          color: #5a6e45;
          font-size: 18px;
          font-weight: 700;
          margin: 20px 0 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e8e0;
        }
        .data-row {
          display: flex;
          padding: 12px 15px;
          margin-bottom: 2px;
          border-radius: 4px;
        }
        .data-row:nth-child(odd) {
          background-color: #f8f9f6;
        }
        .data-row:nth-child(even) {
          background-color: #ffffff;
        }
        .data-label {
          font-weight: 600;
          color: #333;
          min-width: 140px;
          flex-shrink: 0;
        }
        .data-value {
          color: #666;
          flex-grow: 1;
        }
        .footer {
          background-color: #f8f9f6;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
          margin-top: 20px;
        }
        .highlight {
          background-color: #fff4e6;
          border-left: 4px solid #5a6e45;
          padding: 12px 15px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
          <img src="https://allseasonsliving.com.au/assets/logos/asl-logo-light.svg" alt="All Seasons Living" class="logo">
        </div>

        <!-- Title -->
        <h1 class="title">New Lead Submission</h1>

        <!-- Contact Information -->
        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          <div class="data-row">
            <span class="data-label">Name</span>
            <span class="data-value">${submission.lead.name}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Email</span>
            <span class="data-value"><a href="mailto:${submission.lead.email}" style="color: #5a6e45; text-decoration: none;">${submission.lead.email}</a></span>
          </div>
          <div class="data-row">
            <span class="data-label">Phone</span>
            <span class="data-value"><a href="tel:${submission.lead.phone}" style="color: #5a6e45; text-decoration: none;">${submission.lead.phone}</a></span>
          </div>
          <div class="data-row">
            <span class="data-label">Suburb</span>
            <span class="data-value">${submission.lead.suburb}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Product Interest</span>
            <span class="data-value"><strong>${submission.lead.product}</strong></span>
          </div>
          ${submission.lead.bestTime ? `
          <div class="data-row">
            <span class="data-label">Best Time to Call</span>
            <span class="data-value">${submission.lead.bestTime}</span>
          </div>
          ` : ''}
          ${submission.lead.message ? `
          <div class="highlight">
            <strong>Message:</strong><br>
            ${submission.lead.message}
          </div>
          ` : ''}
        </div>

        <!-- Marketing Attribution -->
        <div class="section">
          <h2 class="section-title">Marketing Attribution</h2>
          <div class="data-row">
            <span class="data-label">Source</span>
            <span class="data-value">${submission.tracking.utmSource || 'Direct'}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Medium</span>
            <span class="data-value">${submission.tracking.utmMedium || 'None'}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Campaign</span>
            <span class="data-value">${submission.tracking.utmCampaign || 'None'}</span>
          </div>
          ${submission.tracking.gclid ? `
          <div class="data-row">
            <span class="data-label">Google Click ID</span>
            <span class="data-value">${submission.tracking.gclid}</span>
          </div>
          ` : ''}
          ${submission.tracking.fbclid ? `
          <div class="data-row">
            <span class="data-label">Facebook Click ID</span>
            <span class="data-value">${submission.tracking.fbclid}</span>
          </div>
          ` : ''}
        </div>

        <!-- Timing -->
        <div class="section">
          <h2 class="section-title">Submission Timing</h2>
          <div class="data-row">
            <span class="data-label">Date</span>
            <span class="data-value">${submission.tracking.submissionDate}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Time</span>
            <span class="data-value">${submission.tracking.submissionTime}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Day of Week</span>
            <span class="data-value">${submission.tracking.submissionDayOfWeek}</span>
          </div>
        </div>

        <!-- Device & Browser -->
        <div class="section">
          <h2 class="section-title">Device & Browser</h2>
          <div class="data-row">
            <span class="data-label">Device Type</span>
            <span class="data-value">${submission.tracking.deviceType}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Operating System</span>
            <span class="data-value">${submission.tracking.operatingSystem}</span>
          </div>
          <div class="data-row">
            <span class="data-label">Browser</span>
            <span class="data-value">${submission.tracking.browser} ${submission.tracking.browserVersion}</span>
          </div>
        </div>

        <!-- Page Information -->
        <div class="section">
          <h2 class="section-title">Page Information</h2>
          <div class="data-row">
            <span class="data-label">Submitted From</span>
            <span class="data-value">${submission.tracking.sourcePage}</span>
          </div>
          ${submission.tracking.referrer ? `
          <div class="data-row">
            <span class="data-label">Referrer</span>
            <span class="data-value">${submission.tracking.referrer}</span>
          </div>
          ` : ''}
          <div class="data-row">
            <span class="data-label">Time on Page</span>
            <span class="data-value">${submission.tracking.timeOnPage}s</span>
          </div>
          <div class="data-row">
            <span class="data-label">Scroll Depth</span>
            <span class="data-value">${submission.tracking.scrollDepth}%</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>This lead was submitted via allseasonsliving.com.au</p>
          <p>&copy; ${new Date().getFullYear()} All Seasons Living Australia</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
