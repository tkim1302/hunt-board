import { getServerSession } from "next-auth";
import LastUpdated from "./LastUpdated";
import Profile from "./Profile";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ThemeToggle from "./ThemeToggle";

const NavBar: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-16 w-full items-center justify-between border border-black pl-6 pr-6">
      <div className="flex items-center gap-4">
        <div className="font-abril text-4xl text-blue-500">HuntBoard</div>
        <LastUpdated />
      </div>

      <div className="flex gap-6">
        <ThemeToggle />
        <Profile session={session} />
      </div>
    </div>
  );
};

export default NavBar;
