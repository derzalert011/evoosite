import { Resend } from 'resend';

import { getEnvVar } from '@/utils/get-env-var';

// Resend client for transactional emails
let resendInstance: Resend | null = null;

// Brand email - used for sending all transactional emails
// Note: For Resend, you must use a verified domain. Using onboarding@resend.dev for testing.
// Once you verify your domain in Resend, update this to your brand email.
export const BRAND_EMAIL = 'onboarding@resend.dev';
export const BRAND_NAME = "Angelica's Organic EVOO";

// Admin email - receives order notifications and contact form submissions
export const getAdminEmail = () => process.env.ADMIN_EMAIL || BRAND_EMAIL;

export function getResendClient(): Resend {
  if (!resendInstance) {
    const apiKey = getEnvVar(process.env.RESEND_API_KEY, 'RESEND_API_KEY');
    resendInstance = new Resend(apiKey);
    console.log('🔑 Resend client initialized');
  }
  return resendInstance;
}

export async function sendTransactionalEmail(params: {
  to: Array<{ email: string; name?: string }>;
  subject: string;
  html: string;
  from?: { email: string; name: string };
  replyTo?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const resend = getResendClient();

  const fromEmail = params.from?.email || BRAND_EMAIL;
  const fromName = params.from?.name || BRAND_NAME;

  try {
    console.log(`📧 Sending email via Resend:`);
    console.log(`   To: ${params.to.map((t) => t.email).join(', ')}`);
    console.log(`   From: ${fromName} <${fromEmail}>`);
    console.log(`   Subject: ${params.subject}`);

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: params.to.map((t) => t.email),
      subject: params.subject,
      html: params.html,
      replyTo: params.replyTo,
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Email sent successfully! Message ID: ${data?.id}`);
    return { success: true, messageId: data?.id };
  } catch (error: any) {
    console.error('❌ Resend email failed:', error?.message || error);
    return { success: false, error: error?.message || 'Unknown error' };
  }
}
