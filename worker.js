const CONTACT_EMAIL = "shamithchamod@gmail.com";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && (url.pathname === "/" || url.pathname === "/contact")) {
      return handleContactForm(request);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContactForm(request) {
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  let name = "";
  let email = "";
  let message = "";
  let botField = "";

  try {
    const form = await request.formData();
    name = String(form.get("name") || "").trim();
    email = String(form.get("email") || "").trim();
    message = String(form.get("message") || "").trim();
    botField = String(form.get("bot-field") || "").trim();
  } catch {
    return json({ ok: false, error: "Invalid form data" }, 400);
  }

  if (botField) {
    return json({ ok: true });
  }

  if (!name || !email || !message) {
    return json({ ok: false, error: "Missing fields" }, 400);
  }

  try {
    const upstream = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: "New contact form submission — ZENTRA Creates",
        _template: "table",
        _replyto: email,
      }),
    });

    if (!upstream.ok) {
      throw new Error(`Form endpoint returned ${upstream.status}`);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("Contact form forward failed:", err);
    return json({ ok: false, error: "Delivery failed" }, 502);
  }
}
