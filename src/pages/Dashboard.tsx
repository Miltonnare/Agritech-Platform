import React from 'react';
import MarketInsights from '../components/dashboard/MarketInsights';
import MyCrops from '../components/dashboard/MyCrops';
import NearbyMarkets from '../components/dashboard/NearbyMarkets';
import PriceAlerts from '../components/dashboard/PriceAlerts';
import WeatherForecast from '../components/dashboard/WeatherForecast';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get current time for appropriate greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get user's first name
  const firstName = user?.name?.split(' ')[0] || 'there';
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {getGreeting()}, {firstName}!
            </h1>
            <p className="text-gray-600">
              Welcome to your farming dashboard. Here's your daily overview.
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeatherForecast />
        </div>
        <div>
          <PriceAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketInsights />
        </div>
        <div>
          <NearbyMarkets />
        </div>
      </div>

      <div>
        <MyCrops />
      </div>
    </div>
  );
};

export default Dashboard;