# ENERGY MAN Batteries — Deployment

Deploying takes 3 steps. The website sets up its own database automatically — no commands to run, nothing to type.

## The 3 steps

**1. Push this code to your GitHub repo** (replace the old files, commit, push).

**2. In your Vercel dashboard:** open your project → **Storage** tab → **Create Database** → pick **Postgres** → connect it to this project. Vercel adds the database connection automatically.

**3.** Go to **Deployments** → latest deployment → **Redeploy**.

Done. Open `https://your-site.vercel.app/admin` and log in:

- **Username:** `admin`
- **Password:** `EnergyMan2026!`

## Why there's nothing else to do

On the first visit, the app automatically:
- Creates all its database tables
- Loads all 56 products
- Creates the admin login

No seed commands, no migration commands, no SQL. If you ever start with a fresh empty database (e.g. you delete the old one and create a new one), just redeploy — it sets itself up again.

## Notes

- **No database yet?** The public website still works perfectly — it falls back to the built-in catalogue. Only the admin panel needs the database.
- **Changing the admin password:** edit `prisma/seed.ts` and `src/lib/bootstrap.ts` (search for `EnergyMan2026!`), push, redeploy, and create a fresh database — or just change it in the code before your first deploy.
- **Local development:** `npm install` then `npm run dev`. The public site works immediately. For the admin panel locally, set `DATABASE_URL` to any Postgres database — the app will set itself up automatically.
- **Storing photos:** product photos live in `public/images/`.

## Admin panel features

- Add, edit, delete products (live on the website instantly)
- One-click In Stock / Out of Stock and Featured toggles
- Customer enquiry inbox with status tracking (New → Contacted → Confirmed → Completed)
- Dashboard statistics

## Smart redirects

`vercel.json` maps common URLs so visitors never hit a dead end — `/products`, `/batteries`, `/catalogue` → `/shop`, `/whatsapp` and `/wa` → WhatsApp chat, `/call` → phone dialer.
