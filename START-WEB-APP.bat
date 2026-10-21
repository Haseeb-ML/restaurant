@echo off
title Dastarkhwan Web Server (Mobile & Desktop)
cd /d "C:\Users\M HASEEB\Desktop\Dastarkhwan-Full-Source"
cls
echo =====================================================================
echo           DASTARKHWAN POS & ERP - LIVE WEB SERVER
echo =====================================================================
echo.
echo   [+] Mobile Wi-Fi Link (Apne Mobile Browser Me Kholen):
echo       http://192.168.18.57:5173
echo.
echo   [+] Computer / Laptop Link:
echo       http://localhost:5173
echo.
echo   Har tabdili live update hogi, bar bar APK banane ki zaroorat nahi!
echo =====================================================================
echo.
cmd /c npm run dev
pause
