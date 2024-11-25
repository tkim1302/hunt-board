"use client";

import { motion, useAnimationControls } from "framer-motion";
import SignIn from "./SignIn";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.3 } },
};

const h1Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 },
};

const h2Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1 },
};

const signInVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Layout: React.FC = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    const loop = async () => {
      await controls.start("visible");

      controls.start({
        scale: [0.9, 1],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    };

    loop();
  }, [controls]);

  return (
    <motion.div
      className="flex h-screen w-full justify-around"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex basis-[65%] flex-col items-center justify-center gap-24 border-r border-gray-600">
        <motion.h1
          className="font-dela text-8xl text-blue-500"
          variants={h1Variants}
          transition={{ duration: 0.5 }}
        >
          HuntBoard
        </motion.h1>
        <motion.h2
          className="font-dela w-3/5 text-center text-4xl dark:text-gray-200"
          variants={h2Variants}
          transition={{ duration: 0.5 }}
        >
          A POWERFUL TOOL TO TRACK YOUR JOB APPLICATIONS
        </motion.h2>
      </motion.div>
      <motion.div
        className="flex basis-[35%] flex-col items-center justify-center gap-16"
        variants={signInVariants}
        initial="hidden"
        animate={controls}
      >
        <SignIn />
      </motion.div>
    </motion.div>
  );
};

export default Layout;
