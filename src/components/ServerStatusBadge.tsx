import { useState, useEffect } from "react";
import api from "../lib/axios";
import { motion } from "framer-motion";
import { Label } from "./ui/label";

const ServerStatus = () => {
  const [isServerUp, setIsServerUp] = useState(true);

  const checkServerStatus = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout

      const response = await api.get("/ping/", {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 200) {
        setIsServerUp(true);
      } else {
        setIsServerUp(false);
      }
    } catch (error) {
      setIsServerUp(false);
    }
  };

  useEffect(() => {
    // Check server status on component mount
    checkServerStatus();

    // Set up an interval to check the server status every 20 seconds
    const intervalId = setInterval(checkServerStatus, 20000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!isServerUp) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="px-4 py-3 absolute border-[#FFBD9B] border-[1px] rounded-md bottom-6 left-20 z-50"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFBD9B]" />
          <Label className="text-[#FFBD9B]">Server is down !</Label>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default ServerStatus;
