import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const MessagesPage = () => {
  const { user, messages, markMessageAsRead } = useApp();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Get unique conversations
  const conversations = messages.reduce((acc: { id: string, name: string }[], message) => {
    if (message.senderId === user?.id) {
      // Message sent by user
      const recipient = { id: message.recipientId, name: message.senderName };
      if (!acc.some(c => c.id === recipient.id)) {
        acc.push(recipient);
      }
    } else if (message.recipientId === user?.id) {
      // Message received by user
      const sender = { id: message.senderId, name: message.senderName };
      if (!acc.some(c => c.id === sender.id)) {
        acc.push(sender);
      }
    }
    return acc;
  }, []);
  
  // Get messages for selected conversation
  const conversationMessages = selectedConversation 
    ? messages.filter(m => 
        (m.senderId === selectedConversation && m.recipientId === user?.id) || 
        (m.recipientId === selectedConversation && m.senderId === user?.id)
      ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];
  
  // Mark unread messages as read when conversation is selected
  if (selectedConversation) {
    conversationMessages.forEach(message => {
      if (!message.read && message.recipientId === user?.id) {
        markMessageAsRead(message.id);
      }
    });
  }
  
  const formatMessageTime = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      return format(date, 'h:mm a');
    } catch (error) {
      return '';
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the API
      console.log('Sending message to', selectedConversation, ':', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
      
      <div className="bg-white rounded-lg shadow-md p-0 h-[calc(100vh-14rem)] flex">
        {/* Conversations list */}
        <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Conversations</h2>
          </div>
          
          <div>
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                // Find latest message
                const latestMessage = [...messages]
                  .filter(m => 
                    (m.senderId === conversation.id && m.recipientId === user?.id) || 
                    (m.recipientId === conversation.id && m.senderId === user?.id)
                  )
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                
                // Check if there are unread messages
                const hasUnread = messages.some(m => 
                  m.senderId === conversation.id && 
                  m.recipientId === user?.id && 
                  !m.read
                );
                
                return (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                      ${selectedConversation === conversation.id ? 'bg-primary-50' : ''}
                      ${hasUnread ? 'font-medium bg-primary-50' : ''}
                    `}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">{conversation.name}</h3>
                      {latestMessage && (
                        <span className="text-xs text-gray-500">
                          {formatMessageTime(latestMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    {latestMessage && (
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {latestMessage.senderId === user?.id ? 'You: ' : ''}
                        {latestMessage.content}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No conversations yet.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Message area */}
        <div className="hidden md:flex flex-col w-2/3 h-full">
          {selectedConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                <h2 className="font-medium text-gray-800">
                  {conversations.find(c => c.id === selectedConversation)?.name}
                </h2>
              </div>
              
              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {conversationMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.senderId === user?.id 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-primary-100' : 'text-gray-500'
                      }`}>
                        {formatMessageTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <form 
                className="p-4 border-t border-gray-200 flex items-center"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-r-md hover:bg-primary-600 transition-colors"
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              <div>
                <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;