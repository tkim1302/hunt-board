"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ThemeToggle: React.FC = () => {
  const [mode, setMode] = useState("light");
  const router = useRouter();

  useEffect(() => {
    const cookieVal = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      ?.split(";")[0];

    if (cookieVal === "") {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
    }
  }, []);

  const handleClick = () => {
    const cookieVal = ("; " + document.cookie)
      .split(`; mode=`)
      .pop()
      ?.split(";")[0];
    if (cookieVal === "light") {
      document.cookie = "mode=dark; max-age=" + 3600 * 24 * 400;
      setMode("dark");
    } else {
      document.cookie = "mode=light; max-age=" + 3600 * 24 * 400;
      setMode("light");
    }
    router.refresh();
  };

  return (
    <button
      onClick={() => handleClick()}
      className="flex h-14 w-14 items-center justify-center rounded-full hover:bg-gray-100"
    >
      {mode === "light" ? (
        <Image
          src="/darkModeButton.webp"
          width={55}
          height={30}
          alt="darkModeButton.webp"
        />
      ) : (
        <Image
          src="/lightModeButton.webp"
          width={55}
          height={30}
          alt="darkModeButton.webp"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
