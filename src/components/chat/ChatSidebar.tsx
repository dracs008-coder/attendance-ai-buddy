import { useChat } from '../../contexts/ChatContext';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
  userId: string;
  onSelect?: () => void; // optional callback after selecting chat (e.g., close mobile drawer)
}

export default function ChatSidebar({ userId, onSelect }: ChatSidebarProps) {
  const { chats, currentChatId, selectChat, markRead } = useChat();

  return (
    <aside className="w-72 border-r border-gray-200 overflow-y-auto bg-white">
      <div className="p-4 font-semibold text-lg">Messages</div>
      <ul className="space-y-1">
        {chats.map(chat => {
          const isActive = chat.id === currentChatId;
          const last = chat.lastMessage;
          const partnerLabel =
            userId === chat.customerId
              ? chat.technicianId || chat.adminTechId || 'Technician'
              : 'Customer';
          return (
            <li key={chat.id}>
              <button
                onClick={() => {
                  selectChat(chat.id);
                  // mark all as read for this user
                  markRead(chat.id, userId);
                  onSelect?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 ${isActive ? 'bg-gray-100' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900 truncate">
                      {partnerLabel}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: false })}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-600 truncate">
                    {last.text || (last.fileUrl ? '📎 Attachment' : '')}
                  </p>
                </div>
                {/* unread badge */}
                {(!chat.lastMessage.readBy || !chat.lastMessage.readBy.includes(userId)) && (
                  <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary-600 px-1.5 text-[11px] font-medium text-white">
                    1
                  </span>
                )}
                {/* Future: compute real unreadCount */}
              </button>
            </li>
          );
        })}
        {chats.length === 0 && (
          <li className="px-4 py-6 text-sm text-gray-500">No conversations.</li>
        )}
      </ul>
    </aside>
  );
}
