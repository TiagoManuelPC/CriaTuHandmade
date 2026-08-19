# Image Optimization Guide

## Overview
This document explains the image optimizations implemented to improve page load performance for the CriaTuHandmade website.

## Problem
The original images were causing slow page loads:
- **Instagram icon**: 2.6MB (displayed at only 30x30px!)
- **Gallery images**: 13 JPEG images totaling ~3.7MB
- **Service images**: Multiple large files

## Solution

### 1. Automated Optimization Script
Created `scripts/optimize-images.sh` that:
- Converts all gallery images to WebP format (better compression)
- Generates small thumbnails (400px max width) for gallery previews
- Optimizes social media icons to appropriate sizes
- Optimizes service images

### 2. Size Improvements
**Before → After:**
- Instagram icon: 2.6MB → 4KB (650x smaller!)
- Gallery full images: 3.7MB → 1.2MB in WebP
- Gallery thumbnails: Only 356KB total (loaded first)
- Facebook icon: 56KB → 3KB

### 3. Lazy Loading
Added `loading="lazy"` attribute to all images, so they only load when about to become visible.

### 4. Separate Thumbnails
The ng-gallery component now uses:
- Small thumbnails for the sidebar preview
- Full-size optimized WebP images only when clicked

## Running the Optimization Script

```bash
cd angular
npm run optimize-images
```

Or manually:
```bash
bash scripts/optimize-images.sh
```

## What the Script Creates

### Gallery Images
- **Original location**: `src/assets/images/*.jpeg`
- **Optimized WebP**: `src/assets/images/optimized/*.webp`
- **Thumbnails**: `src/assets/images/thumbnails/*_thumb.webp`

### Social Media Icons
- **Original**: `src/assets/social-logos/*.png`
- **Optimized**: `src/assets/social-logos/*_optimized.webp`

### Service Images
- **Original**: `src/assets/service-images/*`
- **Optimized**: `src/assets/service-images/*_optimized.webp`

## Components Updated

### home.component.ts
- Updated `GalleryItem` array to use WebP images
- Separate thumbnail and full-size image paths
- Better alt text descriptions

### home.component.html
- Optimized social media icons
- Added `loading="lazy"` attributes

### about.component.html
- Service images now use optimized WebP versions
- Lazy loading enabled

### contacts.component.html
- Social icons optimized
- Lazy loading enabled

## Performance Impact

### Expected Improvements:
- **Initial page load**: ~3MB lighter (70-80% reduction)
- **Gallery thumbnails**: Load 10x faster (356KB vs 3.7MB)
- **Instagram icon**: 650x smaller
- **Lazy loading**: Below-the-fold images don't block initial render

### Lighthouse Score Improvements:
- **Largest Contentful Paint (LCP)**: Should improve significantly
- **Total Blocking Time**: Reduced network congestion
- **Cumulative Layout Shift**: No change (dimensions specified)

## Browser Support

### WebP Format:
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Edge 18+
- ✅ Safari 14+ (2020)
- ✅ All modern mobile browsers

Coverage: ~96% of global users (2024 data)

### Lazy Loading:
- ✅ Chrome 77+
- ✅ Firefox 75+
- ✅ Edge 79+
- ✅ Safari 15.4+

For older browsers, images still load normally (just not lazy).

## Adding New Images

When adding new images to the project:

1. Add the original image to the appropriate assets folder
2. Run the optimization script:
   ```bash
   npm run optimize-images
   ```
3. Update your component to reference the optimized version:
   ```typescript
   // For gallery images
   new ImageItem({
     src: 'assets/images/optimized/image-name.webp',
     thumb: 'assets/images/thumbnails/image-name_thumb.webp',
     alt: 'Descriptive alt text'
   })
   
   // For regular images
   <img src="assets/path/image_optimized.webp" 
        alt="Description" 
        loading="lazy">
   ```

## Maintenance

### When to Re-optimize
- After adding new images
- If you replace existing images
- Before major releases/deployments

### Cleaning Up
After verifying the optimized images work correctly, you can optionally remove the original large files to save repository space. However, keep them if you might need to re-optimize with different settings.

## Future Enhancements

Potential improvements for even better performance:
1. **Responsive images**: Use `<picture>` with multiple sizes for different screen widths
2. **CDN**: Host images on a CDN for faster delivery
3. **AVIF format**: Even better compression than WebP (when browser support improves)
4. **Image sprite**: Combine small icons into a single file
5. **Progressive JPEG**: For any remaining JPEG images
6. **Preloading**: Preload critical above-the-fold images

## Troubleshooting

### Images not displaying
- Check browser console for 404 errors
- Verify file paths are correct
- Ensure optimization script completed successfully

### Images look blurry
- Check the WebP quality setting (currently 85)
- For important hero images, consider quality 90
- Verify source images are high resolution

### Script fails
- Ensure ImageMagick is installed: `convert --version`
- Check file permissions on assets directory
- Verify paths in the script are correct

## Tools Used
- **ImageMagick**: Image conversion and optimization
- **WebP**: Modern image format with superior compression
- **ng-gallery**: Angular gallery component with thumbnail support
- **Browser lazy loading**: Native `loading="lazy"` attribute
