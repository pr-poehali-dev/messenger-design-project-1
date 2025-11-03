import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface Channel {
  id: string;
  name: string;
  description: string;
  members: number;
  unread: number;
  avatar: string;
  category: string;
}

const mockChannels: Channel[] = [
  { id: "1", name: "Веб-разработка", description: "Обсуждаем React, Vue, Angular", members: 1247, unread: 8, avatar: "💻", category: "Технологии" },
  { id: "2", name: "Дизайн UI/UX", description: "Figma, Sketch, тренды 2024", members: 892, unread: 0, avatar: "🎨", category: "Дизайн" },
  { id: "3", name: "Геймдев", description: "Unity, Unreal Engine", members: 2156, unread: 15, avatar: "🎮", category: "Игры" },
  { id: "4", name: "Искусственный интеллект", description: "ML, нейросети, ChatGPT", members: 3421, unread: 23, avatar: "🤖", category: "Технологии" },
  { id: "5", name: "Фриланс и карьера", description: "Работа, проекты, советы", members: 654, unread: 0, avatar: "💼", category: "Карьера" },
];

export default function ChannelsList() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-accent neon-text">Каналы</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {mockChannels.map((channel) => (
            <button
              key={channel.id}
              className="w-full p-4 rounded-lg bg-card hover:bg-muted transition-all duration-200 text-left border border-border hover:border-accent/50 hover:neon-glow group"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-14 w-14 border-2 border-accent/50 text-2xl">
                  <AvatarFallback className="bg-accent/20 text-accent">
                    {channel.avatar}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">{channel.name}</p>
                    {channel.unread > 0 && (
                      <Badge className="bg-accent text-accent-foreground neon-glow">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Users" size={14} />
                      {channel.members.toLocaleString('ru-RU')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {channel.category}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
