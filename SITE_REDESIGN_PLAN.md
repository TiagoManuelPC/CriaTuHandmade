# Site Redesign Plan — CriaTuHandmade

Working plan for bringing every page up to the same standard as Home: on-brand content (real business, not placeholder) and the "scrapbook" visual style. This is a living document — update it as pages get fixed. Not committed to git automatically; the human owns when this ships.

Execution order (per your call): **plans/specs first, then About, then the rest in whatever order makes sense once About is done.**

---

## 1. Current State — What's Actually There

Only 5 real, routed pages exist: **Home, About, Services, Blog (+ post detail), Contact**. Despite what older docs (`DOCUMENTATION.md`, prior CLAUDE.md versions) claimed, there is **no Shop, no Admin panel, no Comments feature** — those were either removed, never built, or documented ahead of the code.

### Known bugs (independent of style/content — fix regardless of design decisions)
| Bug | File | Status |
|---|---|---|
| ~~Blog fetch/create posts against the deleted .NET backend~~ | `angular/src/app/blog/blog.service.ts` | **Fixed** — now uses the generic Netlify Function `database.js` (collection `blogposts`), Mongo `_id` mapped to `BlogPost.id` |
| Dead fetch to deleted `.../WeatherForecast` endpoint on page load | `angular/src/app/home/home.component.ts` | Delete `apiUrl`, `getProducts()`, and the `ngOnInit` call — unused leftover *(still open)* |
| ~~Public "Add New Post" button/modal — any visitor can write to the blog~~ | `angular/src/app/blog/blog.component.html/.ts` | **Fixed** — removed until real auth exists (see Blog spec below) |
| Desktop top nav wrapped in `*ngIf="isDevMode()"` — no nav links render in production build; hamburger menu is also CSS-hidden above 600px, so there is no way to navigate off Home on desktop prod | `angular/src/app/app.component.html` | Decide per-page as it's fixed: un-gate the link once that page is ready for the public |
| "Shop" link present in both nav menus but no `/shop` route exists (dead link, silently redirects home via wildcard) | `angular/src/app/app.component.html` | Remove until/unless a Shop page is built |

### Design system (already solid — no rework needed)
`angular/src/styles/_tokens.scss` + `_shared.scss`: brand colors sampled from the logo (`--color-primary` #CC3366, `--color-teal`, `--color-peach`, `--color-mint`), Fredoka (headings) / Nunito (body) fonts, radius/shadow scales, full dark mode via `data-theme`. Every page already uses these tokens correctly — nobody is hardcoding hex colors. **Keep this as-is.** The gap is layout/content, not tokens.

### Asset gap
The only real product photography in the repo is ~13 Christmas ornament photos (`angular/src/assets/images/xmax*.jpeg`), used on Home. `service-images/` only has generic stock hat/mug/plate/tshirt photos from whatever template this started as. **About and Services cannot be made fully authentic without more real photos** (Easter eggs, bees, ladybugs, personalized gifts, etc. from Etsy/Instagram) — flagging this now so it isn't a surprise later; will ask for images page-by-page as needed.

---

## 2. The Target Style: "Scrapbook"

Home (`angular/src/app/home/`) is the reference. Its defining moves, to be reused (not copy-pasted identically, but the same *language*) on every other page:

- **Tilted, hand-placed elements** instead of flat grids — small rotation values (`-6deg` to `4deg`) on stickers/cards/photos, slightly different per item so nothing looks machine-generated
- **Physical-object metaphors**: polaroids, postcards, stamps, stickers — leans into "handmade," not "corporate website"
- **Hover physics**: scale + un-rotate on hover (`transform: scale(1.08) rotate(0deg)`), not just a flat opacity/shadow change
- **A logo-plate / halo shape** behind key images (soft colored circle, offset, rotated) rather than images floating on bare background
- **Dashed borders, soft pastel accents** (`--color-peach`, `--color-mint`, `--color-teal`) as secondary color moments, not just the pink primary everywhere
- **Textured background**: the pegboard-dot texture on `body` (already global via `styles.scss`) ties every page together — this part already applies everywhere, good

What to explicitly *not* carry over from the current About/Services/Contact pages: generic `page-header` + flat `surface-card` grids, 3D flip-cards revealing text on hover (works but reads as a generic template pattern, not particularly "handmade"), the two-column form/map/social block layout on Contact.

Each page's redesign should reuse `_shared.scss` primitives (`.btn-brand`, tokens) but get its own scrapbook-flavored layout in its component SCSS, the same way Home does — not force every page into identical polaroid-wall markup.

**Update (done as part of the About page work):** `.postcard`, `.sticker`/`.sticker--round`/`.sticker--tag`, `.polaroid`/`.wall`, and a new `.sticker-row` (auto-alternating tilt for a row of badges/tags) were promoted out of `home.component.scss` into `styles/_shared.scss`, so they're globally available. Home's SCSS now only holds its hero-specific layout and icon-specific rotation overrides (`.sticker--ig`, `.sticker--fb`). Use these shared classes directly in any page's template — see About's usage (trust badges via `.sticker-row` + `.sticker--tag`, story via `.postcard`, product shots via `.wall`/`.polaroid`) as the reference pattern.

**Update (found during Services page work):** shared `.btn-brand` was missing `text-decoration: none` / `display: inline-block` — fine for its original `<button>` uses (blog/contact forms) but showed an underline when used as an `<a>` (CTA links). Fixed at the shared level so any future `<a class="btn-brand">` is correct by default.

---

## 3. Per-Page Specs

### About — *(next up)*
**Content** (from `CRIA_TU_BUSINESS_CONTEXT.md`, real facts):
- Solo artisan, Witney, England, UK
- 10 years on Etsy (~2016–present), 5.0★, 305 reviews, 644 sales
- What: hand-crafted felt decorations, hand-embroidery/hand-stitching, personalization with names/letters/messages
- Why handmade matters: no mass production, personal touch, affordable (£7–15)
- Values: inclusion & kindness, attention to detail, affordability
- **Drop the fake team section entirely** — solo operation, no CEO/CTO/COO grid
- Replace "Founded in 2020" and generic mission copy with the real story
- Still needs from you: any personal "how I started" detail beyond what's in the business context doc (optional — can ship without it, "Questions to Answer" section in that doc is still blank)

**Style**: scrapbook language — e.g. a polaroid-style photo of the workspace/craft process (if available) or product photos, postcard-style pull-quote for brand values, tilted sticker-style badges for "10 years" / "5.0★ 305 reviews" / "644 sales" trust signals instead of a plain stat row.

**Images needed**: currently only the Christmas ornament set exists. Can reuse 2–3 of those; ideally would want a workspace/process photo or a wider product spread from Instagram/Etsy if you have one exportable.

### Services
**Content**: replace Hat/Mug/Plate/T-Shirt/Cricut entirely with real categories:
- Christmas Decorations
- Easter Ornaments
- Felt Animal Ornaments (bees, ladybugs, seagulls)
- Personalized Gifts & Accessories (bracelets, bookmarks, coasters)
- Home Décor
- Valentine's/Mother's Day (seasonal, could combine with above or stand alone)

Remove the triplicated "Cricut Services" section (copy-paste bug). Decide whether the flip-card click should actually do something (e.g. link out to the matching Etsy search/category) or whether flip-on-hover-only is enough — currently `openService()` just `console.log`s.

**Style**: could keep the flip-card *mechanic* but restyle the card face to match scrapbook (polaroid-style front, postcard-style back) rather than the current flat rectangle.

**Images needed**: same gap as About — Christmas photos exist, everything else (Easter, animals, gifts, décor) needs sourcing from Etsy/Instagram.

### Contact — done
**Decisions made** (you said "go for it" rather than answering each individually — here's what was decided and why):
- **No street address** — just "Based in Witney, England" in the page intro. Publishing an exact home address for a solo home-based seller is a privacy tradeoff with no real upside (Etsy itself only shows city/country for sellers like this).
- **No phone number** — there was never a real one, only a placeholder; dropped rather than inventing one.
- **Map removed entirely** — it was pointing at Federation Square, Melbourne, nowhere near Witney, and there's no public address to plot honestly. Dropped rather than replaced.
- **Social links fixed**: real Instagram (`instagram.com/cria.tu`), Facebook (`facebook.com/criatu.art`), and Etsy shop link. Twitter/LinkedIn removed — not real channels for this business.
- **Real email surfaced**: `cria.tu@outlook.com`, in a postcard "Say Hello" block matching Home's pattern.
- **Contact form**: kept, but instead of wiring to a new Netlify Function (real infrastructure work, out of scope for an Angular-only pass) or silently `console.log`-ing (the old, broken behavior), submitting now builds a `mailto:` link with the name/email/message pre-filled and opens it — genuinely functional with zero new backend.

**Style**: postcard-style "Say Hello" block (reusing Home's `.postcard` pattern), a simple form using existing shared input styles, and a "Find Us" postcard with tilted sticker social icons (Instagram, Etsy, Facebook) — the same CTA pattern now used on About/Services, so all three pages end on a consistent note.

### Blog — done
**Bug fix**: `blog.service.ts` now calls `/.netlify/functions/database/blogposts` (the same generic Mongo-backed function everything else uses) instead of the deleted `.NET` API. Mongo documents come back with `_id`; `BlogPost.id` is now `string` (was `number`) and mapped from `_id` in the service — `blog-post-detail.component.ts` updated to match (no more `Number(...)` coercion on the route param).
**Public posting**: restored, gated behind `*ngIf="isDevMode()"` on both the "Add New Post" button and the modal (same pattern the nav already uses in `app.component.html`) — visible while developing, gone from any production build. This is a **convenience gate, not a security boundary**: `database.js` itself still has no auth (see the todo below), so treat this as "hidden from casual visitors," not "protected." Full auth + a real admin flow is still the long-term answer.
**End-to-end verified in a real browser**: set up `netlify dev` (see `[dev]` block added to `netlify.toml` — `command = "ng serve"`, `targetPort = 4200`, proxies both the live Angular dev server and the real functions on `localhost:8888`) plus a temporary in-memory MongoDB (installed and fully removed afterward). Opened `/blog`, confirmed the button only shows in dev, submitted a real post through the UI, watched it appear in the list immediately, and opened its detail page at `/blog/<realMongoObjectId>` — full round trip through the actual function and a real database, not mocked.

**Known limitation of this dev sandbox**: after linking `netlify dev` to the real Netlify site (`netlify login` + `netlify link`, run by the human), connecting to the real MongoDB Atlas cluster fails with `querySrv ENOTFOUND` on the `mongodb+srv://` connection string. Confirmed this is **not** a config/code problem — DNS `SRV`-type lookups are blocked entirely in this sandbox (tested against an unrelated, long-standing public SRV record and it failed the same way), while normal DNS and HTTPS work fine. The real deployed Netlify site runs on Netlify's own infrastructure with unrestricted DNS and will not hit this — it only blocks *local* testing against the real database from this specific sandbox. Workaround if local testing against real data is ever needed here: get a non-SRV (`mongodb://`, explicit host list) connection string from Atlas's Connect dialog and use it just for local `netlify dev`.
**Security note found while wiring this up**: the generic `database.js` Netlify Function itself has **no authentication at all** — it accepts `POST` to *any* collection name from *any* caller, not just `blogposts`. Removing the UI button doesn't close that off; someone could still `curl` a POST directly. Out of scope to fix without real backend auth (flagged in the emailer/backend todo below), but worth knowing.
**Content**: no placeholder issue here — real generic blog listing/detail, content depends on what gets posted (currently empty — Mongo `blogposts` collection doesn't exist yet, first post will create it).
**Why you can't see any posts**: two separate reasons. (1) Local `ng serve` alone never actually reaches Netlify Functions — see the verification note in the checklist above; `netlify dev` is now installed to fix that. (2) Even once reachable, there's genuinely nothing in the `blogposts` Mongo collection — any posts from before were in the deleted `.NET`/PostgreSQL backend, a completely different database that Mongo never had access to, so nothing was "lost" by this fix, there's just nothing to carry over.
**Style**: left as-is — already closer to on-brand (`.blog-post` cards use tokens, teal accent on "Read More") than the other pages were, lowest priority for a scrapbook pass. Could still get postcard/tilted touches later for full consistency.

### Home
Style stays as-is (it's the reference). Only change: remove the dead `WeatherForecast` fetch (cleanup, no visible effect).

### Navigation
Once a page is brought up to standard, un-gate it from `*ngIf="isDevMode()"` in `app.component.html` (both the desktop `tab-menu` and confirm the mobile `side-menu`, which is already ungated). Remove the "Shop" link from both menus now, since no such page exists — re-add if/when a Shop page gets built.

---

## 4. Future / Deferred Pages

Not being built now — noted so they're not forgotten and so today's Angular-only decisions don't box them out later.

### Shop / Products
Deferred until there's a backend again (per your earlier call to go Angular-only for now, backend later). When revived: should follow the scrapbook style (e.g. products-as-polaroids or products-as-postcards, matching Home's photo wall) rather than the old generic mugs/hats/plates catalog design described in the stale `DOCUMENTATION.md`. Cart/checkout would need real payment integration decisions at that point (Etsy remains the actual point of sale today — this site is a showcase, not necessarily a full storefront).

### Admin Panel
Deferred. The old docs describe a hardcoded `admin`/`admin123` localStorage-only panel — not worth rebuilding as-is. If/when a backend returns, this should get real auth from the start rather than resurrecting the hardcoded-credential pattern.

### Comments
Deferred. A Netlify Function (`angular/netlify/functions/comments.js`) already exists and works, but nothing in the Angular app calls it. Low priority — revisit only if you want on-site engagement beyond Instagram/Etsy reviews.

---

## 5. Open Questions for You

Answer these whenever convenient — they block specific pages, not the plan itself:
1. **About**: any personal "how I started" story to add, or ship with just the factual business-context content? *(shipped with factual content only — still open if you want to add more)*
2. ~~**Contact**: publish a street address or just "Witney, England"? Keep a map at all? Real phone number to show, or drop that field?~~ **Resolved** — see Contact spec above.
3. ~~**Contact form**: wire it to something real (Netlify Function → email) or replace with direct email/Etsy/Instagram links?~~ **Resolved** — `mailto:` on submit, see Contact spec above.
4. **Blog**: keep public post creation, remove it, or gate it behind a simple stopgap password until real auth exists?
5. **Images**: can you export more product photos from Etsy/Instagram (Easter, felt animals, personalized gifts, home décor) for Services/About, or should those sections lean more on text + the existing Christmas photos for now?

---

## 6. Execution Tracking

- [ ] Fix `blog.service.ts` broken backend URL
- [ ] Remove dead `WeatherForecast` fetch from `home.component.ts`
- [x] **About page** — content + scrapbook restyle. Real story/stats/values, fake team section removed, reuses shared scrapbook primitives (see below). Verified in browser, light + dark, no console errors.
- [x] **Services page** — content + restyle. Real categories (Christmas featured with real photos, Easter/Animals/Gifts/Décor/Valentine's-Mother's as icon cards), triplicated Cricut section removed, each category links out to a live Etsy search instead of the dead flip-card. Verified in browser, light + dark, no console errors.
- [x] **Contact page** — content + restyle. Street address, wrong Melbourne map, fake phone number, and generic Twitter/LinkedIn links all removed; real email/Instagram/Facebook/Etsy surfaced; form now opens a pre-filled `mailto:` instead of silently `console.log`-ing (see decisions below). Verified in browser, form validation confirmed working, no console errors.
- [ ] **Add real contact info** — revisit "Based in Witney, England" / no phone / no street address once you decide if there's more you want published (or confirm the current minimal version is final).
- [ ] **Build a real emailer** — the contact form currently opens a pre-filled `mailto:` link (works with zero backend, but depends on the visitor having a configured mail client). Replace with an actual send-from-the-app flow: a Netlify Function using an email API (e.g. Resend, SendGrid, or SMTP) that emails `cria.tu@outlook.com` directly. This is real new backend infrastructure — bigger than the Angular-only pages done so far, worth its own pass.
- [ ] **Add auth to `database.js`** — found while fixing Blog: the generic Netlify Function has zero authentication and accepts `POST` to any collection from any caller. Not urgent while there's nothing valuable to write, but should be addressed before this function backs anything sensitive (e.g. if Shop/products come back).
- [x] **Blog** — fixed the broken backend call (now uses the Netlify Function `database.js` like the rest of the app, with Mongo `_id` mapped to `BlogPost.id`), and removed the public "Add New Post" button/modal since there's no auth to gate it.
  - **Verification correction**: my first "it works" check was wrong — `ng serve` alone can't run Netlify Functions, so the request was silently hitting Angular's own SPA-fallback `index.html` (200, but HTML not JSON), not the real function. Confirmed with `curl`.
  - **Properly verified** by installing `netlify-cli` (added as a real devDependency via `yarn add -D netlify-cli`, so `netlify dev` is available going forward — see `angular/package.json`) and running `netlify dev --offline`. That proved `database.js` is genuinely invoked (real `500` from its own try/catch when `MONGODB_URI` is unset — correct behavior, not the fallback trick).
  - **Full round-trip verified** with an isolated script using an ephemeral in-memory MongoDB (`mongodb-memory-server`, installed and removed again — not left in the repo) calling `database.js`'s handler directly: empty `GET` → `200 []`, `POST` → `201` with a real `_id`, follow-up `GET` → returns the doc with `_id` as a plain string. Confirms `blog.service.ts`'s `_id`→`id` mapping is correct.
  - **Found while doing this**: `comments.js` fails to load under `netlify dev` (`TypeError: Cannot read properties of undefined (reading 'startsWith')`, function endpoint 404s) — it may not actually be deployable as-is. Not investigated further (comments is already deferred), but worth knowing before anyone revives that feature.
- [ ] Nav — un-gate fixed pages, remove dead Shop link *(up next)*
