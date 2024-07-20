import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { Label } from "./ui/label";

interface TabProps {
  activeTab: {
    id: number;
    title: string;
  };
  setActiveTab: React.Dispatch<
    React.SetStateAction<{
      id: number;
      title: string;
    }>
  >;
  tabs: { id: number; title: string }[];
}
const SmallTabs = ({ tabs, activeTab, setActiveTab }: TabProps) => {
  return (
    <div className="flex rounded-md ">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveTab(tab);
          }}
          className={cn("relative px-4 py-2 rounded-full cursor-pointer ")}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {activeTab.id === tab.id && (
            <motion.div
              layoutId="clickedbutton1"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className={cn(
                "absolute inset-0 bg-background/70 dark:bg-primary/30 rounded-full "
              )}
            />
          )}
          <Label className="relative block cursor-pointer">{tab.title}</Label>
        </button>
      ))}
    </div>
  );
};

export default SmallTabs;
