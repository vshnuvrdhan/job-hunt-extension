import { useState } from "react";

export default function ReplyForm() {
  const [mailText, setMailText] = useState("");
  const [mode, setMode] = useState("Polite");
  const [extra, setExtra] = useState("");
  const [model, setModel] = useState("groq");
  const [reply, setReply] = useState("");

  async function generateReply() {
    setReply("Generating...");

    const res = await fetch("http://localhost:5000/generate/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mailText,
        mode,
        extra,
        model
      })
    });

    const data = await res.json();
    setReply(data.reply || data.error);
  }

  return (
    <div>
      <h3>Reply Mail</h3>

      <textarea
        placeholder="Paste received mail"
        value={mailText}
        onChange={(e) => setMailText(e.target.value)}
        style={{ height: "30%" }}
      />

      <h3>Mode of reply</h3>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option>Polite</option>
        <option>Formal</option>
        <option>Casual</option>
        <option>Technical</option>
        <option>Short</option>
        <option>Addressing Manager</option>
        <option>Addressing Senior</option>
      </select>

      <h3>Additional instructions</h3>
      <input
        type="text"
        value={extra}
        onChange={(e) => setExtra(e.target.value)}
      />

      <h3>LLM Model</h3>
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="groq">Groq (Free)</option>
        <option value="openai">OpenAI</option>
      </select>

      <button onClick={generateReply}>Generate Reply</button>

      {reply && (
        <>
          <h3>Generated Reply</h3>
          <textarea value={reply} readOnly />
        </>
      )}
    </div>
  );
}




