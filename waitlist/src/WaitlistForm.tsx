import { FormEvent, useState } from 'react';

// Web3Forms access key. Safe to expose client-side (it only lets people POST to
// *your* form), but kept in env so it's not hard-coded. Set VITE_WEB3FORMS_KEY
// in .env.local for dev and in the Amplify console for production.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot: a real person never fills this hidden field, a bot fills everything.
    // Pretend it succeeded so the bot doesn't retry, but send nothing.
    if (botcheck) {
      setStatus('success');
      return;
    }

    if (!ACCESS_KEY) {
      console.error('VITE_WEB3FORMS_KEY is not set. Add it to .env.local (see .env.example).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          email,
          subject: 'New SnapList waitlist signup',
          from_name: 'SnapList waitlist',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || `Request failed: ${res.status}`);
      }
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
      {/* Honeypot — hidden from real users, catches bots. */}
      <input
        type="text"
        name="botcheck"
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
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
