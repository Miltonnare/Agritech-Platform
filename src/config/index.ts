interface Config {
  api: {
    baseUrl: string;
  };
  features: {
    weatherForecast: boolean;
    marketInsights: boolean;
  };
  services: {
    weather: {
      apiKey: string;
    };
    maps: {
      apiKey: string;
    };
  };
  analytics: {
    sentryDsn: string | null;
    gaTrackingId: string | null;
  };
}

const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  },
  features: {
    weatherForecast: import.meta.env.VITE_ENABLE_WEATHER_FORECAST !== 'false',
    marketInsights: import.meta.env.VITE_ENABLE_MARKET_INSIGHTS !== 'false',
  },
  services: {
    weather: {
      apiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
    },
    maps: {
      apiKey: import.meta.env.VITE_MAPS_API_KEY || '',
    },
  },
  analytics: {
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || null,
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || null,
  },
};

export default config; 