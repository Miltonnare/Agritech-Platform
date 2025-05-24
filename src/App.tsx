import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import MarketsPage from './pages/MarketsPage';
import CropsPage from './pages/CropsPage';
import WeatherPage from './pages/WeatherPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import CropDetailPage from './pages/CropDetailPage';
import MarketDetailPage from './pages/MarketDetailPage';
import NotificationsList from './components/common/NotificationsList';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/markets/:id" element={<MarketDetailPage />} />
              <Route path="/crops" element={<CropsPage />} />
              <Route path="/crops/:id" element={<CropDetailPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
          <NotificationsList />
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;