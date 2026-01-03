# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Permakultur website for Open-Kirrberg, built with Docusaurus 3.3.2. A German-language permaculture documentation site featuring interactive maps, tree tracking, event calendars, and plant wikis.

## Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm run serve      # Serve production build locally
npm run typecheck  # Run TypeScript type checking
npm run clear      # Clear Docusaurus cache
```

## Architecture

### Content Structure (Multiple Docs Plugins)

The site uses multiple `content-docs` plugin instances, each with its own sidebar:

- **`/areas`** - Flächen (land areas/plots documentation) - `areas/` directory
- **`/wiki`** - Plant encyclopedia with categories (baume, beeren) - `wiki/` directory
- **`/baumschule`** - Tree nursery documentation - `baumschule/` directory
- **`/blog`** - Blog posts (standard Docusaurus blog)

### Custom Components (`src/components/`)

**Map System** (`src/components/Map/`):
- `index.tsx` - Main Leaflet map with OpenStreetMap/satellite layers
- Uses proj4 for EPSG:25832 to WGS84 coordinate conversion
- GeoJSON areas loaded from `data/*.json` files with coordinate transformation
- Sub-components: `TreeTracking`, `TreeLoader`, `CreateTree`, `DistanceMeasurementTool`, `UserLocationControl`

**ScionList** (`src/components/ScionList.tsx`):
- Displays searchable table of scion/grafting wood data
- Aggregates fruit data from `data/*.json` (apfel, birne, kirsche, mirabelle, pflaumen, pfirsiche)

**EventCalendar** (`src/components/EventCalendar.tsx`):
- React calendar showing events from `src/events/*.json` files

### Data Files

- **`data/*.json`** - Fruit tree variety data (apfel, birne, kirsche, etc.) used by ScionList
- **`src/data/*.json`** - GeoJSON files (2900, 2901, 2902-4) in EPSG:25832 for map areas
- **`src/events/*.json`** - Event data for the calendar

### Key Dependencies

- Leaflet + proj4 + proj4leaflet for mapping
- react-calendar for events display
- Standard Docusaurus preset-classic

### Build Configuration

- `baseUrl` switches between `/perma/` (production) and `/` (local development) based on `NODE_ENV`
- Deployed to GitHub Pages under Open-Kirrberg organization
