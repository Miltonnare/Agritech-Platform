import React, { useState } from 'react';
import { Bell, Calendar, Filter, ChevronDown, AlertCircle, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { format, parseISO, isToday, isYesterday, isThisWeek, isThisMonth, formatDistanceToNow } from 'date-fns';

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

// Generate sample notifications with real timestamps
const generateNotifications = (): Notification[] => {
  const now = new Date();
  const notifications: Notification[] = [
    // Today's notifications
    {
      id: '1',
      type: 'price',
      title: 'Price Alert',
      message: 'Tomato prices have increased by 15% in Nairobi markets',
      timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30).toISOString(),
      priority: 'high',
      read: false,
      cropName: 'Tomatoes'
    },
    {
      id: '2',
      type: 'buyer',
      title: 'New Buyer Request',
      message: 'Fresh Mart Suppliers is looking for 200 crates of tomatoes',
      timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 15).toISOString(),
      priority: 'medium',
      read: false,
      cropName: 'Tomatoes'
    },
    // Yesterday's notifications
    {
      id: '3',
      type: 'market',
      title: 'Market Update',
      message: 'New government regulations for maize exports announced',
      timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 20).toISOString(),
      priority: 'high',
      read: true,
      cropName: 'Maize'
    },
    // This week's notifications
    {
      id: '4',
      type: 'alert',
      title: 'Weather Alert',
      message: 'Expected rainfall may affect harvest schedules',
      timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 9, 0).toISOString(),
      priority: 'medium',
      read: true
    },
    // Older notifications
    {
      id: '5',
      type: 'price',
      title: 'Price Update',
      message: 'Wheat prices stabilizing in major markets',
      timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 11, 45).toISOString(),
      priority: 'low',
      read: true,
      cropName: 'Wheat'
    }
  ];

  return notifications;
};

const NotificationsPage = () => {
  const [notifications] = useState<Notification[]>(generateNotifications());
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

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

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const filtered = notifications.filter(notification => {
      if (filter !== 'all' && notification.type !== filter) return false;
      if (timeFilter === 'today' && !isToday(parseISO(notification.timestamp))) return false;
      if (timeFilter === 'week' && !isThisWeek(parseISO(notification.timestamp))) return false;
      if (timeFilter === 'month' && !isThisMonth(parseISO(notification.timestamp))) return false;
      return true;
    });

    const groups: { [key: string]: Notification[] } = {};
    filtered.forEach(notification => {
      const date = parseISO(notification.timestamp);
      let key = 'Older';
      
      if (isToday(date)) {
        key = 'Today';
      } else if (isYesterday(date)) {
        key = 'Yesterday';
      } else if (isThisWeek(date)) {
        key = 'This Week';
      } else if (isThisMonth(date)) {
        key = 'This Month';
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(notification);
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with the latest market information and alerts
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select
                className="form-select rounded-md border-gray-300"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | NotificationType)}
              >
                <option value="all">All Types</option>
                <option value="price">Price Updates</option>
                <option value="market">Market News</option>
                <option value="buyer">Buyer Requests</option>
                <option value="alert">Alerts</option>
              </select>
            </div>

            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <select
                className="form-select rounded-md border-gray-300"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">{date}</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                      notification.priority === 'high'
                        ? 'border-red-500'
                        : notification.priority === 'medium'
                        ? 'border-yellow-500'
                        : 'border-gray-500'
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
                        {notification.cropName && (
                          <span className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {notification.cropName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;