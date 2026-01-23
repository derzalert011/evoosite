'use server';

import { render } from '@react-email/render';

import { sendTransactionalEmail, getAdminEmail, BRAND_EMAIL, BRAND_NAME } from '@/libs/resend/resend-client';
import { ContactFormEmail } from '../emails/contact-form-email';
import type { ActionResponse } from '@/types/action-response';

export async function sendContactMessage(params: {
  name: string;
  email: string;
  message: string;
}): Promise<ActionResponse> {
  try {
    const adminEmail = getAdminEmail();

    // Render email template
    const emailHtml = await render(
      ContactFormEmail({
        name: params.name,
        email: params.email,
        message: params.message,
      })
    );

    // Send email to admin via Resend
    const result = await sendTransactionalEmail({
      to: [{ email: adminEmail, name: 'Admin' }],
      subject: `New Contact Form Submission from ${params.name}`,
      html: emailHtml,
      from: {
        email: BRAND_EMAIL,
        name: BRAND_NAME,
      },
      replyTo: params.email,
    });

    if (!result.success) {
      throw new Error(result.error || 'Failed to send email');
    }

    return { data: { success: true }, error: null };
  } catch (error: any) {
    console.error('Error sending contact form email:', error);
    return {
      data: null,
      error: error?.message || 'Failed to send message. Please try again later.',
    };
  }
}
