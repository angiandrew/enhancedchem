'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const ITEMS_PER_PAGE = 12
const POPULARITY_ORDER = [
  'reta',
  'reta-20mg',
  'ghk-cu-100mg',
  'mix-peptide',
  'melanotan-2',
  'klow-80mg',
  'reta-15mg',
  'cjc-1295-no-dac',
  'nad-500mg',
]
// Page 1: BPC 10/20, Reta 10/20 (top row), TB-5 then TB-10; GLOW/KLOW in former KPV spots; Semax/Selank at end of page 2
const DEFAULT_ORDER = [
  'bpc-157',
  'bpc-157-20mg',
  'reta',
  'reta-20mg',
  'tb-500-5mg',
  'tb-500',
  'ghk-cu',
  'ghk-cu-100mg',
  // Swap: GLOW blend (mix-peptide) where KPV 5mg was
  'mix-peptide',
  // Swap: KLOW blend where KPV 10mg was
  'klow-80mg',
  'bpc-tb-mix',
  'bpc-tb-mix-10mg',
  'nad-500mg',
  'reta-15mg',
  'melanotan-2',
  'tesamorelin-10mg',
  'glp-2tz',
  'cjc-1295-no-dac-5mg',
  'cjc-1295-no-dac',
  'cjc-1295-2mg',
  'semax',
  'selank',
  // KPV 5mg/10mg now occupy the former GLOW/KLOW positions
  'kpv-5mg',
  'kpv',
  'ipamorelin-5mg',
  'ipamorelin',
  'ipamorelin-cjc-1295-10mg',
  'cjc-1295-5mg',
  'reta-5mg',
  'ipamorelin-cjc-1295-5mg',
  'bpc-157-5mg',
]

const allProducts = [
  {
    id: 'bpc-157',
    name: 'BPC-157 10mg',
    description: 'BPC-157 is a synthetic pentadecapeptide composed of 15 amino acids. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 41.99,
    originalPrice: 46.99,
    image: '/products/bpc-157/BPC-157 10mg.png',
    rating: 5,
    reviews: 94,
    inStock: true,
  },
  {
    id: 'bpc-157-20mg',
    name: 'BPC-157 20mg',
    description: 'BPC-157 is a synthetic pentadecapeptide composed of 15 amino acids. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 54.99,
    originalPrice: 59.99,
    image: '/products/bpc-157/BPC-157 20mg.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'tb-500-5mg',
    name: 'TB-500 5mg',
    description: 'TB-500 is a synthetic 43-amino-acid peptide fragment of thymosin beta-4. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/tb-500/TB-500 5mg.png',
    rating: 5,
    reviews: 34,
  },
  {
    id: 'tb-500',
    name: 'TB-500 10mg',
    description: 'TB-500 is a synthetic 43-amino-acid peptide fragment of thymosin beta-4. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 49.99,
    originalPrice: 54.99,
    image: '/products/tb-500/TB-500 10mg.png',
    rating: 5,
    reviews: 89,
    badge: 'Popular',
  },
  {
    id: 'ghk-cu',
    name: 'GHK-CU 50mg',
    description: 'GHK-Cu is a synthetic copper-binding tripeptide (glycyl-L-histidyl-L-lysine with Cu²⁺). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 34.99,
    originalPrice: 38.99,
    image: '/products/ghk-cu/GHK-Cu 50mg.png',
    rating: 4.8,
    reviews: 64,
    inStock: false,
  },
  {
    id: 'ghk-cu-100mg',
    name: 'GHK-CU 100mg',
    description: 'GHK-Cu is a synthetic copper-binding tripeptide (glycyl-L-histidyl-L-lysine with Cu²⁺). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 48.99,
    originalPrice: 54.99,
    image: '/products/ghk-cu/GHK-Cu 100mg.png',
    rating: 4.9,
    reviews: 42,
    badge: 'Popular',
  },
  {
    id: 'kpv-5mg',
    name: 'KPV 5mg',
    description: 'KPV is a synthetic tripeptide (Lys-Pro-Val). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 31.99,
    originalPrice: 35.99,
    image: '/products/KPV/KPV 5mg.png',
    rating: 5,
    reviews: 32,
  },
  {
    id: 'kpv',
    name: 'KPV 10mg',
    description: 'KPV is a synthetic tripeptide (Lys-Pro-Val). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 54.99,
    originalPrice: 61.99,
    image: '/products/KPV/KPV 10mg.png',
    rating: 5,
    reviews: 45,
  },
  {
    id: 'semax',
    name: 'Semax 10mg',
    description: 'Semax is a synthetic heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 41.99,
    originalPrice: 46.99,
    image: '/products/Semax/Semax 10mg.png',
    rating: 5,
    reviews: 38,
    inStock: false,
  },
  {
    id: 'selank',
    name: 'Selank 10mg',
    description: 'Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro). Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/Selank/Selank 10mg.png',
    rating: 5,
    reviews: 35,
    inStock: false,
  },
  {
    id: 'bpc-tb-mix',
    name: 'BPC-157 (5MG) + TB-500 (5MG) Mix',
    description: 'Laboratory reference mixture of synthetic BPC-157 and TB-500. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 64.99,
    originalPrice: 72.99,
    image: '/products/bpc-tb-mix/BPC_TB 5_5.png',
    rating: 5,
    reviews: 32,
  },
  {
    id: 'bpc-tb-mix-10mg',
    name: 'BPC-157 (10MG) + TB-500 (10MG) Mix',
    description: 'Laboratory reference mixture of synthetic BPC-157 and TB-500. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 94.99,
    originalPrice: 105.99,
    image: '/products/bpc-tb-mix/BPC_TB 10_10.png',
    rating: 5,
    reviews: 28,
  },
  {
    id: 'mix-peptide',
    name: 'GLOW 70mg',
    description: 'GHK/BPC/TB blend (Glow): laboratory reference mixture of synthetic GHK-Cu, BPC-157, and TB-500. Supplied strictly for laboratory research use.',
    price: 88.99,
    originalPrice: 98.99,
    image: '/products/bpc-tb-ghk-mix/GLOW 70mg.png',
    rating: 5,
    reviews: 45,
    badge: 'Popular',
  },
  {
    id: 'nad-500mg',
    name: 'NAD+ 500mg',
    description: 'NAD+ is a redox-active dinucleotide. Utilized in biochemical and analytical research. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 64.99,
    originalPrice: 72.99,
    image: '/products/NAD%2B%20500MG/NAD%20500mg.png',
    rating: 5,
    reviews: 42,
  },
  {
    id: 'reta',
    name: 'Reta 10mg',
    description: 'Reta is a synthetic multi-agonist peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 79.99,
    originalPrice: 89.99,
    image: '/products/Reta/Reta 10mg.png',
    rating: 5,
    reviews: 45,
  },
  {
    id: 'reta-15mg',
    name: 'Reta 15mg',
    description: 'Reta is a synthetic multi-agonist peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 109.99,
    originalPrice: 121.99,
    image: '/products/Reta/Reta 15mg.png',
    rating: 5,
    reviews: 0,
    badge: 'Limited Time Offer',
  },
  {
    id: 'reta-20mg',
    name: 'Reta 20mg',
    description: 'Reta is a synthetic multi-agonist peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 134.99,
    originalPrice: 149.99,
    image: '/products/Reta/Reta 20mg.png',
    rating: 5,
    reviews: 0,
  },
  {
    id: 'melanotan-2',
    name: 'Melanotan 2 10mg',
    description: 'Melanotan 2 is a synthetic cyclic heptapeptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 37.99,
    originalPrice: 42.99,
    image: '/products/Melanotan 2 10mg/MT2 10mg.png',
    rating: 5,
    reviews: 52,
  },
  {
    id: 'tesamorelin-10mg',
    name: 'Tesamorelin 10mg',
    description: 'Tesamorelin is a synthetic peptide analog for analytical characterization and experimental laboratory applications. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 79.99,
    originalPrice: 49.99,
    image: '/products/Tesamorelin/Tesa10mg.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'glp-2tz',
    name: 'GLP-2TZ 10mg',
    description: 'Synthetic peptide composed of a 39-amino-acid sequence with specific structural modifications. Dual incretin receptor agonist analog for analytical characterization and experimental biochemical research. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 79.99,
    originalPrice: 88.99,
    image: '/products/GLP-2TZ/GLP2TZ.jpeg',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'klow-80mg',
    name: 'KLOW 80mg',
    description: 'GHK/KPV/BPC/TB blend (Klow): laboratory reference mixture of synthetic GHK-Cu, KPV, BPC-157, and TB-500. Supplied strictly for laboratory research use.',
    price: 119.99,
    originalPrice: 133.99,
    image: '/products/KLOW 80mg/KLOW 80mg.png',
    rating: 5,
    reviews: 48,
    badge: 'New',
  },
  {
    id: 'cjc-1295-no-dac-5mg',
    name: 'CJC-1295 No DAC (5mg)',
    description: 'CJC-1295 is a synthetic 29-amino-acid peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 44.99,
    originalPrice: 49.99,
    image: '/products/CJC NO DAC/CJC-1295 5mg.png',
    rating: 5,
    reviews: 35,
  },
  {
    id: 'cjc-1295-no-dac',
    name: 'CJC-1295 No DAC (10mg)',
    description: 'CJC-1295 is a synthetic 29-amino-acid peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 64.99,
    originalPrice: 71.99,
    image: '/products/CJC NO DAC/CJC-1295 10mg.png',
    rating: 5,
    reviews: 42,
    inStock: true,
  },
  {
    id: 'cjc-1295-2mg',
    name: 'CJC-1295 w/ DAC (2mg)',
    description: 'CJC-1295 is a synthetic 29-amino-acid peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 34.99,
    originalPrice: 38.99,
    image: '/products/CJC-1295 (With DAC)/CJC-1295 DAC 2mg.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'ipamorelin-5mg',
    name: 'Ipamorelin 5mg',
    description: 'Growth hormone-releasing peptide for research. 5mg concentration for scientific studies.',
    price: 39.99,
    originalPrice: 44.99,
    image: '/products/Ipamorelin/Ipamorelin 5mg.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin 10mg',
    description: 'Growth hormone-releasing peptide in higher concentration for extended research applications.',
    price: 59.99,
    originalPrice: 66.99,
    image: '/products/Ipamorelin/Ipamorelin 10mg.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'ipamorelin-cjc-1295-10mg',
    name: 'Ipamorelin/CJC-1295 (no DAC) 10mg',
    description: 'Peptide blend of synthetic CJC-1295 (no DAC) and Ipamorelin, 10 mg each. Supplied for analytical and experimental laboratory applications.',
    price: 104.99,
    originalPrice: 115.99,
    image: '/products/cjc-no-dac-ipa/IPA_CJC 10_10.png',
    rating: 5,
    reviews: 0,
    inStock: true,
  },
  {
    id: 'cjc-1295-5mg',
    name: 'CJC-1295 w/ DAC (5mg)',
    description: 'CJC-1295 is a synthetic 29-amino-acid peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 59.99,
    originalPrice: 65.99,
    image: '/products/CJC-1295 (With DAC)/CJC-1295 DAC 5mg.png',
    rating: 5,
    reviews: 41,
    inStock: false,
  },
  {
    id: 'reta-5mg',
    name: 'Reta 5mg',
    description: 'Reta is a synthetic multi-agonist peptide analog. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 39.99,
    originalPrice: 43.99,
    image: '/products/Reta/Reta 5mg.png',
    rating: 5,
    reviews: 38,
    inStock: false,
  },
  {
    id: 'ipamorelin-cjc-1295-5mg',
    name: 'Ipamorelin/CJC-1295 (no DAC) 5mg',
    description: 'Peptide blend of synthetic CJC-1295 (no DAC) and Ipamorelin, 5 mg each. Supplied for analytical and experimental laboratory applications.',
    price: 64.99,
    originalPrice: 71.99,
    image: '/products/cjc-no-dac-ipa/IPA_CJC 5_5.png',
    rating: 5,
    reviews: 39,
    inStock: false,
  },
  {
    id: 'bpc-157-5mg',
    name: 'BPC-157 5mg',
    description: 'BPC-157 is a synthetic pentadecapeptide composed of 15 amino acids. Supplied strictly for laboratory research use in controlled, non-clinical environments.',
    price: 34.99,
    originalPrice: 38.99,
    image: '/products/bpc-157/BPC-157 5mg.png',
    rating: 5,
    reviews: 127,
    badge: 'Popular',
    inStock: false,
  },
]

type SortOption = 'default' | 'popularity' | 'price-low' | 'price-high'
type StatusFilter = 'all' | 'in' | 'out'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let list = allProducts

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      list = list.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(searchLower)
        const descMatch = p.description.toLowerCase().includes(searchLower)
        return nameMatch || descMatch
      })
    }

    if (statusFilter === 'in') list = list.filter((p) => p.inStock !== false)
    if (statusFilter === 'out') list = list.filter((p) => p.inStock === false)

    if (sortBy === 'default') {
      const orderMap = new Map(DEFAULT_ORDER.map((id, i) => [id, i]))
      list = [...list].sort((a, b) => {
        const ai = orderMap.has(a.id) ? orderMap.get(a.id)! : 9999
        const bi = orderMap.has(b.id) ? orderMap.get(b.id)! : 9999
        return ai - bi
      })
    } else if (sortBy === 'popularity') {
      const orderSet = new Set(POPULARITY_ORDER)
      const ordered = POPULARITY_ORDER.map((id) => list.find((p) => p.id === id)).filter(Boolean) as typeof list
      const rest = list.filter((p) => !orderSet.has(p.id))
      list = [...ordered, ...rest]
    } else if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price)
    }

    return list
  }, [searchTerm, statusFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, sortBy])

  const sortLabel =
    sortBy === 'default'
      ? 'Default sorting'
      : sortBy === 'popularity'
        ? 'Sort by popularity'
        : sortBy === 'price-low'
          ? 'Sort by price: low to high'
          : 'Sort by price: high to low'

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 sm:pt-32 md:pt-36 pb-16">
        <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[60vh] bg-gradient-to-b from-white via-[#fafaf8] to-[#f2f1ed]">
          <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 md:py-8">
            {/* Breadcrumb left; title + description centered */}
            <div className="mb-4 sm:mb-6">
              <nav className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span className="mx-1">/</span>
                <span className="text-foreground font-medium">Shop</span>
              </nav>
              <div className="text-center">
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-foreground">Research Peptides</h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-2xl mx-auto px-1">
                  Premium quality peptides for scientific research. All products come with certificates of analysis and are manufactured in GMP-compliant facilities.
                </p>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Left Sidebar: Search + Status */}
              <aside className="lg:w-64 shrink-0 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">Search</h3>
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="relative flex-1 min-w-0">
                      <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-7 sm:pl-9 h-8 sm:h-9 text-xs sm:text-sm bg-card border-border rounded-md"
                      />
                    </div>
                    <Button type="button" size="sm" className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
                      Search
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">Status</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={statusFilter === 'all'}
                        onCheckedChange={() => setStatusFilter('all')}
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={statusFilter === 'in'}
                        onCheckedChange={() => setStatusFilter('in')}
                      />
                      <span>In stock</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <Checkbox
                        checked={statusFilter === 'out'}
                        onCheckedChange={() => setStatusFilter('out')}
                      />
                      <span>Out of stock</span>
                    </label>
                  </div>
                </div>
              </aside>

              {/* Right: Results + Sort + Grid + Pagination */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate min-w-0">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} results
                  </p>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSortOpen((o) => !o)}
                      className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-card border border-border rounded-md hover:border-primary/50 shrink-0"
                    >
                      <span>{sortLabel}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {sortOpen && (
                      <>
                        <div className="fixed inset-0 z-10" aria-hidden onClick={() => setSortOpen(false)} />
                        <ul className="absolute right-0 top-full mt-1 py-1 w-56 bg-card border border-border rounded-md shadow-lg z-20">
                          {(['default', 'popularity', 'price-low', 'price-high'] as const).map((opt) => (
                            <li key={opt}>
                              <button
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-muted"
                                onClick={() => {
                                  setSortBy(opt)
                                  setSortOpen(false)
                                }}
                              >
                                {opt === 'default' && 'Default sorting'}
                                {opt === 'popularity' && 'Sort by popularity'}
                                {opt === 'price-low' && 'Sort by price: low to high'}
                                {opt === 'price-high' && 'Sort by price: high to low'}
                                {sortBy === opt && ' ✓'}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {paginatedProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
                      {paginatedProducts.map((product) => (
                        <div key={product.id}>
                          <ProductCard {...product} />
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className="text-xs px-2 py-1 h-8"
                        >
                          Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="text-xs min-w-[2rem] h-8 px-2"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className="text-xs px-2 py-1 h-8"
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground mb-3">No products found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters, or{' '}
                      <button
                        type="button"
                        onClick={() => { setSearchTerm(''); setStatusFilter('all') }}
                        className="text-primary underline hover:text-primary/80"
                      >
                        clear
                      </button>
                    </p>
                  </div>
                )}

                <div className="mt-6 sm:mt-10 p-3 sm:p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-border/30 shadow-sm text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-semibold">Research Use Only:</strong> These products are intended for laboratory research purposes only.
                    Not for human consumption. Please ensure compliance with local regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
