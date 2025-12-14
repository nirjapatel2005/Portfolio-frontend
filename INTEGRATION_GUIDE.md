# Portfolio Frontend - Backend Integration Guide

## Overview

The Portfolio Frontend is now fully connected to the Portfolio CMS Backend with real-time updates via WebSocket.

## Configuration

### Environment Variables

Create a `.env` file in `Portfolio-frontend/` with:

```
VITE_API_URL=http://localhost:5000
```

If not set, it defaults to `http://localhost:5000`.

### Backend Setup

1. Ensure the backend is running on port 5000 (or configure via `PORT` env variable)
2. Backend CORS is configured to allow requests from:
   - `http://localhost:3000` (Portfolio frontend)
   - `http://localhost:5173` (Admin panel)
   - Other configured origins

## API Endpoints

All endpoints use the `/api` prefix:

- **About**: `GET /api/about`
- **Skills**: `GET /api/skills`
- **Projects**: `GET /api/projects`
- **Blogs**: `GET /api/blogs`
- **Experience**: `GET /api/experience`
- **Testimonials**: `GET /api/testimonials`
- **Services**: `GET /api/services`

## Data Structure Mapping

### Projects
- Backend: `coverImage`, `tech`, `shortDescription`, `link`, `repo`
- Frontend displays: Cover image, technologies, description, links

### Blogs
- Backend: `coverImage`, `excerpt`, `tags`, `published`, `publishedAt`
- Frontend: Only shows published blogs with cover images and tags

### Skills
- Backend: `name`, `level`, `category`
- Frontend: Grouped by category with progress bars

### Experience
- Backend: `title`, `company`, `startDate`, `endDate`, `description`, `technologies`
- Frontend: Timeline view with technologies

### Testimonials
- Backend: `name`, `role`, `text`, `avatar`
- Frontend: Card layout with avatar

### Services
- Backend: `title`, `description`, `icon`
- Frontend: Grid layout with icons

### About
- Backend: `title`, `description`, `image`, `skills`, `highlights`
- Frontend: Full about section with image and highlights

## Real-Time Updates

All pages are configured with real-time updates enabled:

- **WebSocket Connection**: Automatically connects when pages load
- **Update Triggers**: Listens to `count-update` events from backend
- **Auto-Refresh**: Pages automatically refetch data when changes occur in admin panel
- **No Refresh Needed**: Data updates without page refresh

### How It Works

1. Admin makes changes in Portfolio-Admin dashboard
2. Backend emits `count-update` event via WebSocket
3. Frontend pages listening to that model receive the event
4. Pages automatically refetch data
5. UI updates with new data

## Pages Updated

All pages have been updated to:

✅ Use correct backend endpoints (`/api` prefix)
✅ Handle paginated responses (`{ items, total }` or array)
✅ Map backend field names correctly
✅ Display data with proper formatting
✅ Enable real-time updates
✅ Show loading and error states

## Testing

1. Start the backend:
   ```bash
   cd Portfolio-Cms-backend/backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd Portfolio-frontend
   npm run dev
   ```

3. Test real-time updates:
   - Open frontend in browser
   - Open admin panel in another tab
   - Make changes in admin panel
   - Watch frontend update automatically

## Troubleshooting

### Data Not Loading
- Check that `VITE_API_URL` is set correctly
- Verify backend is running
- Check browser console for API errors
- Verify CORS is configured correctly

### Real-Time Not Working
- Check WebSocket connection in browser console
- Verify Socket.io is installed in both frontend and backend
- Check that backend WebSocket server is running
- Look for connection errors in console

### Wrong Data Displayed
- Check backend response structure in Network tab
- Verify field mappings in page components
- Check if data is paginated (`items` array) or direct array

## Features

- ✅ Real-time data updates via WebSocket
- ✅ Automatic data refresh on changes
- ✅ Proper error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Field mapping for backend data structure

