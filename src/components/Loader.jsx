export default function Loader({ leaving }) {
  return (
    <div className={`loader ${leaving ? 'loader--leaving' : ''}`} aria-hidden={leaving}>
      <div className="loader__inner">
        <img
          className="loader__logo"
          src="/assets/brand/zentra-logo.jpg"
          alt=""
          width="1080"
          height="1080"
        />
        <div className="loader__line">
          <span className="loader__line-fill" />
        </div>
        <p className="loader__caption">The studio is preparing its instruments</p>
      </div>
    </div>
  );
}
