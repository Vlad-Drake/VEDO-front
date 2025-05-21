import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";
import { Footer } from "@/features/footer";

export function ProtectedLayout() {
  return (
    <>
      <AppHeader />
      <div className="flex flex-grow items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
