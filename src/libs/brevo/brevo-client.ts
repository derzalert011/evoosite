import * as brevo from '@getbrevo/brevo';

import { getEnvVar } from '@/utils/get-env-var';

let apiInstance: brevo.TransactionalEmailsApi | null = null;

export function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (!apiInstance) {
    let apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
    
    // Check if API key is base64 encoded and decode it if needed
    // Brevo API keys typically start with 'xkeysib-' when decoded
    try {
      // Try to decode if it looks like base64
      if (apiKey.length > 50 && !apiKey.startsWith('xkeysib-')) {
        const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
        // If decoded value looks like JSON with api_key, extract it
        try {
          const parsed = JSON.parse(decoded);
          if (parsed.api_key) {
            apiKey = parsed.api_key;
          }
        } catch {
          // If not JSON, use decoded value if it starts with xkeysib-
          if (decoded.startsWith('xkeysib-')) {
            apiKey = decoded;
          }
        }
      }
    } catch {
      // If decoding fails, use original key
    }
    
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
  let apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
  
  // Check if API key is base64 encoded and decode it if needed
  try {
    if (apiKey.length > 50 && !apiKey.startsWith('xkeysib-')) {
      const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
      try {
        const parsed = JSON.parse(decoded);
        if (parsed.api_key) {
          apiKey = parsed.api_key;
        }
      } catch {
        if (decoded.startsWith('xkeysib-')) {
          apiKey = decoded;
        }
      }
    }
  } catch {
    // If decoding fails, use original key
  }
  
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