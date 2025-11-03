import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function FriendsList() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-secondary neon-text">Друзья</h2>
      </div>
      
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2 bg-muted/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            Все друзья
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
