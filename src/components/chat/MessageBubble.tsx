import { Message } from '../../contexts/ChatContext';
import { format } from 'date-fns';

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
}

export default function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const base = 'px-4 py-2 rounded-lg max-w-xs break-words';
  const mineStyle = 'bg-primary-600 text-white self-end rounded-br-none';
  const theirsStyle = 'bg-gray-100 text-gray-900 self-start rounded-bl-none';

  return (
    <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
      <div className={`${base} ${isMine ? mineStyle : theirsStyle}`}>{message.text || '📎 Attachment'}</div>
      <span className="mt-1 text-[10px] text-gray-500">
        {format(new Date(message.createdAt), 'p')}
      </span>
    </div>
  );
}
