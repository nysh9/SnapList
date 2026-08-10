import { FormEvent, useState } from 'react';

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ENDPOINT) {
      console.error(
        'VITE_WAITLIST_ENDPOINT is not set. Add it to .env.local (see .env.example).',
      );
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="waitlist-success" role="status">
        You're on the list — we'll email you when early access opens.
      </p>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'submitting'}
      />
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Joining…' : 'Get early access'}
      </button>
      {status === 'error' && (
        <p className="waitlist-error" role="alert">
          Something went wrong — try again in a moment.
        </p>
      )}
    </form>
  );
}
