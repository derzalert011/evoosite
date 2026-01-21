'use server';

import { addContactToList } from '@/libs/brevo/brevo-client';

export async function signupNewsletter(email: string): Promise<{ error?: string }> {
  // Server-side email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address' };
  }

  try {
    // Add contact to Brevo (no list ID specified - will be added to default list or configured later)
    await addContactToList(email);
    return {};
  } catch (error: any) {
    console.error('Newsletter signup error:', error);
    return { error: 'Failed to sign up. Please try again.' };
  }
}