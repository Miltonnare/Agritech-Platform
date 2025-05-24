import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, Calendar, BarChart, ShoppingCart, Edit, Trash, 
  LineChart, TrendingUp, TrendingDown 
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const CropDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { crops, priceData, markets } = useApp();
  
  const crop = crops.find(c => c.id === id);
  
  if (!crop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-800">Crop not found</h2>
        <Link to="/crops" className="mt-4 inline-block text-primary-500 hover:text-primary-600">
          Return to My Crops
        </Link>
      </div>
    );
  }
  
  // Get price data for this crop
  const cropPriceData = priceData.filter(p => p.cropName === crop.name);
  
  // Get average price by market
  type ExtendedMarket = typeof markets[number] & {
  averagePrice: number;
  trend: string;
  percentChange: number;
};

const marketPrices: ExtendedMarket[] = markets
  .map(market => {
    const marketData = cropPriceData.filter(p => p.marketName === market.name);

    if (marketData.length === 0) return { ...market, averagePrice: 0, trend: 'stable', percentChange: 0 };

    const total = marketData.reduce((sum, item) => sum + item.price, 0);
    const avgPrice = total / marketData.length;
    const latestData = marketData[marketData.length - 1];

    return {
      ...market,
      averagePrice: avgPrice,
      trend: latestData?.trend || 'stable',
      percentChange: latestData?.percentChange || 0,
    };
  })
  .filter(m => m.averagePrice > 0)
  .sort((a, b) => b.averagePrice - a.averagePrice);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <TrendingUp className="text-success-500" size={18} />;
    } else if (trend === 'down') {
      return <TrendingDown className="text-error-500" size={18} />;
    }
    return null;
  };
  
  const getTrendClass = (trend: string) => {
    if (trend === 'up') return 'text-success-500';
    if (trend === 'down') return 'text-error-500';
    return 'text-gray-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/crops" className="mr-3 text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Crop Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-60 bg-gray-100 relative">
              {crop.images && crop.images.length > 0 ? (
                <img 
                  src={crop.images[0]} 
                  alt={crop.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-50">
                  <span className="text-primary-300 text-xl">{crop.name}</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{crop.name}</h2>
                  <p className="text-gray-600">{crop.variety}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{crop.quantity} {crop.unit}</p>
                  {crop.expectedHarvestDate && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={14} className="mr-1" />
                      <span>
                        Harvest: {format(parseISO(crop.expectedHarvestDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                  <Edit size={18} className="mr-2" />
                  Edit Crop
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                  <Trash size={18} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart size={20} className="mr-2 text-primary-500" />
              Market Price Analysis
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Current average market price for {crop.name} ({crop.variety}) is 
                <span className="font-bold text-primary-500 mx-1">
                  ${(marketPrices.reduce((sum, m) => sum + m.averagePrice, 0) / marketPrices.length).toFixed(2)}
                </span>
                per {crop.unit}.
              </p>
              
              <h4 className="font-medium text-gray-700 mt-4">Best Markets for Selling:</h4>
              <div className="space-y-3">
                {marketPrices.slice(0, 3).map((market) => (
                  <div 
                    key={market.id}
                    className="flex justify-between items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getTrendIcon(market.trend)}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">{market.name}</h5>
                        <p className="text-sm text-gray-500">
                          {market.distance} km away • {market.type}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${market.averagePrice.toFixed(2)}/{crop.unit}</p>
                      <p className={`text-sm ${getTrendClass(market.trend)}`}>
                        {market.percentChange > 0 ? '+' : ''}{market.percentChange}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Link 
                  to={`/markets?crop=${crop.id}`}
                  className="inline-flex items-center text-primary-500 hover:text-primary-600"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Find more buyers for this crop
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <LineChart size={20} className="mr-2 text-primary-500" />
              Price Trends
            </h3>
            
            <div className="text-center text-gray-600 py-20">
              <LineChart size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Price trend chart would appear here</p>
              <p className="text-sm mt-1">Showing historical prices for {crop.name}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Recommendations</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-success-50 border border-success-100 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Price Alert:</span> {crop.name} prices are trending upward at Farmville Central Market. Consider selling there for maximum profit.
                </p>
              </div>
              
              <div className="p-3 bg-primary-50 border border-primary-100 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Tip:</span> Based on current trends, waiting 1-2 weeks before selling may result in better prices.
                </p>
              </div>
              
              <div className="p-3 bg-accent-50 border border-accent-100 rounded-md">
                <p className="text-sm">
                  <span className="font-medium">Opportunity:</span> Green Valley Cooperative is currently seeking {crop.name} suppliers. Contact them for potential partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailPage;