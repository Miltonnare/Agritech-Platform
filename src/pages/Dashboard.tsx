import React from 'react';
import MarketInsights from '../components/dashboard/MarketInsights';
import MyCrops from '../components/dashboard/MyCrops';
import NearbyMarkets from '../components/dashboard/NearbyMarkets';
import PriceAlerts from '../components/dashboard/PriceAlerts';
import WeatherForecast from '../components/dashboard/WeatherForecast';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user } = useApp();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name.split(' ')[0]}</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
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