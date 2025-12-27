import { useEffect, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  userId: string;
}

export default function ChatWindow({ userId }: ChatWindowProps) {
  const { currentChatId, messages } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!currentChatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} isMine={msg.senderId === userId} />
        ))}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <MessageInput chatId={currentChatId} senderId={userId} />
    </div>
  );
}
