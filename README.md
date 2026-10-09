# 🚀 Zepto Clone Web Application

A fast, modern, and responsive **Zepto Clone** built using **Next.js (App Router)**, **React 19**, and **Tailwind CSS**. The app features live product streaming from the [FakeStore API](https://fakestoreapi.com/), dynamic category filtering, instant search, and a slide-out cart sidebar with full quantity control.

---

## 🛠️ Project Setup & Installation Guide

### Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Step 1: Clone or Navigate to Project Directory
```bash
cd zepto-clone
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app live.

### Step 4: Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

---

## 🧠 State Management & Data Fetching Explanation

In this application, **TanStack Query (`@tanstack/react-query`)** along with **React's `useState`** were chosen for data management for the following reasons:

1. **Server State Caching**: **TanStack Query** efficiently handles API requests, background refetching, and response caching (5 minutes stale time).
2. **Lightweight Local State**: The shopping cart items and UI open/close states are managed with React's native state for zero unnecessary re-renders.
3. **Predictable Unidirectional Data Flow**: State flows cleanly from [`app/page.tsx`](file:///c:/Personal%20Folder/Andro_buddy_zepto_clone/zepto-clone/app/page.tsx) down to presentational components (`NavBar`, `ProductCard`, `CategoryCard`, `SideDrawer`).

---

## 📸 Application Screenshots

### 1. Home Page View
The home page features the Zepto-branded navigation header, mock location selector, live API category filters, and product grid showcase.

![Home Page View](public/Screenshot%202026-10-09%20172334.png)

### 2. My Cart Sidebar Sheet
Clicking the header cart button opens the responsive slide-out drawer displaying cart items, image thumbnails, unit pricing, quantity increment/decrement controls, item removal, and real-time subtotal calculation.

![Cart Sidebar View](public/Screenshot%202026-10-09%20172347.png)

### 3. Category & Filtered Catalog View
Live product filter showcase displaying dynamic category filtering and instant item updates from FakeStore API.

![Category & Filtered Catalog View](public/Screenshot%202026-10-09%20172946.png)

---

## 📂 Project Structure

```
zepto-clone/
├── app/
│   ├── Components/
│   │   ├── Button.js         # Reusable button component
│   │   ├── CategoryCard.js   # Category filter button component
│   │   ├── NavBar.js         # Top navigation header with cart badge & search
│   │   ├── ProductCard.js    # Product card component with add/quantity controls
│   │   └── SideDrawer.js     # Slide-out cart sidebar sheet
│   ├── constant.ts           # Centralized API endpoints & helper functions
│   ├── globals.css           # Tailwind CSS directives & global styles
│   ├── layout.tsx            # App layout wrapper with Providers
│   ├── page.tsx              # Main dashboard using TanStack Query & components
│   └── providers.tsx         # TanStack QueryClientProvider wrapper
├── public/
│   ├── Screenshot 2026-10-09 172334.png
│   ├── Screenshot 2026-10-09 172347.png
│   └── Screenshot 2026-10-09 172946.png
└── package.json
```
