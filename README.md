# 📸 Ceylonix Photography Website

Professional photography portfolio website built with React and Node.js

## 🎯 Project Overview

This is a full-stack photography portfolio website featuring:
- **Frontend**: React with Tailwind CSS
- **Backend**: Express.js API
- **Features**: Portfolio gallery, booking system, contact form, testimonials

---

## 🚀 Quick Start

### Local Development

**Prerequisites:**
- Node.js 14+ installed
- Git installed

**1. Clone repository:**
```bash
git clone https://github.com/YOUR_USERNAME/ceylonix-website.git
cd ceylonix-website
```

**2. Install dependencies:**
```bash
npm install
npm install --prefix ./ceylonix-backend
```

**3. Configure backend:**
```bash
cd ceylonix-backend
cp .env.example .env
# Edit .env with your email credentials
```

**4. Start development servers:**
```bash
# Terminal 1 - Backend
cd ceylonix-backend
npm start

# Terminal 2 - Frontend
npm start
```

Visit [http://localhost:3000](http://localhost:3000) ✅

---

## 📋 Documentation

### Deployment Guides
- **[QUICK_DEPLOYMENT_CHECKLIST.md](./QUICK_DEPLOYMENT_CHECKLIST.md)** - Fast reference for deployment
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Detailed deployment steps
- **[ceylonix-backend/.env.example](./ceylonix-backend/.env.example)** - Environment variables template

### Quick Deployment Commands
```bash
# 1. Prepare for deployment
./setup-deployment.bat    # Windows
bash setup-deployment.sh  # Mac/Linux

# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ceylonix-website.git
git branch -M main
git push -u origin main

# 3. Deploy frontend: https://vercel.com
# 4. Deploy backend: https://render.com
```

---

## 📁 Project Structure

```
ceylonix-website/
├── ceylonix-backend/          # Express.js Backend
│   ├── routes/
│   │   ├── booking.js         # Booking form handler
│   │   ├── contact.js         # Contact form handler
│   │   ├── portfolio.js
│   │   ├── testimonials.js
│   │   └── services.js
│   ├── utils/                 # Shared utilities
│   ├── data/                  # JSON data storage
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
├── src/                       # React Frontend
│   ├── components/
│   │   ├── booking/           # Booking form
│   │   ├── common/            # Reusable components
│   │   ├── sections/          # Page sections
│   │   └── common/
│   │       └── Alert.js       # New alert component
│   ├── services/
│   │   └── api.js             # API calls
│   ├── App.js
│   └── index.js
├── public/                    # Static files
├── DEPLOYMENT_GUIDE.md        # Full deployment guide
├── QUICK_DEPLOYMENT_CHECKLIST.md
├── setup-deployment.bat       # Windows setup
├── setup-deployment.sh        # Mac/Linux setup
└── package.json
```

---

## 🌐 Live Deployment

### Current Deployment Status
- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)
- **Total Cost**: **FREE** ✅

### Environment Variables

**Frontend (Vercel):**
```
REACT_APP_API_BASE_URL=https://ceylonix-api.onrender.com/api
```

**Backend (Render):**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-specific-password
EMAIL_RECIPIENT=your-email@gmail.com
FRONTEND_URL=https://ceylonix-website.vercel.app
```

---

## ⚙️ Available Scripts

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

### Backend
```bash
npm start       # Start server (production)
npm run dev     # Start with nodemon (development)
```

---

## 🔐 Security Notes

- ⚠️ Never commit `.env` file to git
- ✅ Always use app-specific passwords for email (especially Gmail)
- ✅ Environment variables are stored securely on hosting platforms
- ✅ Front-end URL is whitelisted via CORS on backend

---

## 📧 Email Configuration

### Gmail Setup
1. Enable [2-Step Verification](https://myaccount.google.com/security)
2. Get [App Password](https://myaccount.google.com/apppasswords)
3. Select: Mail & Windows Computer
4. Copy 16-character password
5. Use in `.env` as `EMAIL_PASSWORD`

### Other Email Providers
Update in `ceylonix-backend/utils/shared.js` and set `.env` accordingly

---

## 🛠️ Technology Stack

### Frontend
- React 19
- Tailwind CSS
- Lucide Icons
- Fetch API

### Backend
- Node.js
- Express.js
- Nodemailer (email)
- CORS
- dotenv

### Hosting
- **Frontend**: Vercel (React deployment)
- **Backend**: Render (Node.js deployment)
- **Repo**: GitHub (version control)

---

## 🎨 Features

✅ Responsive design  
✅ Portfolio gallery  
✅ Booking system with validation  
✅ Contact form with email notifications  
✅ Testimonials section  
✅ Services showcase  
✅ Professional alerts & notifications  
✅ CORS-protected API  
✅ Environment-based configuration  
✅ Production-ready error handling  

---

## 🐛 Troubleshooting

### Emails not sending
- Check `.env` variables match exactly
- Verify Gmail app password (not regular password)
- Enable 2-Step Verification on Gmail

### CORS errors
- Ensure `FRONTEND_URL` is set in backend `.env`
- Check frontend URL in environment variables
- Verify no trailing slashes in URLs

### Render backend slow
- Free tier sleeps after 15 mins inactivity
- First request wakes it up (30s+)
- Upgrade plan for always-on servers

### Build failures
- Check `Root Directory` in hosting settings
- Verify all dependencies installed
- Check error logs in hosting dashboard

---

## 📝 Contributing

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/feature-name`
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this project for your photography business

---

## 🤝 Support

- Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed help
- Check [QUICK_DEPLOYMENT_CHECKLIST.md](./QUICK_DEPLOYMENT_CHECKLIST.md) for quick reference
- Review error logs in hosting dashboard

---

## 👤 Author

Ceylonix Photography Studio

---

**Ready to deploy? Follow [QUICK_DEPLOYMENT_CHECKLIST.md](./QUICK_DEPLOYMENT_CHECKLIST.md)!** 🚀

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
