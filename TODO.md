# Cria Tu Handmade: to-do

What is left to do on the site. The history of what was done and why is in `SITE_REDESIGN_PLAN.md`.
Last updated 2026-11-14.

## A. Before anything goes live
- [ ] Look through the local changes of 14 November (before/after: https://claude.ai/artifact/F7Hh9aGs66WgEzydLhYtpG) and say what to keep.
- [ ] Decide what to do with the noise in `git status`: the rebuilt `angular/dist/` and the MongoDB files removed from `angular/netlify/functions/node_modules` (both folders are tracked in git).
- [ ] Commit and push (yours to do, or ask for it).

## B. Blog on Supabase
- [ ] Run `angular/supabase/001_blog.sql` in the Supabase SQL editor (project `tiago-apps`).
- [ ] Settings → API: add `criatu` to the exposed schemas.
- [ ] Create the blog writer's user under Authentication and add it to `criatu.admins` (command is in the SQL file).
- [ ] Sign in at `/admin` and publish a first post: this has never been tested.
- [ ] Check whether any posts in the old MongoDB are worth copying over; if not, close the Atlas cluster.
- [ ] Remove `MONGODB_URI` from the Netlify environment.
- [ ] Editing and deleting a post (only adding exists).
- [ ] Photos in posts (Supabase Storage).

## C. Contact form
- [ ] Get a Resend key and verify a sender address.
- [ ] Set `RESEND_API_KEY` and `CONTACT_FROM` (and `CONTACT_TO` if not cria.tu@outlook.com) on Netlify.
- [ ] Send a real test message: the emailer has never sent one.
- [ ] Decide whether "Based in Witney, England", no phone and no street address is the final contact information.

## D. Styles
- [ ] Check dark mode on every page after the 14 November changes (not re-checked).
- [ ] Look at the About page and the `/admin` page properly (captured, not reviewed).
- [ ] The arrow after "Shop on Etsy" and "Read more" is still small and sits a little low.
- [ ] Services: five cards sit three and two. A sixth category, or a different layout?
- [ ] Remove the leftover `.navigation-icons` rules from `app.component.scss` (the icons are gone).
- [ ] Remove "Powered by Netlify" if it shows anywhere on the deployed site.

## E. Content
- [ ] About: a personal "how I started" story, if wanted.
- [ ] More product photos (Easter, felt animals, personalised gifts, home décor) for Services and About.
- [ ] Home: is the tagline "Felt decorations, stitched by hand and personalised for you." the one to keep?
- [ ] Photo captions and proper alt text on the home photo wall.

## F. Later
- [ ] Shop / products pages (Etsy stays the place to buy for now).
- [ ] Comments on blog posts (`comments.js` existed but did not load; it is not in the repo's functions now).
- [ ] Update `CLAUDE.md`, `angular/CLAUDE.md`, `DOCUMENTATION.md` and `README.md`: they still describe MongoDB, a shop, a cart, live chat and an admin panel that are not in the site.
