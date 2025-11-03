import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar: string;
}

interface ChatWindowProps {
  name: string;
  avatar: string;
  online?: boolean;
  type: "chat" | "channel";
  members?: number;
}

const mockMessages: Message[] = [
  { id: "1", sender: "Анна Смирнова", content: "Привет! Как дела с проектом?", timestamp: "14:20", isOwn: false, avatar: "АС" },
  { id: "2", sender: "Вы", content: "Отлично! Закончил дизайн мессенджера", timestamp: "14:21", isOwn: true, avatar: "ЮА" },
  { id: "3", sender: "Анна Смирнова", content: "Супер! Покажешь?", timestamp: "14:21", isOwn: false, avatar: "АС" },
  { id: "4", sender: "Вы", content: "Конечно, щас скину ссылку", timestamp: "14:22", isOwn: true, avatar: "ЮА" },
  { id: "5", sender: "Анна Смирнова", content: "Жду! 🚀", timestamp: "14:22", isOwn: false, avatar: "АС" },
];

export default function ChatWindow({ name, avatar, online = false, type, members }: ChatWindowProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary/50">
              <AvatarFallback className="bg-primary/20 text-primary font-semibold text-lg">
                {avatar}
              </AvatarFallback>
            </Avatar>
            {online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background neon-glow" />
            )}
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-foreground">{name}</h2>
            {type === "channel" && members ? (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="Users" size={14} />
                {members.toLocaleString('ru-RU')} участников
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {online ? "В сети" : "Не в сети"}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="hover:bg-primary/20 hover:text-primary">
            <Icon name="Phone" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-secondary/20 hover:text-secondary">
            <Icon name="Video" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="hover:bg-muted">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${msg.isOwn ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-10 w-10 border-2 border-primary/30 flex-shrink-0">
                <AvatarFallback className="bg-primary/20 text-primary font-medium text-sm">
                  {msg.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className={`flex flex-col gap-1 max-w-md ${msg.isOwn ? "items-end" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {msg.sender}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </span>
                </div>
                
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.isOwn
                      ? "bg-primary text-primary-foreground neon-glow"
                      : "bg-card border border-border hover:border-primary/30"
                  } transition-all duration-200`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <Button size="icon" variant="ghost" className="hover:bg-muted flex-shrink-0">
            <Icon name="Plus" size={20} />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Написать сообщение..."
              className="pr-10 bg-muted border-border focus:border-primary transition-all"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-background"
            >
              <Icon name="Smile" size={18} />
            </Button>
          </div>
          
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-primary hover:bg-primary/80 text-primary-foreground neon-glow flex-shrink-0"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
