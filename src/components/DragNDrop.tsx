import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import Kbd from "./ui/kbd";

interface DragNdropProps {
  onFilesSelected: (selectedFiles: File[]) => void;

  fileInputRef: React.RefObject<HTMLInputElement>;
}

const DragNdrop: React.FC<DragNdropProps> = ({
  onFilesSelected,
  fileInputRef,
}) => {
  const handleFiles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files: File[] = Array.from(event.target.files || []);
      onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const droppedFiles = event.dataTransfer?.files;
      if (droppedFiles && droppedFiles.length > 0) {
        const newFiles = Array.from(droppedFiles);
        onFilesSelected(newFiles);
      }
    },
    [onFilesSelected]
  );

  return (
    <div
      className={cn(
        "bg-background border-[1px] border-primary rounded-md p-4 mt-8 border-dashed flex items-center justify-center flex-col gap-4 text-center w-[300px] h-[200px] md:w-[500px] md:h-[300px]"
      )}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <>
        <Label className="text-xl font-bold">
          Drag and drop your files here
        </Label>
        <Label className="text-muted-foreground leading-8">
          Limit 10MB per file. Supported files:
          <br />
          .PNG, .JPEG, .HEIC, .WEBP, .GIF, .ICO
        </Label>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          id="browse"
          onChange={handleFiles}
          accept=".png,.jpeg,.heic,.webp,.gif,.ico,.jpg"
          multiple
        />
        <label
          htmlFor="browse"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
        >
          Browse files
        </label>
        <Kbd letters="O" />
      </>
    </div>
  );
};

export default DragNdrop;
