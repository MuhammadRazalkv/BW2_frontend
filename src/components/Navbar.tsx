import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav
      className="mt-2 mb-0.5 w-[95%] mx-auto h-16 rounded-full bg-background
    text-foreground flex items-center justify-between px-6
    shadow-sm shadow-sidebar-ring"
    >
      <Link to="/">
        <h1 className="text-xl font-bold tracking-wide select-none">
          PDFSlice
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {/* History */}
        <Link to={"/history"}>
          <Button variant={"outline"} className="">
            <History className="h-4 w-4" />
          </Button>
        </Link>

        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
