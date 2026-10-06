# Gokul Tech Solution 

A complete, modern, premium business web application built for real-world enterprise operations. Features a clean, Apple-level minimalist user interface, lightweight interactive 3D hero visualization via Three.js / React Three Fiber, smooth Framer Motion animations, a secure Node.js + Express backend, MongoDB / Mongoose database with auto-seeding, JWT authentication, and a full-featured Admin Dashboard with CRUD capabilities.

---

## 🚀 Live Services & Architecture Overview

- **Frontend**: `http://localhost:5173` (Vite + React 19 + React Three Fiber + Drei + Framer Motion + Vanilla CSS Design System)
- **Backend API**: `http://localhost:5001` (Express + Mongoose + JWT + bcryptjs + CORS)
- **Database**: MongoDB with automatic embedded in-memory fallback for zero-configuration local development + support for local/remote MongoDB Atlas URI.

---

Visit oru webpage - https://frontend-eight-green-28.vercel.app

## 📂 Project Architecture

```
Business Webpage/
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI & 3D Components
│   │   │   ├── Hero3D.jsx        # Lightweight Three.js Hero 3D Canvas
│   │   │   ├── Solution3D.jsx    # Interactive 3D Showcase Canvas
│   │   │   ├── Navbar.jsx        # Sticky glassmorphism navbar + mobile drawer
│   │   │   ├── Footer.jsx        # Enterprise footer with coordinates & links
│   │   │   ├── ServiceCard.jsx   # Interactive service capability cards
│   │   │   ├── ProductCard.jsx   # Turnkey product cards with pricing
│   │   │   ├── ProjectCard.jsx   # Portfolio case study cards
│   │   │   ├── ContactForm.jsx   # Validated MongoDB contact submission form
│   │   │   ├── StatsCard.jsx     # Framer Motion animated trust metrics
│   │   │   ├── Modal.jsx         # Accessible modal dialog
│   │   │   ├── ProtectedRoute.jsx# Role-aware route guard
│   │   │   ├── AdminSidebar.jsx  # Admin portal navigation sidebar
│   │   │   ├── AdminNavbar.jsx   # Top administrative bar
│   │   │   ├── SearchBar.jsx     # Debounced search input
│   │   │   ├── FilterBar.jsx     # Category pill filters
│   │   │   └── LoadingSpinner.jsx# Skeleton & progress indicators
│   │   ├── pages/                # Website & Admin Pages
│   │   │   ├── Home.jsx          # Hero 3D, Stats, Capabilities, 3D Showcase
│   │   │   ├── About.jsx         # Mission, Vision, Values, Metrics
│   │   │   ├── Services.jsx      # Catalog of enterprise capabilities
│   │   │   ├── ServiceDetail.jsx # Deep-dive service deliverables (/services/:id)
│   │   │   ├── Products.jsx      # Dynamic product solutions catalog
│   │   │   ├── ProductDetail.jsx # Product specifications & pricing (/products/:id)
│   │   │   ├── Portfolio.jsx     # Case studies filterable by Web, Mobile, Business
│   │   │   ├── Contact.jsx       # Business coordinates + contact submission
│   │   │   ├── Login.jsx         # JWT Sign-in with quick demo credentials
│   │   │   ├── Register.jsx      # Account registration
│   │   │   ├── NotFound.jsx      # Clean 404 page
│   │   │   └── admin/            # Admin Management Suite
│   │   │       ├── AdminDashboard.jsx # Real-time metric counters & recent inbox
│   │   │       ├── AdminProducts.jsx  # Full Product CRUD with modal forms
│   │   │       ├── AdminServices.jsx  # Full Service CRUD with icon selectors
│   │   │       ├── AdminProjects.jsx  # Full Case Study Project CRUD
│   │   │       ├── AdminMessages.jsx  # Contact Inquiries inbox (Mark read/delete)
│   │   │       └── AdminUsers.jsx     # Registered users & role permissions
│   │   ├── layouts/              # MainLayout & AdminLayout shells
│   │   ├── context/              # AuthContext & ToastContext
│   │   ├── services/             # Axios API client with bearer token injection
│   │   ├── styles/               # Apple-grade Vanilla CSS Design System
│   │   ├── App.jsx               # Client router & providers
│   │   └── main.jsx
│   ├── public/
│   ├── .env                      # VITE_API_URL=/api
│   ├── vite.config.js            # Reverse proxy configuration
│   └── package.json
│
├── backend/                      # Node.js + Express REST API Backend
│   ├── config/
│   │   └── db.js                 # MongoDB connection with In-Memory fallback & seeder
│   ├── controllers/
│   │   ├── authController.js     # Register, Login, Me, User Management
│   │   ├── productController.js  # Product queries & Admin CRUD
│   │   ├── serviceController.js  # Service queries & Admin CRUD
│   │   ├── projectController.js  # Project queries & Admin CRUD
│   │   ├── contactController.js  # Contact inquiry submission & status tracking
│   │   └── statsController.js    # Executive dashboard telemetry
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT Bearer verification & Admin role guard
│   ├── models/
│   │   ├── User.js               # User schema with bcrypt password hashing
│   │   ├── Product.js            # Product schema with specifications & slugs
│   │   ├── Service.js            # Service schema with icons & deliverables
│   │   ├── Project.js            # Case study schema with category & tech tags
│   │   └── Contact.js            # Customer inquiry schema with status workflow
│   ├── routes/                   # Modular Express routers
│   ├── services/
│   │   └── seedService.js        # Default data seeder (Admin, products, services, cases)
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── .env                      # PORT=5001, JWT_SECRET, MONGO_URI
│   ├── server.js                 # Express server with CORS & error handling
│   └── package.json
│
├── package.json                  # Root monorepo scripts
└── README.md
```

---

## 📱 Features & Highlights

1. **Lightweight 3D Interactive Graphics**:
   - Built using Three.js and `@react-three/fiber` / `@react-three/drei`.
   - Hero section features a faceted polyhedron with an inner glowing core, orbital precision rings, and subtle mouse-tilt lerping.
   - 3D Services section features an interactive visual showcase.
   - Respects `prefers-reduced-motion` and automatically downgrades polygon count and rendering intensity on mobile devices to prevent thermal throttling.

2. **Apple-Grade Aesthetic & Design System**:
   - Clean, high-contrast typography (Plus Jakarta Sans & Inter).
   - Crisp layout spacing with generous negative space.
   - Frosted glassmorphism on the sticky header that appears dynamically upon scrolling.
   - Subtle hover elevations (`transform: translateY(-4px)` with curated box-shadows).

3. **Complete CRUD Admin Dashboard**:
   - **Products Management**: Add, update, delete, search, and filter enterprise products.
   - **Services Management**: Update capabilities, change icons, and edit deliverables.
   - **Projects Portfolio**: Publish case studies with categorized tech stacks.
   - **Message Center**: Review contact form inquiries, cycle status (`unread` -> `read` -> `replied`), and delete messages.
   - **User Role Management**: Promote or demote accounts, audit registrations, and remove accounts.

4. **Production Build Tested**:
   ```bash
   cd frontend
   npm run build
   ```
   *Compiles cleanly with zero errors.*

---

## 📄 License
 © 2026 GOKUL TECH SOLUTION PVT LMT.
