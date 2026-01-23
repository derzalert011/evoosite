import * as brevo from '@getbrevo/brevo';

import { getEnvVar } from '@/utils/get-env-var';

// Brevo is used ONLY for contact list management (newsletter signups)
// Transactional emails are sent via Resend

let contactsApiInstance: brevo.ContactsApi | null = null;

function getBrevoApiKey(): string {
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

  return apiKey;
}

export function getBrevoContactsClient(): brevo.ContactsApi {
  if (!contactsApiInstance) {
    const apiKey = getBrevoApiKey();
    console.log(`🔑 Brevo Contacts API configured: ${apiKey.substring(0, 15)}...`);

    contactsApiInstance = new brevo.ContactsApi();
    contactsApiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, apiKey);
  }

  return contactsApiInstance;
}

export async function addContactToList(email: string, listId?: number): Promise<void> {
  const apiInstance = getBrevoContactsClient();

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
