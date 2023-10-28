import React from "react";

export default function HomePage() {
  const [message, setMessage] = React.useState("No message found");

  React.useEffect(() => {
    window.ipc?.on("message", (message: string) => {
      setMessage(message);
      console.log(message);
    });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold">{message}</h1>
    </>
  );
}
