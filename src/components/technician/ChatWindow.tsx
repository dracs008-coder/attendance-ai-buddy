import { useState, useRef, useEffect } from "react";
import Avatar from "../common/Avatar";

interface Message { id: string; senderId: string; text: string; createdAt: string }

import { useProfiles } from "../../contexts/ProfileContext";

export default function ChatWindow({ userId }: { userId?: string }) {
  const { currentUser, getUser } = useProfiles();
  const meId = userId || currentUser.id;
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", senderId: "cust-1", text: "Hello, are you on the way?", createdAt: new Date().toISOString() },
    { id: "2", senderId: meId, text: "Yes ma'am, arriving in 15 minutes.", createdAt: new Date().toISOString() }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: String(Date.now()), senderId: meId, text: input.trim(), createdAt: new Date().toISOString() }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[60vh] border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.map(m => {
          const myMsg = m.senderId === meId;
          const profile = getUser(m.senderId);
          return (
            <div key={m.id} className={`flex items-end gap-2 ${myMsg ? 'justify-end' : 'justify-start'}`}>
              {!myMsg && <Avatar src={profile?.avatarUrl} name={profile?.name} size={32} />}
              <div className={`max-w-xs rounded-lg p-2 text-sm ${myMsg ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                {m.text}
              </div>
              {myMsg && <Avatar src={profile?.avatarUrl} name={profile?.name} size={32} />}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 p-3 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
          placeholder="Type a message..."
        />
        <button onClick={send} className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50" disabled={!input.trim()}>Send</button>
      </div>
    </div>
  );
}
