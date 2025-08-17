import { useState } from "react";
import { summarize, sendEmail } from "./api";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState(
    "Summarize in bullet points and highlight action items."
  );
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("Meeting Summary");
  const [msg, setMsg] = useState("");

  // read .txt file into textarea
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setTranscript(ev.target.result);
    reader.readAsText(f);
  };

  const handleGenerate = async () => {
    setMsg("");
    if (!transcript.trim()) {
      setMsg("Please paste or upload a transcript.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await summarize(transcript, prompt);
      // Groq/OpenAI compatible parsing
      const content =
        data?.choices?.[0]?.message?.content ??
        data?.choices?.[0]?.text ??
        JSON.stringify(data);
      setSummary(content);
      setMsg("Summary generated. You can edit it below.");
    } catch (err) {
      console.error(err);
      setMsg("Failed to generate summary. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    setMsg("");
    if (!emailTo.trim()) return setMsg("Enter recipient email.");
    if (!summary.trim()) return setMsg("Generate or type a summary first.");
    try {
      await sendEmail(emailTo.trim(), emailSubject.trim(), summary);
      setMsg("✅ Email sent successfully.");
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to send email. See backend logs.");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16, fontFamily: "system-ui, Arial" }}>
      <h2>AI Meeting Notes Summarizer</h2>
      <p style={{ color: "white" }}>
        Upload transcript → set prompt → Generate → Edit → Send via email
      </p>

      {/* Transcript */}
      <section style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ fontWeight: 600 }}>Transcript (.txt): </label>{" "}
        <input type="file" accept=".txt" onChange={handleFile} />
        <div style={{ marginTop: 8 }}>
          <textarea
            placeholder="Paste transcript here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={10}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
      </section>

      {/* Prompt */}
      <section style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ fontWeight: 600 }}>Custom instruction / prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", marginTop: 8 }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{ marginTop: 10, padding: "10px 14px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", cursor: "pointer" }}
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </section>

      {/* Summary (editable) */}
      <section style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ fontWeight: 600 }}>Editable Summary:</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={12}
          placeholder="Generated summary will appear here. You can edit it."
          style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", marginTop: 8 }}
        />
      </section>

      {/* Email */}
      <section style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <label style={{ fontWeight: 600 }}>Share via Email</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
          <input
            type="email"
            placeholder="Recipient email"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <button
          onClick={handleSend}
          style={{ marginTop: 10, padding: "10px 14px", borderRadius: 6, border: "1px solid #333", background: "#111", color: "#fff", cursor: "pointer" }}
        >
          Send Email
        </button>
      </section>

      {msg && (
        <p style={{ marginTop: 12, whiteSpace: "pre-wrap", color: msg.startsWith("✅") ? "green" : "#c00" }}>
          {msg}
        </p>
      )}
    </div>
  );
}
