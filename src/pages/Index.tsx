import { useState } from "react";
import ChatList from "@/components/ChatList";
import FriendsList from "@/components/FriendsList";
import ChannelsList from "@/components/ChannelsList";
import ProfilePanel from "@/components/ProfilePanel";
import ChatWindow from "@/components/ChatWindow";
import Icon from "@/components/ui/icon";

type Tab = "chats" | "friends" | "channels" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChat, setSelectedChat] = useState<{
    name: string;
    avatar: string;
    online?: boolean;
    type: "chat" | "channel";
    members?: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      <nav className="w-20 bg-card border-r border-border flex flex-col items-center py-6 space-y-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent neon-glow flex items-center justify-center text-2xl font-bold cursor-pointer">
          ⚡
        </div>
        
        <div className="flex-1 flex flex-col space-y-4">
          <button
            onClick={() => setActiveTab("chats")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              activeTab === "chats"
                ? "bg-primary text-primary-foreground neon-glow"
                : "text-muted-foreground hover:text-primary hover:bg-muted"
            }`}
          >
            <Icon name="MessageSquare" size={24} />
          </button>
          
          <button
            onClick={() => setActiveTab("friends")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              activeTab === "friends"
                ? "bg-secondary text-secondary-foreground neon-glow"
                : "text-muted-foreground hover:text-secondary hover:bg-muted"
            }`}
          >
            <Icon name="Users" size={24} />
          </button>
          
          <button
            onClick={() => setActiveTab("channels")}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              activeTab === "channels"
                ? "bg-accent text-accent-foreground neon-glow"
                : "text-muted-foreground hover:text-accent hover:bg-muted"
            }`}
          >
            <Icon name="Radio" size={24} />
          </button>
        </div>
        
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            activeTab === "profile"
              ? "bg-primary text-primary-foreground neon-glow"
              : "text-muted-foreground hover:text-primary hover:bg-muted"
          }`}
        >
          <Icon name="User" size={24} />
        </button>
      </nav>

      <div className="flex-1 flex">
        <aside className="w-80 bg-card border-r border-border animate-fade-in">
          {activeTab === "chats" && <ChatList onChatSelect={setSelectedChat} />}
          {activeTab === "friends" && <FriendsList />}
          {activeTab === "channels" && <ChannelsList onChannelSelect={setSelectedChat} />}
          {activeTab === "profile" && <ProfilePanel />}
        </aside>

        <main className="flex-1 bg-background/50">
          {selectedChat ? (
            <ChatWindow
              name={selectedChat.name}
              avatar={selectedChat.avatar}
              online={selectedChat.online}
              type={selectedChat.type}
              members={selectedChat.members}
            />
          ) : (
            <div className="flex items-center justify-center h-full animate-scale-in">
              <div className="text-center space-y-4 max-w-md px-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent neon-glow flex items-center justify-center text-5xl animate-pulse">
                  ⚡
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  Добро пожаловать в мессенджер
                </h1>
                <p className="text-muted-foreground">
                  Выберите чат слева, чтобы начать общение с друзьями и каналами
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;