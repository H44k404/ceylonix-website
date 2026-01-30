#!/bin/bash

# CEYLONIX ADMIN SYSTEM - QUICK START
# This script starts all three components needed for the system to work

echo "=================================="
echo "Ceylonix Admin System - Quick Start"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js is installed${NC}"
echo ""

# Function to start a service in a new terminal
start_service() {
    local name=$1
    local path=$2
    local command=$3
    
    echo -e "${YELLOW}Starting $name...${NC}"
    
    # For Windows use 'start', for Mac/Linux use 'open' or 'gnome-terminal'
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Windows
        start "Ceylonix - $name" cmd /k "cd /d $path && $command"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open -a Terminal "$(pwd)/$path"
        cd "$path" && $command &
    else
        # Linux
        gnome-terminal -- bash -c "cd $path && $command; bash"
    fi
}

# Get the project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Step 1: Start Backend Server
echo -e "${YELLOW}Step 1: Starting Backend Server (Port 5000)${NC}"
echo "Path: $PROJECT_ROOT/ceylonix-backend"
cd "$PROJECT_ROOT/ceylonix-backend"
npm install > /dev/null 2>&1
node server.js > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
sleep 2

# Step 2: Start Admin Desktop Application
echo -e "${YELLOW}Step 2: Starting Admin Application (Port 3000)${NC}"
echo "Path: $PROJECT_ROOT/ceylonix-admin-desktop"
cd "$PROJECT_ROOT/ceylonix-admin-desktop"
npm install > /dev/null 2>&1
npm start > /tmp/admin.log 2>&1 &
ADMIN_PID=$!
echo -e "${GREEN}✓ Admin app started (PID: $ADMIN_PID)${NC}"
sleep 3

# Step 3: Start Frontend Website
echo -e "${YELLOW}Step 3: Starting Frontend Website (Port 3001)${NC}"
echo "Path: $PROJECT_ROOT/ceylonix-website"
cd "$PROJECT_ROOT/ceylonix-website"
npm start > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
sleep 3

echo ""
echo "=================================="
echo -e "${GREEN}✓ All services are running!${NC}"
echo "=================================="
echo ""
echo -e "${YELLOW}📌 Access the services:${NC}"
echo "   Backend API:      http://localhost:5000/api"
echo "   Admin Panel:      http://localhost:3000 (Password: admin123)"
echo "   Website:          http://localhost:3001"
echo ""
echo -e "${YELLOW}📝 To manage content:${NC}"
echo "   1. Open Admin Panel: http://localhost:3000"
echo "   2. Login with: admin123"
echo "   3. Add/Edit/Delete portfolio items"
echo "   4. Changes appear on website automatically"
echo ""
echo -e "${YELLOW}🛑 To stop all services:${NC}"
echo "   Press Ctrl+C in each terminal window"
echo ""
echo "=================================="
