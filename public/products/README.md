# Product Images

This folder contains product images for the Enhanced Chem website.

## Folder Structure

- `bpc-157/` - Images for BPC-157 product
- `tb-500/` - Images for TB-500 product  
- `mix-peptide/` - Images for the BPC-157 + GHK-Cu + TB-500 mix product

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 800x600px or higher
- **Quality**: High resolution for product showcase
- **Naming**: Use descriptive names like `bpc-157-main.jpg`, `tb-500-vial.jpg`, etc.

## Usage in Code

Images can be referenced in components like:
```jsx
<img src="/products/bpc-157/bpc-157-main.jpg" alt="BPC-157 Product" />
```

Or in Next.js Image component:
```jsx
import Image from 'next/image'
<Image src="/products/bpc-157/bpc-157-main.jpg" alt="BPC-157 Product" width={400} height={300} />
```












