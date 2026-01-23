// Product order for navigation - matches the order in /products/page.tsx
export const productOrder = [
  'bpc-157',
  'tb-500',
  'tb-500-5mg',
  'ghk-cu',
  'ghk-cu-100mg',
  'kpv-5mg',
  'kpv',
  'semax',
  'selank',
  'bpc-tb-mix',
  'bpc-tb-mix-10mg',
  'mix-peptide',
  'nad-500mg',
  'retatrutide',
  'retatrutide-15mg',
  'retatrutide-20mg',
  'melanotan-2',
  'klow-80mg',
  'cjc-1295-no-dac-5mg',
  'cjc-1295-5mg',
  'cjc-1295',
  'cjc-1295-no-dac',
  'retatrutide-5mg',
  'ipamorelin-cjc-1295-5mg',
  'bpc-157-5mg',
  'bpc-157-10mg',
]

export function getPreviousProduct(currentId: string): string | null {
  const index = productOrder.indexOf(currentId)
  if (index === -1 || index === 0) return null
  return productOrder[index - 1]
}

export function getNextProduct(currentId: string): string | null {
  const index = productOrder.indexOf(currentId)
  if (index === -1 || index === productOrder.length - 1) return null
  return productOrder[index + 1]
}
