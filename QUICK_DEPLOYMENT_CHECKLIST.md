# 🚀 Quick Deployment Checklist

## Before You Start
- [ ] GitHub account (free at github.com)
- [ ] Vercel account (free at vercel.com) - connect with GitHub
- [ ] Render account (free at render.com) - connect with GitHub
- [ ] Gmail app-specific password (if using Gmail)

---

## 📋 Step-by-Step Deployment

### 1️⃣ Prepare Local Project
```bash
cd e:\my-projects\ceylonix-website
# Run setup script (Windows)
setup-deployment.bat
# Or on Mac/Linux:
bash setup-deployment.sh
```

### 2️⃣ Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ceylonix-website`
3. Select **Public**
4. Click "Create repository"
5. Copy the commands shown (don't initialize with README)

### 3️⃣ Push Code to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/ceylonix-website.git
git branch -M main
git push -u origin main
```

### 4️⃣ Deploy Backend to Render

1. **Go to** [render.com](https://render.com)
2. **Sign up** with GitHub
3. **New +** → **Web Service**
4. **Connect repository** → Select `ceylonix-website`

**Configure:**
- **Name:** `ceylonix-api`
- **Root Directory:** `ceylonix-backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Region:** Choose closest to you

**Add Environment Variables:**
- `FRONTEND_URL` = Your Vercel URL (add after frontend deployment)
- `EMAIL_USER` = your-email@gmail.com
- `EMAIL_PASSWORD` = Your 16-char Gmail app password
- `EMAIL_RECIPIENT` = your-email@gmail.com
- `PORT` = 5000

5. Click **Create Web Service**
6. **Get your Backend URL:** (e.g., `https://ceylonix-api.onrender.com`)

### 5️⃣ Deploy Frontend to Vercel

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign up** with GitHub
3. **Import Project**
4. **Select** `ceylonix-website` repository

**Vercel Auto-Detects:**
- Framework: Create React App ✅
- Build Command: `npm run build` ✅
- Output Directory: `build` ✅

**Add Environment Variables:**
```
REACT_APP_API_BASE_URL = https://ceylonix-api.onrender.com/api
```

5. Click **Deploy**
6. **Get your Frontend URL:** (e.g., `https://ceylonix-website.vercel.app`)

### 6️⃣ Update Backend CORS

1. Go to Render dashboard
2. Select `ceylonix-api` service
3. **Environment** tab
4. Update `FRONTEND_URL` with your Vercel URL:
   ```
   https://ceylonix-website.vercel.app
   ```
5. **Deploy** changes

---

## ✅ Testing Checklist

- [ ] Frontend loads at `https://ceylonix-website.vercel.app`
- [ ] Contact form works and sends emails
- [ ] Booking form works and saves data
- [ ] Backend health check: `https://ceylonix-api.onrender.com/api/health` (returns JSON)
- [ ] No CORS errors in browser console

---

## 🆘 Troubleshooting

### Emails Not Sending
- **Check:** Is your Gmail app password correct?
- **Fix:** Get new app password from [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- **Enable:** 2-Step Verification first (required for app passwords)

### Frontend Can't Reach Backend (CORS Error)
- **Check:** Is `FRONTEND_URL` set correctly in Render?
- **Check:** Is `REACT_APP_API_BASE_URL` set correctly in Vercel?
- **Fix:** Make sure URLs don't have trailing `/`

### Backend Takes 30+ Seconds to Respond
- **Reason:** Free Render tier sleeps after 15 min inactivity
- **Solution:** First request wakes it up (cold start)

### Build Fails on Render
- **Check:** Is `Root Directory` set to `ceylonix-backend`?
- **Check:** Is `Start Command` set to `node server.js`?
- **View:** Logs in Render dashboard for error details

---

## 📊 Deployment Summary

| Component | Service | Price | URL |
|-----------|---------|-------|-----|
| Frontend (React) | Vercel | Free | `ceylonix-website.vercel.app` |
| Backend (Node) | Render | Free | `ceylonix-api.onrender.com` |
| Version Control | GitHub | Free | `github.com/you/ceylonix-website` |
| **Total Cost** | **FREE** | **✅** | **Live** |

---

## 🎯 Next Level (Optional)

- **Custom Domain:** Add domain to Vercel (`ceylonix.lk`)
- **Database:** Upgrade from JSON to MongoDB (free tier at mongodb.com)
- **Analytics:** Add Vercel Analytics
- **CI/CD:** Auto-deploy on git push (already enabled!)
- **Monitoring:** Set up error tracking with Sentry

---

## 📝 Important Notes

⚠️ **Never commit .env file!**
- `ceylonix-backend/.env` is in `.gitignore`
- Always add secrets via hosting service settings
- Use `.env.example` as template

✅ **Environment Variables are Secure**
- Stored encrypted on Render/Vercel
- Never exposed in source code
- Different values per environment (dev/prod)

---

## 🎓 Learning Resources

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [GitHub Desktop](https://desktop.github.com/) - Easier than command line
- [How to Deploy React + Node Apps](https://www.youtube.com/results?search_query=deploy+react+node+app+2024)

---

**Questions?** Re-read the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) file in detail!
