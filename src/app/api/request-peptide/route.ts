import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

async function getResendClient() {
  try {
    const { Resend } = await import('resend')
    return new Resend(process.env.RESEND_API_KEY || '')
  } catch {
    return null
  }
}

const CONTACT_EMAIL = 'contact@enhancedchem.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const requestText = typeof body.request === 'string' ? body.request.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''

    if (!requestText) {
      return NextResponse.json(
        { error: 'Please describe the peptide(s) or product you are requesting.' },
        { status: 400 }
      )
    }

    const resend = await getResendClient()
    if (!resend || !process.env.RESEND_API_KEY) {
      console.error('Request peptide: Resend not configured')
      return NextResponse.json(
        { error: 'Email is not configured. Please try again later or contact us directly.' },
        { status: 503 }
      )
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Enhanced Chem <onboarding@resend.dev>'
    const replyTo = email || undefined

    const html = `
      <h2>Research Peptide Request</h2>
      <p><strong>Request:</strong></p>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px;">${requestText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      ${email ? `<p><strong>Reply-to email:</strong> ${email.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>` : '<p><em>No reply email provided.</em></p>'}
      <p style="color: #666; font-size: 12px; margin-top: 24px;">Sent from the Request a Research Peptide form on Enhanced Chem.</p>
    `.trim()

    const result = await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL,
      replyTo: replyTo || undefined,
      subject: 'Research Peptide Request',
      html,
    })

    if (result.error) {
      console.error('Request peptide email error:', result.error)
      return NextResponse.json(
        { error: 'Failed to send request. Please try again or email us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Request peptide route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
