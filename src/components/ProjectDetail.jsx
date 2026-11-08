import { useEffect } from 'react';
import { useScrollScene } from '../lib/motion';
import { bySlug, categoryLabel, PROJECTS } from '../data/projects';
import { CTA, waLink } from '../lib/content';
import { OrnamentDivider } from './engravings';
import { WhatsAppIcon, ArrowIcon } from './icons';
import { ProjectThumb } from './Projects';
import VideoEmbed from './VideoEmbed';

function Block({ title, children, delay = 0 }) {
  const ref = useScrollScene({
    from: 0.95,
    to: 0.6,
    delay,
    transform: { y: [40, 0], opacity: [0, 1] },
  });
  if (!children) return null;
  return (
    <section className="pd-block" ref={ref}>
      <h3 className="pd-block__title">{title}</h3>
      <div className="pd-block__body">{children}</div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="section pd">
      <p className="sec-label">
        <span className="sec-label-num">?</span> Not found
      </p>
      <h1 className="pd__title">This project doesn’t exist yet.</h1>
      <p className="pd__lede">
        The link may be out of date. Head back to the portfolio to browse the available work.
      </p>
      <p className="pd__actions">
        <a className="btn btn--gold" href="#/">Back to the portfolio</a>
      </p>
    </section>
  );
}

export default function ProjectDetail({ slug }) {
  const project = bySlug(slug);
  const headRef = useScrollScene({
    from: 0.98,
    to: 0.6,
    transform: { y: [40, 0], opacity: [0, 1] },
  });

  useEffect(() => {
    document.title = project
      ? `${project.title} — ZENTRA Creates Portfolio`
      : 'Project not found — ZENTRA Creates Portfolio';
    return () => {
      document.title = 'ZENTRA Creates — Portfolio | Video Editing, Graphic Design & Web Design';
    };
  }, [project]);

  if (!project) return <NotFound />;

  /* Only show facts that actually exist — no empty rows. */
  const meta = [
    { label: 'Client / Brand', value: project.client },
    { label: 'Year', value: project.year },
    { label: 'Category', value: categoryLabel(project.category) },
  ].filter((m) => m.value);

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <article className="section pd" data-component="project-detail">
      <p className="pd__back">
        <a href="#portfolio">
          ← All work
        </a>
      </p>

      <header className="pd__head" ref={headRef}>
        <p className="pd__cat">
          <span className="sec-label-num">{categoryLabel(project.category)}</span>
          {project.placeholder && <span className="pf-badge pf-badge--inline">Details pending</span>}
        </p>
        <h1 className="pd__title">{project.title}</h1>
        <p className="pd__lede">{project.overview}</p>
        <dl className="pd__meta">
          {meta.map((m) => (
            <div key={m.label} className="pd__meta-item">
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>

        {project.liveUrl && (
          <a
            className="pd__live"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the live site
            <ArrowIcon className="pd__live-icon" />
          </a>
        )}
      </header>

      <figure className="pd__cover">
        <ProjectThumb
          project={project}
          className="pf-thumb--cover"
          src={project.cover || project.thumb}
        />
        {project.coverCaption && (
          <figcaption className="pd__cover-cap">{project.coverCaption}</figcaption>
        )}
      </figure>

      {project.placeholder && (
        <p className="pd__notice">
          This entry is not finished. Every field marked “Add the …” is still waiting on real
          information — none of it has been invented for you. Fill them in in{' '}
          <code>src/data/projects.js</code>, then set <code>placeholder: false</code> to remove
          this notice.
        </p>
      )}

      {/* Social video links (YouTube · Vimeo · TikTok · Instagram) play here. */}
      {project.video?.url && (
        <section className="pd-video">
          <h3 className="pd-block__title">Watch</h3>
          <VideoEmbed
            url={project.video.url}
            poster={project.video.poster || project.cover || project.thumb}
            caption={project.video.caption}
            title={project.video.title || project.title}
          />
        </section>
      )}

      <Block title="The Challenge">{project.challenge}</Block>
      <Block title="My Role" delay={0.04}>{project.role}</Block>
      <Block title="Tools Used" delay={0.04}>
        {project.tools?.length ? (
          <ul className="pd-tools">
            {project.tools.map((t) => (
              <li key={t} className="pd-tool">{t}</li>
            ))}
          </ul>
        ) : null}
      </Block>
      <Block title="The Creative Process" delay={0.06}>
        {project.process?.length ? (
          <ol className="pd-process">
            {project.process.map((step, i) => (
              <li key={i} className="pd-process__step">
                <span className="pd-process__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pd-process__text">{step}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </Block>
      <Block title="Final Deliverables" delay={0.06}>
        {project.deliverables?.length ? (
          <ul className="pd-list">
            {project.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        ) : null}
      </Block>
      {/* Results render only when real results have been added. */}
      <Block title="Results" delay={0.08}>
        {project.results ? <p className="pd-results">{project.results}</p> : null}
      </Block>

      {project.media?.length > 0 && (
        <section className="pd-media">
          <h3 className="pd-block__title">Media</h3>
          <div className="pd-media__grid">
            {project.media.map((m, i) =>
              /* A pasted social link → platform player. */
              m.url ? (
                <div key={i} className="pd-media__cell">
                  <VideoEmbed url={m.url} poster={m.poster} caption={m.caption} compact />
                </div>
              ) : m.type === 'video' ? (
                <figure key={i} className="pd-media__fig">
                  {/* playsInline keeps iOS from hijacking the screen; poster shows a still first. */}
                  <video
                    className="pd-media__item"
                    src={m.src}
                    poster={m.poster || undefined}
                    controls
                    playsInline
                    preload="metadata"
                  />
                  {m.caption && <figcaption className="pd-media__cap">{m.caption}</figcaption>}
                </figure>
              ) : (
                <figure key={i} className="pd-media__fig">
                  <img
                    className="pd-media__item"
                    src={m.src}
                    alt={m.caption || `${project.title} — image ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {m.caption && <figcaption className="pd-media__cap">{m.caption}</figcaption>}
                </figure>
              )
            )}
          </div>
        </section>
      )}

      <OrnamentDivider className="sec-ornament" />

      <section className="pd-cta">
        <h2 className="pd-cta__title">Have a project like this?</h2>
        <p className="pd-cta__text">
          Send it over and I’ll tell you exactly how I’d approach it.
        </p>
        <div className="pd-cta__actions">
          <a className="btn btn--gold" href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="btn__icon" />
            <span>{CTA.whatsapp}</span>
          </a>
          <a className="btn btn--ghost" href="#services">
            <span>{CTA.services}</span>
            <ArrowIcon className="btn__icon" />
          </a>
        </div>
      </section>

      <section className="pd-more">
        <h3 className="pd-block__title">More work</h3>
        <div className="pd-more__grid">
          {others.map((p) => (
            <a key={p.slug} className="pd-more__card" href={`#/project/${p.slug}`}>
              <ProjectThumb project={p} />
              <span className="pd-more__meta">
                <span className="pd-more__cat">{categoryLabel(p.category)}</span>
                <span className="pd-more__title">{p.title}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
