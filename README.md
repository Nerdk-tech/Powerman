# POWERMAN Batteries — Website

A modern, fast, mobile-first marketing & catalogue website for **POWERMAN** — *Power You Can Depend On.*

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

## What's Included

- **Homepage** — hero, shop-by-category grid, featured products, "Why Choose POWERMAN", interactive Battery Finder, promo banner
- **Shop** — full catalogue with search, category/brand/price/voltage/availability filters and sorting
- **Product pages** — photo gallery, full technical specs, WhatsApp-to-Order, Call, and enquiry form
- **Order Enquiry system** — guest checkout-style enquiry form (no accounts, no online payment; POWERMAN confirms availability, pricing, payment and delivery directly with the customer)
- **About / Contact / Battery Safety Tips / Privacy Policy / Terms & Conditions** pages
- **WhatsApp integration** — every product has a prefilled WhatsApp order button
- **Mobile-first** — sticky Call/WhatsApp action bar on mobile
- **SEO** — per-page metadata, Open Graph, sitemap.xml, robots.txt

## Run Locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/            # Pages (App Router) — home, shop, product/[slug], about, contact, legal pages, API routes
  components/     # Header, Footer, ProductCard, ProductGallery, EnquiryForm, FindYourBattery, etc.
  lib/
    site-config.ts   # ⭐ Contact details, brand info & categories
    products.ts      # Product catalogue data (20 products, 8 categories)
public/
  images/         # Product & category photography
  logo.png        # POWERMAN logo
```

## Editing Content

- **Contact details, hours, address, categories** → `src/lib/site-config.ts`
- **Products (names, prices, specs, images)** → `src/lib/products.ts`

> **Note:** Product photos are professional stock/illustrative images — swap in the client's real product photography before launch.


## Admin Panel

Manage the full catalogue from the browser:

- URL: `/admin`
- Username: `admin`
- Password: `PowerMan2026!`

Add/edit products, control stock and featured items, and review customer enquiries.

Deploying: push to GitHub → Vercel → Storage → Create Database (Postgres) → Redeploy. That's all — the app creates its tables, loads all 56 products and the admin login automatically on first visit. Full details in `DEPLOYMENT.md`.

## Smart Redirects

`vercel.json` maps common URLs so visitors never hit a dead end — `/products`, `/batteries`, `/catalogue` → `/shop`, `/whatsapp` and `/wa` → WhatsApp chat, `/call` → phone dialer.
