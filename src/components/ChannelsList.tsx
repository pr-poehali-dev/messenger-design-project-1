import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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

interface ChannelsListProps {
  onChannelSelect?: (channel: { name: string; avatar: string; type: "chat" | "channel"; members: number }) => void;
}

const mockChannels: Channel[] = [
  { id: "1", name: "Веб-разработка", description: "Обсуждаем React, Vue, Angular", members: 1247, unread: 8, avatar: "💻", category: "Технологии" },
  { id: "2", name: "Дизайн UI/UX", description: "Figma, Sketch, тренды 2024", members: 892, unread: 0, avatar: "🎨", category: "Дизайн" },
  { id: "3", name: "Геймдев", description: "Unity, Unreal Engine", members: 2156, unread: 15, avatar: "🎮", category: "Игры" },
  { id: "4", name: "Искусственный интеллект", description: "ML, нейросети, ChatGPT", members: 3421, unread: 23, avatar: "🤖", category: "Технологии" },
  { id: "5", name: "Фриланс и карьера", description: "Работа, проекты, советы", members: 654, unread: 0, avatar: "💼", category: "Карьера" },
];

const mockDiscoverChannels: Channel[] = [
  { id: "6", name: "Криптовалюты", description: "Bitcoin, Ethereum, NFT", members: 5823, unread: 0, avatar: "💰", category: "Финансы" },
  { id: "7", name: "Фотография", description: "Советы, техника, обработка", members: 1456, unread: 0, avatar: "📷", category: "Творчество" },
  { id: "8", name: "Стартапы", description: "Бизнес-идеи и инвестиции", members: 2347, unread: 0, avatar: "🚀", category: "Бизнес" },
  { id: "9", name: "Фитнес и здоровье", description: "Тренировки, питание, мотивация", members: 3128, unread: 0, avatar: "💪", category: "Здоровье" },
  { id: "10", name: "Музыкальное производство", description: "Ableton, FL Studio, сведение", members: 987, unread: 0, avatar: "🎵", category: "Творчество" },
];

export default function ChannelsList({ onChannelSelect }: ChannelsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribedChannels, setSubscribedChannels] = useState<string[]>([]);
  
  const handleSubscribe = (channelId: string) => {
    setSubscribedChannels([...subscribedChannels, channelId]);
  };
  const renderChannelCard = (channel: Channel, subscribed: boolean = false, showSubscribeButton: boolean = false) => (
    <div
      key={channel.id}
      className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200 animate-fade-in"
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-14 w-14 border-2 border-accent/50 text-2xl flex-shrink-0">
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
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              {channel.members.toLocaleString('ru-RU')}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Tag" size={14} />
              {channel.category}
            </span>
          </div>
          
          <div className="flex gap-2">
            {showSubscribeButton && (
              subscribed ? (
                <Button variant="outline" disabled className="flex-1 border-accent/50 text-accent">
                  <Icon name="Check" size={16} className="mr-1" />
                  Подписан
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubscribe(channel.id)}
                  className="flex-1 bg-accent hover:bg-accent/80 text-accent-foreground neon-glow"
                >
                  <Icon name="Plus" size={16} className="mr-1" />
                  Подписаться
                </Button>
              )
            )}
            <Button
              onClick={() => onChannelSelect?.({ name: channel.name, avatar: channel.avatar, type: "channel", members: channel.members })}
              variant={showSubscribeButton ? "outline" : "default"}
              className={showSubscribeButton ? "flex-1 hover:bg-primary/20 hover:text-primary" : "w-full bg-primary hover:bg-primary/80 text-primary-foreground"}
            >
              <Icon name="MessageSquare" size={16} className="mr-1" />
              Открыть
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-accent neon-text">Каналы</h2>
      </div>
      
      <Tabs defaultValue="my" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2 bg-muted/50">
          <TabsTrigger value="my" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Мои каналы
          </TabsTrigger>
          <TabsTrigger value="discover" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Обзор
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="my" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {mockChannels.map((channel) => renderChannelCard(channel, false, false))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="discover" className="flex-1 mt-0">
          <div className="p-4">
            <div className="relative mb-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ищите каналы..."
                className="pl-10 bg-muted border-border focus:border-accent transition-all"
              />
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div className="px-4 pb-4 space-y-3">
              {mockDiscoverChannels
                .filter(channel => channel.name.toLowerCase().includes(searchQuery.toLowerCase()) || channel.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((channel) => renderChannelCard(channel, subscribedChannels.includes(channel.id), true))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}