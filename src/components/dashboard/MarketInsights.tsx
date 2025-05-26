import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../../context/AppContext';

interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

interface CropPriceData {
  basePrice: number;
  unit: string;
  weeklyTrend: number[];
}

type KenyaCropPrices = {
  [key: string]: CropPriceData;
};

// Kenyan market data
const KENYA_MARKETS = {
  'Wakulima': 'Nairobi',
  'Kongowea': 'Mombasa',
  'Gikomba': 'Nairobi',
  'Eldoret': 'Rift Valley',
  'Nakuru': 'Rift Valley',
  'Kisumu': 'Nyanza'
};

// Sample price data for common crops (in KES)
const KENYA_CROP_PRICES: KenyaCropPrices = {
  'Tomatoes': { 
    basePrice: 4000,
    unit: 'crate',
    weeklyTrend: [3800, 4000, 4200, 4100, 4300, 4200, 4000]
  },
  'Maize': {
    basePrice: 4500,
    unit: '90kg bag',
    weeklyTrend: [4200, 4300, 4500, 4600, 4500, 4700, 4800]
  },
  'Beans': {
    basePrice: 10000,
    unit: '90kg bag',
    weeklyTrend: [9800, 10000, 10200, 10500, 10300, 10400, 10600]
  },
  'Wheat': {
    basePrice: 5500,
    unit: '90kg bag',
    weeklyTrend: [5300, 5400, 5500, 5600, 5800, 5700, 5500]
  },
  'Potatoes': {
    basePrice: 3000,
    unit: '90kg bag',
    weeklyTrend: [2800, 3000, 3200, 3100, 3000, 3200, 3300]
  },
  'Green Grams': {
    basePrice: 12000,
    unit: '90kg bag',
    weeklyTrend: [11800, 12000, 12200, 12500, 12300, 12100, 12400]
  },
  'Rice': {
    basePrice: 7500,
    unit: '50kg bag',
    weeklyTrend: [7300, 7400, 7500, 7600, 7800, 7700, 7500]
  }
};

const MarketInsights = () => {
  const { priceData } = useApp();
  
  // Get unique markets
  const markets = Object.keys(KENYA_MARKETS);
  
  // Generate chart data using Kenyan prices
  const chartData: ChartDataPoint[] = [];
  const today = new Date();
  
  // Generate data for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dataPoint: ChartDataPoint = {
      date: date.toISOString().split('T')[0]
    };

    // Add price data for each crop
    Object.entries(KENYA_CROP_PRICES).forEach(([crop, data]) => {
      // Remove the userCropNames check to show all crops
      dataPoint[crop] = data.weeklyTrend[6-i];
    });

    chartData.push(dataPoint);
  }

  // Generate colors for each crop - using distinct colors
  const colors = [
    '#2E7D32', // Forest Green for Tomatoes
    '#C62828', // Deep Red for Wheat
    '#F57F17', // Amber for Maize
    '#1565C0', // Strong Blue for Beans
    '#6A1B9A', // Deep Purple for Potatoes
    '#00695C', // Teal for Green Grams
    '#E91E63'  // Pink for Rice (completely different from all others)
  ];

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
              tickFormatter={(value) => `KES ${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value: any) => [`KES ${value.toLocaleString()}`, '']}
              labelFormatter={(date) => `Date: ${date}`}
            />
            <Legend />
            {Object.keys(KENYA_CROP_PRICES).map((crop, index) => (
              <Line
                key={crop}
                type="monotone"
                dataKey={crop}
                name={`${crop} (${KENYA_CROP_PRICES[crop].unit})`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-100 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-800 mb-3">Market Insights</h3>
          <div className="space-y-2.5">
            <div className="text-sm text-gray-600 p-2 bg-primary-50 rounded">
              <span className="font-medium">Price Trends:</span> Maize prices up 8% at Eldoret Market, beans stable at Wakulima.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-secondary-50 rounded">
              <span className="font-medium">Market Activity:</span> High wheat demand in Nakuru, prices expected to rise.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-accent-50 rounded">
              <span className="font-medium">Supply Analysis:</span> Green grams supply low in Mombasa region.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-success-50 rounded">
              <span className="font-medium">Buyer Interest:</span> Large-scale buyers seeking maize and wheat in Rift Valley.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-warning-50 rounded">
              <span className="font-medium">Market Forecast:</span> Rice prices expected to stabilize next month.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-info-50 rounded">
              <span className="font-medium">Competition:</span> New grain traders active in Bungoma and Trans-Nzoia.
            </div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-md p-4">
          <h3 className="text-md font-medium text-gray-800 mb-3">Recommendations</h3>
          <div className="space-y-2.5">
            <div className="text-sm text-gray-600 p-2 bg-primary-50 rounded">
              <span className="font-medium">Immediate Action:</span> Consider selling maize at Eldoret (KES 4,800/90kg).
            </div>
            <div className="text-sm text-gray-600 p-2 bg-secondary-50 rounded">
              <span className="font-medium">Planning:</span> Store beans for better prices in Nairobi markets.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-accent-50 rounded">
              <span className="font-medium">Opportunity:</span> Wheat demand rising in Nakuru (KES 5,800/90kg).
            </div>
            <div className="text-sm text-gray-600 p-2 bg-warning-50 rounded">
              <span className="font-medium">Market Event:</span> Grain traders' meeting in Eldoret next week.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-success-50 rounded">
              <span className="font-medium">Growth Strategy:</span> Consider green grams farming - high margins.
            </div>
            <div className="text-sm text-gray-600 p-2 bg-info-50 rounded">
              <span className="font-medium">Partnership:</span> NCPB seeking quality wheat suppliers.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border border-gray-100 rounded-md p-4">
        <h3 className="text-md font-medium text-gray-800 mb-3">Market Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="text-sm text-gray-600 p-2 bg-primary-50 rounded">
            <span className="font-medium">Total Active Markets:</span> {markets.length}
          </div>
          <div className="text-sm text-gray-600 p-2 bg-secondary-50 rounded">
            <span className="font-medium">Average Price Trend:</span> +12% this week
          </div>
          <div className="text-sm text-gray-600 p-2 bg-accent-50 rounded">
            <span className="font-medium">Market Sentiment:</span> Positive
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;