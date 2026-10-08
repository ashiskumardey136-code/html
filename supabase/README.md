# AshisDigitalHub lead automation

## Supabase

1. Open the connected Supabase project SQL Editor.
2. Run `supabase/schema.sql`.
3. Set `SUPABASE_URL` and a server-only `SUPABASE_KEY` in the hosting environment. Never put either value in `app.js`, `index.html`, or GitHub.
4. Deploy the Node server, not only the static files, because `/api/leads` writes to Supabase.

The browser submits to `/api/leads`; the server validates the request and inserts into `lead_submissions`. There is intentionally no public read policy.

## Instant Gmail notification

The Gmail connector is authorized for this Manus session. For a continuously running website, the production notification should be a Supabase Database Webhook or Edge Function that sends a plain-text Gmail message after each INSERT, then updates `notification_status` and `notified_at`. Use the following notification content:

- Subject: `[AshisDigitalHub] New consultation lead — {{need}}`
- Recipient: the business Gmail inbox selected during deployment
- Body: name, contact, need, message, created time, and landing page

The Gmail connector requires an interactive confirmation for each direct send, so it is suitable for testing/drafts from Manus, not as the unattended website runtime. Do not use a public Gmail password or expose OAuth tokens in the site.
