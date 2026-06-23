# Weather App

A simple web app that shows current weather conditions and a forecast for any location, built with vanilla JavaScript, HTML, and CSS, bundled with Webpack.

## Features

- 🌡️ Current weather conditions for any city or location
- 📅 Multi-day weather forecast
- 🎨 Custom weather icons for different conditions
- ⚡ Fast, lightweight, no frontend framework overhead

## Tech Stack

- **JavaScript** (ES Modules)
- **HTML & CSS**
- **Webpack** — bundling and dev server
- **[date-fns](https://date-fns.org/)** — date formatting and manipulation
- **[Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)** — weather data source

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (includes npm)
- A free API key from [Visual Crossing](https://www.visualcrossing.com/weather-api)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ehab-walid/weather-app.git
   cd weather-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Add your Visual Crossing API key (see [Configuration](#configuration) below)

### Running locally

Start the development server:

```bash
npm run dev
```

This launches Webpack's dev server and opens the app in your browser, rebuilding automatically as you make changes.

### Building for production

```bash
npm run build
```

This bundles the app into the `dist` folder, ready to deploy.

### Deploying

```bash
npm run deploy
```

This pushes the contents of `dist` to the `gh-pages` branch via `git subtree`, publishing the app on GitHub Pages.

## Configuration

The app needs a Visual Crossing API key to fetch weather data. Sign up for a free key at [visualcrossing.com](https://www.visualcrossing.com/weather-api), then add it wherever the app expects it (e.g. as a constant in your API request file, or as an environment variable, depending on how it's wired up in `src`).

> ⚠️ Avoid committing your API key to version control. Consider using a `.env` file or a local config file excluded via `.gitignore`.

## Project Structure

```
weather-app/
├── images/
│   └── weather-icons/   # Icon assets for weather conditions
├── src/                 # Application source code
├── webpack.common.js    # Shared Webpack config
├── webpack.dev.js       # Development config
├── webpack.prod.js      # Production config
└── package.json
```

## License

ISC