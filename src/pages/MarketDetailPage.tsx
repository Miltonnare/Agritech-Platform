import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, MapPin, Clock, Phone, Mail, ExternalLink,
  Leaf, ShoppingCart, MessageSquare, Building
} from 'lucide-react';

const MarketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { markets, priceData, crops } = useApp();
  
  const market = markets.find(m => m.id === id);
  
  if (!market) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-800">Market not found</h2>
        <Link to="/markets" className="mt-4 inline-block text-primary-500 hover:text-primary-600">
          Return to Markets
        </Link>
      </div>
    );
  }
  
  // Get price data for this market
  const marketPriceData = priceData.filter(p => p.marketName === market.name);
  
  // Get prices for user's crops at this market
  const userCropNames = crops.map(crop => crop.name);
  const userCropPrices = marketPriceData.filter(p => userCropNames.includes(p.cropName));
  
  // Group by crop name and get the latest price for each
  const latestPrices: Record<string, any> = {};
  userCropPrices.forEach(price => {
    if (!latestPrices[price.cropName] || new Date(price.date) > new Date(latestPrices[price.cropName].date)) {
      latestPrices[price.cropName] = price;
    }
  });
  
  const getMarketTypeIcon = (type: string) => {
    switch (type) {
      case 'wholesale':
        return <Building size={20} className="text-primary-500" />;
      case 'retail':
        return <Building size={20} className="text-secondary-500" />;
      case 'cooperative':
        return <Building size={20} className="text-accent-400" />;
      default:
        return <Building size={20} />;
    }
  };
  
  const getMarketTypeLabel = (type: string) => {
    switch (type) {
      case 'wholesale':
        return 'Wholesale Market';
      case 'retail':
        return 'Retail Market';
      case 'cooperative':
        return 'Cooperative';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/markets" className="mr-3 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Market Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{market.name}</h2>
                <div className="flex items-center mt-1 text-gray-600">
                  {getMarketTypeIcon(market.type)}
                  <span className="ml-1">{getMarketTypeLabel(market.type)}</span>
                </div>
              </div>
              
              <div className="mt-3 md:mt-0 md:text-right">
                <div className="flex items-center md:justify-end text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{market.distance} km away</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{market.location.address}</p>
                  <a href="#" className="text-sm text-primary-500 hover:text-primary-600 mt-1 inline-block">
                    View on map
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={18} className="text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Operating Hours</p>
                  <p className="font-medium">{market.openingHours.open} - {market.openingHours.close}</p>
                  <p className="text-sm text-gray-500">Open Monday to Saturday</p>
                </div>
              </div>
              
              {market.contactPhone && (
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Phone</p>
                    <p className="font-medium">{market.contactPhone}</p>
                  </div>
                </div>
              )}
              
              {market.contactEmail && (
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Email</p>
                    <p className="font-medium">{market.contactEmail}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Link 
                to={`/messages?market=${market.id}`} 
                className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                <MessageSquare size={18} className="mr-2" />
                Contact Market
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About {market.name}</h3>
            
            <p className="text-gray-600 mb-4">
              {market.name} is a {market.type} market that specializes in connecting local farmers with buyers. 
              They have been operating for over 10 years and are known for fair prices and reliable service.
            </p>
            
            <h4 className="font-medium text-gray-700 mt-6">Accepted Products:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              <div className="flex items-center p-2 bg-primary-50 rounded-md">
                <Leaf size={16} className="text-primary-500 mr-2" />
                <span className="text-sm">Vegetables</span>
              </div>
              <div className="flex items-center p-2 bg-primary-50 rounded-md">
                <Leaf size={16} className="text-primary-500 mr-2" />
                <span className="text-sm">Fruits</span>
              </div>
              <div className="flex items-center p-2 bg-primary-50 rounded-md">
                <Leaf size={16} className="text-primary-500 mr-2" />
                <span className="text-sm">Grains</span>
              </div>
              <div className="flex items-center p-2 bg-primary-50 rounded-md">
                <Leaf size={16} className="text-primary-500 mr-2" />
                <span className="text-sm">Dairy</span>
              </div>
              <div className="flex items-center p-2 bg-primary-50 rounded-md">
                <Leaf size={16} className="text-primary-500 mr-2" />
                <span className="text-sm">Poultry</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ShoppingCart size={20} className="mr-2 text-primary-500" />
              Current Prices for Your Crops
            </h3>
            
            {Object.values(latestPrices).length > 0 ? (
              <div className="space-y-3">
                {Object.values(latestPrices).map((price: any) => (
                  <div 
                    key={price.id}
                    className="flex justify-between items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h5 className="font-medium text-gray-800">{price.cropName}</h5>
                      <p className="text-xs text-gray-500">Last updated: {price.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${price.price.toFixed(2)}/{price.unit}</p>
                      <p className={`text-xs ${price.trend === 'up' ? 'text-success-500' : price.trend === 'down' ? 'text-error-500' : 'text-gray-500'}`}>
                        {price.percentChange > 0 ? '+' : ''}{price.percentChange}% ({price.trend})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <ShoppingCart size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No price data available for your crops at this market.</p>
                <p className="text-sm mt-1">Check back later for updates.</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Insights</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-primary-50 border border-primary-100 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Buyer Activity:</span> High demand for tomatoes and corn this week.
                </p>
              </div>
              
              <div className="p-3 bg-accent-50 border border-accent-100 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Market Event:</span> Farmers showcase this Saturday. Opportunity to present your products to new buyers.
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="#" 
                className="flex items-center justify-center text-center px-4 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                Visit Official Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;