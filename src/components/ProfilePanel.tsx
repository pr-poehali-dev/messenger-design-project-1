import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

export default function ProfilePanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-primary neon-text">Профиль</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <Avatar className="h-24 w-24 border-4 border-primary/50 neon-glow">
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-3xl">
                ЮА
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Юрий Алексеев</h3>
              <p className="text-sm text-muted-foreground">@yurii_dev</p>
            </div>
            <Button variant="outline" className="w-full hover:bg-primary/20 hover:text-primary hover:border-primary">
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать профиль
            </Button>
          </div>
          
          <Separator className="bg-border" />
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary">Статус</h4>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg bg-muted hover:bg-muted/70 transition-all text-left flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full neon-glow" />
                <span className="text-sm">Онлайн</span>
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-muted transition-all text-left flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-sm">Не беспокоить</span>
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-muted transition-all text-left flex items-center gap-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full" />
                <span className="text-sm">Не в сети</span>
              </button>
            </div>
          </div>
          
          <Separator className="bg-border" />
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-secondary">Настройки</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Icon name="Bell" size={20} className="text-primary" />
                  <span className="text-sm">Уведомления</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} className="text-secondary" />
                  <span className="text-sm">Звук сообщений</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Icon name="Eye" size={20} className="text-accent" />
                  <span className="text-sm">Показывать онлайн</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <Separator className="bg-border" />
          
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start hover:bg-muted text-muted-foreground">
              <Icon name="HelpCircle" size={20} className="mr-3" />
              Помощь и поддержка
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-muted text-muted-foreground">
              <Icon name="Settings" size={20} className="mr-3" />
              Настройки аккаунта
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-destructive/20 text-destructive">
              <Icon name="LogOut" size={20} className="mr-3" />
              Выйти
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
