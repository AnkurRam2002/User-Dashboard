# NexusCloud - User Insights Dashboard

A high-performance, real-time user management dashboard built with Angular 18, featuring dynamic role distribution analytics and lazy-loaded components.

## 🚀 Features

- **Real-time User Management**: Add, search, and filter users with instant state updates via RxJS.
- **Dynamic Analytics**: Interactive pie charts powered by **Chart.js** (lazy-loaded) showing role distribution.
- **Performance Optimized**: 
  - **Lazy Loading**: User registration form and Chart.js library are loaded only when needed.
  - **OnPush Change Detection**: (Internal architecture) ensuring minimal re-renders.
- **Premium UI/UX**:
  - Clean, professional design using a curated color palette (`#1c4980`, `#383838`).
  - Fully responsive layout for Desktop and Mobile.
  - Smooth animations and micro-interactions.

## 🛠️ Technology Stack

- **Framework**: Angular 18 (Standalone Components)
- **Styling**: Tailwind CSS v3 (Customized Theme)
- **Icons**: Lucide Angular
- **State Management**: RxJS (BehaviorSubject Pattern)
- **Charts**: Chart.js
- **Runtime**: Node.js

## 📁 Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── user-dashboard/    # Main orchestration component
│   │   ├── user-table/        # Dynamic user directory with search/filter
│   │   ├── user-chart/        # Lazy-loaded Chart.js wrapper
│   │   └── user-form/         # Lazy-loaded registration modal
│   ├── services/
│   │   └── user.service.ts    # RxJS State Management
│   ├── app.component.ts       # Root layout
│   └── app.config.ts          # Application providers
├── main.ts                    # Entry point
└── index.css                  # Global Tailwind styles
```

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** (v20+ recommended)
- **NPM** (v10+)

### 2. Installation
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` (or the port assigned by the CLI).

### 4. Build for Production
```bash
npm run build
```

## 🤝 Contribution
This project was developed with a focus on modern Angular best practices and performance optimization. Feel free to explore the code and suggest improvements!
