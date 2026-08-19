# Angular App — CriaTuHandmade

Full technical reference for the Angular frontend, consolidated from `DOCUMENTATION.md`, `COMMENTS_SYSTEM.md`, `COMMENTS_IMPLEMENTATION.md`, `CHAT_CONTENT_MODERATION.md`, `DARK_MODE_GUIDE.md`, `IMAGE_OPTIMIZATION.md`, `OPTIMIZATION_SUMMARY.md`, and the Angular CLI readme. Unabridged copies of all of these live in `../.claude/docs/`.

## Technology Stack
- Angular 19.0.3, TypeScript 5.5 (generated originally with Angular CLI 18.1.4)
- Bootstrap 5.3.3 + Angular Material 19.0.2
- ngx-bootstrap (Carousel), ng-gallery (image gallery), ngx-spinner (loading states)
- State management: LocalStorage for cart and admin data (no NgRx yet)
- Backend: Netlify serverless functions + MongoDB — the only backend (a prior .NET/PostgreSQL API has been removed)
- Deployment: Netlify with SPA routing

## Setup & Installation

Prerequisites: Node.js v18+, npm or yarn, Angular CLI (`npm install -g @angular/cli`).

```bash
git clone <repository-url>
cd CriaTuHandmade/angular
npm install

# Netlify Functions deps
cd netlify/functions && npm install && cd ../..

# env var (Netlify dashboard or local .env)
# MONGODB_URI=your_mongodb_connection_string

npm start          # http://localhost:4200
npm run build      # output: dist/browser/
```

## Project Structure
```
angular/
├── src/
│   ├── app/
│   │   ├── about/              # About page component
│   │   ├── admin/              # Admin panel component
│   │   ├── blog/                # Blog component
│   │   ├── comments/            # Comments component
│   │   ├── contacts/            # Contact form component
│   │   ├── home/                # Home page component
│   │   ├── services/            # Services showcase component
│   │   ├── shop/                # Shop/Products component
│   │   ├── interfaces/          # TypeScript interfaces
│   │   │   ├── admin.ts
│   │   │   ├── blog-post.ts
│   │   │   ├── comment.ts
│   │   │   ├── contact.ts
│   │   │   └── product.ts
│   │   ├── api.service.ts       # API service
│   │   ├── auth.guard.ts        # Route guard (exists, not enforced on /admin)
│   │   ├── app.module.ts        # Main module
│   │   └── app-routing.module.ts # Routing config
│   ├── assets/                  # Images, logos, icons
│   ├── styles.scss              # Global styles + CSS variables (light/dark theme)
│   └── index.html               # Main HTML
├── netlify/
│   └── functions/
│       ├── database.js          # Generic MongoDB CRUD serverless function
│       └── comments.js          # Comments/replies MongoDB serverless function
├── scripts/
│   └── optimize-images.sh       # Image optimization automation script
└── public/                      # Static assets
```

## Code Standards

### Component Structure
- Place in `src/app/[component-name]/`
- Include: `.component.ts`, `.component.html`, `.component.scss`, `.component.spec.ts`
- Use kebab-case for file names, PascalCase for class names
- Declare all components in `app.module.ts`

### Services
- Use `ApiService` for all HTTP calls to backend
- Base URL: `/.netlify/functions/database`
- Pattern: `getData(collectionName)` and `addData(collectionName, data)`
- Return RxJS Observables

### Interfaces
- Define TypeScript interfaces in `src/app/interfaces/`

### Styling
- Use SCSS for component styles
- Leverage Bootstrap 5 utility classes
- Component-scoped styles only
- Angular Material components for UI elements
- **Always use CSS variables instead of hardcoded colors** — see Dark Mode / Theming below

### Images
- All images optimized to WebP format
- Gallery images have separate thumbnails (400px) and full-size versions
- Use `loading="lazy"` on all images
- Social media icons optimized to display size
- Run `npm run optimize-images` when adding new images
- Reference optimized versions: `assets/path/image_optimized.webp`

## Module System
Always import required modules in `app.module.ts`. Currently imported:
- `BrowserModule`, `BrowserAnimationsModule`
- `FormsModule`, `HttpClientModule`
- `CarouselModule`, `GalleryModule`, `MatIconModule`, `NgxSpinnerModule`

## Routing
- Define routes in `app-routing.module.ts`
- Current routes: home (`/`), about, services, blog, contacts, shop, admin
- SPA routing handled by Netlify redirects (`/*` → `/index.html`, status 200)

## Component Generation
```bash
ng generate component component-name
ng generate service service-name
ng generate interface interface-name
```

---

## Components Documentation

### 1. Home Component
**Path**: `src/app/home/` · Route: `/`

Landing page with hero carousel and featured gallery.
- Bootstrap carousel, 3 slides
- Image gallery via ng-gallery
- Live chat with content moderation (see Content Moderation)
- Comments section at the bottom (`<app-comments></app-comments>`, after the chat)
- Template-driven — no notable component-level state of its own beyond chat/gallery data

### 2. About Component
**Path**: `src/app/about/`

Business information and story: company description, mission and values, team info. Service images use optimized WebP versions with lazy loading.

### 3. Services Component
**Path**: `src/app/services/`

Showcases available services with categories, modal detail view, price + feature list.

```typescript
interface Service {
  id: number;
  title: string;
  category: 'custom' | 'cricut' | 'personalized' | 'decor';
  description: string;
  price?: string;
  features: string[];
  image: string;
}
```
State: `services`, `filteredServices`, `selectedCategory` (default `'all'`), `selectedService` (for modal).
Methods: `filterServices()`, `onCategoryChange(category)`, `openServiceModal(service)`, `closeServiceModal()`.

### 4. Blog Component
**Path**: `src/app/blog/`

Search, category filter, sort (newest/popularity), pagination (6 posts/page), add-post form.

```typescript
interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  image: string;
  views?: number;
}
```
State: `posts`, `filteredPosts`, `paginatedPosts`, `searchTerm`, `selectedCategory`, `sortOrder`, `currentPage`, `postsPerPage = 6`, `totalPages`.
Methods: `applyFilters()`, `updatePagination()`, `onSearch()`, `onCategoryChange(cat)`, `onSortChange(sort)`, `goToPage(page)`, `getExcerpt(content)`.

### 5. Shop Component
**Path**: `src/app/shop/`

E-commerce catalog with cart management: 12 products, 8 categories, search/filter/sort, cart sidebar, product detail modal, localStorage persistence, 9 products/page.

```typescript
interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice?: number;      // for sale items
  image: string;
  inStock: boolean;
  stockQuantity: number;
  rating?: number;             // 0-5
  reviews?: number;
  tags: string[];
  featured: boolean;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
}
type ProductCategory = 'mugs' | 'hats' | 'tshirts' | 'plates' | 'decor' | 'gifts' | 'accessories' | 'custom';

interface Cart { items: CartItem[]; totalItems: number; subtotal: number; }
interface CartItem { id: string; product: Product; quantity: number; selectedColor?: string; selectedSize?: string; }
```
State: `products`, `filteredProducts`, `cart`, `selectedCategory = 'all'`, `searchTerm`, `sortBy = 'popularity'`, `selectedProduct`, `isCartOpen`, `currentPage`, `productsPerPage = 9`.
Methods: `applyFilters()`, `addToCart(product)`, `updateQuantity(itemId, qty)`, `removeFromCart(itemId)`, `clearCart()`, `calculateSubtotal()`, `calculateTotal()`, `saveCartToStorage()`, `loadCartFromStorage()`, `toggleCart()`, `openProductModal(product)`, `closeProductModal()`.
Cart persisted under localStorage key `shoppingCart`.

### 6. Admin Component
**Path**: `src/app/admin/` · Route: `/admin`

Administrative panel for products, business info, settings, and comments.

**Auth**: username `admin`, password `admin123` (hardcoded in the component). Session flag in `localStorage` key `adminAuthenticated`. `AuthGuard` exists (`auth.guard.ts`) but is **not currently enforced** on the route.

State (partial): `isAuthenticated`, `loginUsername`, `loginPassword`, `loginError`, `activeTab = 'products'`, `successMessage`, `errorMessage`, `products`, `filteredProducts`, `currentProduct`, `isProductFormOpen`, `isEditMode`, `searchTerm`, `selectedCategory`, `businessInfo`, `settings`.

Methods (partial): `login()`, `logout()`, `switchTab(tab)`, `openAddProductForm()`, `openEditProductForm(product)`, `saveProduct()`, `deleteProduct(id)`, `toggleProductStock(id)`, `toggleProductFeatured(id)`, `onSearch()`, `onCategoryFilter()`, `addTag/removeTag`, `addColor/removeColor`, `addSize/removeSize`, `addMaterial/removeMaterial`, `saveBusinessInfo()`, `saveSettings()`, `exportProducts()`, `importProducts(event)`.

```typescript
interface AdminUser { username: string; password: string; }

interface BusinessInfo {
  businessName: string; ownerName: string; email: string; phone: string;
  address: string; city: string; state: string; zipCode: string; country: string;
  website?: string; description?: string;
  socialMedia?: { facebook?: string; instagram?: string; twitter?: string; pinterest?: string; };
}

interface AdminSettings {
  siteTitle: string; siteDescription: string; currency: string; taxRate: number;
  shippingFee: number; freeShippingThreshold: number;
  emailNotifications: boolean; orderNotifications: boolean;
}
```

All admin data (products, business info, settings) currently lives in `localStorage`, not a real backend — treat as demo/prototype persistence unless the task is specifically to wire it to MongoDB/PostgreSQL.

### 7. Contacts Component
**Path**: `src/app/contacts/`

Contact form for customer inquiries: form validation, email collection, message submission. Social icons optimized, lazy-loaded.

```typescript
interface Contact { name: string; email: string; message: string; date?: Date; }
```

### 8. Comments Component
**Path**: `src/app/comments/` (`.component.ts/.html/.scss`)

See full Comments System section below.

---

## Admin Panel Guide

### Accessing
1. Navigate to `/admin`
2. Login: `admin` / `admin123`

### Products Tab
- View all products in a table; search by name; filter by category
- Toggle stock status / featured status inline
- **Add product**: click "Add Product" → fill required fields (Name, Category, Description, Price, Stock Quantity, Image URL); optional (Original Price, Rating 0-5, Reviews, Tags/Colors/Sizes/Materials — press Enter to add each); set In Stock / Featured checkboxes → "Add Product"
- **Edit product**: click ✏️ on a row → modify in modal → "Update Product"
- **Delete product**: click 🗑️ → confirm (removes immediately)
- **Export**: downloads all products as JSON
- **Import**: select a JSON file containing a product array

### Business Info Tab
Fields: Business Name, Owner Name, Email, Phone; Address (Street, City, State, ZIP, Country); Website, Description; Social Media (Facebook, Instagram, Twitter, Pinterest). Save → persisted to `localStorage`.

### Settings Tab
General: Site Title, Site Description. Store: Currency, Tax Rate, Shipping Fee, Free Shipping Threshold. Notifications: Email Notifications, Order Notifications. Save → persisted to `localStorage`.

### Comments Tab
**Does not exist yet.** See Comments System below — it's a designed-but-unbuilt feature.

---

## API Integration

### ApiService
**Location**: `src/app/api.service.ts` · **Base URL**: `/.netlify/functions/database`

```typescript
getData(collectionName: string): Observable<any[]>
addData(collectionName: string, data: any): Observable<any>
```

```typescript
constructor(private apiService: ApiService) {}

this.apiService.getData('products').subscribe(
  (data) => { this.products = data; },
  (error) => { console.error('Error fetching products:', error); }
);

const newProduct = { name: 'New Item', price: 10 };
this.apiService.addData('products', newProduct).subscribe(
  (response) => { console.log('Product added:', response); },
  (error) => { console.error('Error adding product:', error); }
);
```

Prefer the async pipe in templates where practical:
```typescript
items$ = this.apiService.getData('items');
```
Or subscribe with the `next`/`error` object form:
```typescript
this.apiService.getData('items').subscribe({
  next: (data) => this.items = data,
  error: (error) => console.error(error)
});
```

### Netlify Function — `database.js`
**Location**: `netlify/functions/database.js` · Env var: `MONGODB_URI`

Supports GET (fetch all documents from a collection) and POST (insert a new document).

```javascript
// GET
GET /.netlify/functions/database?collection=products

// POST
POST /.netlify/functions/database
Body: { collection: 'products', data: { name: 'Product', price: 10 } }
```

```javascript
// Success response
{ data: [...], message: 'Success' }
// Error response
{ error: 'Error message' }
```

---

## Comments System — NOT IMPLEMENTED (backend only)

> **Status check before touching this**: there is no `angular/src/app/comments/` component, it's not declared in `app.module.ts`, `home.component.html` has no `<app-comments>`, the admin panel has no Comments tab, and `ApiService` has no comment methods. The only thing that actually exists is the orphaned Netlify function below. Everything else in this section (data models, endpoints, admin UX, pagination) describes the *intended* design from `../COMMENTS_SYSTEM.md` / `../COMMENTS_IMPLEMENTATION.md`, not current behavior — treat it as a spec to build against, not documentation of what's there.

### What actually exists
- **Backend**: `angular/netlify/functions/comments.js` — a working MongoDB Atlas handler (collection `comments`, replies embedded as an array), deployed automatically with the Netlify site, but currently unreachable from the app since nothing calls it.

### If/when someone builds the frontend for this
- Add a `comments` component (`angular/src/app/comments/`), declare it in `app.module.ts`, drop `<app-comments></app-comments>` at the bottom of `home.component.html` (after the live chat), and add comment methods to `ApiService` pointing at `/.netlify/functions/comments`.
- Content moderation should reuse the existing chat engine (see Content Moderation below), same pattern as `checkMessageContent()`.
- An admin Comments tab (filters, quick reply, resolve, delete) would follow the same localStorage-free, live-API pattern the Products tab should eventually move to.

### Data Models
```typescript
interface Comment {
  id: number | string;
  userName: string;
  content: string;
  createdAt: Date;
  isResolved: boolean;
  hasAdminReply: boolean;
  resolvedAt?: Date;
  resolvedByAdmin?: string;
  replies: Reply[];
  replyCount: number;
}

interface Reply {
  id: number | string;
  commentId: number | string;
  userName: string;
  content: string;
  createdAt: Date;
  isAdmin: boolean;
}
```

### API Endpoints
**`GET /comments`** — paginated + filterable list.
Query params: `page` (default 1), `pageSize` (default 10), `isResolved` (optional boolean).
```json
{ "comments": [...], "totalCount": 100, "unresolvedCount": 15, "currentPage": 1, "pageSize": 10, "totalPages": 10 }
```

**`GET /comments/:id`** — get a single comment by ID.

**`POST /comments`** — create a new comment.
```json
{ "userName": "John Doe", "content": "Great products!" }
```

**`POST /comments/:id/replies`** — add a reply to a comment.
```json
{ "userName": "Admin", "content": "Thank you!", "isAdmin": true }
```

**`PUT /comments/:id/resolve`** — mark a comment resolved.
```json
{ "adminName": "Admin" }
```

**`DELETE /comments/:id`** — delete a comment and all its replies.

**`DELETE /comments/replies/:replyId`** — delete a specific reply.

**`GET /comments/stats`** — statistics.
```json
{ "totalComments": 100, "unresolvedComments": 15, "resolvedComments": 85, "needsAttention": 15 }
```

### Content Moderation Integration
Same engine as the live chat (see Content Moderation section): messages validated before submission, clear warning explains why blocked, input cleared on blocked attempts, user can rephrase and resubmit.

### Admin Panel Usage (designed, not built)
1. Login (`admin`/`admin123`) → Comments tab → badge shows unresolved count.

**Status badges**: 🟡 Needs Attention (no admin reply, not resolved) · 🔵 Replied (admin replied, not resolved) · 🟢 Resolved.
**Border color coding**: yellow = needs attention, blue = unresolved with reply, gray = resolved.
**Filters**: All / Unresolved (badge count) / Resolved.

**Quick Reply**: type in the quick-reply box → "Reply" → auto-marked as Admin → sets comment's `hasAdminReply`.
**Mark as Resolved**: green checkmark button; use when no reply is necessary; records resolved date + admin name.
**Delete Comment**: red delete button, confirms first, deletes comment **and all replies**.
**Delete Reply**: small delete icon on the reply, confirms first, updates `hasAdminReply` if the last admin reply was removed.

### Pagination (designed, not built)
- User-facing: 10/page, Previous/Next + page numbers, "Showing X of Y comments"
- Admin: 20/page, Previous/Next + page counter, resets when filters change

### Integration with Home Page (designed, not built)
Comments section would sit at the bottom of the home page, after the live chat:
```html
<app-comments></app-comments>
```
Styling should match the pink brand theme, card-based layout, responsive, smooth animations.

### Deployment
`comments.js` already deploys automatically with the Netlify site (no separate step needed) — ensure `MONGODB_URI` is set; the `comments` collection auto-creates on first use once something actually calls the function.

### Security Considerations
- All content validated for inappropriate language
- Max length limits enforced
- SQL injection prevention via parameterized queries
- XSS prevention via Angular sanitization
- Admin actions require authentication; admin status tracked per-reply; no public admin functions exposed
- Rate limiting **not yet implemented** — consider submission throttling, IP-based limits, CAPTCHA for excessive posting if abuse becomes an issue

### Code Examples
```typescript
// Creating a comment (user)
const comment: CreateComment = { userName: 'John Doe', content: 'Love your handmade items!' };
this.apiService.createComment(comment).subscribe({
  next: (result) => console.log('Comment posted'),
  error: (err) => console.error('Error:', err)
});

// Replying as admin
const reply: CreateReply = { userName: 'Admin', content: 'Thank you for your support!', isAdmin: true };
this.apiService.createReply(commentId, reply).subscribe({
  next: () => this.loadComments(),
  error: (err) => console.error('Error:', err)
});

// Resolving a comment
this.apiService.resolveComment(commentId, 'Admin').subscribe({
  next: () => { this.showSuccess('Comment resolved'); this.loadComments(); }
});
```

### Performance Considerations
- **DB indexing**: index `createdAt` (sorting), `isResolved` (filtering), `hasAdminReply` (admin queries), compound index on `(isResolved, hasAdminReply)`
- **Query**: pagination to limit results, lazy-load replies, cache statistics, cache query results
- **Frontend**: virtual scrolling for large lists, debounce filter changes, minimize re-renders, lazy-load the comments component

### Manual Testing Checklist
Submit comment as user; reply as user; reply as admin; mark resolved; delete comment; delete reply; pagination with 15+ comments; filtering (all/unresolved/resolved); content moderation (try a banned word); empty submissions; very long content; special characters.

Sample test comments: "Great products! Love the craftsmanship" · "How long does shipping take?" · "Beautiful handmade items, highly recommend!" · "Can you make custom orders?"

### Not Yet Implemented (Future)
Email notifications for new comments, user avatars/profiles, upvote/downvote, multi-level nested replies, rich text editor, image attachments, comment search, CSV/PDF export, real-time updates (WebSockets), ML-based spam detection, comment editing, soft delete with recovery, user-side flagging.

---

## Content Moderation

Shared by the live chat and the comments system. Code: `src/app/home/home.component.ts` — `checkMessageContent()` (main validation), `sendMessage()` (blocks send), `showWarning()` (displays warning). Messages containing blocked content are **never sent**.

### Protection Categories
1. **Profanity filter** — common profanity/vulgar language
2. **Bullying detection** — patterns and harassment
3. **Threat prevention** — violent/threatening language
4. **Discrimination protection** — hate speech
5. **Business protection** — insults aimed at the business/products
6. **Behavior moderation** — excessive caps (shouting), excessive punctuation (`!!!!`, `????`)

### Blocked Word/Phrase Lists

**Profanity**: `damn`, `hell`, `crap`, `shit`, `fuck`, `bitch`, `ass`, `asshole`, `bastard`, `dick`, `prick`, `cock`, `pussy`, `bullshit`, `motherfucker`, `whore`, `slut`, `fag`, `faggot`, `goddamn`, `piss`, `bloody hell`

**Offensive slurs & insults**: `stupid`, `idiot`, `moron`, `dumb`, `dumbass`, `imbecile`, `loser`, `jerk`, `retard`, `retarded`, `ugly`, `fat`, `fatty`, `pig`, `disgusting`, `gross`, `worthless`, `useless`, `pathetic`

**Bullying & harassment**: `hate you`, `hate your`, `kill yourself`, `kys`, `die`, `go die`, `drop dead`, `shut up`, `get lost`, `you suck`

**Threats & violence**: `gonna kill`, `will kill`, `beat you`, `hurt you`, `attack you`, `find you`, `come for you`, `watch out` (in threatening context)

**Discrimination**: `racist`, `racism`, `sexist`, `homophobic`, `transphobic`

**Business/product insults**: `scam`, `scammer`, `ripoff`, `rip off`, `garbage`, `trash`, `worst`, `terrible`, `horrible`, `awful`, `sucks`, `suck`, `overpriced`, `waste of money`, `fraud`, `fake`, `cheap crap`

### Bullying Pattern Detection (regex, case-insensitive, 12 patterns)
1. "You are/you're [insult]" — e.g. "you are so stupid", "you're ugly"
2. "Nobody [negative action]" — e.g. "nobody likes you", "nobody cares"
3. "Go [harmful action]" — e.g. "go away", "go die"
4. "You should [harmful action]" — e.g. "you should die", "you should leave"
5. "I hope you [negative outcome]" — e.g. "I hope you fail", "I hope you suffer"
6. Direct commands to be quiet — "shut up", "be quiet"
7. "You suck" (any variation)
8. Product/work attacks — "your work sucks", "your products are garbage"
9. Waste statements — "waste of time", "waste of money", "waste of space"
10. Self-harm suggestions — "kill yourself", "hurt yourself"
11. Hate expressions — "hate you", "hate your work", "hate this"

### User Experience on Block
Message is **not sent**, input field is cleared, a specific warning is shown, user can rephrase and resend.

Warning copy:
- Banned word: `⚠️ Your message contains inappropriate language: "[word]". Please rephrase your message respectfully.`
- Bullying pattern: `⚠️ Your message appears to contain bullying or offensive content. Please communicate respectfully.`
- Excessive caps: `⚠️ Please avoid using excessive capital letters. It can be perceived as shouting.`
- Excessive punctuation: `⚠️ Please use punctuation moderately.`

### Examples — Blocked
| Message | Reason |
|---|---|
| "This is bullshit!" | profanity ("bullshit") |
| "You are so stupid" | bullying pattern |
| "I'm gonna find you" | threat ("gonna find") |
| "This is a scam!" | business insult ("scam") |
| "WHY IS THIS SO EXPENSIVE!!!" | excessive caps |
| "kys" | banned phrase |
| "I hate your work" | bullying pattern |

### Examples — Allowed
"Hello! Do you ship internationally?" · "I love your handmade items! How much for a custom piece?" · "What materials do you use?" · "Can I order something similar to the photo?" · "Thank you for your quick response!" · "How long does customization take?" · "These are beautiful! Where can I order?" · "Do you offer gift wrapping?" · "I'm interested in the pink theme items"

### Technical Implementation
1. Word-boundary matching (`\b` regex) — whole words only
2. Case-insensitive
3. Multi-word phrase detection
4. Regex pattern recognition for complex bullying structures
5. Real-time validation before submission

### Stats
65+ banned words/phrases, 12 bullying pattern detectors, 4 behavioral moderations, blocking is deterministic (no inappropriate content passes the checks that exist).

### Extending the Filter
- **New banned terms**: add to the `bannedWords` array in `home.component.ts`, lowercase, multi-word phrases supported.
- **New patterns**: add to `bullyingPatterns` array, regex with `i` flag, test thoroughly to avoid false positives.
- Not yet implemented: ML-based detection, context-aware filtering, multi-language support, user reporting, dedicated moderation dashboard.

---

## Dark Mode / Theming

CSS custom properties defined in `src/styles.scss`, applied via `data-theme="light"|"dark"` attribute on `<html>`, persisted in `localStorage` key `theme`. Toggle lives in the nav bar (sun/moon icon).

```typescript
// Toggle
toggleTheme(): void {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Read current
const currentTheme = document.documentElement.getAttribute('data-theme');

// Load saved (do this before first render to avoid flicker — in index.html/main.ts)
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Respect system preference when nothing saved yet
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}
```

### CSS Variable Reference

**Primary colors** (brand, buttons, links, accents)
| Variable | Light | Dark |
|---|---|---|
| `--primary-color` | #CC3366 | #e6558c |
| `--primary-dark` | #a82950 | #CC3366 |
| `--primary-light` | #e6558c | #ff79a8 |
| `--secondary-color` | #e74c3c | #ff6b5a |

**Backgrounds**
| Variable | Light | Dark |
|---|---|---|
| `--bg-primary` | #ffffff | #1a1a1a |
| `--bg-secondary` | #f8f9fa | #2d2d2d |
| `--bg-tertiary` | #ecf0f1 | #3a3a3a |
| `--bg-gradient-start` | #f5f7fa | #1a1a1a |
| `--bg-gradient-end` | #c3cfe2 | #2d2d2d |

**Text**
| Variable | Light | Dark |
|---|---|---|
| `--text-primary` | #2c3e50 | #e0e0e0 |
| `--text-secondary` | #7f8c8d | #b0b0b0 |
| `--text-muted` | #95a5a6 | #808080 |
| `--text-inverse` | #ffffff | #1a1a1a |

**Borders & shadows**
| Variable | Light | Dark |
|---|---|---|
| `--border-color` | #ddd | #444 |
| `--border-light` | #e0e0e0 | #555 |
| `--shadow-sm` | rgba(0,0,0,0.1) | rgba(0,0,0,0.3) |
| `--shadow-md` | rgba(0,0,0,0.1) | rgba(0,0,0,0.4) |
| `--shadow-lg` | rgba(0,0,0,0.15) | rgba(0,0,0,0.5) |
| `--shadow-hover` | rgba(0,0,0,0.2) | rgba(0,0,0,0.6) |

**Component-specific** (cards, inputs, modals)
| Variable | Light | Dark |
|---|---|---|
| `--card-bg` | #ffffff | #2d2d2d |
| `--card-border` | #e0e0e0 | #444 |
| `--input-bg` | #ffffff | #3a3a3a |
| `--input-border` | #ddd | #555 |
| `--input-focus` | #CC3366 | #e6558c |

**Status colors**
| Variable | Light | Dark | Purpose |
|---|---|---|---|
| `--success-color` | #27ae60 | #2ecc71 | success text |
| `--success-bg` | #d4edda | #1e4d2b | success background |
| `--danger-color` | #e74c3c | #e74c3c | error text |
| `--danger-bg` | #f8d7da | #4d2020 | error background |
| `--warning-color` | #f39c12 | #f39c12 | warning text |
| `--warning-bg` | #fff3cd | #4d3a1a | warning background |
| `--info-color` | #3498db | #5dade2 | info text |
| `--info-bg` | #d1ecf1 | #1a3a4d | info background |

**Navigation**
| Variable | Light | Dark |
|---|---|---|
| `--nav-bg` | rgba(255,255,255,0.95) | rgba(42,42,42,0.95) |
| `--nav-text` | #2c3e50 | #e0e0e0 |
| `--nav-hover` | #CC3366 | #e6558c |
| `--nav-shadow` | rgba(0,0,0,0.1) | rgba(0,0,0,0.5) |

**Modal & overlay**
| Variable | Light | Dark |
|---|---|---|
| `--modal-bg` | #ffffff | #2d2d2d |
| `--overlay-bg` | rgba(0,0,0,0.5) | rgba(0,0,0,0.7) |

**Tables**
| Variable | Light | Dark |
|---|---|---|
| `--table-header-bg` | #ecf0f1 | #3a3a3a |
| `--table-row-hover` | #f8f9fa | #333 |
| `--table-border` | #ddd | #444 |

### Usage Patterns
```scss
// Card
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
  h3 { color: var(--text-primary); margin-bottom: 10px; }
  p { color: var(--text-secondary); }
}

// Primary button
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-inverse);
  border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer;
  box-shadow: var(--shadow-sm); transition: all 0.3s ease;

  &:hover { box-shadow: var(--shadow-hover); transform: translateY(-2px); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

// Form input
.form-input {
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  color: var(--text-primary);
  padding: 12px; border-radius: 6px; width: 100%; font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus { outline: none; border-color: var(--input-focus); }
  &::placeholder { color: var(--text-muted); }
}

// Alerts
.alert-success { background: var(--success-bg); color: var(--success-color); border-left: 4px solid var(--success-color); }
.alert-danger { background: var(--danger-bg); color: var(--danger-color); }
.badge-warning { background: var(--warning-color); color: var(--text-inverse); }

// Navbar
.navbar {
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  a { color: var(--nav-text); &:hover { color: var(--nav-hover); } }
}

// Modal
.modal-overlay { background: var(--overlay-bg); }
.modal-content { background: var(--modal-bg); border: 1px solid var(--border-color); }

// Table
table {
  border: 1px solid var(--table-border);
  thead { background: var(--table-header-bg); }
  tbody tr { &:hover { background: var(--table-row-hover); } td { border-bottom: 1px solid var(--table-border); } }
}
```

### Migration Checklist (when updating an existing component for dark mode)
- [ ] Replace background colors with `--bg-*`
- [ ] Replace text colors with `--text-*`
- [ ] Replace borders with `--border-*`
- [ ] Replace shadows with `--shadow-*`
- [ ] Replace component-specific colors (cards, inputs, etc.)
- [ ] Test hover states in both themes
- [ ] Test focus states in both themes
- [ ] Verify text contrast ratios (WCAG AA minimum)
- [ ] Add `transition` for smooth theme switching

### Adding a Third Theme
```scss
// styles.scss
[data-theme="blue"] {
  --primary-color: #2980b9;
  --primary-dark: #1f5f8b;
  --primary-light: #3498db;
  // ...define all variables
}
```
```typescript
// app.component.ts
toggleTheme(): void {
  const themes = ['light', 'dark', 'blue'];
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const nextTheme = themes[(themes.indexOf(current) + 1) % themes.length];
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
}
```

### Best Practices
**Do**: always use CSS variables for color; use semantic names (`--text-primary`, not `--color-1`); add transitions for smooth switching; test both themes; maintain WCAG AA contrast (4.5:1 normal text, 3:1 large text/interactive elements); group related variables; document custom ones.
**Don't**: hardcode colors; use inline styles with hardcoded colors; skip hover/focus testing; use pure black/white backgrounds; create near-duplicate variables; over-specify variable names.

### Accessibility
Normal text ≥ 4.5:1 contrast, large text (18pt+) ≥ 3:1, interactive elements ≥ 3:1. Test with Chrome DevTools Lighthouse, WebAIM Contrast Checker, WAVE extension.

### Troubleshooting
- **Colors not changing**: confirm `data-theme` is set on `<html>`; confirm the variable is defined in both `:root` and `[data-theme="dark"]`; hard-reload.
- **Flicker on load**: set the saved theme attribute before first render (in `index.html`/`main.ts`), not after.
- **Poor contrast**: use lighter shades in dark mode, verify with a contrast checker, avoid pure black backgrounds.
- **Transitions too slow/fast**: tune duration on the global `transition: background-color 0.2s ease, color 0.2s ease;` rule in `styles.scss`.

---

## Image Optimization

Script: `scripts/optimize-images.sh` · Command: `npm run optimize-images` (from `angular/`) or `bash scripts/optimize-images.sh`. Tools used: ImageMagick, WebP, ng-gallery thumbnail support, native `loading="lazy"`.

### What it does
- Converts gallery images to WebP
- Generates 400px-wide thumbnails for gallery previews
- Optimizes social media icons and service images to display size
- All images get `loading="lazy"`
- ng-gallery uses small thumbnails for the sidebar and full-size optimized WebP only when an image is clicked

### Output locations
- Gallery originals: `src/assets/images/*.jpeg` → optimized: `src/assets/images/optimized/*.webp` → thumbnails: `src/assets/images/thumbnails/*_thumb.webp`
- Social icons: `src/assets/social-logos/*.png` → `src/assets/social-logos/*_optimized.webp`
- Service images: `src/assets/service-images/*` → `src/assets/service-images/*_optimized.webp`

### Adding new images
1. Add the original to the appropriate assets folder
2. `npm run optimize-images`
3. Reference the optimized version:
```typescript
// Gallery image
new ImageItem({
  src: 'assets/images/optimized/image-name.webp',
  thumb: 'assets/images/thumbnails/image-name_thumb.webp',
  alt: 'Descriptive alt text'
})
```
```html
<!-- Regular image -->
<img src="assets/path/image_optimized.webp" alt="Description" loading="lazy">
```

### Historical size improvements (context for why this pipeline exists)
| Asset | Before | After | Reduction |
|---|---|---|---|
| Instagram icon | 2.6MB | 4KB | 650x |
| Facebook icon | 56KB | 3-4KB | ~14x |
| Gallery full images | 3.7MB | 1.2MB (WebP) | ~3x |
| Gallery thumbnails | — | 356KB total | 10x faster initial load |
| Service images | ~280KB | ~122KB | 2.3x |

Total initial-load savings were ~3MB (~67% reduction), improving LCP, TBT, and Lighthouse performance score.

### Browser support
WebP: Chrome 23+, Firefox 65+, Edge 18+, Safari 14+ — ~96% global coverage. Native lazy loading: Chrome 77+, Firefox 75+, Edge 79+, Safari 15.4+ (older browsers just load images normally, non-lazy).

### Maintenance
- Re-run after adding/replacing images, and before major releases
- Optional: remove original large files once optimized versions are verified (keep originals if you might need to re-optimize with different settings)
- Annual review: WebP vs AVIF, browser support stats, CDN for image delivery

### Troubleshooting
- **Not displaying**: check console for 404s, verify paths, confirm the script completed
- **Blurry**: WebP quality is currently 85 — consider 90 for hero images; verify source resolution
- **Script fails**: ensure ImageMagick is installed (`convert --version`), check asset directory permissions, verify paths in the script

### Not Yet Implemented (Future)
`<picture>` responsive images for different widths, CDN hosting, AVIF format, icon sprites, progressive JPEG for any remaining JPEGs, preloading critical above-the-fold images.

---

## Development Commands
```bash
npm install              # Install dependencies
npm start                # Dev server (localhost:4200)
npm run build             # Production build → dist/browser/
npm test                  # Run unit tests (Karma)
npm run optimize-images   # Optimize new images (WebP + thumbnails)
```

`ng e2e` requires adding a package that implements e2e testing capabilities (none configured by default).

## Testing
Update/create `.spec.ts` files for new or changed components. Existing coverage spans authentication, CRUD operations, filters, and cart logic. Notable files: `admin.component.spec.ts`, `shop.component.spec.ts`, `blog.component.spec.ts`.

## Dependencies
Add to `package.json`, import in the relevant module.

## Deployment (Netlify)
`netlify.toml`:
```toml
[build]
  command = "cd angular && npm install && npm run build"
  publish = "angular/dist/browser"
  functions = "angular/netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Env var `MONGODB_URI` set in the Netlify dashboard. Auto-deploy is enabled for Git pushes to `main`.

## Known Issues
Angular peer dependency warnings (ngx-bootstrap vs Angular 19) — non-breaking, safe to ignore.

## Troubleshooting
- **Peer dependency warnings**: safe to ignore, functionality unaffected.
- **Cart not persisting**: verify localStorage is enabled; check `localStorage.getItem('shoppingCart')` in console.
- **Images not loading**: verify `assets/` paths, re-run `npm run optimize-images`, check WebP support.
- **Admin login not working**: credentials are `admin` / `admin123`; try `localStorage.clear()`; check console for errors.
- **Products not saving in admin**: check localStorage quota (~5-10MB); clear old data if exceeded; use Import/Export to back up.
- **Build errors**: `rm -rf node_modules package-lock.json && npm install && npm run build`.
- **Netlify function / MongoDB errors**: verify `MONGODB_URI`, check MongoDB Atlas IP whitelist (allow 0.0.0.0/0), review function logs in the Netlify dashboard.
- **Comments not loading**: check API endpoint reachability, verify MongoDB/PostgreSQL connection, check console, check CORS headers.
- **Comments not submitting**: check content moderation rules, verify the endpoint accepts POST, check the network tab, ensure required fields are filled.
- **Admin panel not showing comments**: verify authentication, check API service methods, ensure `loadComments()` is called.
- **Pagination not working**: verify page-number math, confirm API returns the correct total count, check for off-by-one errors.

Debug helpers (browser console):
```javascript
localStorage.clear(); sessionStorage.clear(); location.reload();

// Cart
const cart = localStorage.getItem('shoppingCart');
console.log(JSON.parse(cart));

// Admin auth
console.log(localStorage.getItem('adminAuthenticated'));
localStorage.setItem('adminAuthenticated', 'true'); // force login
```

Test different viewports: Chrome DevTools (F12) → device toolbar (Ctrl+Shift+M) → Mobile 375px / Tablet 768px / Desktop 1200px+.

## Future Enhancements (repo-wide, not yet built)
Order management with tracking, user accounts, Stripe/PayPal integration, inventory alerts, email notifications, product reviews, wishlist, admin analytics/sales reports. Technical: NgRx for complex state, PWA support, Angular Universal SSR, migrate localStorage-backed data to a real database, JWT auth, API rate limiting/input validation hardening, lazy loading for routes/images, WCAG 2.1 AA compliance pass.
