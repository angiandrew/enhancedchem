'use client'

export default function ShippingTicker() {
  const phrase = 'FREE SAME DAY SHIPPING ON ORDERS OVER $250'
  const gap = '\u00A0'.repeat(10)
  const segment = (phrase + gap).repeat(5)
  return (
    <div className="w-full overflow-x-hidden border-b border-border bg-muted/95 py-2.5 backdrop-blur-sm" aria-hidden="true">
      <div className="flex w-max animate-shipping-ticker">
        <span className="shrink-0 whitespace-nowrap px-4 text-sm font-semibold text-foreground">{segment}</span>
        <span className="shrink-0 whitespace-nowrap px-4 text-sm font-semibold text-foreground">{segment}</span>
      </div>
    </div>
  )
}
