'use server';

import { addContactToList } from '@/libs/brevo/brevo-client';
import { sendTransactionalEmail, BRAND_EMAIL } from '@/libs/resend/resend-client';
import { BRAND_VOICE } from '@/lib/brand-config';

export async function signupNewsletter(email: string): Promise<{ error?: string }> {
  // Server-side email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  try {
    // Add contact to Brevo for list management
    await addContactToList(email);
    console.log(`✅ Newsletter signup: ${email} added to Brevo list`);

    // Send welcome email via Resend
    try {
      const welcomeEmailHtml = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #001B71;">Welcome to the Family!</h1>
            <p>Thank you for joining Angelica's Organic EVOO newsletter. We're excited to share our story, recipes, and exclusive offers with you.</p>
            <p>As a special welcome, here's a discount code for your first order:</p>
            <div style="background-color: #F7D63A; padding: 20px; text-align: center; margin: 20px 0; border-radius: 5px;">
              <p style="font-size: 24px; font-weight: bold; color: #001B71; margin: 0;">WELCOME10</p>
              <p style="margin: 10px 0 0 0; color: #001B71;">10% off your first order</p>
            </div>
            <p>${BRAND_VOICE.signatureClosings.emails}</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">You can unsubscribe at any time by clicking the link in our emails.</p>
          </body>
        </html>
      `;

      const result = await sendTransactionalEmail({
        to: [{ email }],
        subject: 'Welcome to the Family! 🫒',
        html: welcomeEmailHtml,
        replyTo: BRAND_EMAIL,
      });

      if (result.success) {
        console.log(`✅ Welcome email sent to: ${email}`);
      } else {
        console.error(`⚠️ Failed to send welcome email: ${result.error}`);
      }
    } catch (emailError: any) {
      console.error('⚠️ Failed to send welcome email (newsletter signup still succeeded):', emailError);
      // Don't fail the signup if email fails
    }

    return {};
  } catch (error: any) {
    console.error('❌ Newsletter signup error:', error);
    if (error.response) {
      console.error('   API Response:', JSON.stringify(error.response.body, null, 2));
    }
    return { error: 'Failed to sign up. Please try again.' };
  }
}
