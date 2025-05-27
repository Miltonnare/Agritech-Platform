import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import Auth from '../pages/Auth';
import CropsPage from '../pages/CropsPage';
import MarketsPage from '../pages/MarketsPage';
import WeatherPage from '../pages/WeatherPage';
import ProfilePage from '../pages/ProfilePage';
import NotificationsPage from '../pages/NotificationsPage';
import MessagesPage from '../pages/MessagesPage';
import CropDetailPage from '../pages/CropDetailPage';
import MarketDetailPage from '../pages/MarketDetailPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/crops" element={<PrivateRoute><CropsPage /></PrivateRoute>} />
      <Route path="/crops/:id" element={<PrivateRoute><CropDetailPage /></PrivateRoute>} />
      <Route path="/markets" element={<PrivateRoute><MarketsPage /></PrivateRoute>} />
      <Route path="/markets/:id" element={<PrivateRoute><MarketDetailPage /></PrivateRoute>} />
      <Route path="/weather" element={<PrivateRoute><WeatherPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
      <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 