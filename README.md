# Enhanced Chem - Research Peptides Website - Deployment Fix
# Force deployment Fri Sep 26 00:50:31 EDT 2025

## Deploy when repo is private (Vercel)

If the GitHub repo is private, Vercel often won’t auto-deploy on push. Use the deploy hook + GitHub Action:

1. **Vercel:** Project → **Settings** → **Git** → **Deploy Hooks** → **Create Hook** (e.g. name “GitHub Push”, branch `main`) → copy the URL.
2. **GitHub:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** → name `VERCEL_DEPLOY_HOOK_URL`, value = the URL from step 1.

Pushes to `main` will then trigger a deploy only when the repo is **private**; when the repo is **public**, the workflow skips the hook so Vercel’s built-in Git integration can deploy (no double deploy).
