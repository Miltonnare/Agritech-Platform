import React from 'react';
import { MapPin, Building, Clock, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NearbyMarkets = () => {
  const { markets } = useApp();
  
  // Sort markets by distance
  const sortedMarkets = [...markets].sort((a, b) => (a.distance || 0) - (b.distance || 0));
  
  const getMarketTypeIcon = (type: string) => {
    switch (type) {
      case 'wholesale':
        return <Building size={16} className="text-primary-500" />;
      case 'retail':
        return <Building size={16} className="text-secondary-500" />;
      case 'cooperative':
        return <Building size={16} className="text-accent-400" />;
      default:
        return <Building size={16} />;
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
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Nearby Markets</h2>
        <a href="/markets" className="text-primary-500 hover:text-primary-600 text-sm">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {sortedMarkets.map((market) => (
          <div 
            key={market.id}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-800">{market.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{market.distance} km</span>
              </div>
            </div>
            
            <div className="flex items-center mt-2 text-sm text-gray-600">
              {getMarketTypeIcon(market.type)}
              <span className="ml-1">{getMarketTypeLabel(market.type)}</span>
            </div>
            
            <div className="flex flex-wrap gap-y-2 mt-3">
              <div className="flex items-center w-full sm:w-1/2 text-sm text-gray-600">
                <Clock size={14} className="mr-1 text-gray-400" />
                <span>{market.openingHours.open} - {market.openingHours.close}</span>
              </div>
              
              {market.contactPhone && (
                <div className="flex items-center w-full sm:w-1/2 text-sm text-gray-600">
                  <Phone size={14} className="mr-1 text-gray-400" />
                  <span>{market.contactPhone}</span>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {market.location.address}
              </p>
              <a 
                href={`/markets/${market.id}`}
                className="flex items-center text-sm text-primary-500 hover:text-primary-600"
              >
                Details
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyMarkets;