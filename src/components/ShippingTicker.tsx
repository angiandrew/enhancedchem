'use client'

export default function ShippingTicker() {
  const phrase = 'FREE SAME DAY SHIPPING ON ORDERS OVER $250'
  const gap = '\u00A0'.repeat(10)
  const segment = (phrase + gap).repeat(3)
  return (
    <div className="relative w-full overflow-hidden border-b border-border bg-muted/95 py-2.5 backdrop-blur-sm">
      <div className="inline-flex animate-shipping-ticker whitespace-nowrap text-sm font-semibold text-foreground">
        <span className="shrink-0 px-6">{segment}</span>
        <span className="shrink-0 px-6">{segment}</span>
      </div>
    </div>
  )
}
