import * as brevo from '@getbrevo/brevo';

import { getEnvVar } from '@/utils/get-env-var';

let apiInstance: brevo.TransactionalEmailsApi | null = null;

export function getBrevoClient(): brevo.TransactionalEmailsApi {
  if (!apiInstance) {
    let apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
    
    // Decode base64 encoded API key if needed (Brevo keys start with 'xkeysib-')
    if (!apiKey.startsWith('xkeysib-')) {
      try {
        const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
        const parsed = JSON.parse(decoded);
        if (parsed.api_key) {
          apiKey = parsed.api_key;
        }
      } catch {
        // If decoding fails, use original key
      }
    }
    
    console.log(`🔑 Brevo API key configured: ${apiKey.substring(0, 15)}...`);
    
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
  
  // Get admin email to use as sender (must be verified in Brevo)
  // Brevo requires sender emails to be verified before use
  const adminEmail = process.env.ADMIN_EMAIL || 'derz.paz@gmail.com';
  
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.to = params.to;
  sendSmtpEmail.subject = params.subject;
  sendSmtpEmail.htmlContent = params.htmlContent;
  sendSmtpEmail.sender = params.from || {
    email: adminEmail,
    name: "Angelica's Organic EVOO",
  };
  
  if (params.replyTo) {
    sendSmtpEmail.replyTo = params.replyTo;
  }

  try {
    console.log(`📧 Sending email to: ${params.to.map(t => t.email).join(', ')}`);
    console.log(`   From: ${sendSmtpEmail.sender.email}`);
    console.log(`   Subject: ${params.subject}`);
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email sent successfully:`, result);
  } catch (error: any) {
    console.error('❌ Brevo email send failed:', error?.message || error);
    if (error?.response?.body) {
      console.error('   Brevo API Response:', JSON.stringify(error.response.body, null, 2));
    }
    throw error;
  }
}

export async function addContactToList(email: string, listId?: number): Promise<void> {
  let apiKey = getEnvVar(process.env.BREVO_API_KEY, 'BREVO_API_KEY');
  
  // Decode base64 encoded API key if needed
  if (!apiKey.startsWith('xkeysib-')) {
    try {
      const decoded = Buffer.from(apiKey, 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);
      if (parsed.api_key) {
        apiKey = parsed.api_key;
      }
    } catch {
      // If decoding fails, use original key
    }
  }
  
  const apiInstance = new brevo.ContactsApi();
  apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey);

  const createContact = new brevo.CreateContact();
  createContact.email = email;
  createContact.listIds = listId ? [listId] : undefined;

  try {
    console.log(`📇 Adding contact to Brevo: ${email}`);
    await apiInstance.createContact(createContact);
    console.log(`✅ Contact added successfully: ${email}`);
  } catch (error: any) {
    // If contact already exists, that's okay - just log it
    if (error?.response?.body?.code === 'duplicate_parameter') {
      console.info(`ℹ️ Contact ${email} already exists in Brevo`);
    } else {
      console.error(`❌ Failed to add contact: ${email}`, error?.response?.body || error?.message);
      throw error;
    }
  }
}