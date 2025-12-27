import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";

export default function TechnicianMessagesPage() {
  const userId = 'tech-1'; // TODO: derive from auth context
  return (
    <div className="h-[calc(100vh-5rem)] flex border rounded-lg overflow-hidden bg-white">
      <ChatSidebar userId={userId} />
      <ChatWindow userId={userId} />
    </div>
  );
}
