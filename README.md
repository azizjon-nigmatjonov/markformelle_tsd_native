# Markformelle TSD Native

A cross-platform mobile application built with React Native and Expo for managing knitting machine operations, documents, and inventory tracking.

## 📋 Overview

Markformelle TSD Native is a comprehensive production management application designed for textile manufacturing operations. The app provides features for managing knitting machines, creating and tracking production documents, handling material rolls, and maintaining inventory control systems.

## ✨ Key Features

- **Authentication System** - Secure login and user management
- **Knitting Machine Management** - Monitor and control knitting operations
- **Document Management** - Create, view, and manage production documents
- **Roll Tracking** - Track material rolls through the production process
- **Inventory Control (CHNI)** - Comprehensive inventory management system
- **Multi-language Support** - Available in English, Russian, and Uzbek
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Offline Support** - Data persistence with AsyncStorage

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (0.74.5) - Mobile app framework
- **Expo** (^51.0.38) - Development and build platform
- **TypeScript** (~5.3.3) - Type-safe development
- **Expo Router** (^3.1.0) - File-based routing system

### UI & Styling
- **React Native Paper** (^5.12.5) - Material Design components
- **Expo Linear Gradient** (~13.0.2) - Gradient components
- **React Native SVG** (^15.8.0) - SVG support
- **React Native Reanimated** (~3.10.1) - Smooth animations
- **Sass** (^1.80.6) - CSS preprocessing

### State Management & Forms
- **Zustand** (^5.0.0) - Lightweight state management
- **React Hook Form** (^7.53.1) - Performant form handling
- **Yup** (^1.4.0) - Schema validation
- **@hookform/resolvers** (^3.9.0) - Form validation resolvers

### Navigation & Routing
- **React Navigation** (^6.1.18) - Navigation infrastructure
- **React Native Screens** (^3.31.1) - Native screen optimization
- **React Native Safe Area Context** (^4.10.5) - Safe area handling

### Data & Network
- **Axios** (^1.7.7) - HTTP client
- **AsyncStorage** (^2.0.0) - Local data persistence

### Internationalization
- **i18next** (^25.5.3) - Internationalization framework
- **react-i18next** (^16.0.0) - React bindings for i18next
- **expo-localization** (^17.0.7) - Device locale detection

### Development Tools
- **Jest** (^29.2.1) - Testing framework
- **TypeScript** - Static type checking
- **Metro** (^0.81.0) - JavaScript bundler
- **EAS CLI** - Expo Application Services for builds

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **EAS CLI** (for building) (`npm install -g eas-cli`)
- For iOS development: **Xcode** (macOS only)
- For Android development: **Android Studio** and **Android SDK**

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd markformelle_tsd_native
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm start
# or
npx expo start
```

Run on specific platforms:

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

# 1. Check TypeScript errors
npx tsc --noEmit

# 2. Run linter
npm run lint

# 3. Check project health
npx expo-doctor

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run in web browser
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run build:android` - Build Android app with EAS
- `npm run build:ios` - Build iOS app with EAS

## 📁 Project Structure

```
markformelle_tsd_native/
├── app/                          # Application screens (file-based routing)
│   ├── (login)/                  # Authentication screens
│   ├── home/                     # Main app screens
│   └── _layout.tsx               # Root layout
├── assets/                       # Static assets
│   ├── fonts/                    # Custom fonts (Inter)
│   └── images/                   # Images and icons
├── components/                   # Reusable components
│   ├── Pages/                    # Page-specific components
│   │   ├── CHNI/                 # Inventory management
│   │   ├── Documents/            # Document handling
│   │   ├── Knitting/             # Knitting operations
│   │   ├── Rolls/                # Roll tracking
│   │   └── Settings/             # App settings
│   ├── CElements/                # Custom UI elements
│   ├── FormElements/             # Form components
│   └── UI/                       # Common UI components
├── store/                        # Zustand state management
│   ├── auth/                     # Authentication state
│   ├── docs/                     # Document state
│   ├── list/                     # List state
│   └── mobile/                   # Mobile-specific state
├── hooks/                        # Custom React hooks
├── i18n/                         # Internationalization config
├── locales/                      # Translation files
│   ├── en.json                   # English
│   ├── ru.json                   # Russian
│   └── oz.json                   # Uzbek
├── utils/                        # Utility functions
└── constants/                    # App constants
```

## 🌍 Internationalization

The app supports three languages:
- English (en)
- Russian (ru)
- Uzbek (oz)

Translation files are located in the `locales/` directory. The app automatically detects the device locale and switches languages accordingly.

## 🎨 Theming

The app supports both light and dark themes, which automatically switch based on system preferences. Theme configuration can be found in:
- `constants/Colors.ts`
- `components/UI/Colors.ts`

## 📱 Building for Production

### Android

```bash
npm run build:android
```

### iOS

```bash
npm run build:ios
```

Builds are configured in `eas.json` and managed through Expo Application Services (EAS).

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project uses Jest and React Test Renderer for unit and component testing.

## 🔧 Configuration

- **app.json** - Expo configuration
- **eas.json** - EAS Build configuration
- **babel.config.js** - Babel configuration
- **metro.config.js** - Metro bundler configuration
- **tsconfig.json** - TypeScript configuration

## 📄 License

Private Project

## 👥 Contributing

This is a private project. Contact the development team for contribution guidelines.

---

**Package:** com.azizjon789.myapp  
**Version:** 1.0.0  
**EAS Project ID:** 68b72fb6-bce4-4a48-a787-c833315fd5b2