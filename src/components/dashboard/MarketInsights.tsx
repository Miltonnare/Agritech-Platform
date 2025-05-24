import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../../context/AppContext';

const MarketInsights = () => {
  const { priceData, crops } = useApp();

  // Get unique crop names from user's crops
  const userCropNames = crops.map(crop => crop.name);
  
  // Get unique markets
  const markets = [...new Set(priceData.map(item => item.marketName))];
  
  // Prepare data for the chart - get average price for each day by crop
  const chartData = [];
  const uniqueDates = [...new Set(priceData.map(item => item.date))].sort();
  
  uniqueDates.forEach(date => {
    const dataPoint: any = { date };
    
    userCropNames.forEach(cropName => {
      // Get all price entries for this crop on this date
      const entries = priceData.filter(
        item => item.cropName === cropName && item.date === date
      );
      
      // Calculate average price across all markets
      if (entries.length > 0) {
        const avgPrice = entries.reduce((sum, item) => sum + item.price, 0) / entries.length;
        dataPoint[cropName] = avgPrice.toFixed(2);
      }
    });
    
    chartData.push(dataPoint);
  });

  // Generate colors for each crop
  const colors = ['#2E7D32', '#795548', '#FFB74D', '#64B5F6', '#E53935'];

  return (
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Market Price Trends</h2>
        <div className="text-sm text-gray-500">Last 7 days</div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickFormatter={(date) => {
                const parts = date.split('-');
                return `${parts[1]}/${parts[2]}`;
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, '']}
              labelFormatter={(date) => `Date: ${date}`}
            />
            <Legend />
            {userCropNames.map((crop, index) => (
              <Line
                key={crop}
                type="monotone"
                dataKey={crop}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-100 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">Market Insights</h3>
          <p className="text-sm text-gray-600">
            Price trends show increased stability for your crops over the past week.
            Consider timing your harvest for optimal market conditions.
          </p>
        </div>
        <div className="border border-gray-100 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">Recommendation</h3>
          <p className="text-sm text-gray-600">
            Tomatoes are currently showing the strongest price trend at Farmville Central Market.
            Consider contacting them about your upcoming harvest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;