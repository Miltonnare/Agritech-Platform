# Kenyan Agricultural Dashboard

A modern, React-based web application designed to help Kenyan farmers manage their crops, monitor market prices, and connect with buyers. This platform aims to empower farmers with digital tools for better agricultural management and market access.

## 🌟 Features

### 🌾 Crop Management
- **Crop Tracking**: Monitor multiple crops with detailed information
  - Variety tracking
  - Quantity management
  - Harvest date predictions
  - Growth stage monitoring
- **Interactive Dashboard**: Visual representation of farm data
- **Crop Calendar**: Plan and track planting and harvesting schedules
- **Image Support**: Upload and view images of crops

### 🏪 Market Integration
- **Real-time Market Prices**: Stay updated with current market rates
- **Buyer Connection**: Direct platform for connecting with potential buyers
- **Price Trends**: Historical price data and trend analysis
- **Market Insights**: Regional market information and demand patterns

### ⛅ Weather Integration
- Weather forecasts for better farming decisions
- Historical weather data
- Climate-smart farming recommendations

### 📱 User Features
- **Profile Management**: Customize your farmer profile
- **Notifications**: Get alerts for important updates
  - Market price changes
  - Weather alerts
  - Buyer interests
  - Harvest reminders
- **Messaging System**: Communicate with buyers and other stakeholders
- **Multi-language Support**: Available in English and Swahili

## 🔧 Technical Stack

### Frontend
- **Framework**: React 18+
- **Routing**: React Router v6
- **Styling**: 
  - Tailwind CSS
  - Lucide Icons
  - Custom animations
- **State Management**: React Context API
- **Date Handling**: date-fns

### Backend Integration
- RESTful API integration
- JWT-based authentication
- Real-time data updates

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/kenyan-agri-dashboard.git
\`\`\`

2. Install dependencies:
\`\`\`bash
cd kenyan-agri-dashboard
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## 🔐 Environment Variables

Create a \`.env\` file with the following variables:
\`\`\`
REACT_APP_API_URL=your_api_url
REACT_APP_WEATHER_API_KEY=your_weather_api_key
REACT_APP_MAPS_API_KEY=your_maps_api_key
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── dashboard/       # Dashboard-specific components
│   └── layout/          # Layout components
├── context/             # React Context providers
├── pages/               # Page components
├── services/            # API and external service integrations
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and utilities
└── data/               # Mock data and constants
\`\`\`

## 🔄 State Management

The application uses React Context API for state management with the following contexts:
- **AuthContext**: User authentication and profile management
- **AppContext**: Application-wide state management
  - Crop management
  - Market data
  - Notifications
  - Messages

## 🛠️ Development

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### Testing
Run tests with:
\`\`\`bash
npm test
\`\`\`

### Building for Production
\`\`\`bash
npm run build
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Project Lead: [Name]
- Frontend Developer: [Name]
- Backend Developer: [Name]
- UI/UX Designer: [Name]

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)
- [date-fns](https://date-fns.org/)

## 📞 Support

For support, email support@example.com or join our Slack channel.


MIT License

Copyright (c) 2024 Kenyan Agricultural Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
