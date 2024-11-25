"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <Image src="/loading.png" width={60} height={60} alt="loading.png" />
      </motion.div>
    </div>
  );
};

export default Loading;
