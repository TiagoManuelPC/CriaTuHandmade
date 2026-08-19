# GitHub Copilot Instructions - CriaTuHandmade

## Project Context
CriaTuHandmade is a handmade crafts business website with an Angular frontend and .NET backend. This repository contains both applications.

## Project Structure
- **angular/** - Angular 19 frontend application (Netlify deployment)
- **dotnet/** - .NET 8 backend API (separate deployment)

---

## Angular Project Guidelines

### Technology Stack
- Angular 19.0.3 with TypeScript 5.5
- Bootstrap 5.3.3 + Angular Material 19.0.2
- Netlify serverless functions for backend
- MongoDB database via Netlify Functions
- Deployment: Netlify with SPA routing

### Code Standards

#### Component Structure
When creating or modifying components:
- Place in `angular/src/app/[component-name]/`
- Include: `.component.ts`, `.component.html`, `.component.scss`, `.component.spec.ts`
- Use kebab-case for file names, PascalCase for class names
- Declare all components in `app.module.ts`

#### Services
- Use `ApiService` for all HTTP calls to backend
- Base URL: `/.netlify/functions/database`
- Pattern: `getData(collectionName)` and `addData(collectionName, data)`
- Return RxJS Observables

#### Interfaces
- Define TypeScript interfaces in `angular/src/app/interfaces/`
- Example: `BlogPost` interface for blog data structures

#### Styling
- Use SCSS for component styles
- Leverage Bootstrap 5 utility classes
- Component-scoped styles only
- Angular Material components for UI elements

#### Images
- All images are optimized using WebP format
- Gallery images have separate thumbnails (400px) and full-size versions
- Use `loading="lazy"` attribute for all images
- Social media icons optimized to display size
- Run `npm run optimize-images` when adding new images
- Reference optimized versions: `assets/path/image_optimized.webp`
- Documentation: See `angular/IMAGE_OPTIMIZATION.md`

### Module System
Always import required modules in `app.module.ts`:
```typescript
// Currently imported:
- BrowserModule, BrowserAnimationsModule
- FormsModule, HttpClientModule
- CarouselModule, GalleryModule, MatIconModule, NgxSpinnerModule
```

### Routing
- Define routes in `app-routing.module.ts`
- Current routes: home, about, services, blog, contacts
- SPA routing handled by Netlify redirects

### API Integration Pattern
```typescript
// Inject ApiService
constructor(private apiService: ApiService) {}

// GET data
this.apiService.getData('collectionName').subscribe(data => {
  // handle data
});

// POST data
this.apiService.addData('collectionName', payload).subscribe(response => {
  // handle response
});
```

### Netlify Functions
- Location: `angular/netlify/functions/`
- Handler: `database.js` for MongoDB operations
- Supports GET (fetch all) and POST (insert)
- Environment variable: `MONGODB_URI`

### Development Commands
```bash
cd angular
npm install        # Install dependencies
npm start          # Dev server (localhost:4200)
npm run build      # Production build
npm test           # Run tests
npm run optimize-images  # Optimize new images (WebP + thumbnails)
```

### Component Generation
```bash
ng generate component component-name
ng generate service service-name
ng generate interface interface-name
```

---

## .NET Backend Guidelines

### Technology Stack
- .NET 8.0 Web API
- Entity Framework Core with PostgreSQL
- Repository pattern architecture
- Docker support

### Project Structure
```
dotnet/
├── Controllers/     # API controllers
├── Data/           # DbContext and repositories
├── DTOs/           # Data transfer objects
├── Entities/       # Database models
├── Interfaces/     # Repository interfaces
└── Migrations/     # EF Core migrations
```

### Code Standards

#### Controllers
- Inherit from `BaseApiController`
- Use `[ApiController]` and `[Route("api/[controller]")]`
- Return `ActionResult<T>` or `IActionResult`
- Follow RESTful conventions

#### Repository Pattern
- Define interface in `Interfaces/`
- Implement in `Data/` folder
- Inject via dependency injection
- Example: `IBlogPostRepository` → `BlogPostRepository`

#### DTOs
- Create DTOs for API requests/responses
- Keep entities separate from DTOs
- Map between entities and DTOs in controllers

#### Entity Models
- Use proper EF Core annotations
- Define in `Entities/` folder
- Primary keys: `Id` property

#### Database Context
- `DataContext.cs` inherits from `DbContext`
- Define `DbSet<T>` properties for each entity
- Configure in `Program.cs`

### API Endpoints Pattern
```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<EntityDTO>>> GetAll()

[HttpGet("{id}")]
public async Task<ActionResult<EntityDTO>> GetById(int id)

[HttpPost]
public async Task<ActionResult<EntityDTO>> Create(EntityDTO dto)

[HttpPut("{id}")]
public async Task<ActionResult> Update(int id, EntityDTO dto)

[HttpDelete("{id}")]
public async Task<ActionResult> Delete(int id)
```

### Dependency Injection
Register in `Program.cs`:
```csharp
builder.Services.AddScoped<IRepository, RepositoryImplementation>();
```

### Database Migrations
```bash
cd dotnet
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Development Commands
```bash
cd dotnet
dotnet restore      # Restore dependencies
dotnet build        # Build project
dotnet run          # Run application
dotnet test         # Run tests
```

---

## General Guidelines

### When Suggesting Code
1. **Follow existing patterns** - Match the style and architecture already in use
2. **Work from correct directory** - `angular/` or `dotnet/` as appropriate
3. **Update all related files** - Don't forget tests, DTOs, interfaces
4. **Handle errors** - Add try-catch blocks and proper error responses
5. **Use TypeScript/C# types** - Strong typing for all variables and parameters

### File Modifications
- Read existing code before suggesting changes
- Preserve existing formatting and style
- Update imports when adding new dependencies
- Keep consistent naming conventions

### Testing
- Update/create unit tests for new features
- Angular: Update `.spec.ts` files
- .NET: Create/update test classes

### Dependencies
- Angular: Add to `angular/package.json`, import in modules
- .NET: Add via `dotnet add package`, register in `Program.cs`

### Environment Variables
- Angular/Netlify: `MONGODB_URI` (in Netlify dashboard)
- .NET: Configure in `appsettings.json` or environment variables

### Common Patterns

#### Angular Observable Handling
```typescript
// Prefer async pipe in templates
items$ = this.apiService.getData('items');

// Or subscribe in component
this.apiService.getData('items').subscribe({
  next: (data) => this.items = data,
  error: (error) => console.error(error)
});
```

#### .NET Async/Await
```csharp
public async Task<ActionResult<T>> MethodName()
{
    try 
    {
        var result = await _repository.MethodAsync();
        return Ok(result);
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}
```

### Documentation
- Add XML comments for .NET public APIs
- Use JSDoc comments for complex TypeScript functions
- Keep README files updated

---

## Project-Specific Notes

### Known Issues
- Angular peer dependency warnings (ngx-bootstrap vs Angular 19) - these are non-breaking
- Two separate backends: Netlify Functions (MongoDB) and .NET API (PostgreSQL)

### Current Features
- Home page with carousel and gallery
- About page
- Services showcase
- Blog system (BlogPost entity)
- Contact form
- Responsive design with Bootstrap

### Deployment
- **Angular**: Auto-deploy to Netlify from Git
  - Build: `ng build` in `angular/` directory
  - Publish: `dist/browser/`
- **\.NET**: Dockerized application (see Dockerfile)

### When Adding New Features
1. Determine which project (Angular or .NET)
2. Follow the respective guidelines above
3. Create/update necessary files (components, services, DTOs, etc.)
4. Add tests
5. Update routing/endpoints as needed
6. Test locally before committing

---

## Quick Decision Guide

**Creating a new page?** → Angular component in `angular/src/app/`
**Adding API endpoint?** → .NET controller in `dotnet/Controllers/`
**Need database entity?** → .NET entity in `dotnet/Entities/` + migration
**Client-side logic?** → Angular service or component
**Server-side logic?** → .NET repository or controller
**Database query?** → Use Netlify Function (MongoDB) or EF Core (.NET/PostgreSQL)
**UI component?** → Angular component with Material/Bootstrap
**Data validation?** → Both Angular (client) and .NET (server)

---

## Important Commands Reference

### Angular
```bash
cd angular
npm start                          # Dev server
ng g c component-name              # Generate component
ng g s service-name                # Generate service
npm run build                      # Production build
```

### .NET
```bash
cd dotnet
dotnet run                         # Run application
dotnet ef migrations add Name      # Create migration
dotnet ef database update          # Apply migrations
dotnet add package PackageName     # Add NuGet package
```

### Git
Work from repository root for Git commands.
