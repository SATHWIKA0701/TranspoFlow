#  Smart Transport Management System

A full-stack MERN application developed for intelligent logistics and manufacturing transport operations management. The platform helps organizations efficiently manage vehicles, drivers, deliveries, scheduling, shipment tracking, and operational analytics through a modern responsive dashboard.

---

#  Project Overview

The Smart Transport Management System is designed to streamline manufacturing and logistics workflows by digitizing transport operations.

The system centralizes:

- Fleet management
- Driver management
- Delivery scheduling
- Shipment tracking
- Transport analytics
- Vehicle utilization
- Delivery workflow monitoring

into a single scalable web platform.

This project was developed as part of the **Isaii AI MERN Stack Developer Internship Technical Assessment**.

---

# Features

## Authentication & Authorization
- JWT-based secure authentication
- User registration & login
- Persistent login sessions
- Protected frontend routes
- Backend middleware authorization
- Secure password hashing using bcrypt

---

##  Vehicle Management
- Add vehicles
- Edit vehicle details
- Delete vehicles
- Vehicle status management
- Fuel type management
- Vehicle utilization analytics
- Maintenance tracking

---

##  Driver Management
- Add drivers
- Edit driver details
- Delete drivers
- License tracking
- Driver availability management
- Driver assignment system
- Experience tracking

---

##  Delivery Management
- Create deliveries
- Edit delivery information
- Delete deliveries
- Assign drivers & vehicles
- Delivery scheduling
- Shipment status tracking
- Delivery priority management
- Search & filter deliveries

---

##  Shipment Tracking
- Real-time delivery workflow tracking
- Status timeline management
- Delivery lifecycle visualization

---

##  Reports & Analytics
- Dashboard insights
- Vehicle utilization analytics
- Delivery status analytics
- Monthly delivery reports
- Priority shipment tracking
- Real-time operational analytics

---

##  Scheduling System
- Delivery schedule management
- Date-based planning
- Delayed shipment monitoring
- Upcoming delivery tracking

---

##  Modern UI/UX
- Responsive modern dashboard
- Framer Motion animations
- Interactive charts
- Glassmorphism UI design
- Sidebar navigation system
- Mobile responsive layouts
- Professional modals & loaders

---

# Tech Stack

# Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend Library |
| Vite | Frontend Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | API Communication |
| React Router DOM | Routing |
| Recharts | Analytics Charts |
| React Hot Toast | Notifications |
| Lucide React | Icons |

---

# Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| dotenv | Environment Variables |
| CORS | Cross-Origin Requests |

---

#  System Architecture

```txt
Frontend (React + Vite)
        ↓
Axios API Layer
        ↓
Express REST API
        ↓
Authentication Middleware
        ↓
Controllers
        ↓
MongoDB Database
```

---

#  Application Workflow

# 1. Authentication Flow

```txt
User Register/Login
        ↓
JWT Token Generated
        ↓
Token Stored in localStorage
        ↓
Protected API Requests
        ↓
Middleware Verification
        ↓
Authorized Access
```

---

# 2. Delivery Workflow

```txt
Create Delivery
        ↓
Assign Vehicle
        ↓
Assign Driver
        ↓
Schedule Shipment
        ↓
Dispatch Delivery
        ↓
In Transit
        ↓
Delivered / Delayed
```

---

# 3. Dashboard Analytics Workflow

```txt
MongoDB Aggregation
        ↓
Dashboard Controller
        ↓
REST API Response
        ↓
Frontend Visualization
        ↓
Charts & Analytics Dashboard
```

---

#  Project Structure

# Frontend Structure

```txt
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusBadge.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Deliveries.jsx
│   │   ├── Drivers.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Reports.jsx
│   │   ├── Schedule.jsx
│   │   ├── Settings.jsx
│   │   ├── Tracking.jsx
│   │   └── Vehicles.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── package.json
└── vite.config.js
```

---

# Backend Structure

```txt
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
│   ├── deliveryController.js
│   ├── driverController.js
│   └── vehicleController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Delivery.js
│   ├── Driver.js
│   ├── User.js
│   └── Vehicle.js
│
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── deliveryRoutes.js
│   ├── driverRoutes.js
│   └── vehicleRoutes.js
│
├── .env
├── package.json
├── server.js
└── nodemon.json
```

---

#  Database Design

# User Schema

```txt
name
email
password
role
timestamps
```

---

# Vehicle Schema

```txt
vehicleNumber
type
capacity
status
fuelType
lastServiceDate
timestamps
```

---

# Driver Schema

```txt
name
phone
licenseNumber
experience
availability
assignedVehicle
timestamps
```

---

# Delivery Schema

```txt
shipmentId
materialName
pickupLocation
destination
assignedVehicle
assignedDriver
priority
status
scheduledDate
expectedDeliveryDate
deliveryDate
notes
timestamps
```

---

# REST API Endpoints

# Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/me | Current User |

---

# Vehicle APIs

| Method | Endpoint |
|---|---|
| GET | /api/vehicles |
| POST | /api/vehicles |
| PUT | /api/vehicles/:id |
| DELETE | /api/vehicles/:id |

---

# Driver APIs

| Method | Endpoint |
|---|---|
| GET | /api/drivers |
| POST | /api/drivers |
| PUT | /api/drivers/:id |
| DELETE | /api/drivers/:id |

---

# Delivery APIs

| Method | Endpoint |
|---|---|
| GET | /api/deliveries |
| POST | /api/deliveries |
| PUT | /api/deliveries/:id |
| DELETE | /api/deliveries/:id |

---

# Dashboard APIs

| Method | Endpoint |
|---|---|
| GET | /api/dashboard |
| GET | /api/dashboard/stats |

---

#  Environment Variables

# Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173
```

---

# Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

#  Installation Guide

# 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

---

# 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 4. Configure Environment Variables

Create `.env` files inside frontend and backend folders.

---

# 5. Run Backend Server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# 6. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# Production Build

# Frontend Build

```bash
npm run build
```

---

# Backend Production

```bash
npm start
```

---

#  Security Features

- JWT authentication
- Password hashing with bcrypt
- Protected routes
- Secure middleware authorization
- Environment variable protection
- CORS protection

---

#  Future Enhancements

- Real-time GPS tracking
- Socket.IO live updates
- AI-powered logistics recommendations
- Route optimization
- Role-based access control
- Email notifications
- PDF invoice generation
- Cloud file uploads
- Advanced analytics engine

---

#  Deployment

# Frontend Deployment
- Vercel

# Backend Deployment
- Render

# Database
- MongoDB Atlas

---
