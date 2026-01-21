import * as brevo from '@getbrevo/brevo';

import { getEnvVar } from '@/utils/get-env-var';

let apiInstance: brevo.TransactionalEmailsApi | null = null;

export function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (!apiInstance) {
    const apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
    
    apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
  }
  
  return apiInstance;
}

export async function sendTransactionalEmail(params: {
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  from?: { email: string; name: string };
  replyTo?: { email: string; name?: string };
}): Promise<void> {
  const apiInstance = getBrevoClient();
  
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.to = params.to;
  sendSmtpEmail.subject = params.subject;
  sendSmtpEmail.htmlContent = params.htmlContent;
  sendSmtpEmail.sender = params.from || {
    email: 'no-reply@angelicas-evoo.com',
    name: "Angelica's Organic EVOO",
  };
  
  if (params.replyTo) {
    sendSmtpEmail.replyTo = params.replyTo;
  }

  await apiInstance.sendTransacEmail(sendSmtpEmail);
}

export async function addContactToList(email: string, listId?: number): Promise<void> {
  const apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
  
  const apiInstance = new brevo.ContactsApi();
  apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey);

  const createContact = new brevo.CreateContact();
  createContact.email = email;
  createContact.listIds = listId ? [listId] : undefined;

  try {
    await apiInstance.createContact(createContact);
  } catch (error: any) {
    // If contact already exists, that's okay - just log it
    if (error?.response?.body?.code === 'duplicate_parameter') {
      console.info(`Contact ${email} already exists in list`);
    } else {
      throw error;
    }
  }
}