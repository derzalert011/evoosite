'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signupNewsletter } from '../actions/signup-newsletter';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      setIsLoading(false);
      return;
    }

    try {
      const result = await signupNewsletter(email);
      if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Thank you! Check your email for a special discount.' });
        setEmail('');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id='newsletter' className='py-20 bg-cream-50'>
      <div className='container-custom'>
        <div className='max-w-xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-extrabold uppercase text-navy-600 mb-4 tracking-wide'>
            Join Our Family
          </h2>
          <p className='text-gray-600 mb-8 font-normal normal-case'>
            Subscribe to receive exclusive offers, recipes, and stories from our grove.
          </p>

          {message?.type === 'success' ? (
            <div className='bg-navy-100 text-navy-700 p-6 rounded-lg'>
              <p className='font-semibold'>Welcome to the family!</p>
              <p className='text-sm mt-1 font-normal'>Check your inbox for a special welcome message.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
                required
                disabled={isLoading}
                className='input-field flex-1'
              />
              <button
                type='submit'
                disabled={isLoading}
                className='btn-primary whitespace-nowrap'
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}

          {message?.type === 'error' && (
            <p className='text-red-600 mt-4 font-normal'>Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
}

// Container component removed - using inline div