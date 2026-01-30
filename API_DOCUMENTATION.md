# Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

## Portfolio Endpoints

### Get All Portfolio Items

```
GET /portfolio
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "embed",
      "title": "Wedding Ceremony",
      "category": "wedding",
      "image": "",
      "thumbnailImage": "https://images.unsplash.com/...",
      "platform": "instagram",
      "embedUrl": "https://www.instagram.com/p/ABC123/",
      "isEmbed": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

### Get Single Portfolio Item

```
GET /portfolio/:id
```

**Response:**
```json
{
  "success": true,
  "data": { /* item object */ }
}
```

### Create Portfolio Item

```
POST /portfolio
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My Portfolio Item",
  "category": "photography",
  "embedUrl": "https://www.instagram.com/p/ABC123/",
  "platform": "instagram",
  "thumbnailImage": "https://images.unsplash.com/...",
  "isEmbed": true,
  "type": "embed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio item created",
  "data": { /* created item */ }
}
```

### Update Portfolio Item

```
PUT /portfolio/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "category": "wedding",
  "embedUrl": "https://www.instagram.com/p/XYZ789/",
  "platform": "facebook",
  "thumbnailImage": "https://images.unsplash.com/..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio item updated",
  "data": { /* updated item */ }
}
```

### Delete Portfolio Item

```
DELETE /portfolio/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio item deleted",
  "data": { /* deleted item */ }
}
```

---

## Testimonials Endpoints

### Get All Testimonials

```
GET /testimonials
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "role": "Client",
      "text": "Amazing photography services!",
      "rating": 5,
      "approved": true,
      "createdAt": "2024-01-10T15:20:00Z"
    }
  ]
}
```

### Get Single Testimonial

```
GET /testimonials/:id
```

### Create Testimonial

```
POST /testimonials
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "role": "Wedding Client",
  "text": "Professional and talented photographer!",
  "rating": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Testimonial created",
  "data": { /* created testimonial */ }
}
```

### Update Testimonial

```
PUT /testimonials/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "role": "Wedding Client",
  "text": "Updated testimonial text",
  "rating": 5,
  "approved": true
}
```

### Delete Testimonial

```
DELETE /testimonials/:id
```

### Approve Testimonial

```
PUT /testimonials/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "approved": true
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Title is required"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Portfolio item not found"
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Error creating portfolio item",
  "error": "Error details..."
}
```

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (Admin App)
- `http://localhost:3001` (Frontend Website)
- `http://localhost:5000` (Backend)

To add more origins, edit `ceylonix-backend/server.js`:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'],
  credentials: true
};

app.use(cors(corsOptions));
```

---

## Data Storage

All data is stored in JSON files in `ceylonix-backend/data/`:

- `portfolio.json` - Portfolio items
- `testimonials.json` - Testimonials
- `bookings.json` - Booking submissions
- `contacts.json` - Contact form submissions

Each file is automatically created if it doesn't exist.

---

## Testing API Endpoints

### Using cURL

```bash
# Get all portfolio items
curl http://localhost:5000/api/portfolio

# Add new portfolio item
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Item",
    "category": "photography",
    "embedUrl": "https://example.com",
    "platform": "instagram"
  }'

# Update portfolio item
curl -X PUT http://localhost:5000/api/portfolio/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete portfolio item
curl -X DELETE http://localhost:5000/api/portfolio/1
```

### Using Postman

1. Import these endpoints into Postman
2. Set base URL to `http://localhost:5000/api`
3. Test each endpoint

### Using JavaScript/Fetch API

```javascript
// Get all portfolio items
fetch('http://localhost:5000/api/portfolio')
  .then(res => res.json())
  .then(data => console.log(data));

// Create new portfolio item
fetch('http://localhost:5000/api/portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Item',
    category: 'photography',
    embedUrl: 'https://...',
    platform: 'instagram'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Frontend Integration

The frontend should make API calls to fetch portfolio and testimonials:

```javascript
// In src/components/sections/Portfolio.js
useEffect(() => {
  fetch('http://localhost:5000/api/portfolio')
    .then(res => res.json())
    .then(data => setPortfolioItems(data.data || []))
    .catch(err => console.error(err));
}, []);

// In src/components/sections/Testimonials.js
useEffect(() => {
  fetch('http://localhost:5000/api/testimonials')
    .then(res => res.json())
    .then(data => {
      const approved = data.data.filter(t => t.approved);
      setTestimonials(approved);
    })
    .catch(err => console.error(err));
}, []);
```

---

## Troubleshooting

### Port 5000 Already in Use

```bash
# Find what's using port 5000
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000

# Kill the process:
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### CORS Errors

Make sure your frontend is running on a whitelisted origin. Add your URL to the `corsOptions` in server.js if needed.

### 404 on API Calls

1. Check backend is running: `http://localhost:5000/api/portfolio`
2. Verify routes are loaded in server.js
3. Check data files exist in `ceylonix-backend/data/`

---

## Future Enhancements

- [ ] Add database (MongoDB/PostgreSQL) instead of JSON files
- [ ] Add image upload endpoint
- [ ] Add authentication/API keys
- [ ] Add rate limiting
- [ ] Add caching layer (Redis)
- [ ] Add logging system
- [ ] Add backup system

