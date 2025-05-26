import React from 'react';
import { useParams } from 'react-router-dom';
import { CalendarClock, Truck, ShoppingCart, ArrowLeft, Leaf, Thermometer, Droplets, Sun, TrendingUp, LineChart, AlertCircle, Bell, DollarSign } from 'lucide-react';
import { formatDistanceToNow, parseISO, format, subDays, subHours, subMinutes, isToday, isYesterday, isThisWeek } from 'date-fns';

// Import the types from MyCrops component
type CropName = 'Tomatoes' | 'Wheat' | 'Maize' | 'Beans' | 'Potatoes' | 'Green Grams' | 'Rice';

// Detailed growing information for each crop
const CROP_DETAILS: Record<CropName, {
  soilType: string;
  temperature: string;
  waterNeeds: string;
  sunlight: string;
  growingPeriod: string;
  bestPlantingSeasons: string[];
  commonPests: string[];
  commonDiseases: string[];
  fertilizers: string[];
  harvestingIndicators: string[];
}> = {
  'Tomatoes': {
    soilType: 'Well-drained, fertile loam soil with pH 6.0-6.8',
    temperature: '20-30°C during the day, 15-20°C at night',
    waterNeeds: 'Regular watering, about 25-30mm per week',
    sunlight: 'Full sun, 6-8 hours daily',
    growingPeriod: '60-80 days to maturity',
    bestPlantingSeasons: ['March-April', 'August-September'],
    commonPests: ['Whiteflies', 'Tomato hornworms', 'Aphids'],
    commonDiseases: ['Early blight', 'Late blight', 'Bacterial wilt'],
    fertilizers: ['NPK 6-24-24', 'Calcium nitrate', 'DAP'],
    harvestingIndicators: ['Firm, fully colored fruits', 'Slight softness when pressed']
  },
  'Wheat': {
    soilType: 'Deep, fertile loam or clay loam with pH 6.0-7.0',
    temperature: '15-25°C during growing season',
    waterNeeds: '450-650mm over growing season',
    sunlight: 'Full sun exposure',
    growingPeriod: '120-150 days',
    bestPlantingSeasons: ['March-April', 'October-November'],
    commonPests: ['Aphids', 'Stem borers', 'Armyworms'],
    commonDiseases: ['Rust', 'Smut', 'Powdery mildew'],
    fertilizers: ['NPK 20-20-0', 'Urea', 'DAP'],
    harvestingIndicators: ['Golden color', 'Dry, hard grains']
  },
  'Maize': {
    soilType: 'Well-drained loam soil with pH 5.5-7.0',
    temperature: '20-30°C',
    waterNeeds: '500-800mm per growing season',
    sunlight: 'Full sun',
    growingPeriod: '90-120 days',
    bestPlantingSeasons: ['March-April', 'August-September'],
    commonPests: ['Stalk borers', 'Fall armyworm', 'Weevils'],
    commonDiseases: ['Maize streak virus', 'Grey leaf spot', 'Northern leaf blight'],
    fertilizers: ['NPK 17-17-17', 'CAN', 'Urea'],
    harvestingIndicators: ['Dry husks', 'Black layer formation at kernel base']
  },
  'Beans': {
    soilType: 'Well-drained, fertile soil with pH 6.0-7.0',
    temperature: '18-25°C',
    waterNeeds: '300-500mm per growing season',
    sunlight: 'Full sun to partial shade',
    growingPeriod: '60-90 days',
    bestPlantingSeasons: ['March-April', 'September-October'],
    commonPests: ['Bean flies', 'Pod borers', 'Aphids'],
    commonDiseases: ['Angular leaf spot', 'Bean rust', 'Common bacterial blight'],
    fertilizers: ['NPK 17-17-17', 'DAP', 'TSP'],
    harvestingIndicators: ['Dry, brown pods', 'Rattling sound when shaken']
  },
  'Potatoes': {
    soilType: 'Well-drained, loose soil with pH 5.0-6.5',
    temperature: '15-20°C',
    waterNeeds: '500-700mm per growing season',
    sunlight: 'Full sun',
    growingPeriod: '90-120 days',
    bestPlantingSeasons: ['March-April', 'September-October'],
    commonPests: ['Potato tuber moth', 'Aphids', 'Nematodes'],
    commonDiseases: ['Late blight', 'Early blight', 'Bacterial wilt'],
    fertilizers: ['NPK 17-17-17', 'DAP', 'MOP'],
    harvestingIndicators: ['Yellowing leaves', 'Dry vines', 'Firm tubers']
  },
  'Green Grams': {
    soilType: 'Well-drained sandy loam with pH 6.2-7.2',
    temperature: '20-35°C',
    waterNeeds: '350-500mm per growing season',
    sunlight: 'Full sun',
    growingPeriod: '60-90 days',
    bestPlantingSeasons: ['March-April', 'October-November'],
    commonPests: ['Pod borers', 'Aphids', 'Thrips'],
    commonDiseases: ['Yellow mosaic virus', 'Powdery mildew', 'Cercospora leaf spot'],
    fertilizers: ['DAP', 'SSP', 'NPK 17-17-17'],
    harvestingIndicators: ['Black mature pods', 'Dry rattling sound']
  },
  'Rice': {
    soilType: 'Clay or clay loam with pH 5.5-6.5',
    temperature: '20-35°C',
    waterNeeds: '1000-1500mm per growing season',
    sunlight: 'Full sun',
    growingPeriod: '120-150 days',
    bestPlantingSeasons: ['March-April', 'August-September'],
    commonPests: ['Stem borers', 'Rice bugs', 'Army worms'],
    commonDiseases: ['Rice blast', 'Bacterial leaf blight', 'Sheath blight'],
    fertilizers: ['NPK 17-17-17', 'Urea', 'MOP'],
    harvestingIndicators: ['Golden yellow color', '80-85% mature grains']
  }
};

// Update the MARKET_DATA type and content to include buyer information
const MARKET_DATA: Record<CropName, {
  currentPrice: number;
  priceChange: number;
  demandLevel: 'High' | 'Medium' | 'Low';
  marketTrends: string[];
  buyers: {
    name: string;
    type: 'Wholesaler' | 'Processor' | 'Exporter' | 'Retailer';
    rating: number;
    price: number;
    location: string;
    requirements: string[];
    recommended: boolean;
  }[];
}> = {
  'Tomatoes': {
    currentPrice: 4500,
    priceChange: 12.5,
    demandLevel: 'High',
    marketTrends: [
      'High demand in Nairobi wholesale markets',
      'Hotels and restaurants increasing orders',
      'Export demand from South Sudan'
    ],
    buyers: [
      {
        name: 'Fresh Mart Suppliers',
        type: 'Wholesaler',
        rating: 4.8,
        price: 4800,
        location: 'Nairobi Wholesale Market',
        requirements: ['Minimum 50 crates', 'Grade 1 quality', 'Same-day delivery'],
        recommended: true
      },
      {
        name: 'Kenya Food Processors',
        type: 'Processor',
        rating: 4.5,
        price: 4200,
        location: 'Thika',
        requirements: ['Bulk quantities', 'Regular supply contract'],
        recommended: false
      },
      {
        name: 'Green Valley Exporters',
        type: 'Exporter',
        rating: 4.7,
        price: 5000,
        location: 'Nairobi',
        requirements: ['GlobalGAP certification', 'Minimum 100 crates'],
        recommended: true
      }
    ]
  },
  'Wheat': {
    currentPrice: 5200,
    priceChange: -2.3,
    demandLevel: 'Medium',
    marketTrends: [
      'Major millers actively buying',
      'Government strategic reserve purchasing',
      'Regional export opportunities'
    ],
    buyers: [
      {
        name: 'Unga Limited',
        type: 'Processor',
        rating: 4.9,
        price: 5400,
        location: 'Eldoret',
        requirements: ['Minimum moisture content 13%', 'Bulk delivery'],
        recommended: true
      },
      {
        name: 'National Cereals Board',
        type: 'Wholesaler',
        rating: 4.6,
        price: 5200,
        location: 'Multiple Locations',
        requirements: ['Standard quality requirements', 'Clean and dry'],
        recommended: true
      },
      {
        name: 'Regional Grain Millers',
        type: 'Processor',
        rating: 4.4,
        price: 5100,
        location: 'Nakuru',
        requirements: ['Minimum 100 bags', 'Quality certification'],
        recommended: false
      }
    ]
  },
  'Maize': {
    currentPrice: 4800,
    priceChange: 5.7,
    demandLevel: 'High',
    marketTrends: [
      'NCPB actively buying',
      'High demand from animal feed manufacturers',
      'Cross-border trade opportunities'
    ],
    buyers: [
      {
        name: 'National Cereals Board',
        type: 'Wholesaler',
        rating: 4.7,
        price: 4900,
        location: 'Nationwide',
        requirements: ['Standard moisture content', 'Clean and dry'],
        recommended: true
      },
      {
        name: 'Livestock Feeds Ltd',
        type: 'Processor',
        rating: 4.6,
        price: 4750,
        location: 'Nakuru',
        requirements: ['Regular supply contract', 'Quality standards'],
        recommended: true
      },
      {
        name: 'Cross-Border Traders',
        type: 'Exporter',
        rating: 4.3,
        price: 5000,
        location: 'Border Points',
        requirements: ['Large quantities', 'Immediate payment'],
        recommended: false
      }
    ]
  },
  'Beans': {
    currentPrice: 8500,
    priceChange: 15.2,
    demandLevel: 'High',
    marketTrends: [
      'Rising demand due to food security concerns',
      'Price premium for quality varieties',
      'Strong institutional buying'
    ],
    buyers: []
  },
  'Potatoes': {
    currentPrice: 3200,
    priceChange: -5.1,
    demandLevel: 'Medium',
    marketTrends: [
      'Growing demand from fast-food sector',
      'Price fluctuations due to seasonality',
      'Value addition opportunities'
    ],
    buyers: []
  },
  'Green Grams': {
    currentPrice: 9200,
    priceChange: 8.9,
    demandLevel: 'Medium',
    marketTrends: [
      'Export demand driving prices',
      'Growing local consumption',
      'Premium for organic production'
    ],
    buyers: []
  },
  'Rice': {
    currentPrice: 7500,
    priceChange: 3.4,
    demandLevel: 'High',
    marketTrends: [
      'Premium prices for aromatic varieties',
      'Growing institutional demand',
      'Direct consumer market opportunities'
    ],
    buyers: [
      {
        name: 'Mwea Rice Millers',
        type: 'Processor',
        rating: 4.9,
        price: 7800,
        location: 'Mwea',
        requirements: ['Premium aromatic varieties', 'Minimum moisture content'],
        recommended: true
      },
      {
        name: 'Kenya National Trading Corp',
        type: 'Wholesaler',
        rating: 4.7,
        price: 7600,
        location: 'Multiple Locations',
        requirements: ['Standard quality requirements', 'Bulk quantities'],
        recommended: true
      },
      {
        name: 'Local Rice Traders Association',
        type: 'Retailer',
        rating: 4.4,
        price: 7400,
        location: 'Various Markets',
        requirements: ['Flexible quantities', 'Regular supply'],
        recommended: false
      }
    ]
  }
};

// Add notification types
type NotificationType = 'price' | 'market' | 'buyer' | 'alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  cropName?: string;
}

// Function to get crop-specific notifications
const getCropNotifications = (cropName: CropName): Notification[] => {
  const now = new Date();
  
  const notifications: Record<CropName, Notification[]> = {
    'Tomatoes': [
      {
        id: '1',
        type: 'price',
        title: 'Price Alert',
        message: 'Tomato prices have increased by 15% in Nairobi markets',
        timestamp: subHours(now, 2).toISOString(),
        priority: 'high',
        read: false,
        cropName: 'Tomatoes'
      },
      {
        id: '2',
        type: 'buyer',
        title: 'New Buyer Request',
        message: 'Fresh Mart Suppliers is looking for 200 crates of tomatoes',
        timestamp: subHours(now, 5).toISOString(),
        priority: 'medium',
        read: false,
        cropName: 'Tomatoes'
      }
    ],
    'Wheat': [
      {
        id: '1',
        type: 'price',
        title: 'Price Update',
        message: 'Wheat prices stabilizing in major markets',
        timestamp: subDays(now, 1).toISOString(),
        priority: 'low',
        read: true,
        cropName: 'Wheat'
      },
      {
        id: '2',
        type: 'buyer',
        title: 'NCPB Announcement',
        message: 'NCPB announces new buying program starting next week',
        timestamp: subHours(now, 8).toISOString(),
        priority: 'high',
        read: false,
        cropName: 'Wheat'
      }
    ],
    'Maize': [
      {
        id: '1',
        type: 'market',
        title: 'Market Update',
        message: 'New government regulations for maize exports announced',
        timestamp: subHours(now, 3).toISOString(),
        priority: 'high',
        read: true,
        cropName: 'Maize'
      },
      {
        id: '2',
        type: 'buyer',
        title: 'Large Order',
        message: 'Feed manufacturer seeking 1000 bags',
        timestamp: subHours(now, 6).toISOString(),
        priority: 'medium',
        read: false,
        cropName: 'Maize'
      }
    ],
    'Beans': [
      {
        id: '1',
        type: 'price',
        title: 'Price Alert',
        message: 'Bean prices reach 3-month high in major markets',
        timestamp: subHours(now, 4).toISOString(),
        priority: 'high',
        read: false,
        cropName: 'Beans'
      },
      {
        id: '2',
        type: 'buyer',
        title: 'Export Opportunity',
        message: 'New export opportunity: 500 bags needed',
        timestamp: subDays(now, 1).toISOString(),
        priority: 'medium',
        read: true,
        cropName: 'Beans'
      }
    ],
    'Potatoes': [
      {
        id: '1',
        type: 'market',
        title: 'Market Update',
        message: 'Increased demand from hotels and restaurants',
        timestamp: subHours(now, 6).toISOString(),
        priority: 'medium',
        read: false,
        cropName: 'Potatoes'
      },
      {
        id: '2',
        type: 'price',
        title: 'Price Update',
        message: 'Stable prices in major markets',
        timestamp: subDays(now, 1).toISOString(),
        priority: 'low',
        read: true,
        cropName: 'Potatoes'
      }
    ],
    'Green Grams': [
      {
        id: '1',
        type: 'buyer',
        title: 'Buyer Alert',
        message: 'Export buyer seeking certified organic green grams',
        timestamp: subHours(now, 1).toISOString(),
        priority: 'high',
        read: false,
        cropName: 'Green Grams'
      },
      {
        id: '2',
        type: 'price',
        title: 'Price Alert',
        message: 'Price alert: 10% premium for organic produce',
        timestamp: subDays(now, 1).toISOString(),
        priority: 'medium',
        read: true,
        cropName: 'Green Grams'
      }
    ],
    'Rice': [
      {
        id: '1',
        type: 'market',
        title: 'Price Update',
        message: 'New minimum prices announced for aromatic rice',
        timestamp: subHours(now, 2).toISOString(),
        priority: 'high',
        read: false,
        cropName: 'Rice'
      },
      {
        id: '2',
        type: 'buyer',
        title: 'Bulk Order',
        message: 'Bulk buyer looking for aromatic rice varieties',
        timestamp: subDays(now, 1).toISOString(),
        priority: 'medium',
        read: true,
        cropName: 'Rice'
      }
    ]
  };

  return notifications[cropName] || [];
};

const CropDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the crop from SAMPLE_CROPS (you would typically fetch this from an API)
  const crop = SAMPLE_CROPS.find(c => c.id === id);
  
  if (!crop) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-red-600">Crop not found</h1>
          <p className="mt-4">The crop you're looking for doesn't exist.</p>
          <a 
            href="/dashboard" 
            className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const cropDetails = CROP_DETAILS[crop.name as CropName];
  const marketData = MARKET_DATA[crop.name as CropName];

  const cropNotifications = getCropNotifications(crop.name as CropName);

  const formatNotificationDate = (timestamp: string) => {
    const date = parseISO(timestamp);
    if (isToday(date)) {
      return `Today at ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${format(date, 'h:mm a')}`;
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE at h:mm a');
    } else {
      return format(date, 'MMM d, yyyy at h:mm a');
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'price':
        return <DollarSign className="text-blue-500" size={20} />;
      case 'market':
        return <TrendingUp className="text-green-500" size={20} />;
      case 'buyer':
        return <ShoppingCart className="text-purple-500" size={20} />;
      case 'alert':
        return <AlertCircle className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <a 
            href="/dashboard" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Hero Section */}
              <div className="relative h-64 bg-gray-200">
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h1 className="text-3xl font-bold text-white">{crop.name}</h1>
                  <p className="text-white/90">Variety: {crop.variety}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h3 className="font-semibold text-primary-700 mb-2">Current Crop Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarClock size={16} className="text-primary-600 mr-2" />
                        <span>Harvest in {formatDistanceToNow(parseISO(crop.expectedHarvestDate))}</span>
                      </div>
                      <div className="flex items-center">
                        <Truck size={16} className="text-primary-600 mr-2" />
                        <span>{crop.quantity} {getCropUnit(crop.name)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-700 mb-2">Optimal Growing Conditions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Thermometer size={16} className="text-green-600 mr-2" />
                        <span>{cropDetails.temperature}</span>
                      </div>
                      <div className="flex items-center">
                        <Droplets size={16} className="text-green-600 mr-2" />
                        <span>{cropDetails.waterNeeds}</span>
                      </div>
                      <div className="flex items-center">
                        <Sun size={16} className="text-green-600 mr-2" />
                        <span>{cropDetails.sunlight}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Growing Requirements</h2>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><strong>Soil Type:</strong> {cropDetails.soilType}</p>
                      <p><strong>Growing Period:</strong> {cropDetails.growingPeriod}</p>
                      <p><strong>Best Planting Seasons:</strong> {cropDetails.bestPlantingSeasons.join(', ')}</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Pest & Disease Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-700 mb-2">Common Pests</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {cropDetails.commonPests.map(pest => (
                            <li key={pest}>{pest}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-700 mb-2">Common Diseases</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {cropDetails.commonDiseases.map(disease => (
                            <li key={disease}>{disease}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Fertilization & Harvesting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-700 mb-2">Recommended Fertilizers</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {cropDetails.fertilizers.map(fertilizer => (
                            <li key={fertilizer}>{fertilizer}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-700 mb-2">Harvesting Indicators</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {cropDetails.harvestingIndicators.map(indicator => (
                            <li key={indicator}>{indicator}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Recent Updates Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Updates</h2>
                <Bell className="text-primary-600" size={20} />
              </div>

              <div className="space-y-4">
                {cropNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      notification.priority === 'high'
                        ? 'border-red-500 bg-red-50'
                        : notification.priority === 'medium'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-500 bg-gray-50'
                    } ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatNotificationDate(notification.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a 
                  href="/notifications"
                  className="flex items-center justify-center text-sm text-primary-600 hover:text-primary-700"
                >
                  View All Updates
                </a>
              </div>
            </div>

            {/* Market Trends Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Market Insights</h2>
                <LineChart className="text-primary-600" size={20} />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Current Price (KES)</span>
                  <span className="font-semibold">{marketData.currentPrice.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Price Change</span>
                  <span className={`font-semibold ${marketData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marketData.priceChange >= 0 ? '+' : ''}{marketData.priceChange}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Demand Level</span>
                  <span className={`font-semibold ${
                    marketData.demandLevel === 'High' ? 'text-green-600' : 
                    marketData.demandLevel === 'Medium' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {marketData.demandLevel}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Current Trends</h3>
                <ul className="space-y-2">
                  {marketData.marketTrends.map((trend, index) => (
                    <li key={index} className="flex items-start">
                      <TrendingUp size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Updated Recommendations Card to show Buyers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recommended Buyers</h2>
                <ShoppingCart className="text-primary-600" size={20} />
              </div>

              <div className="space-y-4">
                {marketData.buyers
                  .sort((a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0))
                  .map((buyer, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      buyer.recommended 
                        ? 'border-primary-200 bg-primary-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{buyer.name}</h3>
                        <span className="text-sm text-gray-600">{buyer.type}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm font-medium">{buyer.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Buying Price:</span>
                        <span className="font-medium text-gray-800">
                          KES {buyer.price.toLocaleString()}/{getCropUnit(crop.name)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="text-gray-800">{buyer.location}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {buyer.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {buyer.recommended && (
                      <div className="mt-3 flex items-center text-primary-600">
                        <AlertCircle size={14} className="mr-1" />
                        <span className="text-sm font-medium">Recommended Buyer</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <a 
                  href={`/market-connect?crop=${crop.name}`}
                  className="flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Connect with More Buyers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample crop data type
interface CropData {
  id: string;
  name: CropName;
  variety: string;
  quantity: number;
  expectedHarvestDate: string;
  images: string[];
  description: string;
}

// Sample crops data
const SAMPLE_CROPS: CropData[] = [
  {
    id: '1',
    name: 'Tomatoes',
    variety: 'Money Maker',
    quantity: 50,
    expectedHarvestDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/tomatoes.webp'],
    description: 'Fresh tomatoes grown using modern farming techniques'
  },
  {
    id: '2',
    name: 'Wheat',
    variety: 'Kenya Hawk',
    quantity: 200,
    expectedHarvestDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/wheat.webp'],
    description: 'High-quality wheat suitable for flour production'
  },
  {
    id: '3',
    name: 'Maize',
    variety: 'H614',
    quantity: 150,
    expectedHarvestDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/maize.webp'],
    description: 'Drought-resistant hybrid maize variety'
  },
  {
    id: '4',
    name: 'Beans',
    variety: 'Rose Coco',
    quantity: 100,
    expectedHarvestDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/beans.webp'],
    description: 'Popular Rose Coco beans variety'
  },
  {
    id: '5',
    name: 'Potatoes',
    variety: 'Shangi',
    quantity: 180,
    expectedHarvestDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/potatoes.webp'],
    description: 'High-yield Shangi potato variety'
  },
  {
    id: '6',
    name: 'Green Grams',
    variety: 'N26',
    quantity: 75,
    expectedHarvestDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/green-grams.webp'],
    description: 'Premium quality green grams'
  },
  {
    id: '7',
    name: 'Rice',
    variety: 'Basmati 370',
    quantity: 120,
    expectedHarvestDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    images: ['/images/crops/rice.webp'],
    description: 'Aromatic Basmati rice variety'
  }
];

// Helper function to get crop unit
const getCropUnit = (cropName: string): string => {
  const KENYA_CROP_UNITS: Record<CropName, string> = {
    'Tomatoes': 'crates',
    'Wheat': '90kg bags',
    'Maize': '90kg bags',
    'Beans': '90kg bags',
    'Potatoes': '90kg bags',
    'Green Grams': '90kg bags',
    'Rice': '50kg bags'
  };

  return cropName in KENYA_CROP_UNITS 
    ? KENYA_CROP_UNITS[cropName as CropName] 
    : 'units';
};

export default CropDetails; 