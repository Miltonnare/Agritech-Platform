import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format } from 'date-fns';

// Kenyan price ranges per unit (KES)
const KENYA_CROP_PRICES = {
  'Tomatoes': { min: 3000, max: 4500, unit: 'crate' },
  'Potatoes': { min: 2200, max: 3500, unit: '90kg bag' },
  'Onions': { min: 8000, max: 11000, unit: '100kg bag' },
  'Maize': { min: 4000, max: 5500, unit: '90kg bag' },
  'Beans': { min: 8500, max: 12000, unit: '90kg bag' },
  'Cabbage': { min: 1500, max: 2500, unit: '50kg bag' },
  'Carrots': { min: 2800, max: 4000, unit: '50kg bag' },
  'Green Peas': { min: 7000, max: 9500, unit: '90kg bag' }
};

const PriceAlerts = () => {
  const { priceData, crops } = useApp();
  
  // Get unique crop names from user's crops
  const userCropNames = crops.map(crop => crop.name);
  
  // Filter price data for significant changes (>5%) in the last day for user's crops
  const significantChanges = priceData.filter(item => {
    return userCropNames.includes(item.cropName) && 
           Math.abs(item.percentChange) > 5 &&
           item.date === format(new Date(), 'yyyy-MM-dd');
  });
  
  // Sort by absolute percentage change (highest first)
  significantChanges.sort((a, b) => Math.abs(b.percentChange) - Math.abs(a.percentChange));
  
  // Take top 5
  const topAlerts = significantChanges.slice(0, 5);

  const getTrendIcon = (trend: string, percentChange: number) => {
    if (trend === 'up') {
      return <TrendingUp className="text-success-500" size={18} />;
    } else if (trend === 'down') {
      return <TrendingDown className="text-error-500" size={18} />;
    }
    return <Minus className="text-gray-500" size={18} />;
  };
  
  const getTrendClass = (trend: string) => {
    if (trend === 'up') return 'text-success-500';
    if (trend === 'down') return 'text-error-500';
    return 'text-gray-500';
  };

  // Sample alerts with realistic Kenyan prices
  const sampleAlerts = [
    {
      id: '1',
      cropName: 'Tomatoes',
      marketName: 'Wakulima Market',
      price: 4200,
      unit: 'crate',
      trend: 'up',
      percentChange: 15,
      date: format(new Date(), 'yyyy-MM-dd')
    },
    {
      id: '2',
      cropName: 'Potatoes',
      marketName: 'Kongowea Market',
      price: 3200,
      unit: '90kg bag',
      trend: 'up',
      percentChange: 8,
      date: format(new Date(), 'yyyy-MM-dd')
    },
    {
      id: '3',
      cropName: 'Onions',
      marketName: 'Gikomba Market',
      price: 9500,
      unit: '100kg bag',
      trend: 'down',
      percentChange: -7,
      date: format(new Date(), 'yyyy-MM-dd')
    },
    {
      id: '4',
      cropName: 'Maize',
      marketName: 'Eldoret Market',
      price: 5200,
      unit: '90kg bag',
      trend: 'up',
      percentChange: 12,
      date: format(new Date(), 'yyyy-MM-dd')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Price Alerts</h2>
        <a href="/markets" className="text-primary-500 hover:text-primary-600 text-sm">
          View All
        </a>
      </div>

      {sampleAlerts.length > 0 ? (
        <div className="space-y-3">
          {sampleAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getTrendIcon(alert.trend, alert.percentChange)}
                <div>
                  <h3 className="font-medium text-gray-800">{alert.cropName}</h3>
                  <p className="text-sm text-gray-500">{alert.marketName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">KES {alert.price.toLocaleString()}/{alert.unit}</p>
                <p className={`text-sm ${getTrendClass(alert.trend)}`}>
                  {alert.percentChange > 0 ? '+' : ''}{alert.percentChange}%
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
          <AlertCircle size={32} className="mb-2 text-gray-400" />
          <p>No significant price changes today for your crops.</p>
          <p className="text-sm mt-1">Check back tomorrow for updates.</p>
        </div>
      )}
    </div>
  );
};

export default PriceAlerts;