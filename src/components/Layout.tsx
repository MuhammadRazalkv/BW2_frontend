import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 overflow-auto px-6 py-4">
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
