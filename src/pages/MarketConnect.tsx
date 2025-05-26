import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, BarChart2, Search, Filter, MapPin, Star, ExternalLink, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Buyer {
  id: string;
  name: string;
  location: string;
  distance: number;
  rating: number;
  purchaseHistory: number;
  offerPrice: number;
  preferredCrops: string[];
  paymentTerms: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

type Currency = 'USD' | 'KES';

interface CropPriceData {
  price: number;
  change: string;
  demand: string;
  revenue: number;
}

interface MarketInsights {
  averagePrice: number;
  priceChange: string;
  topBuyers: number;
  demandTrend: string;
}

const EXCHANGE_RATE = {
  USD_TO_KES: 134.50, // Example exchange rate
};

const formatCurrency = (amount: number, currency: Currency): string => {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    const kesAmount = amount * EXCHANGE_RATE.USD_TO_KES;
    return `KES ${kesAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

const MarketConnect = () => {
  const { user } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [filters, setFilters] = useState({
    distance: 'all',
    rating: 0,
    verificationStatus: 'all'
  });

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'KES' : 'USD');
  };

  // Simulated data - In a real app, this would come from an API
  const buyers: Buyer[] = [
    {
      id: '1',
      name: 'FreshMart Distributors',
      location: 'Nairobi',
      distance: 15,
      rating: 4.8,
      purchaseHistory: 50000,
      offerPrice: 25.00,
      preferredCrops: ['Tomatoes', 'Potatoes', 'Onions'],
      paymentTerms: 'Immediate',
      verificationStatus: 'verified'
    },
    {
      id: '2',
      name: 'Organic Foods Co.',
      location: 'Mombasa',
      distance: 25,
      rating: 4.5,
      purchaseHistory: 35000,
      offerPrice: 27.00,
      preferredCrops: ['Organic Vegetables', 'Fruits'],
      paymentTerms: '7 days',
      verificationStatus: 'verified'
    },
    {
      id: '3',
      name: 'Regional Wholesalers',
      location: 'Kisumu',
      distance: 8,
      rating: 4.2,
      purchaseHistory: 28000,
      offerPrice: 23.00,
      preferredCrops: ['All Vegetables', 'Grains'],
      paymentTerms: '15 days',
      verificationStatus: 'verified'
    }
  ];

  // Price data for different crops
  const cropPrices: Record<string, CropPriceData> = {
    'Tomatoes': { price: 25.00, change: '+5%', demand: 'High', revenue: 850.00 },
    'Potatoes': { price: 18.50, change: '+3%', demand: 'Medium', revenue: 650.00 },
    'Onions': { price: 22.00, change: '+7%', demand: 'High', revenue: 750.00 },
    'Organic Vegetables': { price: 35.00, change: '+10%', demand: 'Very High', revenue: 1200.00 },
    'Fruits': { price: 28.00, change: '+4%', demand: 'Medium', revenue: 900.00 },
    'All Vegetables': { price: 24.00, change: '+6%', demand: 'High', revenue: 800.00 },
    'Grains': { price: 20.00, change: '+2%', demand: 'Stable', revenue: 700.00 }
  };

  // Calculate average values across all crops if no specific crop is selected
  const calculateAverages = (): CropPriceData => {
    if (!selectedCrop) {
      const crops = Object.values(cropPrices);
      return {
        price: crops.reduce((sum, crop) => sum + crop.price, 0) / crops.length,
        change: '+5%', // Average change
        demand: 'High',
        revenue: crops.reduce((sum, crop) => sum + crop.revenue, 0) / crops.length
      };
    }
    return cropPrices[selectedCrop] || cropPrices['All Vegetables'];
  };

  const currentPrices = calculateAverages();

  const marketInsights: MarketInsights = {
    averagePrice: currentPrices.price,
    priceChange: currentPrices.change,
    topBuyers: selectedCrop ? 
      buyers.filter((buyer: Buyer) => buyer.preferredCrops.includes(selectedCrop)).length : 
      buyers.length,
    demandTrend: currentPrices.demand
  };

  const filteredBuyers = buyers
    .filter(buyer => {
      if (searchTerm && !buyer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.distance !== 'all' && buyer.distance > parseInt(filters.distance)) {
        return false;
      }
      if (filters.rating > 0 && buyer.rating < filters.rating) {
        return false;
      }
      if (filters.verificationStatus !== 'all' && buyer.verificationStatus !== filters.verificationStatus) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.offerPrice - a.offerPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return a.distance - b.distance;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Market Connect</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCurrency}
            className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" />
            {currency === 'USD' ? 'Switch to KES' : 'Switch to USD'}
          </button>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Price</p>
              <p className="text-xl font-bold">{formatCurrency(marketInsights.averagePrice, currency)}</p>
              <div className="mt-1">
                <select
                  className="text-sm border border-gray-200 rounded px-2 py-1"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                >
                  <option value="">All Varieties</option>
                  {Object.keys(cropPrices).map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <p className="text-sm text-green-500 mt-1">{marketInsights.priceChange} this week</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Buyers</p>
              <p className="text-xl font-bold">{marketInsights.topBuyers}</p>
              <p className="text-xs text-gray-500 mt-1">
                {selectedCrop ? `Looking for ${selectedCrop}` : 'Across all varieties'}
              </p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
          <p className="text-sm text-gray-500 mt-1">In your region</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Market Demand</p>
              <p className="text-xl font-bold">{marketInsights.demandTrend}</p>
            </div>
            <BarChart2 className="text-purple-500" size={24} />
          </div>
          <p className="text-sm text-purple-500 mt-1">Growing demand</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Potential Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(currentPrices.revenue, currency)}</p>
            </div>
            <DollarSign className="text-yellow-500" size={24} />
          </div>
          <p className="text-sm text-yellow-500 mt-1">Estimated monthly</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search buyers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={filters.distance}
              onChange={(e) => setFilters(prev => ({ ...prev, distance: e.target.value }))}
            >
              <option value="all">Any Distance</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
              <option value="50">Within 50 km</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={filters.rating}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
            >
              <option value="0">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buyers List */}
      <div className="space-y-4">
        {filteredBuyers.map(buyer => (
          <div key={buyer.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{buyer.name}</h3>
                  {buyer.verificationStatus === 'verified' && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {buyer.location} ({buyer.distance} km)
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="mr-1 text-yellow-400" />
                    {buyer.rating}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Preferred crops: </span>
                  {buyer.preferredCrops.join(', ')}
                </div>
              </div>

              <div className="space-y-2 text-right">
                <div>
                  <p className="text-sm text-gray-500">Offering Price</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(buyer.offerPrice, currency)}/quintal</p>
                </div>
                
                <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors">
                  Connect <ExternalLink size={16} className="ml-2" />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
              <div className="flex items-center justify-between">
                <div>Payment Terms: {buyer.paymentTerms}</div>
                <div>Purchase History: {formatCurrency(buyer.purchaseHistory, currency)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketConnect; 