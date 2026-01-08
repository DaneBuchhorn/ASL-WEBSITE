/**
 * Delete Test Enquiries Script
 * Removes test enquiries from CRM database
 *
 * KEEPS: #173 (Calista Sim - real enquiry)
 * DELETES: #171-172, #174-210
 */

import 'dotenv/config';

const CRM_API_URL = process.env.CRM_API_URL || 'https://crm.allseasonsliving.com.au';
const CRM_API_KEY = process.env.CRM_WEBHOOK_API_KEY;

if (!CRM_API_KEY) {
  console.error('❌ CRM_WEBHOOK_API_KEY not found in .env file');
  process.exit(1);
}

// Enquiry numbers to delete (excluding #173 - Calista Sim)
const enquiryNumbersToDelete = [
  171, 172, // denied test enquiries
  ...Array.from({ length: 37 }, (_, i) => 174 + i) // 174-210
];

console.log(`🗑️  Deleting ${enquiryNumbersToDelete.length} test enquiries...`);
console.log(`📋 Enquiries to delete: ${enquiryNumbersToDelete.join(', ')}`);
console.log(`✅ Keeping: #173 (Calista Sim)\n`);

let successCount = 0;
let failCount = 0;

for (const enquiryNumber of enquiryNumbersToDelete) {
  try {
    console.log(`Deleting enquiry #${enquiryNumber}...`);

    const response = await fetch(`${CRM_API_URL}/api/enquiries/${enquiryNumber}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': CRM_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log(`  ✅ Deleted #${enquiryNumber}`);
      successCount++;
    } else if (response.status === 404) {
      console.log(`  ⚠️  #${enquiryNumber} not found (may already be deleted)`);
      successCount++;
    } else {
      const errorText = await response.text();
      console.error(`  ❌ Failed to delete #${enquiryNumber}: ${response.status} - ${errorText}`);
      failCount++;
    }

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));

  } catch (error) {
    console.error(`  ❌ Error deleting #${enquiryNumber}:`, error.message);
    failCount++;
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Successfully deleted: ${successCount}`);
console.log(`❌ Failed to delete: ${failCount}`);
console.log(`📊 Total processed: ${enquiryNumbersToDelete.length}`);
console.log('='.repeat(50));

if (failCount > 0) {
  process.exit(1);
}
