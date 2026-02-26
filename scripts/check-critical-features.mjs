#!/usr/bin/env node
/**
 * Ensures critical admin/API features are present. Run before merge/push to avoid
 * losing features when merging branches. Fails if any required string is missing.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(process.cwd())

const CHECKS = [
  {
    file: 'src/app/admin/orders/page.tsx',
    required: [
      'isTest',
      'toggleTestOrder',
      'Mark test',
      'FlaskConical',
      '!o.isTest',
      'Excludes test orders',
    ],
    name: 'Admin orders page (Test order support)',
  },
  {
    file: 'src/app/api/admin/orders/route.ts',
    required: ['setOrderTestFlag', 'isTest'],
    name: 'Admin orders API (Test flag PATCH)',
  },
]

let failed = false
for (const { file, required, name } of CHECKS) {
  const filePath = path.join(ROOT, file)
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${file}`)
    failed = true
    continue
  }
  const content = fs.readFileSync(filePath, 'utf8')
  for (const needle of required) {
    if (!content.includes(needle)) {
      console.error(`[${name}] Missing required string: "${needle}" in ${file}`)
      failed = true
    }
  }
}

if (failed) {
  console.error('\nCritical feature check failed. Do not remove Test order support when merging.')
  process.exit(1)
}
console.log('Critical feature check passed.')
