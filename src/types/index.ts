export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'farmer' | 'buyer' | 'admin';
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  profileImage?: string;
  dateJoined: string;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  unit: string;
  expectedHarvestDate?: string;
  images?: string[];
  farmerId: string;
}

export interface Market {
  id: string;
  name: string;
  type: 'wholesale' | 'retail' | 'cooperative';
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  distance?: number; // in km
  openingHours: {
    open: string;
    close: string;
  };
  contactPhone?: string;
  contactEmail?: string;
}

export interface PriceData {
  id: string;
  cropId: string;
  cropName: string;
  marketId: string;
  marketName: string;
  price: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  percentChange: number;
}

export interface WeatherData {
  date: string;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'price_alert' | 'message' | 'weather_alert' | 'system';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  link?: string;
}