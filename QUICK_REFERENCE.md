# 🎯 QUICK REFERENCE CARD

## FREE HOSTING SERVICES

```
┌────────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                 BACKEND (Node.js)             │
│ ┌──────────────────────────┐     ┌──────────────────────────┐  │
│ │ Vercel                   │     │ Render                   │  │
│ │ https://vercel.com       │     │ https://render.com       │  │
│ │                          │     │                          │  │
│ │ ✅ FREE TIER             │     │ ✅ FREE TIER             │  │
│ │ ✅ Auto-deploy from Git  │     │ ✅ Auto-deploy from Git  │  │
│ │ ✅ Custom domains        │     │ ✅ Cron jobs            │  │
│ │ ✅ Analytics included    │     │ ✅ 750 hours/month      │  │
│ │                          │     │                          │  │
│ │ Competitors:             │     │ Competitors:             │  │
│ │ - Netlify                │     │ - Railway                │  │
│ │ - GitHub Pages           │     │ - Heroku (now paid)      │  │
│ │ - Cloudflare Pages       │     │ - Fly.io                 │  │
│ └──────────────────────────┘     └──────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

---

## DEPLOYMENT COMMANDS CHEAT SHEET

```bash
# GitHub Setup
git remote add origin https://github.com/USERNAME/ceylonix-website.git
git branch -M main
git push -u origin main

# Environment Variables
FRONTEND:
  REACT_APP_API_BASE_URL=https://ceylonix-api.onrender.com/api

BACKEND:
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASSWORD=app-specific-password
  EMAIL_RECIPIENT=your-email@gmail.com
  FRONTEND_URL=https://ceylonix-website.vercel.app
  PORT=5000
```

---

## FREE TIER LIMITS & BENEFITS

```
┌─────────────────────────────────────────────────────────────┐
│ Vercel FREE                    Render FREE                  │
│                                                              │
│ • Unlimited projects           • 1 free web service         │
│ • Unlimited bandwidth          • 750 hours/month compute    │
│ • Auto HTTPS                   • Auto HTTPS                 │
│ • Automatic deployments        • Automatic deployments      │
│ • 1 concurrent build           • 1 concurrent build         │
│ • 100GB bandwidth              • 100GB/month bandwidth      │
│ • Perfect for startups         • Perfect for API servers    │
│                                                              │
│ Upgrade when you need:          Upgrade when you need:      │
│ • Custom domains               • Always-on (never sleep)    │
│ • Edge functions               • Private services           │
│ • More concurrent builds       • More compute resources     │
└─────────────────────────────────────────────────────────────┘
```

---

## TYPICAL DEPLOYMENT FLOW

```
1. CODE ON YOUR COMPUTER
   ↓
2. PUSH TO GITHUB
   git push origin main
   ↓
3. VERCEL DETECTS CHANGE
   → Auto-builds React
   → Deploys to https://yourapp.vercel.app
   ↓
4. RENDER DETECTS CHANGE
   → Auto-builds Node
   → Deploys to https://yourapi.onrender.com
   ↓
5. FRONTEND CONNECTS TO BACKEND
   Form submission → API Call → Render server
   ↓
6. USERS SEE LIVE CHANGES
```

---

## COMMON ERRORS & FIXES

```
ERROR                           SOLUTION
─────────────────────────────────────────────────────────────
"CORS error"                    Check FRONTEND_URL in Render
                                Check API URL in Vercel

"Email not sending"             Verify app-specific password
                                Enable 2-Step on Gmail

"Slow backend"                  Free tier sleeps (normal)
                                First request wakes it up

"Build fails"                   Check Root Directory setting
                                View logs in dashboard

"Can't reach backend"           Verify URL in env variable
                                Check backend is deployed
```

---

## FILE STRUCTURE YOU NEED

```
ceylonix-website/
├── .env ..................... (NOT committed ✗)
├── .env.example ............. (FOR REFERENCE ✓)
├── .gitignore ............... (HAS .env ✓)
├── .git/ .................... (Your repo ✓)
├── src/ ..................... (Frontend)
├── ceylonix-backend/ ........ (Backend)
│   ├── server.js
│   ├── .env ................. (NOT committed ✗)
│   └── .env.example ......... (FOR REFERENCE ✓)
├── DEPLOYMENT_GUIDE.md ...... (Read me!)
├── QUICK_DEPLOYMENT_CHECKLIST.md (Start here!)
└── GETTING_STARTED.md ....... (Overview)
```

---

## GITHUB REPOSITORY SETUP

```
1. Go to https://github.com/new
2. Repository name: ceylonix-website
3. Select: PUBLIC
4. ❌ DO NOT init with README/gitignore
5. Click "Create repository"
6. Follow the commands shown:
   git remote add origin ...
   git branch -M main
   git push -u origin main
```

---

## VERCEL DEPLOYMENT

```
1. Go to https://vercel.com
2. Sign in with GitHub
3. "Import Project"
4. Select: ceylonix-website
5. Project Settings:
   ✓ Framework: Create React App (auto-detected)
   ✓ Build: npm run build (auto-detected)
   ✓ Output: build (auto-detected)
6. Add Environment Variable:
   Name: REACT_APP_API_BASE_URL
   Value: https://ceylonix-api.onrender.com/api
7. Click "Deploy"
```

---

## RENDER DEPLOYMENT

```
1. Go to https://render.com
2. Sign in with GitHub
3. "New +" → "Web Service"
4. Select: ceylonix-website repo
5. Service Settings:
   Name: ceylonix-api
   Root Directory: ceylonix-backend
   Runtime: Node
   Build: npm install
   Start: node server.js
6. Add Environment Variables:
   EMAIL_USER = ...
   EMAIL_PASSWORD = ...
   EMAIL_RECIPIENT = ...
   FRONTEND_URL = (add after Vercel deploy)
7. Click "Create Web Service"
```

---

## VERIFICATION CHECKLIST

```
After deployment, verify:

✓ Frontend loads at https://vercel-url.vercel.app
✓ No errors in browser console
✓ Contact form appears on page
✓ Booking form appears on page
✓ Can submit contact form
✓ Email arrives in inbox
✓ Can submit booking form
✓ Email arrives in inbox
✓ Data saves to backend
✓ No CORS errors in console
✓ API health: https://render-url.onrender.com/api/health
```

---

## ENVIRONMENT VARIABLE REFERENCE

```
FRONTEND (.env in root - local only)
──────────────────────────────────────
REACT_APP_API_BASE_URL = https://ceylonix-api.onrender.com/api

BACKEND (.env in ceylonix-backend/ - local only)
──────────────────────────────────────────────────
PORT = 5000
NODE_ENV = development
FRONTEND_URL = http://localhost:3000 (local)
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-16-char-app-password
EMAIL_RECIPIENT = recipient@gmail.com

PRODUCTION (Vercel settings)
────────────────────────────
REACT_APP_API_BASE_URL = https://ceylonix-api.onrender.com/api

PRODUCTION (Render settings)
────────────────────────────
PORT = 5000 (auto)
NODE_ENV = production (auto)
FRONTEND_URL = https://ceylonix-website.vercel.app
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-16-char-app-password
EMAIL_RECIPIENT = recipient@gmail.com
```

---

## GMAIL APP PASSWORD SETUP

```
1. Go to https://myaccount.google.com/apppasswords
2. If not available:
   → Go to https://myaccount.google.com/security
   → Enable "2-Step Verification"
   → Try app passwords again
3. Select: Mail / Windows Computer
4. Google generates 16-character password
5. Copy and use in .env as EMAIL_PASSWORD
6. DO NOT use your regular Gmail password!
```

---

## USEFUL LINKS

```
Accounts:
  GitHub: https://github.com
  Vercel: https://vercel.com
  Render: https://render.com
  Gmail App Password: https://myaccount.google.com/apppasswords

Documentation:
  This Project:
    → GETTING_STARTED.md
    → QUICK_DEPLOYMENT_CHECKLIST.md
    → DEPLOYMENT_GUIDE.md
    → ARCHITECTURE.md

  Vercel: https://vercel.com/docs
  Render: https://render.com/docs
  Node.js: https://nodejs.org/docs
```

---

## COST ANALYSIS

```
┌─────────────────────────────────┐
│ MONTHLY COST BREAKDOWN          │
├─────────────────────────────────┤
│ Frontend (Vercel)    $0         │
│ Backend (Render)     $0         │
│ Domain (optional)    ~$10-15    │
│ Email service (opt)  ~$0-20     │
├─────────────────────────────────┤
│ TOTAL FREE TIER      $0         │
│ With custom domain   ~$10-15    │
│ Professional setup   ~$30-50    │
└─────────────────────────────────┘
```

---

## NEXT LEVEL OPTIONS (When You Grow)

```
When you need more:

FRONTEND:
  → Custom domain on Vercel
  → Edge Functions (serverless)
  → Vercel Analytics
  → Faster builds

BACKEND:
  → Render paid tier (always-on)
  → Database upgrade (MongoDB)
  → Scheduled tasks
  → Private services

INFRASTRUCTURE:
  → Cloudflare CDN
  → SendGrid for emails
  → AWS S3 for images
  → Stripe for payments
```

---

**⭐ START WITH:** [QUICK_DEPLOYMENT_CHECKLIST.md](./QUICK_DEPLOYMENT_CHECKLIST.md)
