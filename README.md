# **AgriTech-Platform**

A modern, React-based web application designed to empower Kenyan farmers by helping them manage crops, monitor real-time market prices, and connect directly with buyers. This platform leverages digital tools to improve agricultural management, increase market access, and boost farmer incomes.

🌟  **Features**

🌾 # **Crop Management**

**Crop Trackin**: Manage multiple crops with detailed data including variety, quantity, and growth stages.

**Harvest Predictions**: Forecast harvest dates based on growth progress.

**Interactive Dashboard**: Visualize farm data with charts and summaries.

**Crop Calendar**: Plan and monitor planting and harvesting schedules.

Image Upload: Attach photos to crop entries for better monitoring.

🏪 **Market Integration**

Real-time Market Prices: Stay updated with current local market rates.

Buyer Connection: Directly connect with verified buyers nearby.

Price Trends: Access historical price data and trend analysis.

Market Insights: Regional demand patterns and market forecasts.

⛅ Weather Integration

Weather Forecasts: Accurate short and long-term weather updates.

Historical Weather Data: Analyze past weather trends for planning.

Climate-Smart Recommendations: Tailored advice for sustainable farming.

📱 User Features

Profile Management: Customize and manage farmer profiles.

Notifications: Receive alerts for market price changes, weather updates, buyer interests, and harvest reminders.

Messaging System: Communicate securely with buyers and stakeholders.

Multi-language Support: Available in English and Swahili to serve diverse users.

🔧 Technology Stack

Frontend

Framework: React 18+

Routing: React Router v6

Styling: Tailwind CSS, Lucide Icons, Custom Animations

State Management: React Context API

Date Handling: date-fns

Backend Integration

RESTful API integration for data exchange

JWT-based authentication for secure access

Real-time updates for market prices and notifications

📦 Installation Guide

Clone the repository:


Navigate to the project folder and install dependencies:

cd AgriTech
npm install

Set up environment variables:

cp .env.example .env
# Edit .env with your API keys and URLs

Run the development server:
npm run dev

🔐 Environment Variables
Create a .env file with the following keys:

REACT_APP_API_URL=your_api_url

REACT_APP_WEATHER_API_KEY=your_weather_api_key

REACT_APP_MAPS_API_KEY=your_maps_api_key

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Shared components like buttons, inputs
│   ├── dashboard/       # Components specific to dashboard views
│   └── layout/          # Header, footer, navigation
├── context/             # React Context providers for state management
├── pages/               # Page-level components (routes)
├── services/            # API calls and external integrations
├── types/               # TypeScript type definitions
├── utils/               # Helper functions and utilities
└── data/                # Mock data and constants
```

### 🔄 State Management

- **AuthContext**: Manages user authentication and profile state.
- 
- **AppContext**: Handles global app state including crop data, market info, notifications, and messaging.


🛠️ Development Workflow

Code Quality

Written in TypeScript for type safety

ESLint for linting and enforcing coding standards

Prettier for consistent code formatting

Testing
Run tests with:


npm test
Production Build
Create optimized production build:


npm run build
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch:

bash
git checkout -b feature/your-feature-name
Commit your changes:

bash
git commit -m "Add your feature description"
Push to your branch:

bash
git push origin feature/your-feature-name
Open a Pull Request for review.

## 📷 Project Screenshots
<img width="923" alt="produc" src="https://github.com/user-attachments/assets/793bd56c-4c4e-4145-80b8-db6effd9eaa9" />
<img width="939" alt="vbnnm" src="https://github.com/user-attachments/assets/349a66a4-ace4-43bd-8db1-db1339046438" />
<img width="944" alt="vhyjk" src="https://github.com/user-attachments/assets/8c85cbcb-8bfe-4e3c-9025-847582377fe1" />

<img width="935" alt="HHJJXC" src="https://github.com/user-attachments/assets/6efa00ee-7f33-4da9-a9c5-6e653edd58d5" />
<img width="907" alt="RYJKJ" src="https://github.com/user-attachments/assets/59588977-5758-4e6d-80ac-5cc2dc99d69f" />
<img width="949" alt="TFYJIK" src="https://github.com/user-attachments/assets/b7f2c286-3469-40b6-af68-fb15336f7d7f" />
<img width="920" alt="wert" src="https://github.com/user-attachments/assets/f289c6b0-aab5-42e4-9844-73a7c480dfef" />
<img width="941" alt="dfgh" src="https://github.com/user-attachments/assets/f09c1e13-8c9a-458c-b12d-208ea5ee15a5" />



🚀 Deployment. 

Visit the [frontend app](https://agritechplatform.netlify.app) deployed on Netlify.


🔧 Backend (Render)

Create a Render Account: https://render.com

Create a New Web Service:

Connect your GitHub repo.

Select your backend project folder.

Set build command (if using TypeScript):

bash
Copy
Edit
npm install && npm run build
Set start command:

bash
Copy
Edit
npm run start
Set environment variables:

PORT: 10000 or leave blank (Render auto-assigns)

MONGODB_URI: (your MongoDB Atlas URI)

CORS_ORIGIN: https://agritechplatform.netlify.app

Auto Deploy: Enable auto-deploy from GitHub for continuous updates.

🗄️ Database (MongoDB Atlas)
Go to MongoDB Atlas

Create a free cluster and a database user

Whitelist 0.0.0.0/0 for public access (or Render IP only)

Copy the Connection URI, and paste it into your .env and Render dashboard under MONGODB_URI

🌐 Frontend (Netlify)
Go to Netlify

Connect your frontend repo (React/Vite/Next)

Set build settings:

Build command: npm run build

Publish directory: dist (for Vite/React)

Set environment variables:

VITE_API_URL: https://<your-render-backend-url>/api

Deploy and preview your frontend live at https://<your-site>.netlify.app

✅ Final Checklist
 Backend is reachable at https://your-render-app.onrender.com/api

 Frontend is hosted at https://your-site.netlify.app

 CORS settings include both local and Netlify frontend URLs

 MongoDB Atlas is connected and open to backend IP or all (0.0.0.0/0 for development)


📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

👥 Team

Project Lead & Developer: MILTON

🙏 Acknowledgments

Tailwind CSS

React Router

Lucide Icons

date-fns

📞 Support
For support or questions, please contact:
Email: miltonnareblessed@gmail.com

MIT License

Copyright (c) 2025 Agri-Tech Platform

