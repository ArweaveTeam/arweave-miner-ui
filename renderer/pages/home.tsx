import React from "react";
import { MainLayout } from "../layouts";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc?.on("message", (message: string) => {
      setMessage(message);
      console.log(message);
    });
  }, []);

  return (
    <MainLayout>
      <h1 className="text-3xl font-semibold">Homepage screen</h1>
    </MainLayout>
  );
}
