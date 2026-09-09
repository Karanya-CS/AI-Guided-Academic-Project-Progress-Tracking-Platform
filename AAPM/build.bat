@echo off
title AI-Guided Academic Project Platform - Production Build
cd /d "%~dp0"
echo ======================================================================
echo Building production assets into dist/ directory...
echo ======================================================================
echo.
node ./node_modules/vite/bin/vite.js build
echo.
echo ======================================================================
echo Build Complete! Output generated in dist/
echo ======================================================================
pause
