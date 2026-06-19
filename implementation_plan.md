# Geolocalized Media Map Viewer

This project aims to create a client-side only web application using React, Leaflet, and Tailwind CSS to visualize geolocalized photos and videos on an interactive map.

## Proposed Architecture

- **Framework**: React with Vite (fast, modern build tool).
- **Styling**: Tailwind CSS for rapid, modern, and responsive styling.
- **Mapping**: `leaflet` and `react-leaflet`.
- **Clustering**: `react-leaflet-cluster` (wraps `Leaflet.markercluster`).
- **EXIF Extraction**: `exifreader` for reading metadata directly in the browser.
- **Geocoding**: OpenStreetMap Nominatim API for the region/city search.

## Component Structure

1. **`App`**: Main container, holds the shared state (media files, active filters, map center).
2. **`Sidebar`**: Left panel for controls.
   - **`MediaUploader`**: Directory input for selecting media.
   - **`Filters`**: Date range picker and location search input.
   - **`MediaPreview`**: A gallery or list showing the currently selected/filtered media.
3. **`MapContainer`**: The Leaflet map component.
   - **`MarkerClusterGroup`**: Handles clustering of numerous media markers.
   - **`MediaMarker`**: Individual markers for each photo/video, containing a popup with media preview and date.

## Data Flow & Processing

1. **File Selection**: User selects a directory using `<input type="file" webkitdirectory />`.
2. **EXIF Parsing**: For each file, we read the first few kilobytes to extract EXIF data (Latitude, Longitude, DateTimeOriginal) using `exifreader`.
3. **Object URLs**: To display media locally without a backend, we use `URL.createObjectURL(file)`. *Note: We need to manage memory by revoking these URLs when no longer needed, though for a single-session client app, the browser will clean up on reload.*
4. **Filtering**: The media list is filtered based on the date range. If a location is searched, Nominatim API will be used to get bounding box coordinates, and the map will pan/zoom to that area.

## User Review Required

> [!WARNING]
> **Performance with large folders**: Reading EXIF from thousands of local files in the browser can be CPU intensive. I will implement a chunked/async processing approach, but the browser may still take some time to process very large directories (e.g., > 1000 images).

> [!IMPORTANT]
> **Video EXIF**: EXIF data in videos (MP4, MOV) can be inconsistent. `exifreader` has some support, but GPS extraction from videos might be less reliable than JPEG/HEIC images.

> [!NOTE]
> **Tailwind CSS**: As requested, I will use Tailwind CSS. I plan to use `lucide-react` for beautiful iconography and a clean, modern dark mode by default for better photo visualization.

## Open Questions

1. **Date Picker**: Do you prefer a custom UI for the date range picker, or is a standard HTML5 `<input type="date">` sufficient for a start?
2. **Video Playback**: Should the videos play automatically in the map popups, or only when the user clicks on them?
3. **Thumbnail Generation**: For performance, loading full-resolution images into map popups can be slow. I will try to use the EXIF thumbnail if available, otherwise fallback to the full image resized via CSS. Is this acceptable?

## Proposed Changes

### Setup Phase
- Initialize Vite + React project.
- Install and configure Tailwind CSS.
- Install dependencies: `leaflet`, `react-leaflet`, `exifreader`, `react-leaflet-cluster`, `lucide-react`, `date-fns`.

### Implementation Phase
- Create the layout (Map + Sidebar).
- Implement the EXIF extraction logic.
- Implement the map with clustering.
- Integrate the location search with Nominatim.

## Verification Plan

- Select a local folder containing various JPEGs (with and without GPS data).
- Verify that only GPS-tagged photos appear on the map.
- Test clustering by zooming in and out.
- Test date filtering to ensure markers disappear/appear correctly.
- Test location search to verify map panning.
