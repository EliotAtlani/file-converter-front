import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Kbd from "../ui/kbd";

const ListFilesHeader = ({ files }: { files: File[] }) => {
  return (
    <div className="flex justify-between items-center">
      <Label className="text-2xl">
        List of files
        <span className="text-sm font-light text-muted-foreground ml-2">
          {files.length > 0 && `${files.length} file(s) uploaded`}
        </span>
      </Label>
      {files.length > 0 && (
        <Button>
          Delete all <Kbd letters="U" className="bg-muted/50 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default ListFilesHeader;
