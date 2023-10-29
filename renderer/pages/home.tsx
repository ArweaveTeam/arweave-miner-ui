import React from "react";
import { MainLayout } from "../layouts";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc?.on("message", (message: string) => {
      setMessage(message);
      console.log(message);
    });
  }, []);

  const handleConnectDashboardBtn = () => {
    router.push("/dashboard");
  }

  return (
    <MainLayout>
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto p-4 h-[90vh]">
          <div className="flex flex-col items-start justify-center h-full">
            <h1 className="text-3xl font-bold mb-2">Arweave Mining Dashboard.</h1>
            <p className="font-light mt-2">Connect to view your stats of your experience mining.</p>

            <div className="flex items-center gap-4 mt-6">
              <button type="button" onClick={handleConnectDashboardBtn} className="text-white px-6 py-3 rounded-md mt-4 bg-[#494949] uppercase w-64 hover:bg-[#494949]/80">Connect to Dashboard</button>
              <button type="button" className="text-[#494949] px-6 py-3 rounded-md mt-4 uppercase border border-[#494949] w-64 hover:bg-gray-200">Learn</button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
