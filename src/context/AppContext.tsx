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

interface Crop {
  id: string;
  name: string;
  variety: string;
  quantity: number;
  expectedHarvestDate?: string;
  images?: string[];
  description?: string;
  unit?: string;
}

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
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

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

  const addCrop = (crop: Omit<Crop, 'id'>) => {
    const newCrop = {
      ...crop,
      id: Date.now().toString()
    };
    setCropsList(prevCrops => [...prevCrops, newCrop]);
  };

  const updateCrop = (id: string, updatedCrop: Partial<Crop>) => {
    setCropsList(prevCrops =>
      prevCrops.map(crop =>
        crop.id === id ? { ...crop, ...updatedCrop } : crop
      )
    );
  };

  const deleteCrop = (id: string) => {
    setCropsList(prevCrops => prevCrops.filter(crop => crop.id !== id));
  };

  const value = {
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
    addCrop,
    updateCrop,
    deleteCrop
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;