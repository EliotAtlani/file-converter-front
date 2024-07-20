import { cn } from "@/lib/utils";
import { CommandIcon } from "lucide-react";

const Kbd = ({
  letters,
  className,
}: {
  letters: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex rounded-[6px] bg-muted items-center px-2 gap-1",
        className
      )}
    >
      <CommandIcon size={14} />
      {letters}
    </div>
  );
};

export default Kbd;
