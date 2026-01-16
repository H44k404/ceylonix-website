@echo off
REM ========================================
REM Ceylonix Website - Deployment Setup
REM This script prepares your project for GitHub and deployment
REM ========================================

echo.
echo ╔════════════════════════════════════════════════╗
echo ║   CEYLONIX WEBSITE - DEPLOYMENT SETUP          ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first from https://git-scm.com
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Initialize Git if not already initialized
if not exist .git (
    echo 📦 Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo ========================================
echo STEP 1: CONFIGURE ENVIRONMENT
echo ========================================
echo.

REM Check if backend .env exists
if exist ceylonix-backend\.env (
    echo ✅ Backend .env file exists
) else (
    echo ⚠️  Backend .env file not found
    echo 📝 Creating .env from .env.example...
    if exist ceylonix-backend\.env.example (
        copy ceylonix-backend\.env.example ceylonix-backend\.env >nul
        echo ✅ Created .env file. Please edit it with your values!
    )
)

echo.
echo ========================================
echo STEP 2: PREPARE FOR GIT
echo ========================================
echo.

echo 📝 Staging files for commit...
git add .

echo ✅ Files staged

echo.
echo ========================================
echo STEP 3: INITIAL COMMIT
echo ========================================
echo.

git commit -m "Initial commit - ready for deployment" || echo ℹ️  No changes to commit

echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1️⃣  CREATE GITHUB REPOSITORY:
echo    - Go to https://github.com/new
echo    - Create repository named: ceylonix-website
echo    - Choose Public (recommended)
echo    - DO NOT initialize with README
echo.
echo 2️⃣  PUSH TO GITHUB:
echo    Open PowerShell/Git Bash and run:
echo    git remote add origin https://github.com/YOUR_USERNAME/ceylonix-website.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3️⃣  DEPLOY BACKEND (Render):
echo    - Go to https://render.com
echo    - Click New + → Web Service
echo    - Connect GitHub repository
echo    - Configure:
echo      * Root Directory: ceylonix-backend
echo      * Build: npm install
echo      * Start: node server.js
echo    - Add environment variables from ceylonix-backend\.env
echo.
echo 4️⃣  DEPLOY FRONTEND (Vercel):
echo    - Go to https://vercel.com
echo    - Import GitHub repository
echo    - Vercel auto-detects React setup
echo    - Add environment variable:
echo      * REACT_APP_API_BASE_URL=https://your-render-url/api
echo.
echo ✨ Your website will be live on both services!
echo.
pause
