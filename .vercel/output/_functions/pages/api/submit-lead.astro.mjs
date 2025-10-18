export { renderers } from '../../renderers.mjs';

const POST = async ({ request, clientAddress }) => {
  try {
    const submission = await request.json();
    const enrichedSubmission = {
      ...submission,
      tracking: {
        ...submission.tracking,
        ipAddress: clientAddress,
        // Server-side IP capture
        serverTimestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    console.log("=== NEW LEAD SUBMISSION ===");
    console.log(JSON.stringify(enrichedSubmission, null, 2));
    console.log("===========================");
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
      ].filter(Boolean).join("\n\n") || null,
      // Source identification
      source: "New Website",
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
      languages: Array.isArray(enrichedSubmission.tracking.languages) ? enrichedSubmission.tracking.languages.join(", ") : enrichedSubmission.tracking.languages || null,
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
      deviceModel: enrichedSubmission.tracking.deviceModel || null
    };
    const crmApiKey = "D4gF7hJ0kL3nM6pR9sT2vX5yA8cE1fH4jK7mP0qS3u6=";
    const crmEndpoint = "https://crm.allseasonsliving.com.au/api/webhooks/enquiry";
    if (!crmApiKey || !crmEndpoint) ;
    const crmResponse = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": crmApiKey
      },
      body: JSON.stringify(crmPayload)
    });
    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error("CRM webhook error:", errorText);
      throw new Error(`CRM webhook failed: ${crmResponse.status} ${errorText}`);
    }
    const crmResult = await crmResponse.json();
    console.log("✅ Successfully sent to CRM:", crmResult);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Lead submitted successfully",
        leadId: `LEAD-${Date.now()}`
        // Generate a unique ID
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error processing lead submission:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error processing submission",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
