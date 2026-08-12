export default function ListingDemo() {
  return (
    <div className="demo" aria-label="Example: one photo in, a priced listing out">
      <figure className="demo-card demo-before">
        <div className="demo-photo" role="img" aria-label="A photo of a denim jacket on a messy background">
          <span className="demo-photo-emoji" aria-hidden="true">🧥</span>
          <span className="demo-photo-tag">IMG_4021.jpg</span>
        </div>
        <figcaption>You take one photo</figcaption>
      </figure>

      <div className="demo-arrow" aria-hidden="true">→</div>

      <figure className="demo-card demo-after">
        <div className="demo-cutout" role="img" aria-label="The same jacket on a clean background">
          <span className="demo-photo-emoji" aria-hidden="true">🧥</span>
        </div>
        <div className="demo-fields">
          <p className="demo-price">
            <span className="demo-price-label">Suggested price</span>
            <strong>$48</strong>
            <span className="demo-price-sub">from 31 sold comps across eBay, Poshmark &amp; Depop</span>
          </p>
          <p className="demo-title">Vintage Levi&apos;s Denim Trucker Jacket — Medium Wash, Size M</p>
          <div className="demo-tags">
            <span>#vintagelevis</span>
            <span>#denimjacket</span>
            <span>#y2k</span>
            <span>#trucker</span>
          </div>
        </div>
        <figcaption>SnapList prices it and writes the listing</figcaption>
      </figure>
    </div>
  );
}
