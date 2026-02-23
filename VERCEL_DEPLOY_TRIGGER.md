# If Vercel isn’t deploying on push

GitHub is up to date; if Vercel doesn’t show a new deployment after a push, use the deploy hook below to force a deploy from the latest `main`.

---

## Force deploy from latest code (Deploy Hook – do this once)

### 1. Create the hook in Vercel

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your **enhancedchem** project.
2. Go to **Settings** → **Git**.
3. Scroll to **Deploy Hooks**.
4. Click **Create Hook**.
5. Name: e.g. **Production**.
6. Branch: **main**.
7. Click **Create Hook**. Copy the URL (looks like `https://api.vercel.com/v1/integrations/deploy/...`).

### 2. Trigger a deploy

**Option A – from terminal (paste your URL):**
```bash
VERCEL_DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/..." npm run deploy:trigger
```

**Option B – with curl:**
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/..."
```
(Use the exact URL Vercel gave you.)

After a minute or two, a new deployment should appear in **Deployments** and will use the latest code on `main` (including cron + disable-reminders).

---

## Other options

**Reconnect Git** (if pushes should auto-deploy but don’t):  
Vercel → **Settings** → **Git** → Disconnect repo → Connect **angiandrew/enhancedchem** again → Production branch: **main**.

**Redeploy an old deployment** only rebuilds that same commit; it does **not** pull new code. Use the deploy hook above to deploy the latest `main`.
