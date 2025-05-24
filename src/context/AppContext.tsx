import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification, User, Market, Crop, PriceData, Message } from '../types';
import { 
  currentUser, 
  markets, 
  crops, 
  priceData, 
  notifications, 
  messages 
} from '../data/mockData';

interface AppContextType {
  user: User | null;
  markets: Market[];
  crops: Crop[];
  priceData: PriceData[];
  notifications: Notification[];
  unreadNotificationsCount: number;
  messages: Message[];
  unreadMessagesCount: number;
  markNotificationAsRead: (id: string) => void;
  markMessageAsRead: (id: string) => void;
  addNewCrop: (crop: Omit<Crop, 'id' | 'farmerId'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(currentUser);
  const [marketsList, setMarketsList] = useState<Market[]>(markets);
  const [cropsList, setCropsList] = useState<Crop[]>(crops);
  const [pricesList, setPricesList] = useState<PriceData[]>(priceData);
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications);
  const [messagesList, setMessagesList] = useState<Message[]>(messages);

  const unreadNotificationsCount = notificationsList.filter(n => !n.read).length;
  const unreadMessagesCount = messagesList.filter(m => !m.read && m.recipientId === user?.id).length;

  const markNotificationAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markMessageAsRead = (id: string) => {
    setMessagesList(prev => 
      prev.map(message => 
        message.id === id 
          ? { ...message, read: true } 
          : message
      )
    );
  };

  const addNewCrop = (crop: Omit<Crop, 'id' | 'farmerId'>) => {
    const newCrop: Crop = {
      ...crop,
      id: `c${cropsList.length + 1}`,
      farmerId: user?.id || 'u1',
    };
    
    setCropsList(prev => [...prev, newCrop]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        markets: marketsList,
        crops: cropsList,
        priceData: pricesList,
        notifications: notificationsList,
        unreadNotificationsCount,
        messages: messagesList,
        unreadMessagesCount,
        markNotificationAsRead,
        markMessageAsRead,
        addNewCrop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};