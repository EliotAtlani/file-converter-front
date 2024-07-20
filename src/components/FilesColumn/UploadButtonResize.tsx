/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
import { APIReponseResizedType, UploadableFile } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import api from "@/lib/axios";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import SmallTabs from "../SmallTabs";

interface UploadButtonProps {
  selectRef: React.RefObject<HTMLDivElement>;
  files: File[];
  buttonRef: React.RefObject<HTMLButtonElement>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConvertedFiles: React.Dispatch<
    React.SetStateAction<UploadableFile[] | null>
  >;
}
const UploadButtonResize = ({
  selectRef,
  files,
  buttonRef,
  setOpen,
  setConvertedFiles,
}: UploadButtonProps) => {
  const { toast } = useToast();

  const [resizeRatio, setResizeRatio] = React.useState<number>(80);

  const [width, setWidth] = useState<string>("1000");
  const [height, setHeight] = useState<string>("auto");

  const isValidDimension = (value: string): boolean => {
    return value === "auto" || (!isNaN(Number(value)) && Number(value) > 0);
  };

  const validateDimensions = (width: string, height: string): boolean => {
    if (!isValidDimension(width) || !isValidDimension(height)) {
      throw new Error(
        "Invalid width or height. Must be a positive number or 'auto'."
      );
    }
    if (width === "auto" && height === "auto") {
      throw new Error("Width and height can't both be 'auto'.");
    }
    return true;
  };

  const handleClick = async () => {
    setOpen(true);
    setConvertedFiles([]);
    try {
      const form = new FormData();
      files.forEach((file) => {
        form.append("files", file);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      let response: APIReponseResizedType = { data: [] };

      if (activeTab.id === 1) {
        if (validateDimensions(width, height)) {
          form.append("keepAspectRatio", checked.toString());
          form.append("width", (width ?? 0).toString());
          form.append("height", (height ?? 0).toString());
          response = await api.post(`/convertor/resize-pixel`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }
      } else if (activeTab.id === 2) {
        form.append("ratio", resizeRatio.toString());
        response = await api.post(`/convertor/resize-percentage`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      const newConvertedFiles: UploadableFile[] = response.data.map((item) => {
        const blob = new Blob([new Uint8Array(item.buffer.data)]);
        const url = URL.createObjectURL(blob);
        const name = item.resizedName;
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

  const [checked, setChecked] = useState<boolean>(true);

  const setChangeWidth = (e: any) => {
    if (checked) {
      setHeight("auto");
    }
    setWidth(e.target.value);
  };

  const setChangeHeight = (e: any) => {
    console.log(e.target.value);
    if (checked) {
      console.log(checked);

      setWidth("auto");
    }
    setHeight(e.target.value);
  };

  const setCheckBox = (value: boolean) => {
    if (value) {
      setHeight("auto");
    }
    setChecked(value);
  };

  const tabs = [
    {
      id: 1,
      title: "By pixels",
    },
    {
      id: 2,
      title: "By percentage",
    },
  ];

  const [activeTab, setActiveTab] = useState<{ id: number; title: string }>(
    tabs[0]
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, spring: 0.5, bounce: 0.3 }}
      className="flex max-[1400px]:flex-col  max-[1400px]:items-start max-[1400px]:gap-4 justify-between items-end mt-4 bg-primary/10 p-4 rounded-md"
    >
      <div className="flex flex-col gap-2">
        <Label className="text-lg"> Resize all files </Label>
        <SmallTabs
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
        {activeTab.id === 1 && (
          <>
            <div className="flex items-center my-4 gap-2">
              <Checkbox
                checked={checked}
                onCheckedChange={(value: boolean) => setCheckBox(value)}
              />
              <Label> Keep image aspect ratio</Label>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <Label> Width</Label>
                <div className="relative">
                  <Input
                    name="width"
                    id="width"
                    type="text"
                    className="w-[140px] pr-8"
                    onChange={(e) => setChangeWidth(e)}
                    value={width}
                  />
                  <Label className="absolute right-3 top-3">px</Label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label> Height</Label>
                <div className="relative">
                  <Input
                    name="height"
                    id="height"
                    type="text"
                    className="w-[140px] pr-8"
                    onChange={(e) => setChangeHeight(e)}
                    value={height}
                  />
                  <Label className="absolute right-3 top-3">px</Label>
                </div>
              </div>
            </div>
          </>
        )}
        {activeTab.id === 2 && (
          <Select
            onValueChange={(value: string) => setResizeRatio(parseInt(value))}
          >
            <SelectTrigger className="w-[240px] relative">
              <SelectValue
                placeholder="20% smaller"
                ref={selectRef}
                className="text-left flex justify-start"
                style={{ textAlign: "left" }}
                defaultValue="20"
              />
              <div className="absolute right-8">
                <Kbd letters="K" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20">20% smaller</SelectItem>
              <SelectItem value="50">50% smaller</SelectItem>
              <SelectItem value="80">80% smaller</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        disabled={files.length == 0}
        ref={buttonRef}
        onClick={handleClick}
      >
        Resize <Kbd letters="J" className="bg-muted/50 ml-2" />
      </Button>
    </motion.div>
  );
};

export default UploadButtonResize;
