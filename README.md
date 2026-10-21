# Dastarkhwan POS — Flutter Mobile & Tablet App

This is the standalone **Flutter Android App** for Dastarkhwan Restaurant Management POS & ERP.

## Ready to Install APK
- **File:** `Dastarkhwan-POS.apk` (located directly in this folder)
- Transfer this file to any Android mobile or tablet and tap to install.

## Features
- **Offline First:** Embedded local server serves all ERP screens without requiring an active internet connection.
- **Realtime Cloud Sync:** Auto-syncs live orders, sales, and accounts with Firebase Firestore when internet is available.
- **Dual Mode:** Instant toggle between Offline Local mode and Live Cloud mode.
- **Hardware Integration:** Supports Bluetooth thermal printers and camera barcode scanning.
- **Back Button Protection:** Prevents accidental closing during active orders.

## How to Run / Rebuild
1. Open this folder in **VS Code** or **Android Studio**.
2. Run on connected Android device:
   ```bash
   flutter run
   ```
3. To rebuild the Release APK, simply double-click **`build_apk.bat`** or run:
   ```bash
   flutter build apk --release
   ```
