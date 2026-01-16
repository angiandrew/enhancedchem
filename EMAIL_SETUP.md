# Email Setup Guide - Automatic Payment Instructions

This guide will help you set up automatic email sending for payment instructions when customers select Zelle, Venmo, or Bitcoin payment methods.

## Setup Steps

### 1. Install Resend Package

Run this command in your project directory:

```bash
npm install resend
```

### 2. Create a Resend Account

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address
4. Go to API Keys section
5. Create a new API key
6. Copy your API key

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Enhanced Chem <noreply@yourdomain.com>
```

**Important Notes:**
- Replace `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- Replace `noreply@yourdomain.com` with your verified sender email from Resend
- You need to verify your domain or use the Resend test email for development
- Add `.env.local` to your `.gitignore` file (never commit API keys!)

### 4. Verify Your Domain (Production)

For production:
1. Go to Resend dashboard → Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Add the DNS records provided by Resend
4. Wait for verification
5. Update `RESEND_FROM_EMAIL` to use your verified domain

### 5. Test the Integration

1. Start your development server: `npm run dev`
2. Go to checkout page
3. Select "Alternative Payments"
4. Enter an email address
5. Select Zelle, Venmo, or Bitcoin
6. Click "Complete Purchase"
7. Check the email inbox for payment instructions

## How It Works

When a customer:
1. ✅ Completes verification
2. ✅ Enters their email address
3. ✅ Selects Zelle, Venmo, or Bitcoin payment method
4. ✅ Clicks "Complete Purchase"

**The system automatically:**
- Generates a unique order number (e.g., `EC-ABC123-XYZ9`)
- Sends an email IMMEDIATELY with:
  - Order number
  - Payment instructions specific to their selected method
  - Step-by-step payment guide
  - Contact information

## Email Templates

The system includes professional email templates for each payment method:

- **Zelle**: Instructions to send to `enhancedchem@email.com` with order number in memo
- **Bitcoin**: Bitcoin address and blockchain confirmation instructions
- **Venmo**: Instructions to send to `@EnhancedChem` with order number in note

## Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` is set in `.env.local`
- Verify the API key is correct in Resend dashboard
- Check Resend dashboard for any errors or rate limits
- Make sure your sender email is verified in Resend

**Need help?**
- Resend Documentation: https://resend.com/docs
- Check server logs for error messages
- Verify environment variables are loaded correctly

## Cost

- **Resend Free Tier**: 100 emails/day (perfect for testing)
- **Resend Paid Plans**: Start at $20/month for higher volume
- Alternative: Use SendGrid, Mailgun, or other email services (code modification needed)
