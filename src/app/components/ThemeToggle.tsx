import Image from "next/image";

const ThemeToggle: React.FC = () => {
  return (
    <button className="flex h-14 w-14 items-center justify-center rounded-full hover:bg-gray-100">
      <Image
        src="/darkModeButton.png"
        width={40}
        height={20}
        alt="darkModeButton.png"
      />
    </button>
  );
};

export default ThemeToggle;
