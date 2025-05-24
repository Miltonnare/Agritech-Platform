import React from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, Wind, Droplets, Thermometer 
} from 'lucide-react';
import { weatherForecast } from '../../data/mockData';
import { format, parseISO } from 'date-fns';

const WeatherForecast = () => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="text-weather-sunny" size={24} />;
      case 'cloudy':
        return <Cloud className="text-gray-400" size={24} />;
      case 'rainy':
        return <CloudRain className="text-weather-rainy" size={24} />;
      case 'stormy':
        return <CloudLightning className="text-warning-500" size={24} />;
      default:
        return <Sun className="text-weather-sunny" size={24} />;
    }
  };

  // Get today's forecast
  const todayForecast = weatherForecast[0];
  
  // Get next 5 days
  const futureForecast = weatherForecast.slice(1, 6);

  return (
    <div className="bg-white rounded-lg shadow-md p-5 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Weather Forecast</h2>
        <a href="/weather" className="text-primary-500 hover:text-primary-600 text-sm">
          Full Forecast
        </a>
      </div>

      {/* Today's weather */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="p-3 bg-white rounded-full mr-4 shadow-sm">
              {getWeatherIcon(todayForecast.condition)}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Today</h3>
              <p className="text-sm text-gray-600">
                {format(parseISO(todayForecast.date), 'EEEE, MMM d')}
              </p>
              <p className="text-lg font-bold mt-1">{todayForecast.temperature}°C</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <Droplets size={16} className="text-weather-rainy mr-2" />
              <span className="text-sm text-gray-700">{todayForecast.humidity}% Humidity</span>
            </div>
            <div className="flex items-center">
              <Wind size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{todayForecast.windSpeed} km/h</span>
            </div>
            <div className="flex items-center">
              <CloudRain size={16} className="text-weather-rainy mr-2" />
              <span className="text-sm text-gray-700">{todayForecast.rainfall} mm</span>
            </div>
            <div className="flex items-center">
              <Thermometer size={16} className="text-error-500 mr-2" />
              <span className="text-sm text-gray-700">Feels like {todayForecast.temperature - 1}°C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming days */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {futureForecast.map((day, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors"
          >
            <p className="text-sm font-medium mb-2">
              {format(parseISO(day.date), 'EEE')}
            </p>
            {getWeatherIcon(day.condition)}
            <p className="text-lg font-bold mt-2">{day.temperature}°C</p>
            <p className="text-xs text-gray-500 mt-1">
              {day.rainfall > 0 ? `${day.rainfall}mm` : 'No rain'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;