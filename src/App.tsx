import { useEffect } from "react";

const handle = {
  useTypingIndicator: () => {
    useEffect(() => {
      console.log("Hello from custom hook");
    }, []);
  },
};

function room() {
  return handle;
}

export default function App() {
  const { useTypingIndicator } = room();
  useTypingIndicator();
  return <div>Hello!</div>;
}
