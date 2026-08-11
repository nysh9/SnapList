export default function ListingDemo() {
  return (
    <div className="demo" aria-label="Example: one photo in, a ready listing out">
      <figure className="demo-card demo-before">
        <div className="demo-photo" role="img" aria-label="A photo of a denim jacket on a messy background">
          <span className="demo-photo-emoji" aria-hidden="true">🧥</span>
          <span className="demo-photo-tag">IMG_4021.jpg</span>
        </div>
        <figcaption>You take one photo</figcaption>
      </figure>

      <div className="demo-arrow" aria-hidden="true">→</div>

      <figure className="demo-card demo-after">
        <div className="demo-cutout" role="img" aria-label="The same jacket, background removed on clean white">
          <span className="demo-photo-emoji" aria-hidden="true">🧥</span>
          <span className="demo-badge">background removed</span>
        </div>
        <div className="demo-fields">
          <p className="demo-title">Vintage Levi&apos;s Denim Trucker Jacket — Medium Wash, Size M</p>
          <p className="demo-price">
            <strong>$48</strong> <span>based on 27 sold comps</span>
          </p>
          <div className="demo-tags">
            <span>#vintagelevis</span>
            <span>#denimjacket</span>
            <span>#y2k</span>
            <span>#trucker</span>
          </div>
        </div>
        <figcaption>SnapList hands back a listing</figcaption>
      </figure>
    </div>
  );
}
