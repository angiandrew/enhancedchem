# Google Shopping Setup Guide

## Why Your Products Don't Appear on Google Shopping

Your products aren't showing up on Google Shopping because:

1. **Missing Structured Data** - Google needs Schema.org Product markup to understand your products
2. **No Google Merchant Center Account** - Required to list products on Google Shopping
3. **Missing Product Feed** - Google needs a product data feed to display your products

## What I've Added

✅ **ProductStructuredData Component** - Adds Schema.org Product markup to product pages

## What You Need to Do

### Step 1: Add Structured Data to Product Pages

I've created a component that adds structured data. You need to add it to each product page. Here's an example for the Retatrutide page:

```tsx
import ProductStructuredData from '@/components/ProductStructuredData'

// Inside your component, add:
<ProductStructuredData 
  product={{
    name: `Retatrutide ${selectedMG}`,
    description: 'Triple agonist peptide for research applications...',
    price: currentPrice,
    originalPrice: currentOriginalPrice,
    image: currentImage,
    inStock: isInStock,
    brand: 'Enhanced Chem',
    url: `${baseUrl}/products/retatrutide`
  }}
/>
```

### Step 2: Set Up Google Merchant Center

1. **Create Account**: Go to https://merchants.google.com
2. **Verify Your Website**: Add your domain and verify ownership
3. **Set Up Product Feed**: 
   - Go to Products → Feeds
   - Create a new feed
   - Choose "Google Sheets" or "Scheduled fetch" method

### Step 3: Create Product Feed

Google needs a feed with these required fields:
- `id` - Unique product ID
- `title` - Product name
- `description` - Product description
- `link` - Product URL
- `image_link` - Product image URL
- `price` - Product price (format: "USD 41.99")
- `availability` - "in stock" or "out of stock"
- `brand` - "Enhanced Chem"
- `condition` - "new"
- `google_product_category` - Category ID (find at https://www.google.com/basepages/producttype/taxonomy.en-US.txt)

### Step 4: Submit Your Sitemap

1. Go to Google Search Console: https://search.google.com/search-console
2. Add your property (website)
3. Submit your sitemap: `https://enhancedchem.com/sitemap.xml`

### Step 5: Add Google Site Verification

Add this to your `.env.local`:
```
GOOGLE_SITE_VERIFICATION=your_verification_code_here
```

### Step 6: Wait for Indexing

- Google typically takes 1-2 weeks to index new products
- Check Google Search Console for indexing status
- Monitor Google Merchant Center for feed processing errors

## Quick Wins

1. **Add structured data to all product pages** (I can help automate this)
2. **Submit sitemap to Google Search Console**
3. **Create Google Merchant Center account**
4. **Set up product feed**

## Important Notes

- Google Shopping requires products to have clear pricing, availability, and images
- Your products must comply with Google's shopping policies
- Research peptides may have restrictions - check Google's policies
- It can take 2-4 weeks for products to appear after setup

## Next Steps

Would you like me to:
1. Add structured data to all product pages automatically?
2. Create a script to generate a Google Merchant Center feed?
3. Add product-specific metadata to each page?
