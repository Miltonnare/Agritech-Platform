import { User, Crop, Market, PriceData, WeatherData, Notification, Message } from '../types';
import { addDays, subDays, format } from 'date-fns';

const today = new Date();

export const currentUser: User = {
  id: 'u1',
  name: 'John Farmer',
  email: 'john@agrifarm.com',
  phone: '+1234567890',
  role: 'farmer',
  location: {
    address: 'Green Valley Farm, Rural Route 2, Farmville',
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
  },
  profileImage: 'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg',
  dateJoined: '2023-04-15',
};

export const crops: Crop[] = [
  {
    id: 'c1',
    name: 'Tomatoes',
    variety: 'Roma',
    quantity: 500,
    unit: 'kg',
    expectedHarvestDate: format(addDays(today, 15), 'yyyy-MM-dd'),
    images: [
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
    ],
    farmerId: 'u1',
  },
  {
    id: 'c2',
    name: 'Corn',
    variety: 'Sweet Corn',
    quantity: 1200,
    unit: 'kg',
    expectedHarvestDate: format(addDays(today, 30), 'yyyy-MM-dd'),
    images: [
      'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg'
    ],
    farmerId: 'u1',
  },
  {
    id: 'c3',
    name: 'Wheat',
    variety: 'Hard Red',
    quantity: 3000,
    unit: 'kg',
    expectedHarvestDate: format(addDays(today, 45), 'yyyy-MM-dd'),
    images: [
      'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'
    ],
    farmerId: 'u1',
  },
];

export const markets: Market[] = [
  {
    id: 'm1',
    name: 'Farmville Central Market',
    type: 'wholesale',
    location: {
      address: '123 Market St, Farmville',
      coordinates: {
        latitude: 34.0530,
        longitude: -118.2442,
      },
    },
    distance: 3.2,
    openingHours: {
      open: '06:00',
      close: '14:00',
    },
    contactPhone: '+1234567800',
    contactEmail: 'info@farmvillemarket.com',
  },
  {
    id: 'm2',
    name: 'Green Valley Cooperative',
    type: 'cooperative',
    location: {
      address: '456 Co-op Ave, Green Valley',
      coordinates: {
        latitude: 34.0500,
        longitude: -118.2400,
      },
    },
    distance: 7.5,
    openingHours: {
      open: '07:00',
      close: '17:00',
    },
    contactPhone: '+1234567801',
    contactEmail: 'coop@greenvalley.org',
  },
  {
    id: 'm3',
    name: 'Riverside Farmers Market',
    type: 'retail',
    location: {
      address: '789 River Rd, Riverside',
      coordinates: {
        latitude: 34.0550,
        longitude: -118.2500,
      },
    },
    distance: 12.1,
    openingHours: {
      open: '08:00',
      close: '15:00',
    },
    contactPhone: '+1234567802',
    contactEmail: 'hello@riversidefarmers.com',
  },
];

// Generate price data for the last 7 days
export const generatePriceData = (): PriceData[] => {
  const priceData: PriceData[] = [];
  const crops = ['Tomatoes', 'Corn', 'Wheat', 'Potatoes', 'Lettuce'];
  const markets = ['Farmville Central Market', 'Green Valley Cooperative', 'Riverside Farmers Market'];
  const units = ['kg', 'bushel', 'ton'];
  
  crops.forEach((crop, cropIndex) => {
    markets.forEach((market, marketIndex) => {
      // Base price different for each crop
      let basePrice = 1.5 + cropIndex * 0.8;
      
      // Generate prices for the last 7 days
      for (let i = 7; i >= 0; i--) {
        const date = subDays(today, i);
        
        // Add some randomness to the price
        const randomFactor = 0.9 + Math.random() * 0.2;
        const price = +(basePrice * randomFactor).toFixed(2);
        
        // Calculate trend compared to previous day
        const prevPrice = i < 7 ? basePrice : basePrice * (0.9 + Math.random() * 0.2);
        const percentChange = +((price - prevPrice) / prevPrice * 100).toFixed(1);
        const trend = percentChange > 0 ? 'up' : percentChange < 0 ? 'down' : 'stable';
        
        // Update base price for next iteration with some market movement
        basePrice = price * (0.98 + Math.random() * 0.04);
        
        priceData.push({
          id: `p${cropIndex}${marketIndex}${i}`,
          cropId: `c${cropIndex + 1}`,
          cropName: crop,
          marketId: `m${marketIndex + 1}`,
          marketName: market,
          price,
          unit: units[cropIndex % units.length],
          date: format(date, 'yyyy-MM-dd'),
          trend,
          percentChange,
        });
      }
    });
  });
  
  return priceData;
};

export const priceData = generatePriceData();

export const weatherForecast: WeatherData[] = [
  {
    date: format(today, 'yyyy-MM-dd'),
    condition: 'sunny',
    temperature: 28,
    humidity: 45,
    rainfall: 0,
    windSpeed: 8,
  },
  {
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    condition: 'sunny',
    temperature: 30,
    humidity: 40,
    rainfall: 0,
    windSpeed: 10,
  },
  {
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    condition: 'cloudy',
    temperature: 26,
    humidity: 65,
    rainfall: 0,
    windSpeed: 15,
  },
  {
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    condition: 'rainy',
    temperature: 22,
    humidity: 80,
    rainfall: 25,
    windSpeed: 20,
  },
  {
    date: format(addDays(today, 4), 'yyyy-MM-dd'),
    condition: 'rainy',
    temperature: 20,
    humidity: 85,
    rainfall: 40,
    windSpeed: 12,
  },
  {
    date: format(addDays(today, 5), 'yyyy-MM-dd'),
    condition: 'cloudy',
    temperature: 23,
    humidity: 70,
    rainfall: 5,
    windSpeed: 8,
  },
  {
    date: format(addDays(today, 6), 'yyyy-MM-dd'),
    condition: 'sunny',
    temperature: 25,
    humidity: 55,
    rainfall: 0,
    windSpeed: 5,
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    type: 'price_alert',
    title: 'Price Increase Alert',
    content: 'Tomato prices have increased by 8% at Farmville Central Market',
    timestamp: format(subDays(today, 1), 'yyyy-MM-dd HH:mm'),
    read: false,
    link: '/markets/m1',
  },
  {
    id: 'n2',
    userId: 'u1',
    type: 'message',
    title: 'New Message',
    content: 'You have a new message from Green Valley Cooperative regarding your corn harvest',
    timestamp: format(subDays(today, 2), 'yyyy-MM-dd HH:mm'),
    read: true,
    link: '/messages',
  },
  {
    id: 'n3',
    userId: 'u1',
    type: 'weather_alert',
    title: 'Weather Warning',
    content: 'Heavy rainfall expected in your area in the next 48 hours',
    timestamp: format(subDays(today, 3), 'yyyy-MM-dd HH:mm'),
    read: false,
    link: '/weather',
  },
  {
    id: 'n4',
    userId: 'u1',
    type: 'system',
    title: 'Account Update',
    content: 'Your profile has been successfully updated',
    timestamp: format(subDays(today, 5), 'yyyy-MM-dd HH:mm'),
    read: true,
  },
];

export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: 'm2',
    senderName: 'Green Valley Cooperative',
    recipientId: 'u1',
    content: "Hi John, we're interested in your upcoming corn harvest. Can you provide more details about expected quantity and quality?",
    timestamp: format(subDays(today, 2), 'yyyy-MM-dd HH:mm'),
    read: true,
  },
  {
    id: 'msg2',
    senderId: 'u1',
    senderName: 'John Farmer',
    recipientId: 'm2',
    content: "Hello, I'm expecting around 1200kg of sweet corn in about 30 days. The crop is developing well and quality should be excellent.",
    timestamp: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss'),
    read: true,
  },
  {
    id: 'msg3',
    senderId: 'm1',
    senderName: 'Farmville Central Market',
    recipientId: 'u1',
    content: "We've noticed you have tomatoes coming to harvest soon. We're currently offering premium prices for early Roma tomatoes.",
    timestamp: format(subDays(today, 1), 'yyyy-MM-dd HH:mm'),
    read: false,
  },
];