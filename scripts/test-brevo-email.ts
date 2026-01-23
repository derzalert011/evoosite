import { sendTransactionalEmail, BRAND_EMAIL, getAdminEmail } from '@/libs/resend/resend-client';

async function testResendEmail() {
  console.log('🧪 Testing Resend email setup...\n');

  try {
    const adminEmail = getAdminEmail();
    const resendApiKey = process.env.RESEND_API_KEY;

    console.log('📋 Configuration:');
    console.log(`   Admin Email: ${adminEmail}`);
    console.log(`   Brand Email: ${BRAND_EMAIL}`);
    console.log(`   Resend API Key: ${resendApiKey ? '✅ Set' : '❌ Missing'}\n`);

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set');
    }

    console.log('📧 Sending test email...');

    const result = await sendTransactionalEmail({
      to: [{ email: adminEmail }],
      subject: "🧪 Test Email from Angelica's EVOO",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>✅ Resend Email Test Successful!</h1>
            <p>This is a test email to verify that Resend email integration is working correctly.</p>
            <p>If you received this email, your email setup is working properly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Sent from:</strong> ${BRAND_EMAIL}</p>
          </body>
        </html>
      `,
    });

    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log(`   Message ID: ${result.messageId}`);
      console.log(`   Check your inbox at: ${adminEmail}`);
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (error: any) {
    console.error('❌ Error sending test email:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verify RESEND_API_KEY is correct in .env.local');
    console.error('   2. Check that the sender email is valid');
    console.error('   3. Ensure the API key has send permissions');
    process.exit(1);
  }
}

testResendEmail();
