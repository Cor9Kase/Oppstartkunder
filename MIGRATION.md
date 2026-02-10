# Database Migration Guide

## Update Required: Add Share Token to Clients Table

To enable secure sharing of the customer form with external customers, you need to update your Supabase database schema.

### Steps:

1. **Go to your Supabase project**
   - Navigate to the SQL Editor

2. **Run the following SQL migration:**

```sql
-- Add share_token column to clients table
ALTER TABLE clients 
ADD COLUMN share_token text UNIQUE NOT NULL DEFAULT '';

-- Update existing clients with random tokens
UPDATE clients 
SET share_token = substr(md5(random()::text), 1, 32) 
WHERE share_token = '';

-- Create an index for faster lookups by token
CREATE INDEX idx_clients_share_token ON clients(share_token);
```

3. **Verify the migration:**
   - The `clients` table should now have a `share_token` column
   - Each client should have a unique 32-character token

### What This Does:

- Adds a `share_token` column to generate unique, secure links for each customer
- Allows customers to access their form via a shareable link (e.g., `/kundeskjema/{token}`)
- Ensures customers can only access their own form data, not other customers' data
- Adds an index to optimize database lookups by token

### After Migration:

- The app will automatically generate new tokens when you create new customers
- Existing customers will have tokens assigned based on their ID and a random component
- You can view the share link for each customer in the customer detail page

---

## What Changed in the App:

### New Features:
1. **Secure Customer Links**: Share forms with customers using unique tokens instead of internal IDs
2. **Newsletter Software Selection**: The form now asks customers what email marketing software they use (Klaviyo, Mailchimp, Brevo, etc.) instead of assuming Klaviyo
3. **Better Access Control**: Customers can now only access their own form via the token, not navigate to other customers' data

### Updated Routes:
- **Old**: `/kunde/{id}/kundeskjema`
- **New**: `/kundeskjema/{token}`

### Updated Form:
- Removed hardcoded Klaviyo references
- Added a dedicated section asking about email marketing software
- Form now asks "Do you use a newsletter software?" and lets them choose which one

