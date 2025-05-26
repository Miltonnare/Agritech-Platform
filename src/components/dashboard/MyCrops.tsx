import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Truck, ShoppingCart, ArrowRight, Info } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';

type CropName = 'Tomatoes' | 'Wheat' | 'Maize' | 'Beans' | 'Potatoes' | 'Green Grams' | 'Rice';

type KenyaCropUnits = {
  [K in CropName]: string;
};

type KenyaCropVarieties = {
  [K in CropName]: string[];
};

// Sample Kenyan crop data with updated varieties and units
const KENYA_CROP_UNITS: KenyaCropUnits = {
  'Tomatoes': 'crates',
  'Wheat': '90kg bags',
  'Maize': '90kg bags',
  'Beans': '90kg bags',
  'Potatoes': '90kg bags',
  'Green Grams': '90kg bags',
  'Rice': '50kg bags'
};

const KENYA_CROP_VARIETIES: KenyaCropVarieties = {
  'Tomatoes': ['Money Maker', 'Rio Grande', 'Kilele F1', 'Anna F1'],
  'Wheat': ['Kenya Tai', 'Kenya Hawk', 'Robin', 'Eagle10'],
  'Maize': ['H614', 'H6213', 'DK8031', 'WH505'],
  'Beans': ['Rose Coco', 'Wairimu', 'Mwitemania', 'Yellow Beans'],
  'Potatoes': ['Shangi', 'Kenya Mpya', 'Dutch Robijn', 'Asante'],
  'Green Grams': ['N26', 'KS20', 'Nylon', 'Local Green'],
  'Rice': ['Basmati 370', 'Pishori', 'IR2793', 'Sindano']
};

// Sample crop images with actual paths
const CROP_IMAGES: Record<CropName, string> = {
  'Tomatoes': '/images/crops/tomatoes.webp',
  'Wheat': '/images/crops/wheat.webp',
  'Maize': '/images/crops/maize.webp',
  'Beans': '/images/crops/beans.webp',
  'Potatoes': '/images/crops/potatoes.webp',
  'Green Grams': '/images/crops/green-grams.webp',
  'Rice': '/images/crops/rice.webp'
};

// Sample crop data for demonstration
const SAMPLE_CROPS = [
  {
    id: '1',
    name: 'Tomatoes',
    variety: 'Money Maker',
    quantity: 50,
    expectedHarvestDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Tomatoes']],
    description: 'Fresh tomatoes grown using modern farming techniques'
  },
  {
    id: '2',
    name: 'Wheat',
    variety: 'Kenya Hawk',
    quantity: 200,
    expectedHarvestDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Wheat']],
    description: 'High-quality wheat suitable for flour production'
  },
  {
    id: '3',
    name: 'Maize',
    variety: 'H614',
    quantity: 150,
    expectedHarvestDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Maize']],
    description: 'Drought-resistant hybrid maize variety'
  },
  {
    id: '4',
    name: 'Beans',
    variety: 'Rose Coco',
    quantity: 100,
    expectedHarvestDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Beans']],
    description: 'Popular Rose Coco beans variety'
  },
  {
    id: '5',
    name: 'Potatoes',
    variety: 'Shangi',
    quantity: 180,
    expectedHarvestDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Potatoes']],
    description: 'High-yield Shangi potato variety'
  },
  {
    id: '6',
    name: 'Green Grams',
    variety: 'N26',
    quantity: 75,
    expectedHarvestDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Green Grams']],
    description: 'Premium quality green grams'
  },
  {
    id: '7',
    name: 'Rice',
    variety: 'Basmati 370',
    quantity: 120,
    expectedHarvestDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    images: [CROP_IMAGES['Rice']],
    description: 'Aromatic Basmati rice variety'
  }
];

const MyCrops = () => {
  // For demo purposes, use sample data instead of useApp hook
  const crops = SAMPLE_CROPS;
  
  // Sort crops by harvest date (closest first)
  const sortedCrops = [...crops].sort((a, b) => {
    if (!a.expectedHarvestDate) return 1;
    if (!b.expectedHarvestDate) return -1;
    return new Date(a.expectedHarvestDate).getTime() - new Date(b.expectedHarvestDate).getTime();
  });

  // Get appropriate unit for a crop
  const getCropUnit = (cropName: string) => {
    return cropName in KENYA_CROP_UNITS 
      ? KENYA_CROP_UNITS[cropName as CropName] 
      : 'units';
  };

  // Get crop variety
  const getCropVariety = (cropName: string, currentVariety?: string) => {
    if (currentVariety) return currentVariety;
    return cropName in KENYA_CROP_VARIETIES 
      ? KENYA_CROP_VARIETIES[cropName as CropName][0] 
      : 'Standard Variety';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">My Crops</h2>
          <div className="relative group">
            <Link 
              to="/crops/manage" 
              className="text-primary-500 hover:text-primary-600 text-sm flex items-center gap-1"
            >
              <span>Manage Crops</span>
              <Info size={14} className="text-gray-400" />
            </Link>
            <div className="absolute right-0 w-64 p-2 mt-2 text-xs bg-gray-800 text-white rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <p className="mb-2">Here you can:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Add new crops to your farm</li>
                <li>Update planting schedules</li>
                <li>Monitor growth stages</li>
                <li>Set harvest reminders</li>
                <li>Track crop yields</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Track and manage your farm's crops, schedules, and harvests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCrops.map((crop) => (
          <div 
            key={crop.id}
            className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-100 relative">
              {crop.images && crop.images.length > 0 ? (
                <img 
                  src={crop.images[0]} 
                  alt={`${crop.name} - ${crop.variety}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/images/crops/placeholder.webp';
                  }}
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
                  <p className="text-sm text-gray-500">
                    {getCropVariety(crop.name, crop.variety)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{crop.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{crop.quantity}</p>
                  <p className="text-xs text-gray-500">{getCropUnit(crop.name)}</p>
                </div>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <a 
                  href={`/markets?crop=${crop.id}`}
                  className="flex items-center text-sm text-primary-500 hover:text-primary-600 mr-2"
                >
                  <ShoppingCart size={14} className="mr-1" />
                  Find Buyers
                </a>
                
                <a 
                  href={`/crops/${crop.id}`}
                  className="flex items-center px-3 py-1 bg-primary-50 text-primary-600 rounded-full hover:bg-primary-100 transition-colors duration-200"
                >
                  <Info size={14} className="mr-1" />
                  <span className="font-medium">Details</span>
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