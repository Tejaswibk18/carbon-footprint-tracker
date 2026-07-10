# 🌱 Carbon Footprint Tracker

<p align="center">
  <strong>A full-stack sustainability platform that helps users track, analyze, and reduce their carbon footprint through interactive analytics and an AI-powered assistant.</strong>
</p>

<p align="center">
  Built with React, Node.js, Express, MongoDB, Firebase Authentication, and AI.
</p>

---

## 📖 Overview

Carbon Footprint Tracker is a modern MERN-based web application designed to encourage sustainable living by helping users monitor their daily carbon emissions.

The platform provides insightful analytics, sustainability scores, interactive dashboards, and an AI-powered assistant (**EcoBot**) that offers eco-friendly recommendations and guides users throughout the application.

---

# ✨ Features

## 🔐 Authentication

- Firebase Authentication
- Secure login and registration
- Protected dashboard routes
- User-specific data storage

---

## 📝 Daily Activity Tracking

Users can record their daily carbon-emitting activities including:

- 🚗 Travel
  - Car
  - Bike
  - Bus
  - Train
  - Fuel type selection

- ⚡ Electricity Consumption
  - Available only on the **3rd day of every month**

- 🍽️ Food Habits
  - Vegetarian meals
  - Non-vegetarian meals

- 🛍️ Shopping

- 🗑️ Waste Generation

### Input Validation

- Prevents negative values
- User-friendly validation messages
- Activity-specific constraints

---

## 📊 Analytics Dashboard

Gain insights into your environmental impact through:

- 📈 Monthly emission comparison
- 📊 Category-wise emission charts
- 📉 Previous vs Current month analysis
- 📌 Interactive Recharts visualizations

### Color Indicators

| Color | Meaning |
|--------|----------|
| 🟢 | Improved usage |
| 🔴 | Increased emissions |
| 🟣 | Previous month baseline |

---

## 🌿 Sustainability Score

The application calculates a **Green Score (0–100)** based on user activities.

It provides:

- Overall sustainability score
- Best-performing categories
- Areas needing improvement
- Estimated month-over-month progress
- Personalized motivational tips

---

## 🤖 EcoBot – AI Green Assistant

A floating AI chatbot available across the application.

### EcoBot can help with:

- 🌱 Carbon footprint reduction tips
- 📖 Website usage guidance
- 👨‍💻 Project information
- 👋 Developer introduction
- ❓ General sustainability questions

### UI Highlights

- Glassmorphism design
- Responsive floating widget
- Friendly conversational interface

---

## 📚 Reference & Methodology

A dedicated page explains how emissions are calculated using trusted environmental research.

### Covers

- Travel emissions
- Electricity emissions
- Food emissions
- Shopping emissions
- Waste emissions

### Reference Sources

- IPCC
- IEA
- EPA
- WWF

---

# 🎨 User Interface

- 🌿 Modern eco-themed design
- 📱 Fully responsive
- ✨ Framer Motion animations
- 🪟 Glassmorphism cards
- 🎯 Intuitive dashboard
- 🌈 Tailwind CSS styling

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- REST APIs

## Authentication

- Firebase Authentication

## AI

- EcoBot (Conversational AI Integration)

---

# 📂 Project Structure

```text
carbon-footprint-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── styles/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── package.json
│   └── index.js
│
├── .env
├── .gitignore
└── README.md
```

---

# ⚙️ Business Rules

- ✅ Electricity usage can only be entered on the **3rd day** of each month.
- ✅ Negative values are not accepted.
- ✅ Every user's data is isolated and securely stored.
- ✅ Analytics update dynamically after every submission.
- ✅ Dashboard reflects real-time emission calculations.

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Tejaswibk18/carbon-footprint-tracker.git
```

## Navigate

```bash
cd carbon-footprint-tracker
```

## Install Frontend

```bash
cd frontend
npm install
npm start
```

## Install Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔮 Future Enhancements

- 📱 Mobile Application (React Native / Flutter)
- 🏆 Achievement Badges
- 🔥 Eco Streak Tracking
- 📤 PDF & CSV Report Export
- 🌍 Community Leaderboard
- 🧠 AI-Powered Personalized Reduction Plans
- 🔔 Smart Notifications & Reminders
- 📊 Advanced Analytics Dashboard

---

# 👨‍💻 Developer

**Tejaswi Kiranagi**

Computer Science Engineer passionate about:

- Sustainable Technology
- Full Stack Development
- Artificial Intelligence
- Data Visualization
- Modern UI/UX

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 🌍 Vision

> **"Every small action matters. Awareness today leads to a greener tomorrow."**

Let's build a more sustainable future—one data point at a time.

---

## ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.
