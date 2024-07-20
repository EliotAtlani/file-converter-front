import { cn } from "@/lib/utils";
import { ArrowBigUpIcon } from "lucide-react";

const KbdOption = ({
  letters,
  className,
}: {
  letters: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex rounded-[6px] bg-muted items-center px-2 gap-1 text-light text-xs ",
        className
      )}
    >
      <ArrowBigUpIcon size={14} />

      {letters}
    </div>
  );
};

export default KbdOption;
