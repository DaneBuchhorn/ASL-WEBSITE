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
          from: 'All Seasons Living <dane@allseasonsliving.com.au>',
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
 * Format lead data into HTML email
 */
function formatLeadEmail(submission: FormSubmission): string {
  return `
    <h2>🎯 New Lead Submission</h2>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${submission.lead.name}</li>
      <li><strong>Email:</strong> ${submission.lead.email}</li>
      <li><strong>Phone:</strong> ${submission.lead.phone}</li>
      <li><strong>Suburb:</strong> ${submission.lead.suburb}</li>
      <li><strong>Product:</strong> ${submission.lead.product}</li>
      <li><strong>Best Time:</strong> ${submission.lead.bestTime || 'Not specified'}</li>
      <li><strong>Message:</strong> ${submission.lead.message || 'None'}</li>
    </ul>

    <h3>📊 Marketing Attribution</h3>
    <ul>
      <li><strong>Source:</strong> ${submission.tracking.utmSource || 'Direct'}</li>
      <li><strong>Medium:</strong> ${submission.tracking.utmMedium || 'None'}</li>
      <li><strong>Campaign:</strong> ${submission.tracking.utmCampaign || 'None'}</li>
      <li><strong>Google Click ID:</strong> ${submission.tracking.gclid || 'N/A'}</li>
      <li><strong>Facebook Click ID:</strong> ${submission.tracking.fbclid || 'N/A'}</li>
    </ul>

    <h3>🕐 Timing</h3>
    <ul>
      <li><strong>Date:</strong> ${submission.tracking.submissionDate}</li>
      <li><strong>Time:</strong> ${submission.tracking.submissionTime}</li>
      <li><strong>Day:</strong> ${submission.tracking.submissionDayOfWeek}</li>
    </ul>

    <h3>📱 Device Information</h3>
    <ul>
      <li><strong>Device:</strong> ${submission.tracking.deviceType}</li>
      <li><strong>OS:</strong> ${submission.tracking.operatingSystem}</li>
      <li><strong>Browser:</strong> ${submission.tracking.browser} ${submission.tracking.browserVersion}</li>
    </ul>

    <h3>🌐 Page Information</h3>
    <ul>
      <li><strong>Submitted From:</strong> ${submission.tracking.sourcePage}</li>
      <li><strong>Referrer:</strong> ${submission.tracking.referrer}</li>
      <li><strong>Time on Page:</strong> ${submission.tracking.timeOnPage}s</li>
      <li><strong>Scroll Depth:</strong> ${submission.tracking.scrollDepth}%</li>
    </ul>
  `;
}
