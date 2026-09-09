@echo off
title AI-Guided Academic Project Platform - Development Server
cd /d "%~dp0"
echo ======================================================================
echo Starting AI-Guided Academic Project Progress Tracking Platform...
echo ======================================================================
echo.
echo Local server will start at: http://localhost:5173
echo Press Ctrl+C at any time to stop the server.
echo.
node ./node_modules/vite/bin/vite.js --host --open
pause
