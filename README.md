# 🍽️ Smart Restaurant POS & Management System

<p align="center">
  <img src="assets/dist/media/restaurant-logo.jpg" alt="Restaurant POS Logo" width="120" style="border-radius: 20px;" />
</p>

<p align="center">
  <b>A comprehensive, high-performance, offline-first Restaurant Point of Sale (POS) & Management application engineered with Flutter, Dart, Riverpod, and SQLite.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white" />
  <img src="https://img.shields.io/badge/Dart-3.x-0175C2?style=for-the-badge&logo=dart&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-Offline_First-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/Riverpod-State_Management-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Firebase-Firestore_Sync-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Platforms-Android%20%7C%20Tablet%20%7C%20Windows-green?style=for-the-badge" />
</p>

---

## 📖 Executive Summary

The **Smart Restaurant POS & Management System** is an enterprise-grade mobile and tablet solution built to streamline fast-paced hospitality operations. From fine-dining restaurants to busy cafes and cloud kitchens, this application eliminates communication delays between servers and kitchen staff, guarantees zero downtime through an **Offline-First SQLite architecture**, and automates daily billing, accounting, and inventory tracking.

---

## ✨ Key Capabilities & Modules

### 1. 🪑 Visual Table & Floor Plan Management
- **Interactive Floor Layout:** Real-time visual map of all dine-in sections (Main Hall, Family Section, Rooftop, Outdoor).
- **Live Table Status Indicators:**
  - 🟢 **Vacant:** Ready for new guests.
  - 🔴 **Occupied:** Active order being served.
  - 🟡 **Billed:** Bill generated, awaiting payment.
  - 🔵 **Reserved:** Pre-booked table.
- **Table Operations:** Merge multiple tables for large parties, transfer orders between tables, or split tickets.

### 2. 🖨️ Kitchen Order Ticketing (KOT) Automation
- **Instant Kitchen Dispatch:** When waitstaff confirms an order on a tablet or mobile device, a formatted Kitchen Order Ticket (KOT) is immediately dispatched to the kitchen thermal printer.
- **Order Modification Slips:** Automatic printing of additional items, cancellations, and special cooking instructions (e.g., *"Less spicy"*, *"No onions"*, *"Extra cheese"*).
- **Multiple Kitchen Station Routing:** Route food orders to the hot kitchen and drinks to the beverage bar.

### 3. 📜 Dynamic Menu & Variant Modifiers
- **Categorized Digital Menu:** Fast search and navigation across Starters, Main Courses, BBQ, Beverages, Desserts, and Combos.
- **Item Modifiers & Add-ons:** Supports multi-tiered portions (Small, Medium, Large) and optional toppings/sides with dynamic price adjustment.
- **Barcode & Quick-Search Integration:** Touchscreen optimized for high-volume rapid cashier billing.

### 4. 💳 Rapid POS Billing & Checkout
- **Split Billing & Multi-Pay:** Split invoices evenly or by item among guests; accept Cash, Credit Cards, and Digital QR payments simultaneously.
- **Automated Taxes & Discounts:** Configurable government sales taxes (GST/PST), service charges, happy hour discounts, and coupon voucher codes.
- **Thermal Receipt Generation:** Print professional 58mm and 80mm ESC/POS customer receipts with custom restaurant branding, QR codes, and tax breakdown.

### 5. 📦 Recipe-Based Inventory & Stock Depletion
- **Ingredient Tracking:** Automatically deducts raw ingredients (flour, meat, oil, spices, packaging) in real time whenever a dish is ordered.
- **Low Stock & Wastage Alerts:** Real-time notifications when essential raw materials fall below safety thresholds.
- **Supplier Purchasing Ledger:** Track vendor purchase orders, bulk supplies, receiving logs, and outstanding payables.

### 6. ⚡ 100% Offline-First Architecture with Cloud Sync
- **Zero Network Dependency:** Operates seamlessly even during complete Wi-Fi or broadband outages via an embedded **SQLite local database**.
- **Real-Time Cloud Synchronization:** When internet connectivity resumes, changes auto-sync to **Firebase Firestore** for remote multi-branch management.
- **Dual-Mode Switch:** Instant manual toggle between local offline mode and live cloud database.

### 7. 📊 End-of-Day (Z-Report) & Financial Analytics
- **Daily Closing Summary:** Complete cash drawer reconciliation, shift opening/closing floats, and expense logs.
- **Revenue Insights:** Detailed analytics on peak dining hours, top-selling dishes, waiter performance, and gross vs. net profits.
- **Export Capabilities:** One-click PDF statement export and automated data backup to prevent data loss.

---

## 🛠️ Architecture & Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | **Flutter (3.x)** | Cross-platform UI optimized for mobile phones and 7"/10" POS tablets |
| **Language** | **Dart (3.x)** | Type-safe, null-safe modern reactive programming |
| **State Management** | **Riverpod & Provider** | Decoupled, testable, and compile-safe application state |
| **Local Database** | **SQLite (Sqflite)** | High-speed offline relational database with custom indexing |
| **Cloud Backend** | **Firebase Firestore** | Realtime cloud synchronization, multi-device sync & remote backups |
| **Printing Protocol** | **ESC/POS Standards** | Native Bluetooth, USB, and Wi-Fi thermal printer support (58mm / 80mm) |
| **UI Design System** | **Tailored Clean UI** | Adaptive layout supporting both portrait mobiles and landscape tablets |

---

## 📂 Project Directory Structure

```plaintext
dastarkhwan_pos/
├── android/               # Native Android configurations & Gradle setup
├── assets/                # Local images, restaurant logos, icons & sound effects
│   └── dist/              # Compiled assets, media & web bundles
├── ios/                   # Native iOS runner configuration
├── lib/                   # Flutter source code
│   └── main.dart          # Application entry point, routing & initialization
├── test/                  # Automated unit and widget tests
├── web/                   # Progressive Web App (PWA) configuration
├── windows/               # Windows desktop native runtime
├── build_apk.bat          # Automated script to build release Android APK
├── pubspec.yaml           # Flutter dependencies & asset declarations
└── README.md              # Project documentation
```

---

## 🚀 Getting Started & Installation

### Prerequisites
1. Install [Flutter SDK](https://flutter.dev/docs/get-started/install) (version `>= 3.12.0`).
2. Install [Android Studio](https://developer.android.com/studio) or [VS Code](https://code.visualstudio.com/) with Flutter extensions.
3. Android device or tablet with Developer Mode enabled (or an Android Emulator).

### Step 1: Clone the Repository
```bash
git clone https://github.com/Haseeb-ML/restaurant.git
cd restaurant
```

### Step 2: Install Dependencies
```bash
flutter pub get
```

### Step 3: Run the Application
Connect your Android phone or tablet via USB and run:
```bash
flutter run
```

Or run on a specific target:
```bash
# Run on Windows Desktop
flutter run -d windows

# Run on Chrome Web Browser
flutter run -d chrome
```

---

## 📦 Building Production Release

### Build Android APK
To compile an optimized, standalone release APK for retail deployment:
```bash
flutter build apk --release
```
The output file will be generated at:
`build/app/outputs/flutter-apk/app-release.apk`

*(Alternatively, run the included `build_apk.bat` script on Windows).*

---

## 👨‍💻 Developer & Author

* **Developer:** **Muhammad Haseeb**
* **Role:** Flutter Developer & Mobile/Desktop Software Engineer at **HH Tech Hub**
* **Specialization:** Enterprise ERPs, POS Solutions, Offline-First Architecture, Riverpod & SQLite
* **Location:** Rawalpindi, Pakistan
* **GitHub:** [@Haseeb-ML](https://github.com/Haseeb-ML)
* **LinkedIn:** [muhammad-haseeb-743950290](https://linkedin.com/in/muhammad-haseeb-743950290)
* **Email:** [haseebaiml@gmail.com](mailto:haseebaiml@gmail.com)

---

## 📄 License & Intellectual Property
Developed by **Muhammad Haseeb**. All rights reserved.
