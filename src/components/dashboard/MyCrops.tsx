import React from 'react';
import { CalendarClock, Truck, ShoppingCart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDistanceToNow, parseISO } from 'date-fns';

const MyCrops = () => {
  const { crops } = useApp();
  
  // Sort crops by harvest date (closest first)
  const sortedCrops = [...crops].sort((a, b) => {
    if (!a.expectedHarvestDate) return 1;
    if (!b.expectedHarvestDate) return -1;
    return new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime();
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">My Crops</h2>
        <a href="/crops" className="text-primary-500 hover:text-primary-600 text-sm">
          Manage Crops
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCrops.map((crop) => (
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
              
              <div className="mt-3 flex justify-between">
                <a 
                  href={`/markets?crop=${crop.id}`}
                  className="flex items-center text-sm text-primary-500 hover:text-primary-600 mr-2"
                >
                  <ShoppingCart size={14} className="mr-1" />
                  Find Buyers
                </a>
                
                <a 
                  href={`/crops/${crop.id}`}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  Details
                  <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCrops;