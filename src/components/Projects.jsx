import { useMemo, useState } from 'react';
import { useScrollScene } from '../lib/motion';
import { CATEGORIES, PROJECTS, categoryLabel, countByCategory } from '../data/projects';
import { SunRays, HandsEngraving, SacredGeometry, FibSpiral, CompassRose } from './engravings';
import { ArrowIcon } from './icons';

/* One motif per discipline — used when a project has no image yet, so the
   gallery looks designed instead of empty. Drop a real image into
   `thumb` and this is replaced automatically. */
const MOTIFS = {
  video: SunRays,
  graphic: HandsEngraving,
  web: SacredGeometry,
  growth: FibSpiral,
  automation: CompassRose,
};

export function ProjectThumb({ project, className = '', src }) {
  const image = src ?? project.thumb;
  if (image) {
    return (
      <img
        className={`pf-thumb ${className}`}
        src={image}
        alt={project.title}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const Motif = MOTIFS[project.category] || SacredGeometry;
  return (
    <span className={`pf-thumb pf-thumb--motif ${className}`} aria-hidden="true">
      <Motif className="pf-thumb__motif" />
    </span>
  );
}

function Card({ project, delay }) {
  const ref = useScrollScene({
    from: 0.94,
    to: 0.55,
    delay,
    perspective: 1100,
    transform: { y: [56, 0], z: [-90, 0], opacity: [0, 1] },
  });

  return (
    <article className="pf-card" ref={ref}>
      <a
        className="pf-card__link"
        href={`#/project/${project.slug}`}
        aria-label={`${project.title} — view project`}
      >
        <span className="pf-card__media">
          <ProjectThumb project={project} />
          {project.placeholder && <span className="pf-badge">Details pending</span>}
          {project.concept && !project.placeholder && (
            <span className="pf-badge">Concept</span>
          )}
          <span className="pf-card__cat">{categoryLabel(project.category)}</span>
        </span>
        <span className="pf-card__body">
          <h3 className="pf-card__title">{project.title}</h3>
          <span className="pf-card__summary">{project.summary}</span>
          <span className="pf-card__cta">
            View Project
            <ArrowIcon className="pf-card__icon" />
          </span>
        </span>
      </a>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('all');
  const counts = useMemo(countByCategory, []);
  const headRef = useScrollScene({
    from: 0.95,
    to: 0.5,
    transform: { y: [50, 0], opacity: [0, 1] },
  });

  const list = useMemo(
    () => (active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="portfolio" className="section pf" aria-label="Featured projects">
      <div ref={headRef}>
        <p className="sec-label">
          <span className="sec-label-num">02</span> Portfolio
        </p>
        <h2 className="sec-title">
          Featured <em>Projects</em>
        </h2>
        <p className="pf__intro">
          Selected work across video, design, web, content strategy and automation. Filter by
          discipline to see the detail — every project opens a full case study.
        </p>
      </div>

      <div className="pf-filters" role="tablist" aria-label="Filter projects by category">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={active === c.id}
            className={`pf-filter ${active === c.id ? 'is-active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            <span className="pf-filter__label">{c.label}</span>
            <span className="pf-filter__count">{counts[c.id]}</span>
          </button>
        ))}
      </div>

      <div className="pf-grid" aria-live="polite">
        {list.map((p, i) => (
          <Card key={p.slug} project={p} delay={(i % 3) * 0.05} />
        ))}
      </div>

      <p className="pf__note">
        This portfolio grows with the studio. “Details pending” marks work still being written
        up, and concept pieces are labelled as concepts. Have a project that belongs here?{' '}
        <a href="#contact">Start a conversation</a>.
      </p>
    </section>
  );
}
