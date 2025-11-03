import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface ChatListProps {
  onChatSelect?: (chat: { name: string; avatar: string; online: boolean; type: "chat" | "channel" }) => void;
}

const mockChats: Chat[] = [
  { id: "1", name: "Анна Смирнова", lastMessage: "Привет! Как дела?", timestamp: "14:23", unread: 3, avatar: "АС", online: true },
  { id: "2", name: "Максим Петров", lastMessage: "Отправил файлы", timestamp: "13:45", unread: 0, avatar: "МП", online: true },
  { id: "3", name: "Дизайн команда", lastMessage: "Юра: Готов макет!", timestamp: "12:30", unread: 5, avatar: "ДК", online: false },
  { id: "4", name: "Елена Волкова", lastMessage: "Созвон в 15:00", timestamp: "11:15", unread: 0, avatar: "ЕВ", online: false },
  { id: "5", name: "Dev Тусовка", lastMessage: "Кто на митап?", timestamp: "10:45", unread: 12, avatar: "ДТ", online: true },
];

export default function ChatList({ onChatSelect }: ChatListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-primary neon-text">Чаты</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {mockChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect?.({ name: chat.name, avatar: chat.avatar, online: chat.online, type: "chat" })}
              className="w-full p-3 rounded-lg hover:bg-muted transition-all duration-200 text-left group hover:neon-glow hover:border hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-primary/50">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background neon-glow" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground truncate">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <Badge className="bg-accent text-accent-foreground neon-glow ml-2">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}