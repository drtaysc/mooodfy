# Recent Changes

## Frontend/Backend Separation ✅

The website has been redesigned with clear frontend/backend separation:

### Frontend Structure
- `app/` - Next.js pages (Home, Post Detail, Create Post)
- `components/` - React components (TimelinePost)
- `services/api.ts` - Frontend API client service

### Backend Structure
- `app/api/` - API route handlers
- `server/controllers/` - Business logic layer

## Moody Dark Theme ✅

The website now features a moody dark theme:
- **Background**: Deep dark (#0f0f0f) with purple/pink gradients
- **Colors**: Purple (#6b5b95), Pink (#c08497), Accent (#8b7fa8)
- **Typography**: Big, bold fonts (7xl-8xl for headings)
- **Design**: Organic rounded corners, soft glowing shadows

## How to See Changes

1. **Hard Refresh Browser**: 
   - Chrome/Edge: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Safari: `Cmd+Option+R`
   - Firefox: `Cmd+Shift+R` or `Ctrl+F5`

2. **Clear Browser Cache**:
   - Open DevTools (F12)
   - Right-click refresh button → "Empty Cache and Hard Reload"

3. **Check Development Server**:
   - Make sure `npm run dev` is running
   - Visit: http://localhost:3000

4. **Visual Changes You Should See**:
   - Dark background instead of light
   - Purple/pink color scheme
   - Large bold text
   - Sidebar on the left (desktop)
   - Rounded organic design elements
   - Glowing shadows

## Current Design Features

- **Dark Theme**: Deep black background with subtle gradients
- **Moody Colors**: Purple, pink, and accent colors
- **Big Typography**: 7xl-8xl headings, bold fonts throughout
- **Organic Design**: Large rounded corners (32-40px)
- **Sidebar**: Dark sidebar with navigation icons
- **Timeline**: Vertical timeline with purple gradient lines

