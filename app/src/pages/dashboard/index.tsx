import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import Dashboard from "../../components/Dashboard";
import NavBar from "../../components/NavBar";
import { useAddress, useLogin, useUser } from "@thirdweb-dev/react";
import { use, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const address = useAddress();
  const { push } = useRouter();
  return (
    <div className="flex h-screen bg-gray-200">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          {address && <Dashboard />}
        </main>
        {!address && (
          <div className="flex h-full justify-center items-center">
            Please connect your wallet to continue
          </div>
        )}
      </div>
    </div>
  );
}
