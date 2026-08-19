# CriaTuHandmade - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Setup & Installation](#setup--installation)
4. [Components Documentation](#components-documentation)
5. [Admin Panel Guide](#admin-panel-guide)
6. [Data Structures](#data-structures)
7. [API Integration](#api-integration)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

CriaTuHandmade is a full-featured e-commerce website for a handmade crafts business. The project includes:

- **Frontend**: Angular 19 application
- **Backend**: .NET 8 API (separate deployment) + Netlify Functions
- **Database**: MongoDB (via Netlify) + PostgreSQL (for .NET backend)
- **Deployment**: Netlify (Angular) + Docker (.NET)

### Key Features
- Product catalog with categories and filtering
- Shopping cart with localStorage persistence
- Blog management system
- Service showcase
- Contact form
- Admin panel for managing products and settings
- Responsive design for all devices

---

## Architecture

### Frontend Stack
- **Framework**: Angular 19.0.3
- **Language**: TypeScript 5.5
- **UI Libraries**: 
  - Bootstrap 5.3.3
  - Angular Material 19.0.2
  - ngx-bootstrap (Carousel)
  - ng-gallery (Image gallery)
  - ngx-spinner (Loading states)
- **State Management**: LocalStorage for cart and admin data
- **Routing**: Angular Router with SPA support

### Project Structure
```
angular/
├── src/
│   ├── app/
│   │   ├── about/              # About page component
│   │   ├── admin/              # Admin panel component
│   │   ├── blog/               # Blog component
│   │   ├── contacts/           # Contact form component
│   │   ├── home/               # Home page component
│   │   ├── services/           # Services showcase component
│   │   ├── shop/               # Shop/Products component
│   │   ├── interfaces/         # TypeScript interfaces
│   │   │   ├── admin.ts
│   │   │   ├── blog-post.ts
│   │   │   ├── contact.ts
│   │   │   └── product.ts
│   │   ├── api.service.ts      # API service
│   │   ├── auth.guard.ts       # Route guard
│   │   ├── app.module.ts       # Main module
│   │   └── app-routing.module.ts # Routing config
│   ├── assets/                 # Images, logos, icons
│   ├── styles.scss             # Global styles
│   └── index.html              # Main HTML
├── netlify/
│   └── functions/
│       └── database.js         # MongoDB serverless function
└── public/                     # Static assets
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI: `npm install -g @angular/cli`

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd CriaTuHandmade
```

2. **Install Angular dependencies**
```bash
cd angular
npm install
```

3. **Install Netlify Functions dependencies**
```bash
cd netlify/functions
npm install
cd ../..
```

4. **Set up environment variables**
Create a `.env` file or configure in Netlify dashboard:
```
MONGODB_URI=your_mongodb_connection_string
```

5. **Run development server**
```bash
npm start
# Application runs on http://localhost:4200
```

6. **Build for production**
```bash
npm run build
# Output: dist/browser/
```

---

## Components Documentation

### 1. Home Component
**Path**: `src/app/home/`

**Purpose**: Landing page with hero carousel and featured gallery

**Features**:
- Bootstrap carousel with 3 slides
- Image gallery using ng-gallery
- Responsive design

**Key Methods**:
- None (template-driven component)

**Usage**:
```typescript
// Accessed via route: '/'
```

---

### 2. About Component
**Path**: `src/app/about/`

**Purpose**: Business information and story

**Features**:
- Company description
- Mission and values
- Team information

---

### 3. Services Component
**Path**: `src/app/services/`

**Purpose**: Showcase available services with categories

**Features**:
- Service categories (Custom Crafts, Cricut, Personalized, Decor)
- Modal detail view for each service
- Price display and feature lists

**Key Properties**:
```typescript
services: Service[] = [...];        // All services
filteredServices: Service[] = [];   // Filtered by category
selectedCategory: string = 'all';   // Current category
selectedService: Service | null;    // Service for modal
```

**Key Methods**:
```typescript
filterServices(): void              // Filter by category
onCategoryChange(category: string)  // Handle category selection
openServiceModal(service: Service)  // Open service details
closeServiceModal(): void           // Close modal
```

**Data Structure**:
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

---

### 4. Blog Component
**Path**: `src/app/blog/`

**Purpose**: Display and manage blog posts

**Features**:
- Search functionality
- Category filtering
- Sort by date/popularity
- Pagination (6 posts per page)
- Add new post form

**Key Properties**:
```typescript
posts: BlogPost[] = [];              // All posts
filteredPosts: BlogPost[] = [];      // After search/filter
paginatedPosts: BlogPost[] = [];     // Current page posts
searchTerm: string = '';
selectedCategory: string = 'all';
sortOrder: string = 'newest';
currentPage: number = 1;
postsPerPage: number = 6;
totalPages: number = 0;
```

**Key Methods**:
```typescript
applyFilters(): void                 // Apply all filters
updatePagination(): void             // Update paginated view
onSearch(): void                     // Handle search
onCategoryChange(cat: string): void  // Filter by category
onSortChange(sort: string): void     // Sort posts
goToPage(page: number): void         // Navigate pages
getExcerpt(content: string): string  // Create post excerpt
```

**Data Structure**:
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

---

### 5. Shop Component
**Path**: `src/app/shop/`

**Purpose**: E-commerce functionality with cart management

**Features**:
- Product catalog with 12 products
- 8 product categories
- Search and filter by category
- Sort by price/popularity
- Shopping cart with sidebar
- Product detail modal
- LocalStorage cart persistence

**Key Properties**:
```typescript
products: Product[] = [];            // All products
filteredProducts: Product[] = [];    // Filtered results
cart: Cart;                          // Shopping cart
selectedCategory: string = 'all';
searchTerm: string = '';
sortBy: string = 'popularity';
selectedProduct: Product | null;     // For modal
isCartOpen: boolean = false;
currentPage: number = 1;
productsPerPage: number = 9;
```

**Key Methods**:
```typescript
applyFilters(): void                 // Apply search/filter/sort
addToCart(product: Product): void    // Add product to cart
updateQuantity(itemId: string, qty: number): void
removeFromCart(itemId: string): void
clearCart(): void
calculateSubtotal(): number
calculateTotal(): number
saveCartToStorage(): void            // Persist to localStorage
loadCartFromStorage(): void          // Load from localStorage
toggleCart(): void                   // Open/close cart sidebar
openProductModal(product: Product): void
closeProductModal(): void
```

**Data Structure**:
```typescript
interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  featured: boolean;
  colors?: string[];
  sizes?: string[];
  materials?: string[];
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
```

**Product Categories**:
- mugs
- hats
- tshirts
- plates
- decor
- gifts
- accessories
- custom

---

### 6. Admin Component
**Path**: `src/app/admin/`

**Purpose**: Administrative panel for managing products, business info, and settings

**Features**:
- Login/authentication (username: admin, password: admin123)
- Product CRUD operations
- Business information management
- Settings configuration
- Import/Export products (JSON)
- Three main tabs: Products, Business Info, Settings

**Key Properties**:
```typescript
// Authentication
isAuthenticated: boolean = false;
loginUsername: string = '';
loginPassword: string = '';
loginError: string = '';

// UI State
activeTab: string = 'products';
successMessage: string = '';
errorMessage: string = '';

// Products Management
products: Product[] = [];
filteredProducts: Product[] = [];
currentProduct: Product;
isProductFormOpen: boolean = false;
isEditMode: boolean = false;
searchTerm: string = '';
selectedCategory: string = 'all';

// Business Info
businessInfo: BusinessInfo;

// Settings
settings: AdminSettings;
```

**Key Methods**:
```typescript
// Authentication
login(): void                        // Validate and login
logout(): void                       // Clear session

// Navigation
switchTab(tab: string): void         // Switch between tabs

// Product Management
openAddProductForm(): void           // Open add product modal
openEditProductForm(product): void   // Open edit product modal
saveProduct(): void                  // Add or update product
deleteProduct(id: string): void      // Delete product
toggleProductStock(id: string): void // Toggle in/out of stock
toggleProductFeatured(id: string): void // Toggle featured status
onSearch(): void                     // Search products
onCategoryFilter(): void             // Filter by category

// Array Management (for product tags, colors, sizes, materials)
addTag(tag: string): void
removeTag(index: number): void
addColor(color: string): void
removeColor(index: number): void
addSize(size: string): void
removeSize(index: number): void
addMaterial(material: string): void
removeMaterial(index: number): void

// Business Info
saveBusinessInfo(): void             // Save business information

// Settings
saveSettings(): void                 // Save admin settings

// Import/Export
exportProducts(): void               // Export products as JSON
importProducts(event: Event): void   // Import products from JSON
```

**Data Structures**:
```typescript
interface AdminUser {
  username: string;
  password: string;
}

interface BusinessInfo {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website?: string;
  description?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    pinterest?: string;
  };
}

interface AdminSettings {
  siteTitle: string;
  siteDescription: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  emailNotifications: boolean;
  orderNotifications: boolean;
}
```

**Authentication**:
- Default credentials stored in component
- Session stored in localStorage (`adminAuthenticated`)
- Can be protected with AuthGuard (currently not enforced)

---

### 7. Contacts Component
**Path**: `src/app/contacts/`

**Purpose**: Contact form for customer inquiries

**Features**:
- Form validation
- Email collection
- Message submission

---

## Admin Panel Guide

### Accessing Admin Panel
1. Navigate to `/admin` route
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`

### Products Tab

**Features**:
- View all products in a table
- Search products by name
- Filter by category
- Toggle stock status
- Toggle featured status
- Add new products
- Edit existing products
- Delete products
- Import/Export products

**Adding a Product**:
1. Click "Add Product" button
2. Fill in required fields:
   - Product Name
   - Category
   - Description
   - Price
   - Stock Quantity
   - Image URL
3. Optional fields:
   - Original Price (for sale items)
   - Rating (0-5)
   - Number of Reviews
   - Tags, Colors, Sizes, Materials (press Enter to add)
4. Set checkboxes:
   - In Stock
   - Featured Product
5. Click "Add Product"

**Editing a Product**:
1. Click edit icon (✏️) on product row
2. Modify fields in modal
3. Click "Update Product"

**Deleting a Product**:
1. Click delete icon (🗑️) on product row
2. Confirm deletion (product is removed immediately)

**Import/Export**:
- **Export**: Click "Export" to download all products as JSON
- **Import**: Click "Import", select JSON file with product array

### Business Info Tab

**Features**:
- Update business details
- Manage contact information
- Add social media links

**Fields**:
- Basic Information: Business Name, Owner Name, Email, Phone
- Address: Street, City, State, ZIP, Country
- Online Presence: Website, Description
- Social Media: Facebook, Instagram, Twitter, Pinterest

**Saving**:
1. Fill/update form fields
2. Click "Save Business Information"
3. Data saved to localStorage

### Settings Tab

**Features**:
- Configure site settings
- Set pricing options
- Manage notifications

**Options**:
- General: Site Title, Site Description
- Store: Currency, Tax Rate, Shipping Fee, Free Shipping Threshold
- Notifications: Email Notifications, Order Notifications

**Saving**:
1. Adjust settings
2. Click "Save Settings"
3. Settings saved to localStorage

---

## Data Structures

### Product Interface
```typescript
interface Product {
  id: string;                    // Unique identifier
  name: string;                  // Product name
  category: ProductCategory;     // Category enum
  description: string;           // Full description
  price: number;                 // Current price
  originalPrice?: number;        // Original price (for sales)
  image: string;                 // Image URL
  inStock: boolean;              // Stock status
  stockQuantity: number;         // Available quantity
  rating?: number;               // Average rating (0-5)
  reviews?: number;              // Number of reviews
  tags: string[];                // Search tags
  featured: boolean;             // Featured product flag
  colors?: string[];             // Available colors
  sizes?: string[];              // Available sizes
  materials?: string[];          // Materials used
}

type ProductCategory = 
  | 'mugs' 
  | 'hats' 
  | 'tshirts' 
  | 'plates' 
  | 'decor' 
  | 'gifts' 
  | 'accessories' 
  | 'custom';
```

### Cart Interface
```typescript
interface Cart {
  items: CartItem[];             // Cart items
  totalItems: number;            // Total item count
  subtotal: number;              // Subtotal amount
}

interface CartItem {
  id: string;                    // Cart item ID
  product: Product;              // Full product object
  quantity: number;              // Quantity in cart
  selectedColor?: string;        // Selected color option
  selectedSize?: string;         // Selected size option
}
```

### BlogPost Interface
```typescript
interface BlogPost {
  id: number;                    // Post ID
  title: string;                 // Post title
  author: string;                // Author name
  date: string;                  // Publication date
  category: string;              // Post category
  content: string;               // Full content
  image: string;                 // Featured image URL
  views?: number;                // View count
}
```

### Contact Interface
```typescript
interface Contact {
  name: string;                  // Contact name
  email: string;                 // Email address
  message: string;               // Message content
  date?: Date;                   // Submission date
}
```

### Admin Interfaces
```typescript
interface AdminUser {
  username: string;
  password: string;
}

interface BusinessInfo {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website?: string;
  description?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    pinterest?: string;
  };
}

interface AdminSettings {
  siteTitle: string;
  siteDescription: string;
  currency: string;
  taxRate: number;
  shippingFee: number;
  freeShippingThreshold: number;
  emailNotifications: boolean;
  orderNotifications: boolean;
}
```

---

## API Integration

### API Service
**Location**: `src/app/api.service.ts`

**Purpose**: Centralized HTTP service for backend communication

**Base URL**: `/.netlify/functions/database`

**Methods**:
```typescript
getData(collectionName: string): Observable<any[]>
addData(collectionName: string, data: any): Observable<any>
```

**Usage Example**:
```typescript
// In component
constructor(private apiService: ApiService) {}

// GET data
this.apiService.getData('products').subscribe(
  (data) => {
    this.products = data;
  },
  (error) => {
    console.error('Error fetching products:', error);
  }
);

// POST data
const newProduct = { name: 'New Item', price: 10 };
this.apiService.addData('products', newProduct).subscribe(
  (response) => {
    console.log('Product added:', response);
  },
  (error) => {
    console.error('Error adding product:', error);
  }
);
```

### Netlify Function
**Location**: `netlify/functions/database.js`

**Supported Operations**:
- **GET**: Fetch all documents from collection
- **POST**: Insert new document to collection

**Environment Variables**:
- `MONGODB_URI`: MongoDB connection string

**Request Format**:
```javascript
// GET
GET /.netlify/functions/database?collection=products

// POST
POST /.netlify/functions/database
Body: {
  collection: 'products',
  data: { name: 'Product', price: 10 }
}
```

**Response Format**:
```javascript
// Success
{
  data: [...],
  message: 'Success'
}

// Error
{
  error: 'Error message'
}
```

---

## Deployment

### Netlify Deployment

**Configuration**: `netlify.toml`
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

**Environment Variables** (Set in Netlify dashboard):
```
MONGODB_URI=mongodb+srv://...
```

**Deploy Steps**:
1. Connect repository to Netlify
2. Set build command: `cd angular && npm run build`
3. Set publish directory: `angular/dist/browser`
4. Add environment variables
5. Deploy

**Auto-deploy**: Enabled for Git pushes to main branch

### .NET Backend Deployment

**Dockerfile**: Located in `dotnet/` directory

**Environment**:
- .NET 8.0
- PostgreSQL database
- Docker containerization

**Deploy**: Follow Docker deployment guide for .NET applications

---

## Troubleshooting

### Common Issues

**1. Angular Peer Dependency Warnings**
- **Issue**: ngx-bootstrap shows peer dependency warning with Angular 19
- **Solution**: Safe to ignore - functionality works correctly

**2. Cart Not Persisting**
- **Issue**: Cart clears on page refresh
- **Solution**: Check localStorage is enabled in browser
- **Verify**: `localStorage.getItem('shoppingCart')` in console

**3. Images Not Loading**
- **Issue**: Broken image links
- **Solution**: 
  - Verify image paths in `assets/` folder
  - Run `npm run optimize-images` for new images
  - Check WebP format support

**4. Admin Login Not Working**
- **Issue**: Cannot access admin panel
- **Solution**: 
  - Use credentials: `admin` / `admin123`
  - Clear localStorage: `localStorage.clear()`
  - Check browser console for errors

**5. Products Not Saving**
- **Issue**: Products don't persist in admin panel
- **Solution**:
  - Check localStorage quota (usually 5-10MB)
  - Clear old data if quota exceeded
  - Use Import/Export to backup data

**6. Build Errors**
- **Issue**: `npm run build` fails
- **Solution**:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run build
  ```

**7. Netlify Function Errors**
- **Issue**: MongoDB connection fails
- **Solution**:
  - Verify `MONGODB_URI` environment variable
  - Check MongoDB Atlas whitelist (allow all IPs: 0.0.0.0/0)
  - Review function logs in Netlify dashboard

### Development Tips

**Hot Reload Issues**:
```bash
# Restart dev server
Ctrl+C
npm start
```

**Clear Application Data**:
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

**Test Different Viewports**:
- Use Chrome DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Test: Mobile (375px), Tablet (768px), Desktop (1200px+)

**Debug Cart Issues**:
```javascript
// In browser console
const cart = localStorage.getItem('shoppingCart');
console.log(JSON.parse(cart));
```

**Debug Admin Authentication**:
```javascript
// Check auth status
console.log(localStorage.getItem('adminAuthenticated'));

// Force login
localStorage.setItem('adminAuthenticated', 'true');
```

---

## Image Optimization

All images use WebP format for optimal performance.

**Script**: `angular/scripts/optimize-images.sh`

**Usage**:
```bash
npm run optimize-images
```

**Process**:
- Converts images to WebP
- Creates thumbnails (400px width)
- Maintains aspect ratios
- Reduces file sizes by 70-80%

**Documentation**: See `angular/IMAGE_OPTIMIZATION.md`

---

## Testing

**Run Unit Tests**:
```bash
cd angular
npm test
```

**Test Coverage**:
- All components have `.spec.ts` files
- Tests for authentication, CRUD operations, filters, cart logic

**Key Test Files**:
- `admin.component.spec.ts`: Admin panel tests
- `shop.component.spec.ts`: Shop and cart tests
- `blog.component.spec.ts`: Blog functionality tests

---

## Future Enhancements

### Planned Features
1. **Order Management**: Full checkout process with order tracking
2. **User Accounts**: Customer registration and profiles
3. **Payment Integration**: Stripe/PayPal integration
4. **Inventory Management**: Stock alerts and automatic updates
5. **Email Notifications**: Order confirmations and updates
6. **Reviews System**: Customer product reviews and ratings
7. **Wishlist**: Save products for later
8. **Advanced Admin**: Analytics dashboard, sales reports

### Technical Improvements
1. **State Management**: Implement NgRx for complex state
2. **PWA**: Add Progressive Web App capabilities
3. **SSR**: Server-side rendering with Angular Universal
4. **Real Database**: Migrate from localStorage to backend database
5. **Authentication**: JWT-based authentication system
6. **API Security**: Rate limiting and input validation
7. **Performance**: Lazy loading for routes and images
8. **Accessibility**: WCAG 2.1 AA compliance

---

## Support & Contact

### Developer Resources
- **Angular Documentation**: https://angular.io/docs
- **Bootstrap Documentation**: https://getbootstrap.com/docs
- **Material Design**: https://material.angular.io/

### Project Repository
- **GitHub**: [Repository URL]
- **Issues**: [Issues URL]
- **Wiki**: [Wiki URL]

### Contact
- **Email**: [Your Email]
- **Website**: [Your Website]

---

## License

[Your License Information]

---

## Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ Home, About, Services, Blog, Shop, Contact pages
- ✅ Admin panel with product management
- ✅ Shopping cart functionality
- ✅ Responsive design
- ✅ Image optimization
- ✅ LocalStorage persistence

### Version 0.9.0 (Beta)
- ✅ Basic components
- ✅ Routing setup
- ✅ Initial styling

---

*Documentation last updated: 2024*
