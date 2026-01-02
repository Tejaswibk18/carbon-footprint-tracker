🌱 Carbon Footprint Tracker

A full-stack sustainability platform built with the MERN stack, Firebase Authentication, and an AI-powered chatbot (EcoBot) to help users track, analyze, and reduce their carbon footprint through actionable insights and modern data visualizations.

This project focuses on awareness + behavior change, encouraging eco-friendly habits using analytics, progress tracking, and AI assistance.

🚀 Key Features
🔐 Authentication & Security

Secure Firebase Authentication

Protected routes for dashboard access

User-specific data storage and retrieval

📝 Daily Carbon Activity Tracking

Log daily activities:

🚗 Travel (car, bus, bike, train with fuel types)

⚡ Electricity usage (restricted to 3rd of every month)

🍽️ Food habits (veg & non-veg meals)

🛍️ Shopping expenses

🗑️ Waste generation

Smart input validation and user guidance

📊 Advanced Analytics & Insights

Monthly comparison charts (current vs previous month)

Category-wise emission breakdown

Color-coded progress bars

🟢 Improved usage

🔴 Increased usage

🟣 Previous month baseline

Interactive charts using Recharts

📈 Progress & Sustainability Score

Green Score (0–100) based on weighted activities

Best-performing and improvement-needed categories

Motivational tips based on performance

Estimated month-over-month sustainability improvement

🤖 AI EcoBot (Smart Green Assistant)

Floating chatbot available across the app

Answers questions like:

“How can I reduce my carbon footprint?”

“How do I use this website?”

“Who created this platform?”

Provides:

Personalized eco-friendly tips

Guidance on using features

Project and developer introduction

Designed with modern glass-morphism UI

📚 Reference & Methodology Page

Scientifically backed emission formulas

Clear explanation of:

Travel, food, electricity, shopping, and waste emissions

Sources from trusted organizations (IPCC, IEA, EPA, WWF)

Modern, research-style UI layout

🎨 Modern UI & UX

Responsive design using Tailwind CSS

Smooth animations with Framer Motion

Glass-morphism cards and eco-themed gradients

Clean dashboard layout with intuitive navigation

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Framer Motion

Recharts

Lucide Icons

Backend

Node.js

Express.js

MongoDB

RESTful APIs

Authentication

Firebase Authentication

AI Integration

EcoBot Chatbot (API-based conversational AI)

📁 Project Structure
carbon-footprint-tracker/
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── pages/         # Landing, Auth, Dashboard pages
│   │   ├── components/    # Chatbot, UI components
│   │   ├── context/       # Auth context
│   │   └── styles/        # Global styles
│
├── backend/               # Express backend
│   ├── routes/            # API routes
│   ├── models/            # MongoDB schemas
│   └── index.js           # Server entry point
│
├── .env                   # Environment variables
├── .gitignore
└── README.md




Key Functional Rules

Electricity input allowed only on the 3rd of each month

Negative values are restricted

Data is user-specific and securely stored

Visual indicators always match underlying analytics logic

✨ Future Enhancements

📱 Mobile application (React Native / Flutter)

🏆 Achievement badges & eco streaks

📤 Export monthly reports (PDF/CSV)

🌍 Community leaderboard

🧠 AI-based personalized reduction plans

🔔 Smart reminders & notifications

👨‍💻 About the Developer

This project was designed and developed by Tejaswi Kiranagi,
a Computer Science student passionate about sustainability, data-driven solutions, and modern web technologies.

The goal of this project is to combine technology + environmental responsibility to create real-world impact.

🤝 Contributing

Contributions, feedback, and suggestions are welcome!
If you’d like to improve this project:

Fork the repository

Create a feature branch

Commit your changes

Submit a pull request

🌍 Final Note

“Every small action matters. Awareness today leads to a greener tomorrow.”

🌱 Let’s build a more sustainable future — one data point at a time.
