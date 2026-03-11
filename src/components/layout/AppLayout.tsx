import { Outlet } from "react-router-dom";
import { TopNavbar } from "./TopNavbar";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
