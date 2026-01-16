# Deployment Guide for Ceylonix Website

## Overview
This project consists of:
- **Frontend**: React app (port 3000 locally)
- **Backend**: Express.js server (port 5000 locally)

We'll deploy them to free services using GitHub.

---

## Step 1: Initialize Git Repository

If not already initialized:
```bash
cd e:\my-projects\ceylonix-website
git init
git add .
git commit -m "Initial commit"
```

---

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click **New Repository**
3. Name it: `ceylonix-website`
4. Choose **Public** (recommended for free tier)
5. Click **Create Repository**
6. Follow instructions to push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ceylonix-website.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub (easier)
- Click **New +** → **Web Service**

### 3.2 Configure Backend
- **Name**: `ceylonix-api`
- **Root Directory**: `ceylonix-backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Environment Variables** (from your `.env` file):
  - `EMAIL_USER`: Your email
  - `EMAIL_PASSWORD`: Your email password/app-specific password
  - `EMAIL_RECIPIENT`: Recipient email
  - `GMAIL_APP_PASSWORD`: If using Gmail

### 3.3 Get Your Backend URL
After deployment, you'll get a URL like:
`https://ceylonix-api.onrender.com`

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub
- Click **Import Project**
- Select `ceylonix-website` repository

### 4.2 Configure Frontend
- **Framework**: Create React App
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 4.3 Environment Variables
Add in Vercel project settings:
```
REACT_APP_API_BASE_URL=https://ceylonix-api.onrender.com/api
```

Then update `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
```

---

## Step 5: Update API URLs

### Update Backend
In `ceylonix-backend/server.js`, update CORS:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-vercel-url.vercel.app'
];
```

### Update Frontend
In `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
```

---

## Step 6: Important Notes

### For Gmail Email Functionality
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Generate an app-specific password
3. Use this password (not your regular password) in EMAIL_PASSWORD

### Environment Variables Security
- Never commit `.env` file (already in .gitignore)
- Always add sensitive data in hosting service settings

### Database
- Currently using JSON files in `ceylonix-backend/data/`
- For production, consider upgrading to MongoDB or another database

---

## Step 7: Verify Deployment

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Test the contact form → should email you
3. Test the booking form → should save and email
4. Check backend health: `https://ceylonix-api.onrender.com/api/health`

---

## Troubleshooting

### Emails not sending
- Check `.env` variables on Render
- Verify Gmail app-specific password
- Check email provider's app security settings

### Frontend can't reach backend
- Verify backend URL in Vercel env variables
- Check CORS settings in `server.js`
- Ensure Render backend is awake (might take 30s on first request)

### Slow backend response
- Free tier services sleep after 15 mins of inactivity
- First request will be slow (cold start)

---

## Next Steps (Optional Upgrades)

1. **Custom Domain**: Point domain to Vercel
2. **Upgrade Storage**: Move from JSON to MongoDB (free tier available)
3. **Email Service**: Use SendGrid or Mailgun instead of Nodemailer
4. **Analytics**: Add Vercel Analytics or Plausible
