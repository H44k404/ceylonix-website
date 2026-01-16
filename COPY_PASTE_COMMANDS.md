# 🚀 DEPLOYMENT COMMANDS - COPY & PASTE READY

## Step 1: Initialize Git Locally

If not already initialized:
```bash
cd e:\my-projects\ceylonix-website
git init
```

---

## Step 2: Create GitHub Repo (Web)

Go to: https://github.com/new
- Name: `ceylonix-website`
- Public: YES
- Create repository (don't initialize with README)

---

## Step 3: Add Remote and Push

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ceylonix-website.git
git branch -M main
git add .
git commit -m "Deploy-ready: Full stack app with validation and alerts"
git push -u origin main
```

---

## Step 4: Deploy Backend to Render

**Visit:** https://render.com

**Steps:**
1. Sign in with GitHub
2. Click "New +"
3. Select "Web Service"
4. Select `ceylonix-website` repo
5. Fill in:
   - Name: `ceylonix-api`
   - Root Directory: `ceylonix-backend`
   - Runtime: `Node`
   - Build: `npm install`
   - Start: `node server.js`

6. Click "Create Web Service"
7. **WAIT** - Deployment takes 2-5 minutes
8. Copy your **Backend URL** (looks like: https://ceylonix-api.onrender.com)

---

## Step 5: Configure Backend Environment Variables

While on Render dashboard:
1. Go to your `ceylonix-api` service
2. Click "Environment" tab
3. Add these variables:
   - `EMAIL_USER` = your-email@gmail.com
   - `EMAIL_PASSWORD` = your-app-password (from Gmail)
   - `EMAIL_RECIPIENT` = your-email@gmail.com
   - `FRONTEND_URL` = (you'll update this after Vercel deploy)
   - `PORT` = 5000

---

## Step 6: Deploy Frontend to Vercel

**Visit:** https://vercel.com

**Steps:**
1. Sign in with GitHub
2. Click "Import Project"
3. Find and select `ceylonix-website`
4. Click "Import"

**Vercel Auto-Detects Everything:**
- Framework: Create React App ✅
- Build: npm run build ✅
- Output: build ✅

5. Click "Deploy"
6. **WAIT** - Deployment takes 2-3 minutes
7. Copy your **Frontend URL** (looks like: https://ceylonix-website.vercel.app)

---

## Step 7: Add Frontend URL to Backend Environment

Back on Render:
1. Go to your `ceylonix-api` service
2. Edit Environment Variable: `FRONTEND_URL`
3. Set to: `https://ceylonix-website.vercel.app` (your Vercel URL)
4. Save & Redeploy

---

## Step 8: Configure Frontend Environment

Back on Vercel:
1. Go to your `ceylonix-website` project
2. Click "Settings"
3. Go to "Environment Variables"
4. Add:
   - **Name:** `REACT_APP_API_BASE_URL`
   - **Value:** `https://ceylonix-api.onrender.com/api` (your Render URL)
5. Redeploy (Vercel should auto-redeploy, or click "Deployments" → "Redeploy")

---

## Step 9: Test Everything

### Frontend Test
- Visit your Vercel URL
- Should see your website ✅

### Backend Health Check
- Visit: `https://ceylonix-api.onrender.com/api/health`
- Should return JSON with success: true ✅

### Contact Form Test
- Fill contact form
- Submit
- Check your email ✅

### Booking Form Test
- Fill booking form
- Submit
- Check your email ✅
- Check Render dashboard logs for confirmation ✅

---

## ✅ YOU'RE LIVE!

Your website is now deployed and live!

- **Frontend URL:** https://ceylonix-website.vercel.app (or your custom domain)
- **Backend URL:** https://ceylonix-api.onrender.com (hidden, not shared)
- **Repository:** https://github.com/YOUR_USERNAME/ceylonix-website

---

## 🔍 Verify Everything Works

```
✓ Can you see the website?
✓ Does the contact form load?
✓ Does the booking form load?
✓ Can you submit contact form?
✓ Do you receive emails?
✓ Can you submit booking form?
✓ Do you receive booking emails?
✓ No errors in browser console? (F12)
✓ Backend health endpoint works?
```

All ✓? You're done! 🎉

---

## 🆘 If Something Fails

**Check these in order:**

1. **Email not sending?**
   - Verify EMAIL_PASSWORD in Render settings
   - Is it 16-character app password? (not your regular password)
   - Did you enable 2-Step Verification on Gmail?

2. **CORS error?**
   - Check REACT_APP_API_BASE_URL in Vercel settings
   - Check FRONTEND_URL in Render settings
   - Make sure URLs have no trailing `/`

3. **Backend slow (30+ seconds)?**
   - Free Render sleeps after 15 mins
   - First request wakes it (normal)

4. **Build failed?**
   - Check Root Directory = ceylonix-backend (Render)
   - Check Start Command = node server.js (Render)
   - View logs in dashboard

---

## 📝 Gmail App Password Setup (Required!)

1. Go to: https://myaccount.google.com/apppasswords
2. If button not available:
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"
   - Come back to app passwords

3. Select Mail & Windows Computer
4. Google gives you 16-character password
5. Copy it (with spaces)
6. Add to Render as EMAIL_PASSWORD

⚠️ DO NOT use your regular Gmail password!

---

## 🎯 Summary

| What | URL | Cost |
|------|-----|------|
| Frontend | Your Vercel URL | FREE |
| Backend | Your Render URL | FREE |
| Repository | Your GitHub URL | FREE |
| **Total** | **LIVE** | **$0** |

---

**Need help?** Read: [QUICK_DEPLOYMENT_CHECKLIST.md](./QUICK_DEPLOYMENT_CHECKLIST.md)

**Have questions?** Read: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Confused?** Read: [GETTING_STARTED.md](./GETTING_STARTED.md)
