import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Kbd from "../ui/kbd";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import { UploadableFile } from "@/lib/types";

interface DownloadedFilesProps {
  convertedFiles: UploadableFile[];
  handleDowloadAll: () => void;
  handleDownload: (convertedFile: UploadableFile) => void;
}
const DownloadedFiles = ({
  convertedFiles,
  handleDowloadAll,
  handleDownload,
}: DownloadedFilesProps) => {
  return (
    <>
      <div className="flex items-center justify-between mt-4">
        <Label className="text-2xl">Converted File</Label>
        <Button onClick={handleDowloadAll}>
          Download all
          <Kbd letters="I" className="bg-muted/50 ml-2" />
        </Button>
      </div>
      <ScrollArea className="mt-2 scrollin pr-4">
        {convertedFiles.map((item, index) => (
          <div key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center justify-between gap-4 py-2 mt-2"
            >
              <Label className="text-muted-foreground">{item.name}</Label>
              <DownloadIcon
                size={20}
                className="mr-2 cursor-pointer"
                onClick={() => handleDownload(item)}
              />
            </motion.div>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default DownloadedFiles;
