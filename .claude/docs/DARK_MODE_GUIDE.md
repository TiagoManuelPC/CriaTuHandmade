# Dark Mode & CSS Variables Guide

## Overview
The application now supports both light and dark themes with a comprehensive CSS variable system for easy theme management. All colors and styling values are centralized in CSS variables, making it simple to update themes or add new color schemes.

---

## How to Use Dark Mode

### Toggle Dark Mode
1. Click the sun/moon icon in the navigation bar
2. Theme preference is automatically saved to localStorage
3. Theme persists across page refreshes and sessions

### Programmatic Theme Control
```typescript
// In any component
toggleTheme(): void {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Check current theme
const currentTheme = document.documentElement.getAttribute('data-theme');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

---

## CSS Variables Reference

All CSS variables are defined in [styles.scss](angular/src/styles.scss) with separate values for light and dark themes.

### Primary Colors
Used for brand identity, buttons, links, and accents.

| Variable | Light Value | Dark Value | Usage |
|----------|-------------|------------|-------|
| `--primary-color` | #CC3366 | #e6558c | Primary brand color |
| `--primary-dark` | #a82950 | #CC3366 | Darker shade |
| `--primary-light` | #e6558c | #ff79a8 | Lighter shade |
| `--secondary-color` | #e74c3c | #ff6b5a | Secondary accent |

**Usage Example:**
```scss
.button-primary {
  background: var(--primary-color);
  
  &:hover {
    background: var(--primary-dark);
  }
}

// Gradients
.gradient-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}
```

---

### Background Colors
Used for page backgrounds, cards, sections, and containers.

| Variable | Light Value | Dark Value | Usage |
|----------|-------------|------------|-------|
| `--bg-primary` | #ffffff | #1a1a1a | Main background |
| `--bg-secondary` | #f8f9fa | #2d2d2d | Secondary sections |
| `--bg-tertiary` | #ecf0f1 | #3a3a3a | Tertiary backgrounds |
| `--bg-gradient-start` | #f5f7fa | #1a1a1a | Gradient start |
| `--bg-gradient-end` | #c3cfe2 | #2d2d2d | Gradient end |

**Usage Example:**
```scss
body {
  background-color: var(--bg-primary);
}

.card {
  background-color: var(--bg-secondary);
}

.hero-section {
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
}
```

---

### Text Colors
Used for all text elements, headings, paragraphs, labels.

| Variable | Light Value | Dark Value | Usage |
|----------|-------------|------------|-------|
| `--text-primary` | #2c3e50 | #e0e0e0 | Main text |
| `--text-secondary` | #7f8c8d | #b0b0b0 | Secondary text |
| `--text-muted` | #95a5a6 | #808080 | Muted/disabled text |
| `--text-inverse` | #ffffff | #1a1a1a | Text on colored backgrounds |

**Usage Example:**
```scss
h1, h2, h3 {
  color: var(--text-primary);
}

p {
  color: var(--text-secondary);
}

.disabled-text {
  color: var(--text-muted);
}

.button {
  color: var(--text-inverse); // White on colored button
}
```

---

### Borders & Shadows
Used for borders, dividers, and shadow effects.

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--border-color` | #ddd | #444 |
| `--border-light` | #e0e0e0 | #555 |
| `--shadow-sm` | rgba(0,0,0,0.1) | rgba(0,0,0,0.3) |
| `--shadow-md` | rgba(0,0,0,0.1) | rgba(0,0,0,0.4) |
| `--shadow-lg` | rgba(0,0,0,0.15) | rgba(0,0,0,0.5) |
| `--shadow-hover` | rgba(0,0,0,0.2) | rgba(0,0,0,0.6) |

**Usage Example:**
```scss
.card {
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-md);
  
  &:hover {
    box-shadow: var(--shadow-hover);
  }
}

.divider {
  border-bottom: 1px solid var(--border-light);
}
```

---

### Component-Specific Colors
Used for specific UI components like cards, inputs, modals.

| Variable | Light Value | Dark Value | Usage |
|----------|-------------|------------|-------|
| `--card-bg` | #ffffff | #2d2d2d | Card backgrounds |
| `--card-border` | #e0e0e0 | #444 | Card borders |
| `--input-bg` | #ffffff | #3a3a3a | Input fields |
| `--input-border` | #ddd | #555 | Input borders |
| `--input-focus` | #CC3366 | #e6558c | Focused inputs |

**Usage Example:**
```scss
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}

input, textarea, select {
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  color: var(--text-primary);
  
  &:focus {
    border-color: var(--input-focus);
    outline: none;
  }
}
```

---

### Status Colors
Used for success, error, warning, and info messages.

| Variable | Light Value | Dark Value | Purpose |
|----------|-------------|------------|---------|
| `--success-color` | #27ae60 | #2ecc71 | Success text |
| `--success-bg` | #d4edda | #1e4d2b | Success background |
| `--danger-color` | #e74c3c | #e74c3c | Error text |
| `--danger-bg` | #f8d7da | #4d2020 | Error background |
| `--warning-color` | #f39c12 | #f39c12 | Warning text |
| `--warning-bg` | #fff3cd | #4d3a1a | Warning background |
| `--info-color` | #3498db | #5dade2 | Info text |
| `--info-bg` | #d1ecf1 | #1a3a4d | Info background |

**Usage Example:**
```scss
.alert-success {
  background: var(--success-bg);
  color: var(--success-color);
  border-left: 4px solid var(--success-color);
}

.alert-danger {
  background: var(--danger-bg);
  color: var(--danger-color);
}

.badge-warning {
  background: var(--warning-color);
  color: var(--text-inverse);
}
```

---

### Navigation Colors
Used specifically for navigation bars and menus.

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--nav-bg` | rgba(255,255,255,0.95) | rgba(42,42,42,0.95) |
| `--nav-text` | #2c3e50 | #e0e0e0 |
| `--nav-hover` | #CC3366 | #e6558c |
| `--nav-shadow` | rgba(0,0,0,0.1) | rgba(0,0,0,0.5) |

**Usage Example:**
```scss
.navbar {
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  
  a {
    color: var(--nav-text);
    
    &:hover {
      color: var(--nav-hover);
    }
  }
}
```

---

### Modal & Overlay Colors
Used for modals, overlays, and popups.

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--modal-bg` | #ffffff | #2d2d2d |
| `--overlay-bg` | rgba(0,0,0,0.5) | rgba(0,0,0,0.7) |

**Usage Example:**
```scss
.modal-overlay {
  background: var(--overlay-bg);
}

.modal-content {
  background: var(--modal-bg);
  border: 1px solid var(--border-color);
}
```

---

### Table Colors
Used for tables and data grids.

| Variable | Light Value | Dark Value |
|----------|-------------|------------|
| `--table-header-bg` | #ecf0f1 | #3a3a3a |
| `--table-row-hover` | #f8f9fa | #333 |
| `--table-border` | #ddd | #444 |

**Usage Example:**
```scss
table {
  border: 1px solid var(--table-border);
  
  thead {
    background: var(--table-header-bg);
  }
  
  tbody tr {
    &:hover {
      background: var(--table-row-hover);
    }
    
    td {
      border-bottom: 1px solid var(--table-border);
    }
  }
}
```

---

## Adding CSS Variables to Components

### In Component SCSS Files
Always use CSS variables instead of hardcoded colors:

**❌ Bad - Hardcoded Colors:**
```scss
.my-component {
  background: #ffffff;
  color: #2c3e50;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**✅ Good - CSS Variables:**
```scss
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
}
```

### Common Patterns

**Card Component:**
```scss
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
  
  h3 {
    color: var(--text-primary);
    margin-bottom: 10px;
  }
  
  p {
    color: var(--text-secondary);
  }
}
```

**Button Component:**
```scss
.btn-primary {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-inverse);
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

**Form Input:**
```scss
.form-input {
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  color: var(--text-primary);
  padding: 12px;
  border-radius: 6px;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--input-focus);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
}
```

---

## Updating Existing Components

When updating components to support dark mode:

1. **Replace all hardcoded colors** with CSS variables
2. **Test in both themes** to ensure readability
3. **Use appropriate variables** for the element type
4. **Add smooth transitions** for theme switching

### Migration Checklist

- [ ] Replace background colors with `--bg-*` variables
- [ ] Replace text colors with `--text-*` variables
- [ ] Replace borders with `--border-*` variables
- [ ] Replace shadows with `--shadow-*` variables
- [ ] Replace component-specific colors (cards, inputs, etc.)
- [ ] Test hover states in both themes
- [ ] Test focus states in both themes
- [ ] Verify text contrast ratios (WCAG AA minimum)
- [ ] Add `transition` for smooth theme switching

---

## Creating a New Theme

To add a third theme (e.g., "blue theme"):

1. **Add theme attribute selector** in `styles.scss`:
```scss
[data-theme="blue"] {
  --primary-color: #2980b9;
  --primary-dark: #1f5f8b;
  --primary-light: #3498db;
  // ... define all variables
}
```

2. **Update theme toggle logic** in `app.component.ts`:
```typescript
toggleTheme(): void {
  const themes = ['light', 'dark', 'blue'];
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
}
```

---

## Best Practices

### DO:
- ✅ Always use CSS variables for colors
- ✅ Use semantic variable names (e.g., `--text-primary`, not `--color-1`)
- ✅ Add transitions for smooth theme switching
- ✅ Test in both light and dark modes
- ✅ Maintain sufficient contrast ratios (WCAG AA: 4.5:1 for text)
- ✅ Group related variables together
- ✅ Document custom variables

### DON'T:
- ❌ Don't hardcode colors (`color: #fff;`)
- ❌ Don't use inline styles with hardcoded colors
- ❌ Don't forget to test hover/focus states
- ❌ Don't use pure black (#000) or pure white (#fff) for backgrounds
- ❌ Don't create too many similar variables
- ❌ Don't use overly specific variable names

---

## Accessibility Considerations

### Contrast Ratios
Ensure sufficient contrast between text and backgrounds:
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+): Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

### Testing Tools
- Chrome DevTools > Lighthouse > Accessibility
- WebAIM Contrast Checker
- WAVE Browser Extension

### User Preferences
Respect system preferences:
```typescript
// Detect system theme preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('theme')) {
  const theme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
}
```

---

## Troubleshooting

### Colors Not Changing
- Check that `data-theme` attribute is set on `<html>` element
- Verify CSS variable is defined in both `:root` and `[data-theme="dark"]`
- Clear browser cache and hard reload

### Flickering on Page Load
- Load theme preference before rendering:
```typescript
// In index.html or main.ts
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

### Poor Contrast
- Use lighter shades in dark mode
- Test with contrast checker tools
- Avoid pure black (#000) backgrounds

### Transitions Too Slow
- Adjust transition duration in styles.scss:
```scss
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

---

## Examples

### Complete Component Example
```scss
.product-card {
  // Layout
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  
  // Hover state
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-4px);
  }
  
  // Image
  .product-image {
    border-radius: 8px;
    border: 1px solid var(--border-light);
  }
  
  // Title
  .product-title {
    color: var(--text-primary);
    font-size: 18px;
    font-weight: 600;
    margin: 12px 0;
  }
  
  // Description
  .product-description {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.6;
  }
  
  // Price
  .product-price {
    color: var(--success-color);
    font-size: 20px;
    font-weight: 700;
  }
  
  // Badge
  .badge {
    background: var(--primary-color);
    color: var(--text-inverse);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
  }
  
  // Button
  .btn-add-to-cart {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--text-inverse);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: var(--shadow-hover);
    }
  }
}
```

---

## Resources

- **CSS Variables Documentation**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **WCAG Contrast Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Dark Mode Best Practices**: https://developer.chrome.com/blog/prefers-color-scheme/

---

## Quick Reference Card

```scss
/* Backgrounds */
background: var(--bg-primary);      // Main background
background: var(--bg-secondary);    // Cards, sections
background: var(--card-bg);         // Card backgrounds

/* Text */
color: var(--text-primary);         // Main text
color: var(--text-secondary);       // Secondary text
color: var(--text-muted);           // Disabled/muted

/* Borders */
border: 1px solid var(--border-color);
border: 1px solid var(--card-border);

/* Shadows */
box-shadow: var(--shadow-sm);       // Subtle
box-shadow: var(--shadow-md);       // Normal
box-shadow: var(--shadow-lg);       // Elevated
box-shadow: var(--shadow-hover);    // Hover state

/* Brand Colors */
background: var(--primary-color);
background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);

/* Status */
color: var(--success-color);
background: var(--danger-bg);
color: var(--warning-color);
```

---

*Last updated: 2024*
