import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, Thermometer,
  Umbrella, Leaf, AlertCircle
} from 'lucide-react';
import { weatherForecast } from '../data/mockData';
import { format, parseISO } from 'date-fns';

const WeatherPage = () => {
  const getWeatherIcon = (condition: string, size = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="text-weather-sunny" size={size} />;
      case 'cloudy':
        return <Cloud className="text-gray-400" size={size} />;
      case 'rainy':
        return <CloudRain className="text-weather-rainy" size={size} />;
      case 'stormy':
        return <CloudLightning className="text-warning-500" size={size} />;
      default:
        return <Sun className="text-weather-sunny" size={size} />;
    }
  };

  const getFarmingTip = (forecast: typeof weatherForecast[0]) => {
    if (forecast.condition === 'rainy' && forecast.rainfall > 20) {
      return {
        icon: <Umbrella size={20} className="text-weather-rainy" />,
        text: "Heavy rain expected. Consider postponing any outdoor activities and ensure proper drainage in fields."
      };
    }
    
    if (forecast.condition === 'sunny' && forecast.temperature > 25) {
      return {
        icon: <Thermometer size={20} className="text-error-500" />,
        text: "High temperatures expected. Ensure adequate irrigation for sensitive crops."
      };
    }
    
    if (forecast.windSpeed > 15) {
      return {
        icon: <Wind size={20} className="text-gray-600" />,
        text: "Strong winds expected. Secure any structures or coverings for sensitive plants."
      };
    }
    
    return {
      icon: <Leaf size={20} className="text-primary-500" />,
      text: "Good farming conditions today. Ideal for regular field activities."
    };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Weather Forecast</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">7-Day Forecast</h2>
        
        <div className="space-y-6">
          {/* Today's detailed forecast */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-4 bg-white rounded-full mr-4 shadow-sm">
                  {getWeatherIcon(weatherForecast[0].condition, 48)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Today</h3>
                  <p className="text-sm text-gray-600">
                    {format(parseISO(weatherForecast[0].date), 'EEEE, MMMM d, yyyy')}
                  </p>
                  <p className="text-2xl font-bold mt-1">{weatherForecast[0].temperature}°C</p>
                  <p className="text-sm text-gray-600 capitalize">{weatherForecast[0].condition}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Droplets size={20} className="text-weather-rainy mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-medium">{weatherForecast[0].humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind size={20} className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="font-medium">{weatherForecast[0].windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CloudRain size={20} className="text-weather-rainy mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Rainfall</p>
                    <p className="font-medium">{weatherForecast[0].rainfall} mm</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Thermometer size={20} className="text-error-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Feels like</p>
                    <p className="font-medium">{weatherForecast[0].temperature - 1}°C</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Farming tip */}
            <div className="mt-4 p-3 bg-white bg-opacity-70 rounded-md">
              <div className="flex items-start">
                {getFarmingTip(weatherForecast[0]).icon}
                <div className="ml-2">
                  <p className="font-medium text-gray-800">Farming Tip</p>
                  <p className="text-sm text-gray-600">{getFarmingTip(weatherForecast[0]).text}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Weekly forecast */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">7-Day Outlook</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {weatherForecast.map((day, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium mb-2">
                    {format(parseISO(day.date), 'EEE')}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {format(parseISO(day.date), 'MMM d')}
                  </p>
                  {getWeatherIcon(day.condition)}
                  <p className="text-lg font-bold mt-2">{day.temperature}°C</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <CloudRain size={12} className="mr-1" />
                    <span>{day.rainfall}mm</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather alerts */}
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weather Alerts</h2>
        
        {weatherForecast.some(day => day.condition === 'rainy' && day.rainfall > 20) ? (
          <div className="border-l-4 border-warning-500 bg-warning-50 p-4 rounded-r-md">
            <div className="flex">
              <AlertCircle size={24} className="text-warning-500 mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">Heavy Rain Warning</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Heavy rainfall expected in the next few days. Consider taking precautions to protect crops and ensure proper drainage.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Sun size={48} className="mx-auto mb-3 text-weather-sunny" />
            <p>No severe weather alerts at this time.</p>
            <p className="text-sm mt-1">Weather conditions look favorable for farming activities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;