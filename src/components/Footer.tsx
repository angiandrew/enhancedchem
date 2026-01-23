import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative">
                <Image
                  src="/logos/NEW-new LOGO.png"
                  alt="Enhanced Chem Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-lg font-medium tracking-tight">
                ENHANCEDCHEM
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pharmaceutical-grade research peptides with certified purity standards.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/affiliate" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EnhancedChem. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            For Research Use Only. Not For Human Consumption.
          </p>
        </div>
      </div>
    </footer>
  )
}
