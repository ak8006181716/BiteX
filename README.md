# 🍔 BiteX - Full-Stack Food Delivery & Restaurant Platform

A modern, scalable, full-stack online food ordering, restaurant discovery, and delivery platform featuring real-time order tracking, menu customization, multi-address management, and dynamic coupon systems.

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

### 🍽️ Customer Experience
- **Restaurant & Menu Exploration**: Browse nearby restaurants, filter by cuisine, ratings, and active promotions.
- **Interactive Cart & Customizations**: Add items, apply promo coupons, customize dish options, and calculate taxes/fees.
- **Multi-Address Management**: Save multiple home, work, or custom delivery addresses with geolocation coordinates.
- **Real-Time Order Tracking**: Monitor order workflow from creation -> restaurant confirmation -> preparation -> out for delivery.
- **Reviews & Ratings**: Rate dishes and leave feedback for restaurants.

### 🏪 Restaurant & Order Management
- **Menu Control**: Manage categories, food items, availability, pricing, and dietary tags (Veg/Non-Veg).
- **Order Handling**: Accept, update status, and assign orders to delivery agents.

### 🔔 Notifications & Real-Time Chat
- **In-App Notifications**: Alerts for order updates, discounts, and system messages.
- **Support Chat**: Integrated messaging between customers, restaurants, and delivery drivers.

---

## 🛠️ Tech Stack

### **Backend (`/Backend`)**
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT & Cookie Parser
- **Real-time Engine**: Socket.io / WebSockets for live notifications & chat
- **Storage & Helpers**: Cloudinary media upload, Express Validator, Custom API Response & Error Handlers

### **Frontend (`/frontend`)**
- **Framework**: React (Vite)
- **State Management**: Redux Toolkit / React Context
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

---

## 📁 Repository Structure

```
BiteX/
├── Backend/
│   ├── src/
│   │   ├── controllers/      # Auth, User, Address, Restaurant, Menu, Cart, Order, Coupon, Notification, Review
│   │   ├── models/           # Mongoose schemas (User, Address, Restaurant, Menu, Order, Cart, Coupon, Review)
│   │   ├── routes/           # REST API routes
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # ApiError, ApiResponse, asyncHandler helpers
│   │   └── index.js          # Entry point
│   ├── Api.md                # API Documentation
│   ├── flow.md               # Feature workflow
│   └── package.json
│
├── frontend/                 # React Frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Local or MongoDB Atlas)

### 1. Setup Backend
```bash
cd Backend
npm install
```

Create a `Backend/.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
```

Run Backend:
```bash
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Flow Summary

- **Auth**: `/api/v1/users/register`, `/api/v1/users/login`, `/api/v1/users/logout`
- **Address**: `/api/v1/address` (CRUD delivery addresses)
- **Restaurant & Menu**: `/api/v1/restaurants`, `/api/v1/restaurants/:id/menu`
- **Cart**: `/api/v1/cart` (Add, update, remove items, clear cart)
- **Order & Payment**: `/api/v1/orders` (Place order, track status, order history)
- **Coupons**: `/api/v1/coupons/apply`

---

## 📄 License
This project is open-source and licensed under the ISC License.
