import { Outlet } from "react-router-dom";
import { Providers } from "./providers";
import { PreparingPage } from "@/features/preparing-page";

export function App() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col justify-center">
        <Outlet />
      </div>

      <PreparingPage />
    </Providers>
  );
}
