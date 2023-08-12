import { Inter } from "next/font/google";

import Dashboard from "../components/Dashboard";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-200">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
