import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, MessageSquare, TrendingUp, TrendingDown, ShoppingCart, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  duration?: number;
}

const NotificationsList = () => {
  const { notifications, markNotificationAsRead } = useApp();
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'price_alert':
        return type === 'up' ? <TrendingUp size={18} className="text-success-500" /> : <TrendingDown size={18} className="text-error-500" />;
      case 'message':
        return <MessageSquare size={18} className="text-secondary-500" />;
      case 'order':
        return <ShoppingCart size={18} className="text-primary-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };

  const addToast = (toast: Toast) => {
    setToasts(prev => [...prev, toast]);
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    unreadNotifications.forEach(notification => {
      addToast({
        id: notification.id,
        type: notification.type === 'price_alert' ? 'warning' : 'info',
        message: notification.content,
        duration: 5000
      });
    });
  }, [notifications]);

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 min-w-[320px]">
      {/* Toast Notifications */}
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded-lg shadow-lg animate-slide-up
            ${toast.type === 'success' ? 'bg-success-500 text-white' :
              toast.type === 'warning' ? 'bg-warning-500 text-white' :
              toast.type === 'error' ? 'bg-error-500 text-white' :
              'bg-white text-gray-800'}`}
        >
          <div className="flex items-center">
            {getNotificationIcon(toast.type)}
            <span className="ml-2">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-gray-200 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}

      {/* Notification Badge */}
      {unreadNotifications.length > 0 && (
        <div className="fixed top-4 right-4 animate-bounce">
          <div className="relative">
            <Bell size={24} className="text-primary-500" />
            <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotifications.length}
            </span>
          </div>
        </div>
      )}

      {/* Recent Notifications List */}
      {unreadNotifications.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-4 max-h-[70vh] overflow-y-auto">
          <h3 className="font-medium text-gray-800 mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {unreadNotifications.slice(0, 5).map(notification => (
              <div
                key={notification.id}
                className="p-3 rounded-md bg-primary-50 border-l-4 border-primary-500 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {format(parseISO(notification.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="ml-2 text-xs text-primary-500 hover:text-primary-600"
                  >
                    Mark as read
                  </button>
                </div>
              </div>
            ))}
          </div>
          {unreadNotifications.length > 5 && (
            <a
              href="/notifications"
              className="block text-center text-sm text-primary-500 hover:text-primary-600 mt-4"
            >
              View all notifications
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
