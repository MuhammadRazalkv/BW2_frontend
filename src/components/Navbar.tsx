// import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  // const location = useLocation();

  return (
    <nav
      className="mt-2 mb-0.5 w-[95%] mx-auto h-16 shadow-sm rounded-full bg-background
  text-foreground flex items-center justify-between px-6 shadow-sidebar-ring"
    >
      <h1 className="text-xl font-bold tracking-wide">PDFSlice</h1>

      <div className="flex gap-6 text-base font-medium">
        {/* <Link
					to="/profile"
					className={`${
						location.pathname === '/profile' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
					} transition`}
				>
					Profile
				</Link> */}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
