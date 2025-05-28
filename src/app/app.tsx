import { Outlet } from "react-router-dom";
import { Providers } from "./providers";
import { PreparingPage } from "@/features/preparing-page";

export function App() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col justify-center min-w-[1280px]">
        <Outlet />
      </div>

      <PreparingPage />
    </Providers>
  );
}
