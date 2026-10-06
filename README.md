# Apex Dynamics — Modern Premium 3D Business Website

A complete, modern, premium business web application built for real-world enterprise operations. Features a clean, Apple-level minimalist user interface, lightweight interactive 3D hero visualization via Three.js / React Three Fiber, smooth Framer Motion animations, a secure Node.js + Express backend, MongoDB / Mongoose database with auto-seeding, JWT authentication, and a full-featured Admin Dashboard with CRUD capabilities.

---

## 🚀 Live Services & Architecture Overview

- **Frontend**: `http://localhost:5173` (Vite + React 19 + React Three Fiber + Drei + Framer Motion + Vanilla CSS Design System)
- **Backend API**: `http://localhost:5001` (Express + Mongoose + JWT + bcryptjs + CORS)
- **Database**: MongoDB with automatic embedded in-memory fallback for zero-configuration local development + support for local/remote MongoDB Atlas URI.

---

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

## 🛠️ Getting Started & Installation

### Prerequisites
- Node.js (v18 or higher; tested on v24.21.0)
- npm (v9 or higher)

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`):
```env
PORT=5001
NODE_ENV=development
MONGO_URI=
JWT_SECRET=business_premium_ultra_secret_key_jwt_token_2026_prod
```
> **Note on MongoDB**: If `MONGO_URI` is left blank, the backend automatically spins up an embedded in-memory MongoDB instance. This enables immediate testing out-of-the-box without requiring a local `mongod` daemon. When you are ready for persistent storage, paste your MongoDB Atlas or local connection string in `MONGO_URI`.
> **Note on Port**: Port `5001` is used by default to prevent conflicts with macOS AirPlay / ControlCenter which reserves port 5000.

### Frontend (`frontend/.env`):
```env
VITE_API_URL=/api
```

---

## 💻 Running the Application Locally

Open two terminal windows:

### Terminal 1 — Start the Backend API:
```bash
cd backend
npm run dev
# Or: npm start
```
*The server will start at `http://localhost:5001` and seed initial admin credentials, products, services, and projects.*

### Terminal 2 — Start the Vite Frontend Dev Server:
```bash
cd frontend
npm run dev
```
*Open your browser and navigate to `http://localhost:5173`.*

---

## 🔑 Default Credentials & Demo Access

The backend automatically creates demo accounts upon first startup:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Administrator** | `admin@business.com` | `admin123` | Full access to `/admin` dashboard and CRUD management |
| **Standard User** | `user@business.com` | `user123` | Standard client access |

> The `/login` page also includes **One-Click Demo Autofill buttons** for both the Admin and Standard User.

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
MIT © 2026 Apex Dynamics, Inc.
