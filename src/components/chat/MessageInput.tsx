import { useState, FormEvent, useRef } from 'react';
import { useChat } from '../../contexts/ChatContext';

interface MessageInputProps {
  chatId: string;
  senderId: string;
}

export default function MessageInput({ chatId, senderId }: MessageInputProps) {
  const { sendMessage } = useChat();
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    sendMessage(chatId, senderId, { text: text.trim() });
    setText('');
    setSending(false);
  };

  const attach = () => fileInputRef.current?.click();

  return (
    <form onSubmit={submit} className="flex items-end gap-2 border-t border-gray-200 p-3">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={1}
        placeholder="Type a message"
        className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit(e);
          }
        }}
      />
      <button
        type="button"
        onClick={attach}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
      >📎</button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={e => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = ev => {
            const url = ev.target?.result as string;
            sendMessage(chatId, senderId, { fileUrl: url });
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        }}
      />
      <button
        type="submit"
        disabled={!text.trim() || sending}
        className="rounded-lg bg-primary-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
