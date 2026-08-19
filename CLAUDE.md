# CriaTuHandmade

Full-featured e-commerce website for Cria Tu Handmade — a real handmade-crafts small business. Angular 19 frontend, backed by Netlify Functions + MongoDB.

## Project Structure
- **angular/** — Angular 19 frontend (Netlify deployment), including its own serverless backend (`angular/netlify/functions/`). See `angular/CLAUDE.md`.

There used to be a parallel .NET 8/PostgreSQL API in `dotnet/`; it has been **removed**. Everything runs through Angular + Netlify Functions/MongoDB for now — a separate backend may come back later if needed, but don't reintroduce .NET/dotnet references until it does. Known non-breaking issue: Angular peer dependency warnings (ngx-bootstrap vs Angular 19).

---

## The Business (Cria Tu Handmade)

Use this to keep any customer-facing copy, product content, or UI decisions authentic to the real business — not generic placeholder text.

### Who they are
- Solo artisan business making hand-crafted felt decorations and ornaments, based in **Witney, England, UK**.
- **10 years** on Etsy (since ~2016), **5.0 stars**, 305 reviews, 644 sales.
- Brand name likely from Portuguese/Spanish "Create Yours" — emphasizes custom, personalized creations.
- Brand values: handcrafted quality, personalization, inclusion & kindness ("Be the one who makes others feel included"), attention to detail, affordability.

### What they sell
Felt decorations and ornaments, hand-embroidered/hand-stitched, often personalized with names/letters/messages. Core lines:
- **Christmas** (biggest category): personalized tree ornaments, Santas, felt avocado/pudding ornaments, themed decorations
- **Easter** (2nd biggest): felt egg ornaments (many colorways), personalized eggs, bunny decorations, egg money holders
- **Felt animals**: bees, ladybugs, seagulls, piggy/seahorse ornaments
- **Valentine's/Mother's Day**: embroidered hearts, "Mum" hangings, Valentine tree decorations
- **Personalized gifts**: friendship bracelets, name bookmarks, coasters, clip-on earrings, badges, mini calendars
- **Home décor**: ceramic-mix felt hangings, flower cross decorations
- **Food-themed**: felt pizza slices, avocados

Price range **£6.88–£15.74** (most items £8–12). Materials: felt + hand-embroidery. Many listings marked "Only X left" — scarcity/urgency is part of the merchandising style.

### Target audience
Gift buyers (25–55) who value handmade over mass-produced, parents personalizing decorations for kids, holiday decorators. Primarily UK-based, some international via Etsy. Purchase occasions: Christmas, Easter, Mother's Day, Valentine's, birthdays, year-round "just because" gifts.

### Brand voice & tone
Warm, friendly, personal — "like chatting with a friend who makes beautiful things." UK English, simple/accessible, descriptive ("whimsical," "adorable," "lovingly handcrafted"), positive and inclusive. Avoid corporate/technical language in customer-facing copy.

### Unique selling points
Completely handmade (no mass production), 10 years personalization experience, original designs, affordable (£7–15), items ready to ship, proven track record (644 sales / 5.0 stars), positive/inclusive messaging.

### Sales channels
- **Etsy** (primary): https://www.etsy.com/uk/shop/CriaTuHandmade — 35 active listings
- **Instagram**: https://www.instagram.com/cria.tu/
- **Facebook**: https://www.facebook.com/criatu.art
- **Email**: cria.tu@outlook.com

Orders and payment go through Etsy; this website serves as a showcase/marketing site plus its own shop/blog/contact features. Full detail: `CRIA_TU_BUSINESS_CONTEXT.md`.

---

## Architecture

- **Frontend**: Angular 19.0.3, TypeScript 5.5, Bootstrap 5.3.3, Angular Material 19.0.2, ngx-bootstrap (carousel), ng-gallery, ngx-spinner
- **Backend**: Netlify Functions (MongoDB) — the only backend. Deploys as part of the same Netlify site as the Angular app, no separate hosting.
- **State**: LocalStorage for cart and admin-panel data (no real user auth/database-backed admin yet)
- **Deployment**: Netlify only (auto-deploy on push to main)

### Key Features
- Product catalog (shop) with categories, filtering, sort, cart (localStorage-persisted)
- Blog with search/filter/sort/pagination
- Services showcase
- Live chat with content moderation
- Contact form
- Admin panel (products, business info, settings) — see `angular/CLAUDE.md` for credentials and usage
- Dark mode via CSS custom properties
- WebP image optimization pipeline

> **Note**: a "comments" feature is documented in `COMMENTS_SYSTEM.md` / `COMMENTS_IMPLEMENTATION.md` and has a Netlify function (`angular/netlify/functions/comments.js`), but **no Angular component for it exists in this codebase** — it's not wired into `app.module.ts`, `home.component.html`, or the admin panel, and `ApiService` has no comment methods. Treat those docs as aspirational/stale, not a description of current behavior, until someone actually builds the frontend for it.

## Deployment
- **Angular**: Auto-deploy to Netlify from Git. Build: `cd angular && npm install && npm run build`. Publish: `angular/dist/browser`. Config in `netlify.toml`.
- Env var `MONGODB_URI` is set in the Netlify dashboard for the Netlify Functions backend.

## When Adding New Features
1. Build it in Angular (component/service) — there is no separate backend project anymore.
2. Follow `angular/CLAUDE.md` for conventions.
3. Create/update necessary files (components, services, interfaces) and their tests.
4. Update routing as needed.
5. Test locally before committing.

## Quick Decision Guide
- **New page?** → Angular component in `angular/src/app/`
- **New API endpoint/data operation?** → Netlify Function in `angular/netlify/functions/` (MongoDB) or `ApiService` methods, matching the existing `database.js` pattern
- **Client-side logic?** → Angular service or component
- **UI component?** → Angular component with Material/Bootstrap, using CSS variables (see dark mode guide) not hardcoded colors
- **Data validation?** → Angular (client) and the Netlify Function (server)
- **Product/blog/marketing copy?** → Keep it consistent with the brand voice above; ground it in real business facts, not filler

## General Guidelines
- Follow existing patterns — match the style and architecture already in use.
- Everything lives under `angular/` — work from there for build/test/dev commands.
- Update all related files when changing something — don't forget tests and interfaces.
- Handle errors — try/catch and proper error responses in Netlify Functions.
- Use strong typing throughout (TypeScript).
- Read existing code before changing it; preserve formatting and naming conventions.
- Git commands are run from the repository root.

## Other Project Docs
- `SITE_REDESIGN_PLAN.md` — active, up-to-date plan for bringing every page to the "scrapbook" style and real business content, page by page. Check this first when working on About/Services/Contact/Blog/nav — it supersedes the stale descriptions below.

Full, unabridged copies of every markdown doc in this repo (source docs + `.github/copilot-instructions.md`) are collected in **`.claude/docs/`** for reference — read from there when this file's summary isn't enough detail. Some of these predate the .NET backend removal and the comments-feature note above; where they conflict with this file, this file wins.

- `CRIA_TU_BUSINESS_CONTEXT.md` — full business context (products, pricing, USPs, seasonal strategy, content guidance)
- `DOCUMENTATION.md` — technical documentation (setup, components, data structures, API, troubleshooting) — **still describes the removed .NET backend**, treat those parts as historical
- `COMMENTS_SYSTEM.md` / `COMMENTS_IMPLEMENTATION.md` — comment system design — **describes a feature not actually implemented in the Angular app** (see note above)
- `CHAT_CONTENT_MODERATION.md` — chat moderation rules (see `angular/CLAUDE.md`)
- `DARK_MODE_GUIDE.md` — CSS variable theming system (see `angular/CLAUDE.md`)
- `IMAGE_OPTIMIZATION.md` / `OPTIMIZATION_SUMMARY.md` — image optimization pipeline (see `angular/CLAUDE.md`)
- `angular-README.md` — Angular CLI boilerplate readme
- `copilot-instructions.md` — original GitHub Copilot instructions — **still describes the removed .NET backend**, treat as historical
