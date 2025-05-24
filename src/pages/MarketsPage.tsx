import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Building, Phone, ArrowUpDown } from 'lucide-react';

const MarketsPage = () => {
  const { markets } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [filterType, setFilterType] = useState('all');
  
  // Filter markets based on search term and type
  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         market.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || market.type === filterType;
    return matchesSearch && matchesType;
  });
  
  // Sort markets
  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    if (sortBy === 'distance') {
      return (a.distance || 0) - (b.distance || 0);
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
  
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Markets</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search markets by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="wholesale">Wholesale</option>
              <option value="retail">Retail</option>
              <option value="cooperative">Cooperative</option>
            </select>
            
            <button
              className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setSortBy(sortBy === 'distance' ? 'name' : 'distance')}
            >
              <ArrowUpDown size={16} className="mr-2" />
              Sort by {sortBy === 'distance' ? 'Distance' : 'Name'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMarkets.length > 0 ? (
            sortedMarkets.map((market) => (
              <div 
                key={market.id}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
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
                
                <div className="mt-3 text-sm text-gray-600">
                  <p>{market.location.address}</p>
                  <p className="mt-1">Hours: {market.openingHours.open} - {market.openingHours.close}</p>
                  
                  {market.contactPhone && (
                    <div className="flex items-center mt-2">
                      <Phone size={14} className="mr-1 text-gray-400" />
                      <span>{market.contactPhone}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <a 
                    href={`/markets/${market.id}`}
                    className="block text-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No markets found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketsPage;