'use server';

import { render } from '@react-email/render';

import { sendTransactionalEmail } from '@/libs/brevo/brevo-client';
import { getEnvVar } from '@/utils/get-env-var';
import { ContactFormEmail } from '../emails/contact-form-email';
import type { ActionResponse } from '@/types/action-response';

export async function sendContactMessage(params: {
  name: string;
  email: string;
  message: string;
}): Promise<ActionResponse> {
  try {
    const adminEmail = getEnvVar(process.env.ADMIN_EMAIL, 'ADMIN_EMAIL');

    // Render email template
    const emailHtml = await render(
      ContactFormEmail({
        name: params.name,
        email: params.email,
        message: params.message,
      })
    );

    // Send email to admin
    await sendTransactionalEmail({
      to: [{ email: adminEmail, name: 'Admin' }],
      subject: `New Contact Form Submission from ${params.name}`,
      htmlContent: emailHtml,
      from: {
        email: 'no-reply@angelicas-evoo.com',
        name: "Angelica's Organic EVOO",
      },
      replyTo: {
        email: params.email,
        name: params.name,
      },
    });

    return { data: { success: true }, error: null };
  } catch (error: any) {
    console.error('Error sending contact form email:', error);
    return {
      data: null,
      error: error?.message || 'Failed to send message. Please try again later.',
    };
  }
}