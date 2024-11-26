import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rotate">
        <Image src="/loading.png" width={60} height={60} alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;
