'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendContactMessage } from '../actions/send-contact-message';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageState, setMessageState] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageState(null);

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessageState({ type: 'error', text: 'Please enter a valid email address' });
      setIsLoading(false);
      return;
    }

    if (!name.trim()) {
      setMessageState({ type: 'error', text: 'Please enter your name' });
      setIsLoading(false);
      return;
    }

    if (!message.trim()) {
      setMessageState({ type: 'error', text: 'Please enter a message' });
      setIsLoading(false);
      return;
    }

    try {
      const result = await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (result.error) {
        setMessageState({ type: 'error', text: result.error });
      } else {
        setMessageState({
          type: 'success',
          text: 'Thank you for your message! We\'ll get back to you soon.',
        });
        // Clear form
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setMessageState({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-cream-50 rounded-lg p-8 shadow-lg'>
      <h3 className='text-2xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>
        Send Us a Message
      </h3>
      {messageState?.type === 'success' ? (
        <div className='bg-navy-100 text-navy-700 p-6 rounded-lg'>
          <p className='font-semibold'>Message sent successfully!</p>
          <p className='text-sm mt-1 font-normal'>{messageState.text}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-navy-600 mb-2'>
              Name
            </label>
            <Input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className='input-field'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-navy-600 mb-2'>
              Email
            </label>
            <Input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className='input-field'
            />
          </div>
          <div>
            <label htmlFor='message' className='block text-sm font-medium text-navy-600 mb-2'>
              Message
            </label>
            <textarea
              id='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              disabled={isLoading}
              className='input-field resize-none'
            />
          </div>
          {messageState?.type === 'error' && (
            <p className='text-red-600 text-sm font-normal'>{messageState.text}</p>
          )}
          <button type='submit' disabled={isLoading} className='btn-primary w-full'>
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}