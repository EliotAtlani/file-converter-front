import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { Label } from "./ui/label";

interface TabProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  tabs: { id: number; title: string }[];
}
const Tabs = ({ tabs, activeTab, setActiveTab }: TabProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && activeTab < tabs.length) {
        event.preventDefault();
        setActiveTab(tabs[activeTab].id);
      }
      if (event.key === "ArrowLeft" && activeTab > 1) {
        event.preventDefault();
        setActiveTab(tabs[activeTab - 2].id);
      }
      if (event.key === "ArrowRight" && activeTab === tabs.length) {
        event.preventDefault();
        setActiveTab(tabs[0].id);
      }
      if (event.key === "ArrowLeft" && activeTab === 1) {
        event.preventDefault();
        setActiveTab(tabs[tabs.length - 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab]);

  return (
    <div className="absolute top-4 left-4">
      <div className="flex rounded-md">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            className={cn("relative px-4 py-2 rounded-full cursor-pointer")}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-primary/70 dark:bg-primary/30 rounded-full "
                )}
              />
            )}
            <Label className="relative block cursor-pointer">{tab.title}</Label>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
