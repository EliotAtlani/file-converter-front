import { cn } from "@/lib/utils";
import logo from "../assets/logo.png";
interface LogoProps {
  className?: string;
  size?: string;
}

const Logo = ({ className, size = "w-32 h-32" }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="File Swap Logo"
      className={cn(className, size, "max-w-full")}
    />
  );
};

export default Logo;
