# Daily Good Practices

A minimal, elegant web application that displays one daily good practice to guide your day. Each practice is randomly selected and locked for 24 hours to encourage daily reflection and prevent refresh abuse.

## Features

- **Daily Practice Rotation**: One practice per day, randomly selected from 101 good practices
- **24-Hour Lock**: Practice remains the same for 24 hours, preventing refresh abuse
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Minimal Design**: Clean, distraction-free interface with elegant serif typography
- **Client-Side Only**: No backend required, runs entirely in the browser
- **Persistent Storage**: Uses localStorage to remember your practice and theme preference

## Running Locally

Simply open `index.html` in your web browser. No build process or server required.

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (optional)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment to Azure Static Web Apps

### Prerequisites
- Azure account
- GitHub repository

### Steps

1. **Create Azure Static Web App**:
   - Go to Azure Portal
   - Create a new Static Web App resource
   - Connect to your GitHub repository
   - Set the build configuration:
     - App location: `/`
     - Output location: `` (leave empty)
     - No build command needed

2. **Automatic Deployment**:
   - Azure automatically deploys on push to main branch
   - No build process required (static files only)

3. **Configuration**:
   - The `staticwebapp.config.json` file contains routing and security headers
   - Routes are configured to serve `index.html` as the default document

## Project Structure

```
/
├── index.html                  # Main HTML file
├── styles.css                  # Styling with theme support
├── app.js                      # Application logic
├── practices.js                # 101 good practices data
├── staticwebapp.config.json    # Azure Static Web Apps configuration
├── .gitignore                  # Git ignore file
├── README.md                   # This file
├── CLAUDE.md                   # Developer guidance
└── 101 Good Practices.md       # Source data
```

## How It Works

### Practice Selection
- On first visit or after 24 hours: generates a new random practice
- Stores the practice index and timestamp in localStorage
- Prevents changing practice by refreshing the page

### Theme System
- Detects system preference (`prefers-color-scheme`)
- Allows manual toggle between light and dark modes
- Remembers user preference in localStorage
- Priority: User preference > System preference > Default (light)

### localStorage Schema
```javascript
{
  "dailyPractice": {
    "index": 42,                    // Practice index (0-100)
    "timestamp": 1704067200000      // Unix timestamp
  },
  "theme": "dark"                   // "light" or "dark"
}
```

## Technologies

- Vanilla HTML/CSS/JavaScript
- ES6 Modules
- localStorage API
- CSS Custom Properties for theming
- No build tools or dependencies

## License

MIT License - Copyright (c) 2025 Matteo Costa
