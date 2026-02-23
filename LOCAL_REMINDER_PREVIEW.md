# Test reminder emails locally (order #4505 etc.)

Your local app uses **in-memory** storage when `REDIS_URL` is not set, so it doesn't see production orders. To hit the preview URL and have it find order #4505 (and send the email), use the same Redis as production.

## Steps (one-time)

1. **Get your Redis URL from Vercel**
   - Go to [vercel.com](https://vercel.com) → your **enhancedchem** project.
   - Open **Settings** → **Environment Variables**.
   - Find **`REDIS_URL`** (or the variable that holds your Redis connection string).
   - Click **Reveal** / copy the value. It usually looks like `rediss://default:xxxxx@xxxxx.upstash.io:6379` or similar.

2. **Put it in your local env**
   - In your project folder, open **`.env.local`** (create it if it doesn’t exist).
   - Add or update this line (paste your real value after the `=`):
     ```
     REDIS_URL=paste_the_value_you_copied_here
     ```
   - Save the file.

3. **Restart the dev server**
   - Stop the current `npm run dev` (Ctrl+C).
   - Run `npm run dev` again.

4. **Open the preview URL**
   - In the browser:  
     `http://localhost:3002/api/dev/send-reminder-preview?orderNumber=4505&stage=1`
   - You should get a success JSON response and the email will send to the order’s email (or add `&to=your@email.com` to send to yourself).

You only need to do this once. After that, the same URL will work for order 4505 and any other order in production Redis.
