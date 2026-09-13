# POWERMAN Batteries — Deploy to Vercel 🚀

The site is **fully static** (no database required), so deployment takes about 5 minutes.

---

## ⚠️ REPLACE THESE PLACEHOLDERS BEFORE LAUNCH

The client has not provided real contact details yet. Placeholder values are used site-wide.
**All of them live in ONE file: `src/lib/site-config.ts`** — edit that file and every page updates.

| Item | Placeholder value |
|---|---|
| Phone | `+234 800 123 4567` |
| WhatsApp | `+234 800 123 4567` (same as phone) |
| Email | `info@powermanbatteries.com` |
| Address | `Lagos, Nigeria — full address coming soon` |
| Business hours | `Monday – Saturday: 8:00 AM – 6:00 PM` |

Also note: **all product photos are stock/placeholder photography** — swap in the client's real product photos (in `public/images/`, then update paths in `src/lib/products.ts`) before launch.

---

## Step 1 — Push to GitHub

1. Unzip `powerman-batteries-site.zip`
2. Create a new repository on [github.com/new](https://github.com/new) (e.g. `powerman-batteries`, keep it **public** or **private** — both work with Vercel)
3. In the unzipped folder, run:

```bash
cd powerman-batteries
git init
git add .
git commit -m "POWERMAN Batteries website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/powerman-batteries.git
git push -u origin main
```

## Step 2 — Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub
2. Click **Import** on your `powerman-batteries` repository
3. Vercel auto-detects Next.js — leave all build settings as they are
4. Click **Deploy**

In ~2 minutes you'll get a live URL like `https://powerman-batteries.vercel.app`.

## Step 3 (Optional) — Custom Domain

1. In the Vercel project, go to **Settings → Domains**
2. Add the client's domain (e.g. `powermanbatteries.com`) and follow the DNS instructions Vercel shows
3. SSL is automatic and free

## Step 4 (Optional) — Site URL for SEO

To make the sitemap and social-share links use the final domain, set one environment variable:
**Vercel → Project → Settings → Environment Variables → Add:**

- Name: `NEXT_PUBLIC_SITE_URL`
- Value: `https://your-final-domain.com`

Then redeploy (Deployments → ⋯ → Redeploy).

---

## Updating the site later

Edit files → push to GitHub → Vercel redeploys automatically.

- Contact info / hours / categories → `src/lib/site-config.ts`
- Products, prices, specs, images → `src/lib/products.ts`

## Phase 2 (planned next)

- Admin panel (manage products, enquiries, homepage content without code)
- Database-backed enquiry storage (Prisma schema already scaffolded in `prisma/`)
- Real product photography integration
