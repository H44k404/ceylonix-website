# 🔗 ALL LINKS & RESOURCES

## 🚀 DEPLOYMENT SERVICES (Sign Up First!)

### Essential Services (Create accounts in this order)
1. **GitHub** - Version Control
   - https://github.com/signup
   - Free account
   - Store your code

2. **Vercel** - Frontend Hosting
   - https://vercel.com
   - Sign up with GitHub
   - Deploy React apps

3. **Render** - Backend Hosting  
   - https://render.com
   - Sign up with GitHub
   - Deploy Node.js API

### Alternative Services (If you prefer)

**For Frontend:**
- Netlify: https://netlify.com
- GitHub Pages: https://pages.github.com
- Cloudflare Pages: https://pages.cloudflare.com

**For Backend:**
- Railway: https://railway.app
- Fly.io: https://fly.io
- Heroku: https://heroku.com (now paid)
- Replit: https://replit.com

---

## 📧 GMAIL SETUP (Required for Emails)

### Get Gmail App Password
1. **First: Enable 2-Step Verification**
   - https://myaccount.google.com/security
   - Select "2-Step Verification"
   - Follow setup process

2. **Then: Get App Password**
   - https://myaccount.google.com/apppasswords
   - Select "Mail"
   - Select "Windows Computer" (or your device)
   - Google generates 16-character password
   - Copy and save it (don't share!)

---

## 📚 OUR DOCUMENTATION (Read in This Order)

### For First-Time Deployers
1. **START_HERE.md** ← Begin here
   - Quick overview
   - Which guide to read

2. **GETTING_STARTED.md** ← Learn the basics
   - Project overview
   - Tech stack explanation
   - Learning path

3. **QUICK_DEPLOYMENT_CHECKLIST.md** ← Follow this
   - Step-by-step guide
   - Explanations included
   - ⭐ Most popular

4. **VISUAL_GUIDE.md** ← See it visually
   - Diagrams and flowcharts
   - Easy to understand

### For Quick Deployment
1. **COPY_PASTE_COMMANDS.md** ← Just commands
   - Copy and run commands
   - Minimal explanations
   - Fastest method

2. **QUICK_REFERENCE.md** ← Quick facts
   - Cheat sheets
   - Common issues
   - Environment variables

### For Complete Understanding
1. **DEPLOYMENT_GUIDE.md** ← Full details
   - Complete explanations
   - All options
   - Troubleshooting

2. **ARCHITECTURE.md** ← How it works
   - System diagrams
   - Data flow
   - Technical overview

### For Reference
1. **DOCUMENTATION_INDEX.md** ← Master guide
   - All documentation explained
   - Quick lookup

2. **DEPLOYMENT_SUMMARY.md** ← What's done
   - Summary of changes
   - What you get

3. **README.md** ← Project info
   - Local development
   - Tech stack
   - Project structure

---

## 🔧 SETUP SCRIPTS

### Windows Users
- **setup-deployment.bat**
  - Double-click to run
  - Initializes Git
  - Prepares for deployment

### Mac/Linux Users
- **setup-deployment.sh**
  - Run: `bash setup-deployment.sh`
  - Initializes Git
  - Prepares for deployment

---

## 💻 DEVELOPER TOOLS & COMMANDS

### Git Commands Reference
```bash
# Initialize (first time)
git init

# Add remote (push to GitHub)
git remote add origin https://github.com/USERNAME/ceylonix-website.git

# Create main branch
git branch -M main

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push -u origin main

# Pull latest
git pull origin main

# Check status
git status

# View logs
git log
```

### NPM Commands Reference
```bash
# Install dependencies
npm install

# Start development
npm start

# Build for production
npm run build

# Install specific package
npm install package-name

# Update all packages
npm update
```

### Deployment Test Commands
```bash
# Check if Git is installed
git --version

# Check Node.js version
node --version

# Check npm version
npm --version

# Test backend API
curl https://ceylonix-api.onrender.com/api/health
```

---

## 🌐 API ENDPOINTS (After Deployment)

### Health Check
```
GET https://ceylonix-api.onrender.com/api/health
```

### Contact Form
```
POST https://ceylonix-api.onrender.com/api/contact
Body: { name, email, message }
```

### Booking Form
```
POST https://ceylonix-api.onrender.com/api/booking
Body: { name, email, phone, serviceType, eventDate, ... }
```

---

## 📖 EXTERNAL DOCUMENTATION

### Framework Documentation
- **React Docs:** https://react.dev
- **Express.js Docs:** https://expressjs.com
- **Node.js Docs:** https://nodejs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Hosting Documentation
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **GitHub Docs:** https://docs.github.com

### Libraries Used
- **Lucide Icons:** https://lucide.dev
- **Nodemailer:** https://nodemailer.com
- **Express CORS:** https://expressjs.com/en/resources/middleware/cors.html
- **dotenv:** https://github.com/motdotla/dotenv

---

## 🎓 LEARNING RESOURCES

### Video Tutorials
- **Deploy React to Vercel:**
  - Search YouTube: "Deploy React Vercel 2024"

- **Deploy Node.js to Render:**
  - Search YouTube: "Deploy Node.js Render 2024"

- **Git & GitHub Basics:**
  - Search YouTube: "Git GitHub tutorial beginners"

- **CORS Explained:**
  - Search YouTube: "CORS explained simply"

### Interactive Learning
- **Git Interactive:** https://learngitbranching.js.org
- **Node.js Tutorial:** https://www.w3schools.com/nodejs/
- **React Tutorial:** https://react.dev/learn

### Community Help
- **Stack Overflow:** https://stackoverflow.com
- **GitHub Discussions:** https://github.com/discussions
- **Reddit r/webdev:** https://reddit.com/r/webdev

---

## 🆘 TROUBLESHOOTING LINKS

### Common Issues

**"Emails not sending"**
- Gmail 2-Step: https://support.google.com/accounts/answer/185839
- App Passwords: https://support.google.com/accounts/answer/185833
- Nodemailer Troubleshooting: https://nodemailer.com/troubleshooting/

**"CORS errors"**
- CORS Explained: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Express CORS: https://expressjs.com/en/resources/middleware/cors.html

**"Deployment failed"**
- Vercel Troubleshooting: https://vercel.com/docs/troubleshoot
- Render Troubleshooting: https://render.com/docs/troubleshooting

**"Git issues"**
- GitHub Help: https://docs.github.com
- Git Documentation: https://git-scm.com/doc

---

## 🎯 YOUR TO-DO CHECKLIST WITH LINKS

```
☐ 1. Create Accounts
   ☐ GitHub: https://github.com/signup
   ☐ Vercel: https://vercel.com
   ☐ Render: https://render.com

☐ 2. Set Up Gmail
   ☐ 2-Step: https://myaccount.google.com/security
   ☐ App Password: https://myaccount.google.com/apppasswords

☐ 3. Read Documentation
   ☐ START_HERE.md
   ☐ Pick your guide

☐ 4. Deploy
   ☐ Push to GitHub
   ☐ Deploy backend to Render
   ☐ Deploy frontend to Vercel

☐ 5. Test
   ☐ Visit website
   ☐ Test forms
   ☐ Verify emails

☐ 6. Celebrate!
   ☐ Website is live 🎉
```

---

## 💰 PRICING COMPARISON

All services offer FREE tiers perfect for starting:

| Service | Free Tier | Paid Upgrade | URL |
|---------|-----------|--------------|-----|
| GitHub | Unlimited | Not needed | https://github.com/pricing |
| Vercel | Generous | $20+/mo | https://vercel.com/pricing |
| Render | 750 hrs/mo | $7+/mo | https://render.com/pricing |
| Gmail | 1.5 GB | 100 GB = $1.99 | https://one.google.com/storage |

---

## 📱 USEFUL BROWSER EXTENSIONS

### For Developers
- **JSON Formatter:** Makes API responses readable
- **Thunder Client:** Test API endpoints without command line
- **DevTools:** Built into all browsers (F12)
- **GitHub CLI:** Command line GitHub management

---

## 🔐 SECURITY BEST PRACTICES

### Checklists
- Never commit .env files: https://docs.gitignore.io
- Protect API keys: https://cheatsheetseries.owasp.org/
- HTTPS security: https://letsencrypt.org/
- Input validation: https://owasp.org/www-community/attacks/xss/

---

## 📞 GETTING HELP

### If You're Stuck
1. **Read the relevant doc file** from our documentation
2. **Search the error** in that documentation
3. **Check external docs** listed above
4. **Look for similar questions** on Stack Overflow
5. **Ask on GitHub Discussions**

### Quick Support Paths
- **API Questions:** https://expressjs.com/en/
- **React Questions:** https://react.dev/community
- **Deployment Questions:** Vercel/Render docs
- **Git Questions:** https://git-scm.com/doc
- **General Programming:** https://stackoverflow.com

---

## ✅ FINAL CHECKLIST

Before you start:
- [ ] GitHub account created
- [ ] Vercel account created
- [ ] Render account created
- [ ] Gmail 2-Step enabled
- [ ] Gmail app password generated
- [ ] Read at least one documentation file
- [ ] Understood the deployment process

---

## 🚀 READY TO START?

**1. Open:** START_HERE.md

**2. Pick a guide:**
- Fastest: COPY_PASTE_COMMANDS.md
- Best: QUICK_DEPLOYMENT_CHECKLIST.md
- Complete: DEPLOYMENT_GUIDE.md

**3. Follow the steps**

**4. Deploy!**

---

## 📧 QUICK EMAIL SETUP SUMMARY

1. Go to: https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to: https://myaccount.google.com/apppasswords
4. Select: Mail & Windows Computer
5. Copy: 16-character password
6. Add to Render: EMAIL_PASSWORD
7. Done! Emails will now send ✅

---

**All set? Let's deploy!** 🚀
