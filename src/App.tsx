import WaitlistForm from './WaitlistForm';

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Depop · Poshmark · eBay · Vinted</p>
        <h1>Photograph it once. Skip the listing busywork.</h1>
        <p className="subhead">
          You know the drill: shoot the jacket, fight the background remover, dig through sold
          listings to price it, then write a title that'll actually get found. SnapList does that
          part. You take one photo; it hands back a title, description, tags, a price based on real
          sold comps, and a clean cutout.
        </p>
        <WaitlistForm />
        <p className="fine-print">Free during early access. One email when it opens, nothing else.</p>
      </header>

      <section className="pains" aria-label="What it handles">
        <div className="pain">
          <h2>Pricing without the 20-minute rabbit hole</h2>
          <p>
            It pulls what comparable items actually sold for and suggests a number, so you're not
            eyeballing it or scrolling completed listings across four apps.
          </p>
        </div>
        <div className="pain">
          <h2>Titles &amp; descriptions that get found</h2>
          <p>
            Real keywords for how people search resale, not filler. Copy them straight into the
            listing, tweak if you want, done.
          </p>
        </div>
        <div className="pain">
          <h2>Backgrounds removed without eating the garment</h2>
          <p>
            The usual cutout tools clip sleeves and straps. This one keeps the whole piece and drops
            it on clean white.
          </p>
        </div>
      </section>

      <section className="flow" aria-label="How it works">
        <p>
          <strong>Snap a photo → get a listing.</strong> That's the whole loop. It works the same
          whether you're cross-posting to four marketplaces or just clearing out a closet.
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
