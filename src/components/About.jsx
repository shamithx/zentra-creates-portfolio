import { useScrollScene } from '../lib/motion';
import { CTA } from '../lib/content';
import { EyeDivine, OrnamentDivider } from './engravings';
import { ArrowIcon } from './icons';

export default function About() {
  const visualRef = useScrollScene({
    from: 0.95,
    to: 0.4,
    transform: { y: [40, -30], z: [-60, 0], opacity: [0, 1] },
    mouse: [10, 8],
  });
  const copyRef = useScrollScene({
    from: 0.95,
    to: 0.5,
    transform: { y: [50, 0], opacity: [0, 1] },
  });

  return (
    <section id="about" className="section about-pf" aria-label="About my work">
      <div className="about-pf__grid">
        <div className="about-pf__visual" ref={visualRef}>
          <EyeDivine className="about-pf__eye" />
          <p className="about-pf__caption">
            ZENTRA Creates
            <br />
            <span>Creative production studio</span>
          </p>
        </div>

        <div className="about-pf__copy" ref={copyRef}>
          <p className="sec-label">
            <span className="sec-label-num">03</span> About My Work
          </p>
          <h2 className="sec-title">
            The hand behind <em>ZENTRA Creates</em>
          </h2>

          <p className="about-pf__lead">
            ZENTRA Creates is a one-person creative practice working across the way businesses
            actually get seen online: video editing, graphic design and web design — with content
            strategy and practical business automation alongside them.
          </p>
          <p className="about-pf__text">
            Most of the work starts the same way: a business has something worth showing and no
            clear way to show it. A tailor with beautiful garments and no reels. A café with a
            great space and flat phone photos. A service business running on spreadsheets and
            memory. My job is to turn what already exists into content, design and systems that
            hold up in front of real customers.
          </p>
          <p className="about-pf__text">
            I care about the parts that are easy to skip — pacing, proportion, clear hierarchy,
            a file that is actually organised, a handover you can maintain without me. The work
            should look considered and be easy to live with.
          </p>
          <p className="about-pf__text">
            This site is the proof: real projects, the process behind them, and the tools used to
            get there. For services, packages and how we would work together, the sections above and
            below cover the rest.
          </p>

          <a
            className="btn btn--ghost about-pf__cta"
            href="#services"
          >
            <span>{CTA.services}</span>
            <ArrowIcon className="btn__icon" />
          </a>
        </div>
      </div>
      <OrnamentDivider className="sec-ornament" />
    </section>
  );
}
