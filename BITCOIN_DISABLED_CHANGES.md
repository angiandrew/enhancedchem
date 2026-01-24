# Bitcoin Payment - Temporarily Disabled

## Summary
Bitcoin payment option has been temporarily disabled in the checkout page.

## Changes Made

### 1. UI Changes (Lines 849-865 in `src/app/checkout/page.tsx`)

**Before:**
- Bitcoin option was clickable and selectable
- Had orange styling when selected
- Showed Bitcoin address input field

**After:**
- Bitcoin option is now disabled (grayed out, non-clickable)
- Shows "Temporarily Unavailable" label
- Displays message: "Bitcoin payment is temporarily unavailable. Please select another payment method."
- No onClick handler (cannot be selected)
- Visual styling: `opacity-50 bg-muted/30 cursor-not-allowed`

### 2. Validation Check (Lines 185-189 in `src/app/checkout/page.tsx`)

Added validation to prevent Bitcoin orders even if someone tries to bypass the UI:

```typescript
if (selectedAlternativeMethod === 'bitcoin') {
    alert('Bitcoin is temporarily unavailable. Please select another payment method.')
    setIsSubmitting(false)
    return
}
```

## Current State

✅ **Bitcoin payment option is:**
- Visually disabled (grayed out)
- Non-clickable
- Blocked at form submission
- Shows clear "Temporarily Unavailable" message

## To Re-enable Bitcoin

1. Restore the onClick handler in the Bitcoin div:
   ```typescript
   onClick={() => setSelectedAlternativeMethod('bitcoin')}
   ```

2. Restore the original styling classes (remove `opacity-50`, `cursor-not-allowed`, etc.)

3. Restore the Bitcoin address input field

4. Remove the validation check (lines 185-189)

5. Change "Temporarily Unavailable" back to "Cryptocurrency"

## File Location
`src/app/checkout/page.tsx`
