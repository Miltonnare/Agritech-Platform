import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CalendarClock, Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

const CropsPage = () => {
  const { crops } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'harvest'>('harvest');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Filter crops based on search term
  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crop.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort crops
  const sortedCrops = [...filteredCrops].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'harvest') {
      if (!a.expectedHarvestDate) return 1;
      if (!b.expectedHarvestDate) return -1;
      return new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime();
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Crops</h1>
        <button
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={18} className="mr-2" />
          Add New Crop
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">Add New Crop</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                placeholder="e.g., Tomatoes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                placeholder="e.g., Roma"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                placeholder="Amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="ton">Tons</option>
                <option value="bushel">Bushels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Harvest Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500" 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
              <button 
                type="button"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
              >
                Save Crop
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search crops by name or variety..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setSortBy(sortBy === 'harvest' ? 'name' : 'harvest')}
          >
            <ArrowUpDown size={16} className="mr-2" />
            Sort by {sortBy === 'harvest' ? 'Harvest Date' : 'Name'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCrops.length > 0 ? (
            sortedCrops.map((crop) => (
              <div 
                key={crop.id}
                className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-36 bg-gray-100 relative">
                  {crop.images && crop.images.length > 0 ? (
                    <img 
                      src={crop.images[0]} 
                      alt={crop.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-50">
                      <span className="text-primary-300">{crop.name}</span>
                    </div>
                  )}
                  
                  {crop.expectedHarvestDate && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">
                      <div className="flex items-center">
                        <CalendarClock size={14} className="mr-1" />
                        <span>
                          Harvest in {formatDistanceToNow(parseISO(crop.expectedHarvestDate))}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{crop.name}</h3>
                      <p className="text-sm text-gray-500">{crop.variety}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{crop.quantity}</p>
                      <p className="text-xs text-gray-500">{crop.unit}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a 
                      href={`/crops/${crop.id}`}
                      className="block text-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                    >
                      Manage Crop
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No crops found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropsPage;