import { useState } from 'react';
import { parseVideoUrl, explainFailure, PLATFORMS } from '../lib/video';
import { PlayIcon, ArrowIcon } from './icons';

/**
 * Plays a social media video inside the page using the platform's own player.
 *
 * Nothing loads until the visitor presses play (speed), the frame keeps the
 * right shape for the platform (16:9 landscape / 9:16 vertical), and a link to
 * the original post is always shown — which is also what covers private,
 * deleted or restricted videos.
 *
 * Props: url (required), poster, caption, title, compact
 */
export default function VideoEmbed({ url, poster, caption = '', title = '', compact = false }) {
  const [playing, setPlaying] = useState(false);
  const info = parseVideoUrl(url);
  const platform = info.platform ? PLATFORMS[info.platform] : null;
  const vertical = info.ratio === '9 / 16';

  const shell = (children, extraClass = '') => (
    <figure
      className={`vem ${compact ? 'vem--compact' : ''} ${info.platform ? `vem--${info.platform}` : 'vem--plain'} ${vertical ? 'vem--vertical' : ''} ${extraClass}`.trim()}
      style={info.ratio ? { '--vem-ratio': info.ratio } : undefined}
    >
      {children}
    </figure>
  );

  /* ——— Cannot embed: show the still and send them to the source ——— */
  if (!info.ok) {
    return shell(
      <>
        <div className="vem__frame vem__frame--static">
          {poster ? (
            <img className="vem__poster" src={poster} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="vem__poster vem__poster--empty" aria-hidden="true" />
          )}
          <div className="vem__notice">
            <p className="vem__notice-text">{explainFailure(info.reason, info.platform)}</p>
            {info.original && (
              <a className="vem__open vem__open--solid" href={info.original} target="_blank" rel="noopener noreferrer">
                Open the original link <ArrowIcon className="vem__open-icon" />
              </a>
            )}
          </div>
        </div>
      </>,
      'vem--fallback'
    );
  }

  return shell(
    <>
      <div className="vem__frame">
        {playing ? (
          <iframe
            className="vem__iframe"
            src={info.embedUrl}
            title={title || `${platform.label} video`}
            loading="lazy"
            allow="encrypted-media; clipboard-write; picture-in-picture; fullscreen; accelerometer; gyroscope"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            className="vem__facade"
            onClick={() => setPlaying(true)}
            aria-label={`Play this video on ${platform.label}`}
          >
            {poster ? (
              <img className="vem__poster" src={poster} alt="" loading="lazy" decoding="async" />
            ) : (
              <>
                <span className="vem__poster vem__poster--empty" aria-hidden="true" />
                <span className="vem__placeholder" aria-hidden="true">Z</span>
              </>
            )}
            <span className="vem__veil" aria-hidden="true" />
            <span className="vem__play" aria-hidden="true">
              <PlayIcon className="vem__play-icon" />
            </span>
            <span className="vem__badge">{platform.label}</span>
          </button>
        )}
      </div>

      {(caption || info.original) && (
        <figcaption className="vem__cap">
          {caption && <span className="vem__cap-text">{caption}</span>}
          <a
            className="vem__open"
            href={info.original}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on {platform.label} <ArrowIcon className="vem__open-icon" />
          </a>
        </figcaption>
      )}
    </>
  );
}
