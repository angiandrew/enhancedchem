#!/usr/bin/env node
/**
 * Trigger a Vercel production deploy from the latest code on GitHub.
 * Requires a Deploy Hook URL from Vercel (Settings → Git → Deploy Hooks).
 *
 * Usage:
 *   VERCEL_DEPLOY_HOOK_URL="https://api.vercel.com/..." node scripts/trigger-vercel-deploy.mjs
 * Or add VERCEL_DEPLOY_HOOK_URL to .env.local and run:
 *   node -r dotenv/config scripts/trigger-vercel-deploy.mjs  (if you have dotenv)
 */
const url = process.env.VERCEL_DEPLOY_HOOK_URL
if (!url) {
  console.error('Missing VERCEL_DEPLOY_HOOK_URL.')
  console.error('1. Vercel → your project → Settings → Git → Deploy Hooks')
  console.error('2. Create a hook (e.g. "Production", branch: main) and copy the URL')
  console.error('3. Run: VERCEL_DEPLOY_HOOK_URL="<paste-url>" npm run deploy:trigger')
  process.exit(1)
}

const res = await fetch(url, { method: 'POST' })
if (!res.ok) {
  console.error('Deploy trigger failed:', res.status, await res.text())
  process.exit(1)
}
console.log('Deploy triggered. Check Vercel dashboard for the new deployment.')
