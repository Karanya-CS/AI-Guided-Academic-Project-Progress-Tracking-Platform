@echo off
title AI-Guided Academic Project Platform - Export ZIP
cd /d "%~dp0"
echo ======================================================================
echo Packaging clean project archive into ZIP...
echo ======================================================================
echo.
powershell -Command "Compress-Archive -Path 'src', 'public', 'index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'vite.config.ts', 'tailwind.config.ts', 'postcss.config.js', '.oxlintrc.json', 'README.md', 'run-dev.bat', 'build.bat' -DestinationPath '%USERPROFILE%\Downloads\AI-Guided-Academic-Platform-Updated.zip' -Force"
echo.
echo ======================================================================
echo Package exported to:
echo %USERPROFILE%\Downloads\AI-Guided-Academic-Platform-Updated.zip
echo ======================================================================
pause
