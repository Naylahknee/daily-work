import React, { useState } from "react";

const PURPLE = "#6B21A8";
const CREAM = "#F7F4EF";
const INK = "#1A1A1A";
const LINE = "#D8D0C4";

const RTACOS = [
  { k: "R", label: "Role", q: "Who should AI be in this conversation?", ph: "e.g. HR specialist with 15 years handling wrongful termination claims" },
  { k: "T", label: "Task", q: "What exactly needs to be done? One clear action, active verb.", ph: "e.g. Draft a formal complaint letter documenting three unresolved issues" },
  { k: "A", label: "Audience", q: "Who is this output for or directed at?", ph: "e.g. The property management company, formal business relationship" },
  { k: "C", label: "Context", q: "What background does AI need to know?", ph: "e.g. Timeline, dates, what you've already tried, key facts and amounts" },
  { k: "O", label: "Output", q: "What format, length, or structure is needed?", ph: "e.g. Formal letter, one page, requesting response within 14 days" },
  { k: "S", label: "Specifics", q: "What tone, constraints, or things to avoid?", ph: "e.g. Firm but respectful, no emotional language, reference the lease" },
];

function Mode({ active, onClick, num, title, sub }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        textAlign: "left",
        padding: "18px 20px",
        background: active ? PURPLE : "transparent",
        color: active ? CREAM : INK,
        border: `1px solid ${active ? PURPLE : LINE}`,
        borderRadius: 0,
        cursor: "pointer",
        transition: "background 120ms",
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7, marginBottom: 6 }}>
        {num}
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 12, marginTop: 4, opacity: 0.75 }}>{sub}</div>
    </button>
  );
}

function Field({ label, value, onChange, placeholder, rows = 2 }) {
  return (
    <label style={{ display: "block", marginBottom: 20 }}>
      <span style={{ display: "block", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: PURPLE, fontWeight: 700, marginBottom: 7 }}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "11px 13px",
          fontSize: 15,
          fontFamily: "inherit",
          color: INK,
          background: "#FFFDF9",
          border: `1px solid ${LINE}`,
          borderRadius: 0,
          resize: "vertical",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = PURPLE)}
        onBlur={(e) => (e.target.style.borderColor = LINE)}
      />
    </label>
  );
}

function Morning() {
  const [f, setF] = useState({ ship: "", energy: "", one: "", block: "" });
  const u = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginTop: 0, marginBottom: 24 }}>
        Three minutes. Name the ship, find the one thing, clear the path.
      </p>
      <Field label="What is your active ship?" value={f.ship} onChange={u("ship")} placeholder="The one project you're locked on right now" />
      <Field label="Energy honestly" value={f.energy} onChange={u("energy")} placeholder="Depleted, steady, or fired up? No wrong answer." />
      <Field label="The ONE thing that moves it forward today" value={f.one} onChange={u("one")} placeholder="If only one thing happens, this is it" />
      <Field label="What might block it?" value={f.block} onChange={u("block")} placeholder="Name it now so it doesn't ambush you at 2pm" />
      {f.one.trim() && (
        <div style={{ borderLeft: `3px solid ${PURPLE}`, paddingLeft: 16, marginTop: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: PURPLE, fontWeight: 700, marginBottom: 6 }}>Today's commitment</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 18, color: INK }}>{f.one}</div>
        </div>
      )}
    </div>
  );
}

function TaskBuilder() {
  const [v, setV] = useState(Object.fromEntries(RTACOS.map((r) => [r.k, ""])));
  const [copied, setCopied] = useState(false);
  const u = (k) => (val) => setV((s) => ({ ...s, [k]: val }));
  const filled = RTACOS.filter((r) => v[r.k].trim());
  const prompt = filled.map((r) => `${r.label}:\n${v[r.k].trim()}`).join("\n\n");

  const copy = () => {
    const ta = document.createElement("textarea");
    ta.value = prompt;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginTop: 0, marginBottom: 6 }}>
        Translate what you need into something AI can act on. Fill what you know. Skip what you don't.
      </p>
      <p style={{ fontSize: 13, color: "#888", marginTop: 0, marginBottom: 24, fontStyle: "italic" }}>
        R-TACOS, pronounced "our tacos." Role is who AI becomes. Audience is who the output is for. They are not the same.
      </p>
      {RTACOS.map((r) => (
        <label key={r.k} style={{ display: "block", marginBottom: 20 }}>
          <span style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 7 }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: PURPLE, width: 18 }}>{r.k}</span>
            <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: PURPLE, fontWeight: 700 }}>{r.label}</span>
            <span style={{ fontSize: 13, color: "#777" }}>{r.q}</span>
          </span>
          <textarea
            value={v[r.k]}
            onChange={(e) => u(r.k)(e.target.value)}
            placeholder={r.ph}
            rows={2}
            style={{
              width: "100%", boxSizing: "border-box", padding: "11px 13px", fontSize: 15,
              fontFamily: "inherit", color: INK, background: "#FFFDF9",
              border: `1px solid ${LINE}`, borderRadius: 0, resize: "vertical", outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = PURPLE)}
            onBlur={(e) => (e.target.style.borderColor = LINE)}
          />
        </label>
      ))}

      {filled.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: PURPLE, fontWeight: 700 }}>Your prompt</span>
            <button
              onClick={copy}
              style={{
                background: copied ? PURPLE : "transparent", color: copied ? CREAM : PURPLE,
                border: `1px solid ${PURPLE}`, borderRadius: 0, padding: "7px 16px",
                fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em",
              }}
            >
              {copied ? "Copied" : "Copy prompt"}
            </button>
          </div>
          <pre style={{
            background: "#FFFDF9", border: `1px solid ${LINE}`, padding: "16px 18px",
            fontSize: 14, lineHeight: 1.6, color: INK, whiteSpace: "pre-wrap",
            fontFamily: "ui-monospace, Menlo, monospace", margin: 0,
          }}>{prompt}</pre>
        </div>
      )}
    </div>
  );
}

function Evening() {
  const [f, setF] = useState({ shipped: "", moved: "", stuck: "", tom: "" });
  const u = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const answered = f.shipped.trim() || f.moved.trim();
  return (
    <div>
      <p style={{ fontSize: 15, color: "#555", marginTop: 0, marginBottom: 24 }}>
        Did the ship move? Be honest. This is the check, not the verdict.
      </p>
      <Field label="What did you actually ship today?" value={f.shipped} onChange={u("shipped")} placeholder="Even partial counts. Name the real thing that exists now that didn't this morning." />
      <Field label="Did the active ship move forward?" value={f.moved} onChange={u("moved")} placeholder="Yes, no, or sideways. Say which." rows={1} />
      <Field label="What got stuck and why?" value={f.stuck} onChange={u("stuck")} placeholder="The honest blocker. Not the excuse, the blocker." />
      <Field label="The first move tomorrow" value={f.tom} onChange={u("tom")} placeholder="Set the hook now so morning-you doesn't have to decide" />
      {answered && (
        <div style={{ borderLeft: `3px solid ${PURPLE}`, paddingLeft: 16, marginTop: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: PURPLE, fontWeight: 700, marginBottom: 6 }}>Ship check</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 17, color: INK, lineHeight: 1.4 }}>
            {f.moved.trim() ? f.moved : "Logged."} {f.tom.trim() && <span style={{ color: "#777" }}>Tomorrow starts with: {f.tom}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("am");
  return (
    <div style={{ minHeight: "100vh", background: CREAM, padding: "32px 16px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: PURPLE, fontWeight: 700, marginBottom: 8 }}>
            Finish · Ship · pAId
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700, color: INK, margin: 0, lineHeight: 1.05 }}>
            R-TACOS Translator
          </h1>
          <p style={{ fontSize: 15, color: "#666", marginTop: 10, marginBottom: 0 }}>
            Your daily AI workflow. Morning check-in, task builder, evening ship check. Fresh every day.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          <Mode active={mode === "am"} onClick={() => setMode("am")} num="01" title="Morning" sub="Check in" />
          <Mode active={mode === "task"} onClick={() => setMode("task")} num="02" title="Task Builder" sub="Talk to AI" />
          <Mode active={mode === "pm"} onClick={() => setMode("pm")} num="03" title="Evening" sub="Ship check" />
        </div>

        <div style={{ background: "#FFFFFF", border: `1px solid ${LINE}`, padding: "28px 26px" }}>
          {mode === "am" && <Morning />}
          {mode === "task" && <TaskBuilder />}
          {mode === "pm" && <Evening />}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#A99", marginTop: 22 }}>
          Nothing is saved. Close the tab and today resets. That is the point.
        </p>
      </div>
    </div>
  );
}
