import { useEffect, useState } from "react";
import FollowUpForm from "./components/FollowUpForm";
import ReplyForm from "./components/ReplyForm";

export default function App() {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    chrome.storage.local.get("panelMode", ({ panelMode }) => {
      setMode(panelMode);
    });
  }, []);

  if (!mode) return <p>Loading...</p>;

  return (
    <>
      {mode === "FOLLOW_UP" && <FollowUpForm />}
      {mode === "REPLY_MAIL" && <ReplyForm />}
    </>
  );
}

