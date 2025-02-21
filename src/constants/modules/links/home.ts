import { IoMdChatbubbles } from "react-icons/io";
import { TbHome, TbLayoutDashboardFilled, TbUserCog } from "react-icons/tb";

interface HomeLink {
  name: string;
  icon: React.ElementType;
  route: string;
}

export const HomeLinks: HomeLink[] = [
  {
    name: "Home",
    icon: TbHome,
    route: "/modules",
  },
  {
    name: "Feeds",
    icon: TbLayoutDashboardFilled,
    route: "/modules?view=feed",
  },
  {
    name: "Chatbot",
    icon: IoMdChatbubbles,
    route: "/chat-bot",
  },
  {
    name: "Profile",
    icon: TbUserCog,
    route: "/profile",
  }
]
