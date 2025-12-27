import React, { createContext, useContext, useState, useMemo } from 'react';

// ---- Types ----------------------------------------------------
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text?: string;
  fileUrl?: string;
  readBy?: string[];
  createdAt: string;
}

export interface Chat {
  id: string; // same as serviceRequestId for simplicity
  customerId: string;
  technicianId?: string;
  adminTechId?: string;
  lastMessage: Message;
  updatedAt: string;
}

interface ChatContextValue {
  chats: Chat[];
  currentChatId: string | null;
  messages: Message[]; // messages for currentChatId
  selectChat: (id: string) => void;
  markRead: (chatId: string, userId: string) => void;
  sendMessage: (chatId: string, senderId: string, payload: { text?: string; fileUrl?: string }) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

// ---- Mock data ------------------------------------------------
const mockMessages: Message[] = [
  {
    id: 'm-1',
    chatId: 'req-1',
    senderId: 'customer-1',
    text: 'Hi, I need an update on my request.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    readBy: ['customer-1']
  },
  {
    id: 'm-2',
    chatId: 'req-1',
    senderId: 'tech-1',
    text: 'Sure, I will be there tomorrow at 9 AM.',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    readBy: ['customer-1', 'tech-1']
  }
];

const mockChats: Chat[] = [
  {
    id: 'req-1',
    customerId: 'customer-1',
    technicianId: 'tech-1',
    lastMessage: mockMessages[1],
    updatedAt: mockMessages[1].createdAt
  },
  {
    id: 'req-2',
    customerId: 'customer-1',
    adminTechId: 'admin-tech-1',
    lastMessage: {
      id: 'm-3',
      chatId: 'req-2',
      senderId: 'admin-tech-1',
      text: 'We have received your photos, thank you.',
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      readBy: ['customer-1']
    },
    updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  }
];

// ---- Provider -------------------------------------------------
export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [messagesByChat, setMessagesByChat] = useState<Record<string, Message[]>>({
    'req-1': mockMessages,
    'req-2': [mockChats[1].lastMessage]
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const selectChat = (id: string) => setCurrentChatId(id);

  const markRead = (chatId: string, userId: string) => {
    setMessagesByChat(prev => ({
      ...prev,
      [chatId]: prev[chatId]?.map(m => (m.readBy?.includes(userId) ? m : { ...m, readBy: [...(m.readBy || []), userId] })) || []
    }));
  };

  const sendMessage = (chatId: string, senderId: string, payload: { text?: string; fileUrl?: string }) => {
    const msg: Message = {
      id: `m-${Date.now()}`,
      chatId,
      senderId,
      text: payload.text,
      fileUrl: payload.fileUrl,
      createdAt: new Date().toISOString()
    };

    setMessagesByChat(prev => ({
      ...prev,
      [chatId]: prev[chatId] ? [...prev[chatId], msg] : [msg]
    }));

    setChats(prev => {
      const others = prev.filter(c => c.id !== chatId);
      const chat = prev.find(c => c.id === chatId) || {
        id: chatId,
        customerId: senderId.startsWith('customer') ? senderId : 'customer-unknown',
        lastMessage: msg,
        updatedAt: msg.createdAt
      } as Chat;
      return [
        {
          ...chat,
          lastMessage: msg,
          updatedAt: msg.createdAt
        },
        ...others
      ];
    });
  };

  const messages: Message[] = useMemo(() => (currentChatId ? messagesByChat[currentChatId] || [] : []), [currentChatId, messagesByChat]);

  return (
    <ChatContext.Provider value={{ chats, currentChatId, messages, selectChat, markRead, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

// ---- Hook -----------------------------------------------------
export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used inside ChatProvider');
  return ctx;
}
