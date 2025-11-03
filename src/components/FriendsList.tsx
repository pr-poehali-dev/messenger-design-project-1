import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Friend {
  id: string;
  name: string;
  status: string;
  avatar: string;
  online: boolean;
}

interface FriendRequest {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
}

const mockFriends: Friend[] = [
  { id: "1", name: "Анна Смирнова", status: "В игре: Cyberpunk 2077", avatar: "АС", online: true },
  { id: "2", name: "Максим Петров", status: "Кодит на TypeScript", avatar: "МП", online: true },
  { id: "3", name: "Елена Волкова", status: "Не в сети", avatar: "ЕВ", online: false },
  { id: "4", name: "Дмитрий Козлов", status: "На встрече", avatar: "ДК", online: true },
];

const mockRequests: FriendRequest[] = [
  { id: "1", name: "Олег Иванов", avatar: "ОИ", mutualFriends: 12 },
  { id: "2", name: "Мария Сидорова", avatar: "МС", mutualFriends: 5 },
];

interface SearchResult {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  isFriend: boolean;
}

const mockSearchResults: SearchResult[] = [
  { id: "1", name: "Алексей Новиков", avatar: "АН", mutualFriends: 8, isFriend: false },
  { id: "2", name: "Светлана Кузнецова", avatar: "СК", mutualFriends: 3, isFriend: false },
  { id: "3", name: "Игорь Лебедев", avatar: "ИЛ", mutualFriends: 15, isFriend: false },
  { id: "4", name: "Наталья Морозова", avatar: "НМ", mutualFriends: 6, isFriend: false },
];

export default function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  
  const handleSendRequest = (userId: string) => {
    setSentRequests([...sentRequests, userId]);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-secondary neon-text">Друзья</h2>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-3 bg-muted/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            Все друзья
          </TabsTrigger>
          <TabsTrigger value="search" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Поиск
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Заявки ({mockRequests.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {mockFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="p-4 rounded-lg bg-card hover:bg-muted transition-all duration-200 border border-border hover:border-secondary/50 hover:neon-glow group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-secondary/50">
                        <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
                          {friend.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {friend.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background neon-glow" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{friend.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{friend.status}</p>
                    </div>
                    
                    <Button size="icon" variant="ghost" className="hover:bg-primary/20 hover:text-primary">
                      <Icon name="MessageCircle" size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="search" className="flex-1 mt-0">
          <div className="p-4">
            <div className="relative mb-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ищите друзей..."
                className="pl-10 bg-muted border-border focus:border-primary transition-all"
              />
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <ScrollArea className="h-full">
            <div className="px-4 pb-4 space-y-2">
              {mockSearchResults
                .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((user) => {
                  const requestSent = sentRequests.includes(user.id);
                  
                  return (
                    <div
                      key={user.id}
                      className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-200 animate-fade-in"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-primary/50">
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.mutualFriends} общих друзей
                          </p>
                        </div>
                        
                        {requestSent ? (
                          <Button variant="outline" disabled className="border-primary/50 text-primary">
                            <Icon name="Check" size={16} className="mr-1" />
                            Отправлено
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleSendRequest(user.id)}
                            className="bg-primary hover:bg-primary/80 text-primary-foreground neon-glow"
                          >
                            <Icon name="UserPlus" size={16} className="mr-1" />
                            Добавить
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="requests" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12 border-2 border-accent/50">
                      <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                        {request.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{request.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.mutualFriends} общих друзей
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground neon-glow">
                      <Icon name="Check" size={16} className="mr-1" />
                      Принять
                    </Button>
                    <Button variant="outline" className="flex-1 hover:bg-destructive/20 hover:text-destructive hover:border-destructive">
                      <Icon name="X" size={16} className="mr-1" />
                      Отклонить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}