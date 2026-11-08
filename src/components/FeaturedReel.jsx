import { useRef, useState } from 'react';
import { useScrollScene } from '../lib/motion';
import { FEATURED_REEL } from '../lib/content';
import { PlayIcon, ArrowIcon, FacebookIcon } from './icons';

export default function FeaturedReel() {
  const reel = FEATURED_REEL;
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const copyRef = useScrollScene({
    from: 0.96,
    to: 0.55,
    transform: { y: [44, 0], opacity: [0, 1] },
  });
  const stageRef = useScrollScene({
    from: 0.98,
    to: 0.5,
    transform: { y: [70, 0], z: [-60, 0], opacity: [0, 1] },
  });
  const detailsRef = useScrollScene({
    from: 0.98,
    to: 0.55,
    transform: { y: [36, 0], opacity: [0, 1] },
  });

  /* play() is called inside the click, so mobile browsers keep the gesture. */
  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    const attempt = video.play();
    if (attempt?.catch) attempt.catch(() => setStarted(false));
  };

  return (
    <section
      id="featured-reel"
      className="section reel"
      aria-labelledby="reel-title"
      data-component="featured-reel"
    >
      <div
        className="reel__ambient"
        style={{ backgroundImage: `url(${reel.poster})` }}
        aria-hidden="true"
      />

      <div className="reel__inner">
        <div className="reel__copy" ref={copyRef}>
          <p className="sec-label reel__label">
            <span className="sec-label-num">{reel.eyebrow}</span> {reel.kicker}
          </p>

          <h2 id="reel-title" className="sec-title reel__title">
            {reel.title} <em>{reel.titleAccent}</em>
          </h2>
        </div>

        <figure className="reel__stage" ref={stageRef}>
          <span className="reel__halo" aria-hidden="true" />
          <div className={`reel__frame ${started ? 'is-playing' : ''}`}>
            <span className="reel__corner reel__corner--tl" aria-hidden="true" />
            <span className="reel__corner reel__corner--tr" aria-hidden="true" />
            <span className="reel__corner reel__corner--bl" aria-hidden="true" />
            <span className="reel__corner reel__corner--br" aria-hidden="true" />

            <video
              ref={videoRef}
              className={`reel__video ${started ? 'is-active' : ''}`}
              src={reel.video}
              poster={reel.poster}
              controls
              playsInline
              preload="none"
              tabIndex={started ? 0 : -1}
              aria-hidden={!started}
              onError={() => {
                setStarted(false);
                setFailed(true);
              }}
            >
              Your browser does not support embedded video.
            </video>

            {!started && (
              failed ? (
                <div className="reel__failed">
                  <img
                    className="reel__poster"
                    src={reel.poster}
                    alt=""
                    width="540"
                    height="960"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="reel__veil" aria-hidden="true" />
                  <span className="reel__failed-body">
                    <span className="reel__failed-text">
                      Playback isn’t available in this browser.
                    </span>
                    <a
                      className="reel__failed-link"
                      href={reel.source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {reel.source.label}
                      <ArrowIcon className="reel__failed-icon" />
                    </a>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  className="reel__facade"
                  onClick={start}
                  aria-label="Play the promotional reel"
                >
                  <img
                    className="reel__poster"
                    src={reel.poster}
                    alt=""
                    width="540"
                    height="960"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="reel__veil" aria-hidden="true" />
                  <span className="reel__play" aria-hidden="true">
                    <span className="reel__play-ring" />
                    <PlayIcon className="reel__play-icon" />
                  </span>
                  <span className="reel__tag">Film 01 · 2026</span>
                  <span className="reel__runtime">{reel.runtime}</span>
                </button>
              )
            )}
          </div>

          <figcaption className="reel__cap">
            <span>{reel.caption}</span>
            <span className="reel__cap-meta">9:16 · Vertical</span>
          </figcaption>
        </figure>

        <div className="reel__details" ref={detailsRef}>
          <p className="reel__lede">{reel.lede}</p>

          <ul className="reel__notes" aria-label="Editing notes">
            {reel.notes.map((note) => (
              <li key={note} className="reel__note">{note}</li>
            ))}
          </ul>

          <dl className="reel__meta">
            {reel.meta.map((item) => (
              <div key={item.label} className="reel__meta-item">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="reel__actions">
            <a className="btn btn--gold" href={reel.caseHref}>
              <span>Open the case study</span>
              <ArrowIcon className="btn__icon" />
            </a>
            <a
              className="reel__source"
              href={reel.source.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon className="reel__source-icon" />
              <span>{reel.source.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
