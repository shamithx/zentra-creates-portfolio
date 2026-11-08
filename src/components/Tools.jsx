import { useScrollScene } from '../lib/motion';
import { GeoDiagram, CompassRose } from './engravings';

const TOOLS = [
  { name: 'Adobe Photoshop', group: 'Design' },
  { name: 'Adobe Illustrator', group: 'Design' },
  { name: 'Adobe Premiere Pro', group: 'Video' },
  { name: 'CapCut', group: 'Video' },
  { name: 'HTML & CSS', group: 'Web' },
  { name: 'Python', group: 'Automation' },
  { name: 'Google Sheets', group: 'Automation' },
  { name: 'Business automation tools', group: 'Automation' },
];

export default function Tools() {
  const headRef = useScrollScene({
    from: 0.95,
    to: 0.55,
    transform: { y: [40, 0], opacity: [0, 1] },
  });
  const listRef = useScrollScene({
    from: 0.95,
    to: 0.5,
    transform: { y: [50, 0], opacity: [0, 1] },
  });

  return (
    <section id="tools" className="section tools" aria-label="Tools and skills">
      <div ref={headRef} className="tools__head">
        <p className="sec-label">
          <span className="sec-label-num">04</span> Tools &amp; Skills
        </p>
        <h2 className="sec-title">
          A working <em>toolkit</em>
        </h2>
        <p className="tools__intro">
          The tools behind the work — set dressing, editing, design and the automation that keeps
          projects moving. Listed as a toolkit, not a claim of certification.
        </p>
      </div>

      <div className="tools__grid" ref={listRef}>
        <GeoDiagram className="tools__motif tools__motif--a" />
        <CompassRose className="tools__motif tools__motif--b" />
        <ul className="tools__list">
          {TOOLS.map((t) => (
            <li className="tool-chip" key={t.name}>
              <span className="tool-chip__name">{t.name}</span>
              <span className="tool-chip__group">{t.group}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
