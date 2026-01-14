import { useEffect, useState } from "react";

export default function FollowUpForm() {
  const [applications, setApplications] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [intent, setIntent] = useState("Checking application status");
  const [extra, setExtra] = useState("");
  const [generated, setGenerated] = useState("");

  // Load saved applications
  useEffect(() => {
    chrome.storage.local.get("jobApplications", ({ jobApplications }) => {
      setApplications(jobApplications || []);
    });
  }, []);

  async function saveApplication(e) {
    e.preventDefault();

    const form = e.target;
    const newApp = {
      id: crypto.randomUUID(),
      company: form.company.value,
      role: form.role.value,
      hrEmail: form.hrEmail.value,
      appliedDate: form.appliedDate.value,
      createdAt: new Date().toISOString(),
      lastFollowUpAt: null
    };

    const updated = [...applications, newApp];
    setApplications(updated);
    chrome.storage.local.set({ jobApplications: updated });

    form.reset();
  }

  async function generateFollowUp() {
    const app = applications.find(a => a.id === selectedId);
    if (!app) return;

    setGenerated("Generating...");

    const res = await fetch("http://localhost:5000/generate/followup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company: app.company,
        role: app.role,
        appliedDate: app.appliedDate,
        intent,
        extra
      })
    });

    const data = await res.json();
    setGenerated(data.followup || data.error);
  }

  return (
    <div>
      <h3>Add Job Application</h3>

      <form onSubmit={saveApplication}>
        <input name="company" placeholder="Company" required />
        <input name="role" placeholder="Role" required />
        <input name="hrEmail" placeholder="HR Email (optional)" />
        <input name="appliedDate" type="date" required />
        <button type="submit">Save Application</button>
      </form>

      <hr />

      <h3>Generate Follow-up</h3>

      {applications.length === 0 ? (
        <p>No applications saved yet.</p>
      ) : (
        <>
          <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            <option value="">Select application</option>
            {applications.map(app => (
              <option key={app.id} value={app.id}>
                {app.company} — {app.role}
              </option>
            ))}
          </select>

          <h4>Follow-up intent</h4>
          <select value={intent} onChange={e => setIntent(e.target.value)}>
            <option>Checking application status</option>
            <option>Expressing continued interest</option>
            <option>Asking about next steps</option>
            <option>Gentle reminder</option>
            <option>Following up after interview</option>
          </select>

          <h4>Additional instructions</h4>
          <input value={extra} onChange={e => setExtra(e.target.value)} />

          <button onClick={generateFollowUp}>Generate Follow-up</button>

          {generated && (
            <>
              <h3>Generated Follow-up</h3>
              <textarea readOnly value={generated} />
            </>
          )}
        </>
      )}
    </div>
  );
}


