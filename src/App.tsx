import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import MarketConnect from './pages/MarketConnect';
import NotificationsList from './components/common/NotificationsList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Auth } from './pages/Auth';
import ErrorBoundary from './components/ErrorBoundary';
import CropDetails from './pages/CropDetails';
import MyCropsPage from './pages/MyCropsPage';
import CropManagementPage from './pages/CropManagementPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to /auth but save the attempted URL
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-6">
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/markets" element={
                    <ProtectedRoute>
                      <MarketsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/markets/:id" element={
                    <ProtectedRoute>
                      <MarketDetailPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/market-connect" element={
                    <ProtectedRoute>
                      <MarketConnect />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-crops" element={
                    <ProtectedRoute>
                      <MyCropsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/crops" element={
                    <ProtectedRoute>
                      <CropsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/crops/manage" element={
                    <ProtectedRoute>
                      <CropManagementPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/crops/:id" element={
                    <ProtectedRoute>
                      <CropDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/weather" element={
                    <ProtectedRoute>
                      <WeatherPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/messages" element={
                    <ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/notifications" element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <NotificationsList />
              <Footer />
            </div>
          </AppProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;