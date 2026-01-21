import { sendTransactionalEmail } from '@/libs/brevo/brevo-client';
import { getEnvVar } from '@/utils/get-env-var';

async function testBrevoEmail() {
  console.log('🧪 Testing Brevo email setup...\n');

  try {
    const adminEmail = getEnvVar(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL');
    const brevoApiKey = process.env.BREVO_API_KEY;

    console.log('📋 Configuration:');
    console.log(`   Admin Email: ${adminEmail}`);
    console.log(`   Brevo API Key: ${brevoApiKey ? '✅ Set' : '❌ Missing'}\n`);

    if (!brevoApiKey) {
      throw new Error('BREVO_API_KEY is not set');
    }

    console.log('📧 Sending test email...');

    await sendTransactionalEmail({
      to: [{ email: adminEmail }],
      subject: '🧪 Test Email from Angelica\'s EVOO',
      htmlContent: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <h1>✅ Brevo Email Test Successful!</h1>
            <p>This is a test email to verify that Brevo email integration is working correctly.</p>
            <p>If you received this email, your Brevo setup is working properly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </body>
        </html>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Check your inbox at: ${adminEmail}`);
  } catch (error: any) {
    console.error('❌ Error sending test email:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Response:', JSON.stringify(error.response.body, null, 2));
    }
    if (error.body) {
      console.error('   Error Body:', JSON.stringify(error.body, null, 2));
    }
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verify BREVO_API_KEY is correct in .env.local');
    console.error('   2. Check that the sender email (no-reply@angelicas-evoo.com) is verified in Brevo');
    console.error('   3. Ensure the API key has "Send Email" permissions');
    process.exit(1);
  }
}

testBrevoEmail();
