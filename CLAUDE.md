# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**daily-good-practices** - A minimal, client-side web application that displays one daily good practice to guide your day. Each practice is randomly selected and locked for 24 hours.

- **License**: MIT License (Copyright 2025 Matteo Costa)
- **Tech Stack**: Vanilla HTML/CSS/JavaScript (no build tools)
- **Deployment**: Azure Static Web Apps

## Development Commands

### Running Locally
```bash
# Open directly in browser
open index.html

# Or use a local server
python -m http.server 8000
```

No build process required - this is a pure static site.

## Architecture

### Core Components

1. **[practices.js](practices.js)** - Data source containing 101 good practices
   - Exported as ES6 module
   - Array of practice strings

2. **[app.js](app.js)** - Application logic
   - Practice selection with 24-hour locking
   - Theme management with system preference detection
   - localStorage persistence

3. **[index.html](index.html)** - Minimal HTML structure
   - Single practice display element
   - Theme toggle button
   - ES6 module imports

4. **[styles.css](styles.css)** - Styling
   - CSS custom properties for theming
   - Responsive typography with `clamp()`
   - Flexbox centering

### Practice Selection Logic

The practice selection uses localStorage to ensure the same practice is shown for 24 hours:

```javascript
// Storage schema
{
  "dailyPractice": {
    "index": 42,           // 0-100 array index
    "timestamp": 1704067200000  // Unix timestamp
  }
}
```

Flow:
1. Check localStorage for existing practice
2. If exists and < 24h old: display stored practice
3. If expired or missing: generate new random practice
4. Save index + timestamp to localStorage

### Theme System

Theme priority order:
1. User's explicit choice (localStorage)
2. System preference (`prefers-color-scheme`)
3. Default to light theme

Implementation:
- CSS custom properties (`--bg-color`, `--text-color`)
- `data-theme` attribute on `<html>` element
- Smooth transitions (0.3s ease)
- System preference listener for dynamic updates

### localStorage Keys

- `dailyPractice` - Practice index and timestamp
- `theme` - User's theme preference ("light" or "dark")

## File Organization

```
/
├── index.html                  # Entry point
├── styles.css                  # All styles (theme support)
├── app.js                      # All logic (practice + theme)
├── practices.js                # Data array (101 practices)
├── staticwebapp.config.json    # Azure deployment config
├── .gitignore                  # Git exclusions
├── README.md                   # User documentation
├── CLAUDE.md                   # This file
└── 101 Good Practices.md       # Source data
```

## Deployment

This project deploys to Azure Static Web Apps:

1. Create Static Web App in Azure Portal
2. Connect to GitHub repository
3. Configuration:
   - App location: `/`
   - Output location: `` (empty)
   - No build command needed
4. Automatic deployment on push to main branch

The [staticwebapp.config.json](staticwebapp.config.json) file configures:
- Routing rules
- MIME types
- Security headers (CSP, X-Frame-Options)

## Important Patterns

### Adding New Practices

To add practices, edit [practices.js](practices.js):
```javascript
export const practices = [
  "New practice here",
  // ... existing practices
];
```

### Modifying Theme Colors

Edit CSS custom properties in [styles.css](styles.css):
```css
:root {
  --bg-color: #fafafa;
  --text-color: #1a1a1a;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
}
```

### Adjusting 24-Hour Lock Duration

Modify the constant in [app.js](app.js):
```javascript
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
```

## Browser Compatibility

- ES6 modules (all modern browsers)
- localStorage API (widely supported)
- CSS custom properties (all modern browsers)
- `prefers-color-scheme` media query (modern browsers)

No polyfills or build tools needed.
