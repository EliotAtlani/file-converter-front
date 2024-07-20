import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Label } from "./ui/label";
import { FlipWords } from "./ui/flip-words";

const LoaderLayout = ({ open }: { open: boolean }) => {
  const words = ["uploaded", "converted", "compressed"];

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="flex items-center justify-between ">
        <PacmanLoader size={40} color="#EA580C" className="mr-32" />
        <Label className="text-xl text-center">
          Your files are being
          <FlipWords words={words} /> <br />
        </Label>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoaderLayout;
