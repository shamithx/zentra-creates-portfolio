import { useState } from 'react';
import { useScrollScene } from '../lib/motion';
import { CONTACTS, CTA, waLink } from '../lib/content';
import { OrnamentDivider } from './engravings';
import { CONTACT_ICONS } from './icons';

export default function Contact() {
  const ref = useScrollScene({
    from: 0.95,
    to: 0.45,
    transform: { y: [70, 0], z: [-120, 0], opacity: [0, 1] },
    perspective: 1000,
  });

  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  /* Posts to Netlify Forms at the site root. The matching hidden form in
     index.html is what registers this form with Netlify at deploy time, so
     the two field lists must stay identical. If the request fails the visitor
     is pointed at WhatsApp — the form never claims a message it did not send. */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    const { name, email, message } = fields;
    if (!name || !email || !message) return;
    setSending(true);
    setStatus('Sending…');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          'bot-field': '',
          name,
          email,
          message,
        }).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFields({ name: '', email: '', message: '' });
      setStatus('Thank you — your letter was sent. We reply within one working day.');
    } catch {
      setStatus('That did not send. Please use WhatsApp or email above — both reach us directly.');
    } finally {
      setSending(false);
    }
  };

  const waFromForm = waLink(
    fields.message
      ? `Hi ZENTRA Creates! ${fields.message}${fields.name ? `\n\n— ${fields.name}` : ''}`
      : undefined
  );

  return (
    <section id="contact" className="section contact" ref={ref} data-component="contact">
      <p className="sec-label sec-label--center"><span className="sec-label-num">09</span> Contact</p>
      <h2 className="sec-title contact__title">Let&rsquo;s Grow Your <em>Brand</em>.</h2>
      <p className="contact__sub">
        Have a vision that needs a hand? Tell us its shape — we reply within one working day.
      </p>

      <div className="contact__actions">
        {CONTACTS.map((c) => {
          const Icon = CONTACT_ICONS[c.icon];
          const primary = c.id === 'whatsapp';
          return (
            <a
              key={c.id}
              className={`contact__action ${primary ? 'contact__action--primary' : ''}`}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <Icon className="contact__action-icon" />
              <span className="contact__action-text">
                <span className="contact__action-name">
                  {primary ? CTA.whatsapp : c.name === 'Email' ? 'Email Me' : c.name}
                </span>
                <span className="contact__action-handle">{c.handle}</span>
              </span>
            </a>
          );
        })}
      </div>

      {/* Local Growth — a single quiet line beneath the WhatsApp channel. */}
      <p className="contact__growth">
        <a
          className="contact__growth-link"
          href={waLink("Hi ZENTRA Creates! I'm interested in the ZENTRA Local Growth packages.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Interested in ZENTRA Local Growth packages? Message us on WhatsApp
        </a>
      </p>

      <form
        className="contact__form"
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
      >
        {/* Required by Netlify Forms — identifies which form was submitted. */}
        <input type="hidden" name="form-name" value="contact" />
        {/* Honeypot: hidden from people, filled in by bots. */}
        <p hidden>
          <label htmlFor="c-bot">Leave this field empty</label>
          <input id="c-bot" name="bot-field" type="text" tabIndex={-1} autoComplete="off" />
        </p>
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={set('name')}
          />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email</label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set('email')}
          />
        </div>
        <div className="field">
          <label htmlFor="c-msg">The Vision</label>
          <textarea
            id="c-msg"
            name="message"
            rows="4"
            required
            value={fields.message}
            onChange={set('message')}
          />
        </div>
        <div className="contact__submit">
          <button type="submit" className="btn btn--gold">Send the Letter</button>
          <a
            className="contact__alt"
            href={waFromForm}
            target="_blank"
            rel="noopener noreferrer"
          >
            or send it on WhatsApp instead →
          </a>
        </div>
        {status && <p className="contact__status" role="status">{status}</p>}
      </form>

      <OrnamentDivider className="sec-ornament" />
    </section>
  );
}
