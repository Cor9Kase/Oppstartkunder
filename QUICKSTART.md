# Quick Start: Customer Form Sharing

## 🚀 Getting Started

### Step 1: Update Your Database
**Important**: You must run a migration first.

1. Go to your Supabase Dashboard → SQL Editor
2. Copy the SQL from [MIGRATION.md](./MIGRATION.md)
3. Run the migration

### Step 2: Deploy Updated Code
Push the changes to your production environment.

### Step 3: Share Customer Form

#### For Each New Customer:
1. Click "Legg til ny kunde" in the dashboard
2. Enter customer name and create
3. On the customer detail page, copy the shareable link (green box at top)
4. Send the link to your customer via email

#### What the Link Looks Like:
```
https://yourapp.com/kundeskjema/abc123def456...
```

#### What Customers See:
- A clean form with their company name
- No login required
- Asks what email marketing software they use (not assuming Klaviyo)
- Can print/save as PDF when done
- Can only see their own form (token prevents access to others' data)

---

## 📋 What Changed

### ✅ NEW: Token-Based Sharing
- Secure, unique link for each customer
- No internal IDs exposed
- Customers can't access other customers' data

### ✅ NEW: Newsletter Software Flexibility
- Form now asks "Do you use email marketing software?"
- Supports: Klaviyo, Mailchimp, Brevo, ConvertKit, other, none
- Not just Klaviyo anymore

### ✅ IMPROVED: Security
- Changed routing from `/kunde/{id}/kundeskjema` to `/kundeskjema/{token}`
- Access validated server-side
- Random tokens prevent guessing

---

## 🔗 Shareable Link Example

**Customer receives this link:**
```
https://app.skardigital.no/kundeskjema/abcd1234efgh5678ijkl9012mnop3456
```

**In the URL:**
- No customer ID visible
- Random 32-character token
- Prevents seeing other customers' data

---

## ❓ FAQ

**Q: What if a customer loses the link?**
A: Copy it again from the customer detail page.

**Q: Can a customer see other customers' forms?**
A: No - the token is unique and validated server-side.

**Q: What email software do you support now?**
A: Flexible - we ask the customer what they use.

**Q: Do existing customers need new links?**
A: Yes, run the migration to assign tokens to existing customers.

**Q: Can I see all customers' forms in the internal dashboard?**
A: Yes - the meeting version at `/kunde/{id}/moteskjema` still works for your team.

---

## 📁 Files Changed

- `src/lib/api.ts` - New token functions
- `src/lib/types.ts` - Updated interfaces
- `src/pages/CustomerFormPage.tsx` - Token-based access
- `src/components/CustomerForm.tsx` - Newsletter flexibility
- `src/pages/ClientDetail.tsx` - Share link display
- `supabase-schema.sql` - Database schema

---

## 🆘 Troubleshooting

**Problem**: "Invalid or expired link"
- **Solution**: Copy fresh link from customer detail page

**Problem**: New clients don't have share token
- **Solution**: Restart app or check database migration was run

**Problem**: Can't create new customers
- **Solution**: Ensure migration was successful - `share_token` column must exist

---

## 📚 Learn More

- [IMPLEMENTATION.md](./IMPLEMENTATION.md) - Technical details
- [MIGRATION.md](./MIGRATION.md) - Database migration SQL
