/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import Kbd from "../ui/kbd";
import { Button } from "../ui/button";
import { APIReponseType, FileType, UploadableFile } from "@/lib/types";
import api from "@/lib/axios";
import { useToast } from "../ui/use-toast";

interface UploadButtonProps {
  setConversionType: (value: FileType) => void;
  selectRef: React.RefObject<HTMLDivElement>;
  files: File[];
  buttonRef: React.RefObject<HTMLButtonElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConvertedFiles: React.Dispatch<
    React.SetStateAction<UploadableFile[] | null>
  >;
  conversionType: FileType;
}
const UploadButtonConverter = ({
  setConversionType,
  selectRef,
  files,
  buttonRef,
  setOpen,
  setConvertedFiles,
  conversionType,
}: UploadButtonProps) => {
  const { toast } = useToast();
  const handleClick = async () => {
    setOpen(true);
    setConvertedFiles([]);
    try {
      const form = new FormData();
      files.forEach((file) => {
        form.append("files", file);
      });

      form.append("type", conversionType);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response: APIReponseType = await api.post(
        `/convertor/image`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newConvertedFiles: UploadableFile[] = response.data.map((item) => {
        const blob = new Blob([new Uint8Array(item.buffer.data)], {
          type: `image/${conversionType}`,
        });
        const url = URL.createObjectURL(blob);
        const name = item.fileName;
        return { url, name };
      });

      // Set the state once all files are processed
      setConvertedFiles(newConvertedFiles);
    } catch (error: any) {
      console.error(error.response.data.message);
      let errorMessage: string = "An error occurred while converting the files";
      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, spring: 0.5, bounce: 0.3 }}
      className="flex max-[1400px]:flex-col  max-[1400px]:items-start max-[1400px]:gap-4 justify-between items-end mt-4 bg-primary/10 p-4 rounded-md"
    >
      <div className="flex flex-col gap-4">
        <Label className=" text-lg"> Convert all files to </Label>
        <Select onValueChange={(value: FileType) => setConversionType(value)}>
          <SelectTrigger className="w-[240px] relative">
            <SelectValue
              placeholder="PNG"
              ref={selectRef}
              className="text-left flex justify-start"
              style={{ textAlign: "left" }}
              defaultValue="png"
            />
            <div className="absolute right-8">
              <Kbd letters="K" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.values(FileType).map((fileType) => (
              <SelectItem key={fileType} value={fileType}>
                {fileType.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        disabled={files.length == 0}
        ref={buttonRef}
        onClick={handleClick}
      >
        Convert <Kbd letters="J" className="bg-muted/50 ml-2" />
      </Button>
    </motion.div>
  );
};

export default UploadButtonConverter;
