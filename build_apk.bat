@echo off
echo ===================================================
echo     Dastarkhwan POS - Flutter APK Builder
echo ===================================================
echo.
echo Running flutter pub get...
call flutter pub get
echo.
echo Building Release APK...
call flutter build apk --release
echo.
if exist build\app\outputs\flutter-apk\app-release.apk (
    copy /y build\app\outputs\flutter-apk\app-release.apk Dastarkhwan-POS.apk >nul
    echo ===================================================
    echo  SUCCESS: New APK ready at Dastarkhwan-POS.apk!
    echo ===================================================
) else (
    echo [ERROR] Build failed. Please check Flutter and Android SDK.
)
echo.
pause
