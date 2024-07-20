import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "../ui/label";
import { XIcon } from "lucide-react";

const ListFilesUploaded = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  return (
    <ScrollArea className="grow mt-2 scrollin pr-4 pb-4">
      {files.length > 0 ? (
        <AnimatePresence>
          {files?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between gap-10 py-2"
            >
              <Label className="text-muted-foreground">{item.name}</Label>
              <XIcon
                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                className="cursor-pointer"
                size={18}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      ) : (
        <Label className="text-muted-foreground font-light">
          No files uploaded
        </Label>
      )}
    </ScrollArea>
  );
};

export default ListFilesUploaded;
