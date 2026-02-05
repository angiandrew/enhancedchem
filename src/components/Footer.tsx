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
            <p className="text-xs text-muted-foreground/90 mt-2 font-medium">
              Providing top quality since 2019.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Products</Link></li>
              <li><Link href="/3rd-party-testing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">3rd Party Testing</Link></li>
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

        {/* Site Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground leading-relaxed space-y-3">
            <span className="block">
              All products offered on this website are intended exclusively for laboratory and scientific research purposes. They are not for human or animal consumption under any circumstances.
            </span>
            <span className="block">
              The information and statements provided on this website have not been reviewed by the U.S. Food and Drug Administration. Neither the content nor the products are designed to diagnose, treat, cure, or prevent any disease or condition.
            </span>
            <span className="block">
              Enhanced Chem LLC operates solely as a supplier of research chemicals. Enhanced Chem LLC is not a compounding pharmacy or chemical compounding facility as defined under Section 503A of the Federal Food, Drug, and Cosmetic Act, nor an outsourcing facility as defined under Section 503B of the same Act.
            </span>
            <span className="block font-semibold uppercase tracking-wide text-foreground/90">
              The products provided are not for human use and are meant strictly for in-vitro and laboratory research applications. The purchaser recognizes the inherent hazards associated with the handling, utilization, and distribution of these materials, and affirms that they possess the appropriate equipment, premises, and qualified staff to manage such hazards; the purchaser voluntarily assumes all associated risks.
            </span>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EnhancedChem. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            Providing top quality since 2019.
          </p>
        </div>
      </div>
    </footer>
  )
}
