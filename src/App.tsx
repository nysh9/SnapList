import WaitlistForm from './WaitlistForm';
import ListingDemo from './ListingDemo';

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Depop · Poshmark · eBay · Vinted</p>
        <h1>Photograph it once. Price it from what actually sold — everywhere.</h1>
        <p className="subhead">
          Pricing a resale piece means digging through completed listings on eBay, then Poshmark,
          then Depop, one tab at a time. SnapList does it in one shot: snap a photo, and it prices
          the item from what it actually sold for across every marketplace, writes a listing tuned
          to each one, and flags which photo will pull the most clicks.
        </p>
        <WaitlistForm />
        <p className="fine-print">Free during early access. One email when it opens, nothing else.</p>
      </header>

      <ListingDemo />

      <section className="pains" aria-label="What it handles">
        <div className="pain">
          <h2>1. One price, from every marketplace's real sales</h2>
          <p>
            Each app only sees its own data — eBay's tools price for eBay, Poshmark's for Poshmark.
            SnapList aggregates what the same piece actually sold for across all of them into one
            confidence-scored number, so you're not eyeballing it or scrolling completed listings
            four tabs at a time.
          </p>
        </div>
        <div className="pain">
          <h2>2. A listing written for each marketplace</h2>
          <p>
            One photo, a listing tuned to where it's going — Depop's hashtags, eBay's SEO keywords,
            Grailed's streetwear tone. A single generic blurb reads wrong everywhere; this matches
            how each platform's buyers actually search.
          </p>
        </div>
        <div className="pain">
          <h2>3. The photo most likely to get clicked</h2>
          <p>
            Photos move resale more than any caption. SnapList flags your strongest shot and what's
            missing — the label close-up, the flaw shot, better light — so the listing looks the
            part before it goes up.
          </p>
        </div>
      </section>

      <section className="flow" aria-label="How it works">
        <p>
          <strong>Snap a photo → get a price, then the listing.</strong> That's the whole loop. It
          works the same whether you're cross-posting to four marketplaces or just clearing out a
          closet.
        </p>
      </section>

      <section className="note" aria-label="About">
        <p>
          I'm building this in the open because the existing tools are either $30+ a month or barely
          work. If that's a problem you have, leave your email and I'll pull you in early. Honest
          feedback is the whole point right now.
        </p>
        <p className="signoff">
          <a href="https://github.com/nysh9/SnapList" target="_blank" rel="noreferrer">
            Follow the build on GitHub
          </a>
        </p>
      </section>
    </div>
  );
}
