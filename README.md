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

## 🧠 State Management Explanation

In this application, **React's built-in State Management (`useState` and `useEffect`)** was chosen over external libraries like Redux or Zustand for the following strategic reasons:

1. **Lightweight & Zero Overhead**: The cart state and UI filters are scoped locally to the user session. Using native React state avoids external library bundle overhead and keeps page load speeds superfast.
2. **Predictable Data Flow**: Unidirectional state flow from [`app/page.tsx`](file:///c:/Personal%20Folder/Andro_buddy_zepto_clone/zepto-clone/app/page.tsx) down to components (`NavBar`, `ProductCard`, `CategoryCard`, `SideDrawer`) makes props explicit and easy to debug.
3. **Immutability & Reactive Updates**: Cart item updates (`quantity` increment/decrement, item removal, line item subtotal calculation) use pure array operations (`map`, `filter`, `reduce`), guaranteeing smooth re-renders.

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
│   ├── Component/
│   │   ├── Button.js         # Reusable button component
│   │   ├── CategoryCard.js   # Category filter button component
│   │   ├── NavBar.js         # Top navigation header with cart badge & search
│   │   ├── ProductCard.js    # Product card component with add/quantity controls
│   │   └── SideDrawer.js     # Slide-out cart sidebar sheet
│   ├── constant.ts           # Centralized API endpoints & helper functions
│   ├── globals.css           # Tailwind CSS directives & global styles
│   ├── layout.tsx            # App layout wrapper
│   └── page.tsx              # Main dashboard connecting FakeStore API & state
├── public/
│   ├── Screenshot 2026-10-09 172334.png
│   ├── Screenshot 2026-10-09 172347.png
│   └── Screenshot 2026-10-09 172946.png
└── package.json
```
