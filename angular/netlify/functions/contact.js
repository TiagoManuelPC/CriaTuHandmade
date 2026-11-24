// Emails a message from the site's contact form to the shop.
//
// It needs, in the function's environment:
//   RESEND_API_KEY   a key from resend.com (the free tier is enough for a contact form)
//   CONTACT_FROM     a sender on a domain verified with Resend, e.g. "Cria Tu Handmade <hello@yourdomain>"
//   CONTACT_TO       where messages go (defaults to cria.tu@outlook.com)
// Without the key it answers 503 and the site falls back to opening the visitor's mail app.

const reply = (statusCode, body) => ({ statusCode, body: JSON.stringify(body) });
const clean = (value, max) => String(value || '').trim().slice(0, max);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return reply(405, { error: 'Method not allowed' });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || 'cria.tu@outlook.com';
  if (!key || !from) {
    return reply(503, { error: 'Emailer not configured' });
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (e) {
    return reply(400, { error: 'Bad request' });
  }

  // A field people never see: if it is filled in, a robot wrote this. Say thanks and send nothing.
  if (clean(data.website, 200)) {
    return reply(200, { ok: true });
  }

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const message = clean(data.message, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply(400, { error: 'Name, a valid email and a message are needed' });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Message from ${name} via the website`,
        text: `${message}\n\n— ${name} (${email})`,
      }),
    });
    if (!res.ok) {
      console.error('Resend refused the message:', res.status, await res.text());
      return reply(502, { error: 'Could not send' });
    }
    return reply(200, { ok: true });
  } catch (error) {
    console.error('Error sending:', error);
    return reply(502, { error: 'Could not send' });
  }
};
