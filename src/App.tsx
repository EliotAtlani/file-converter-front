/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./components/logo";
import DragNdrop from "./components/DragNDrop";

import { FileType, UploadableFile } from "./lib/types";
import { useToast } from "./components/ui/use-toast";
import LoaderLayout from "./components/LoaderLayout";
import ListFilesHeader from "./components/FilesColumn/ListFilesHeader";
import ListFilesUploaded from "./components/FilesColumn/ListFilesUploaded";
import DownloadedFiles from "./components/FilesColumn/DownloadedFiles";
import Tabs from "./components/Tabs";
import UploadButtonConverter from "./components/FilesColumn/UploadButtonConverter";
import UploadButtonCompresser from "./components/FilesColumn/UploadedButtonCompresser";
import UploadButtonResize from "./components/FilesColumn/UploadButtonResize";

function App() {
  const { toast } = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<UploadableFile[] | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);
  const [conversionType, setConversionType] = useState<FileType>(FileType.PNG);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleFilesSelected = useCallback(
    (selectedFiles: File[]) => {
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      const validFiles = selectedFiles.filter((file) => {
        if (file.size > maxSize) {
          console.log("File is too large");
          toast({
            description: `File ${file.name} is larger than 10MB and won't be uploaded.`,
            variant: "destructive",
          });
          return false;
        }
        return true;
      });
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    },
    [toast]
  );

  const handleDeleteAll = () => {
    setFiles([]);
    setConvertedFiles(null);
  };

  const handleDownload = (convertedFile: UploadableFile) => {
    if (convertedFile) {
      const link = document.createElement("a");
      link.href = convertedFile.url;
      link.download = convertedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDowloadAll = () => {
    if (convertedFiles) {
      convertedFiles.forEach((file) => {
        const link = document.createElement("a");
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "o") {
        event.preventDefault();
        fileInputRef.current?.click();
      }

      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        selectRef.current?.click();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "j") {
        event.preventDefault();
        buttonRef.current?.click();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "u") {
        event.preventDefault();
        handleDeleteAll();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "i") {
        event.preventDefault();

        handleDowloadAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [convertedFiles]);

  const tabs = [
    {
      id: 1,
      title: "Converter",
    },
    {
      id: 2,
      title: "Compresser",
    },
    {
      id: 3,
      title: "Resizer",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  console.log("MAIN ACTIVE", activeTab);
  return (
    <div className="w-full h-screen flex relative">
      <LoaderLayout open={open} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grow flex flex-col items-center justify-center transfrom -translate-y-10">
        <Logo size="w-56 h-56" />
        <DragNdrop
          onFilesSelected={handleFilesSelected}
          width="500px"
          height="300px"
          fileInputRef={fileInputRef}
        />
      </div>
      <div className="bg-background/[0.4] backdrop-blur-sm flex flex-col h-screen w-[550px] border-l-[2px] border-primary/[0.4] p-6">
        <ListFilesHeader files={files} />

        <ListFilesUploaded files={files} setFiles={setFiles} />

        {convertedFiles && convertedFiles?.length > 0 && (
          <DownloadedFiles
            convertedFiles={convertedFiles}
            handleDowloadAll={handleDowloadAll}
            handleDownload={handleDownload}
          />
        )}

        {activeTab === 1 && (
          <UploadButtonConverter
            setConversionType={setConversionType}
            selectRef={selectRef}
            files={files}
            buttonRef={buttonRef}
            setOpen={setOpen}
            setConvertedFiles={setConvertedFiles}
            conversionType={conversionType}
          />
        )}
        {activeTab === 2 && (
          <UploadButtonCompresser
            selectRef={selectRef}
            files={files}
            buttonRef={buttonRef}
            setOpen={setOpen}
            setConvertedFiles={setConvertedFiles}
          />
        )}

        {activeTab === 3 && (
          <UploadButtonResize
            selectRef={selectRef}
            files={files}
            buttonRef={buttonRef}
            setOpen={setOpen}
            setConvertedFiles={setConvertedFiles}
          />
        )}
      </div>
    </div>
  );
}

export default App;
