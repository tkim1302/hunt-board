const NavBar: React.FC = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between border border-black pl-6 pr-6">
      <div className="font-abril text-4xl text-blue-500">HuntBoard</div>
      <div className="flex gap-6">
        <div>dark mode</div>
        <div>profile</div>
      </div>
    </div>
  );
};

export default NavBar;
