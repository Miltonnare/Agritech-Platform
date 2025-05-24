import React, { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, MessageSquare, CloudRain, Info, TrendingUp,
  ChevronRight, Check
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

// Define types for better type safety
interface Notification {
  id: string;
  type: 'price_alert' | 'message' | 'weather_alert' | string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationsPage = () => {
  const { notifications, markNotificationAsRead } = useApp();
  
  // Memoize filtered notifications to prevent unnecessary re-renders
  const { unreadNotifications, readNotifications } = useMemo(() => {
    const unread = notifications.filter(notification => !notification.read);
    const read = notifications.filter(notification => notification.read);
    return { unreadNotifications: unread, readNotifications: read };
  }, [notifications]);
  
  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case 'price_alert':
        return <TrendingUp size={18} className="text-primary-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-secondary-500" />;
      case 'weather_alert':
        return <CloudRain size={18} className="text-weather-rainy" />;
      default:
        return <Info size={18} className="text-gray-500" />;
    }
  }, []);
  
  const formatTimestamp = useCallback((timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch {
      return timestamp;
    }
  }, []);

  const handleMarkAsRead = useCallback((notificationId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Optimistic update - mark as read immediately
    markNotificationAsRead(notificationId);
  }, [markNotificationAsRead]);

  const handleViewDetails = useCallback((notificationId: string, link?: string) => {
    // Mark as read when viewing details
    markNotificationAsRead(notificationId);
    
    // Handle navigation if needed
    if (link) {
      // Use router navigation instead of window.location for better SPA behavior
      window.location.href = link;
    }
  }, [markNotificationAsRead]);

  // Simple mark all as read function (since it's not in context)
  const handleMarkAllAsRead = useCallback(() => {
    unreadNotifications.forEach(notification => {
      markNotificationAsRead(notification.id);
    });
  }, [unreadNotifications, markNotificationAsRead]);

  const NotificationCard = React.memo<NotificationCardProps>(({ notification }) => (
    <div 
      key={notification.id}
      className={`p-4 rounded-md border transition-all duration-200 ${
        notification.read 
          ? 'border-gray-200 bg-gray-50 opacity-75' 
          : 'border-primary-200 bg-primary-50 shadow-sm'
      } hover:shadow-md`}
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full mr-3 ${
          notification.read ? 'bg-gray-100' : 'bg-white'
        }`}>
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium ${
              notification.read ? 'text-gray-600' : 'text-gray-800'
            }`}>
              {notification.title}
              {!notification.read && (
                <span className="inline-block w-2 h-2 bg-primary-500 rounded-full ml-2"></span>
              )}
            </h3>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-4">
              {formatTimestamp(notification.timestamp)}
            </span>
          </div>
          <p className={`text-sm mt-1 ${
            notification.read ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {notification.content}
          </p>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-3">
              {notification.link && (
                <button
                  onClick={() => handleViewDetails(notification.id, notification.link)}
                  className="text-sm text-primary-500 hover:text-primary-600 flex items-center transition-colors"
                >
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </button>
              )}
            </div>
            
            {!notification.read && (
              <button
                onClick={(e) => handleMarkAsRead(notification.id, e)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center transition-colors px-2 py-1 rounded hover:bg-gray-100"
              >
                <Check size={16} className="mr-1" />
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ));

  // Add display name for debugging
  NotificationCard.displayName = 'NotificationCard';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {unreadNotifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary-500 hover:text-primary-600 flex items-center transition-colors"
          >
            <Check size={16} className="mr-1" />
            Mark all as read ({unreadNotifications.length})
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {/* Unread Notifications */}
            {unreadNotifications.length > 0 && (
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  New Notifications
                  <span className="ml-2 px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
                    {unreadNotifications.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Read Notifications */}
            {readNotifications.length > 0 && (
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">
                  Earlier Notifications
                </h2>
                <div className="space-y-3">
                  {readNotifications.map((notification) => (
                    <NotificationCard key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Bell size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No notifications yet</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;