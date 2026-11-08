const ITEMS = ['Video Editing', 'Graphic Design', 'Web Design', 'Brand Growth', 'Reels & TikTok', 'Social Media Content'];

export default function Marquee() {
  const row = ITEMS.map((t, i) => (
    <span className="marquee__item" key={i}>
      <span className="marquee__text">{t}</span>
      <span className="marquee__star" aria-hidden="true">✦</span>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__group">{row}</div>
        <div className="marquee__group">{row}</div>
      </div>
    </div>
  );
}
