# Add CRON_SECRET in Vercel (required for payment reminders cron)

The cron route runs once daily (2:00 PM UTC) and needs `CRON_SECRET` so only Vercel can call it.

## Steps

1. **Vercel** → your project (**enhancedchem**) → **Settings** → **Environment Variables**.

2. **Add:**
   - **Key:** `CRON_SECRET`
   - **Value:** a long random string (e.g. run in Terminal: `openssl rand -hex 32` and paste the output)
   - **Environments:** check **Production** (and Preview if you want cron in previews).

3. Click **Save**.

4. **Redeploy** so the new variable is used: **Deployments** → ⋯ on latest → **Redeploy** (or push a commit / run `npx vercel --prod`).

After that, the daily cron will call `/api/cron/payment-reminders` with `Authorization: Bearer <your-secret>` and the route will accept it.
