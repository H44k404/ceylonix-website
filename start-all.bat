@echo off
REM CEYLONIX ADMIN SYSTEM - QUICK START FOR WINDOWS
REM This script starts all three components needed for the system to work

setlocal enabledelayedexpansion

echo ==================================
echo Ceylonix Admin System - Quick Start
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
echo.

REM Get the project root directory
set "PROJECT_ROOT=%~dp0"

REM Step 1: Start Backend Server
echo [STEP 1] Starting Backend Server (Port 5000)
echo Path: %PROJECT_ROOT%ceylonix-backend
cd /d "%PROJECT_ROOT%ceylonix-backend"
call npm install >nul 2>&1
start "Ceylonix Backend" cmd /k "node server.js"
echo [OK] Backend started
timeout /t 2 /nobreak

REM Step 2: Start Admin Desktop Application
echo [STEP 2] Starting Admin Application (Port 3000)
echo Path: %PROJECT_ROOT%ceylonix-admin-desktop
cd /d "%PROJECT_ROOT%ceylonix-admin-desktop"
call npm install >nul 2>&1
start "Ceylonix Admin Panel" cmd /k "npm start"
echo [OK] Admin app started
timeout /t 3 /nobreak

REM Step 3: Start Frontend Website
echo [STEP 3] Starting Frontend Website (Port 3001)
echo Path: %PROJECT_ROOT%ceylonix-website
cd /d "%PROJECT_ROOT%ceylonix-website"
start "Ceylonix Website" cmd /k "npm start"
echo [OK] Frontend started
timeout /t 3 /nobreak

echo.
echo ==================================
echo [SUCCESS] All services are running!
echo ==================================
echo.
echo [IMPORTANT] Access the services:
echo    Backend API:      http://localhost:5000/api
echo    Admin Panel:      http://localhost:3000 ^(Password: admin123^)
echo    Website:          http://localhost:3001
echo.
echo [HOW TO USE] Manage content:
echo    1. Open Admin Panel: http://localhost:3000
echo    2. Login with: admin123
echo    3. Add/Edit/Delete portfolio items
echo    4. Changes appear on website automatically
echo.
echo [TIP] To stop all services:
echo    1. Type 'exit' in each terminal window, or
echo    2. Close each window, or
echo    3. Use Task Manager to stop node.exe processes
echo.
echo ==================================
echo.
pause
