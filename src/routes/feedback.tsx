import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Feedback & Learning · RentIQ" }] }),
  component: Feedback,
});

function Feedback() {
  return (
    <AppShell>
      <PageHeader
        title="Feedback & Learning Center"
        subtitle="Make analyst expertise a first-class training signal"
        actions={<><Btn variant="ai">✦ Submit feedback</Btn><Btn variant="primary">Export</Btn></>}
      />

      <div className="px-6 pb-6 space-y-4">
        {/* KPI strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            ["Your feedback (30d)", "47", "+12"],
            ["Team feedback (30d)", "318", "+44"],
            ["Accepted into model", "62%", "+5pts"],
            ["Avg time to ingest", "4.2d", "−0.6d"],
          ].map(([l, v, d]) => (
            <Card key={l as string} className="p-4">
              <div className="text-[12px] text-muted-foreground">{l}</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-[26px] font-semibold mono leading-none">{v}</div>
                <Chip tone="success">{d}</Chip>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border">
          {["My Feedback", "Team Feedback", "Learning Progress", "Suggested Retraining"].map((t, i) => (
            <button
              key={t}
              className={`px-3 h-9 text-[12.5px] border-b-2 -mb-px ${i === 0 ? "border-ai text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_360px] gap-4">
          {/* Feed */}
          <Card title="Your feedback" hint="Latest 5 · 47 total">
            <ul className="divide-y divide-border">
              {[
                {
                  icon: "👎",
                  type: "Comp relevance",
                  body: "Comp #3 (3322 Buford) backs onto I-85 — irrelevant to Midtown core units.",
                  unit: "Unit 4B · 1247 Peachtree",
                  status: "Accepted",
                  tone: "success",
                  impact: "Influenced 14 future recommendations",
                  tags: ["noisy-road", "comp-too-far"],
                  time: "2h",
                },
                {
                  icon: "✦",
                  type: "Local context",
                  body: "New construction at 1024 Boulevard delivered, expect demand pull. Re-rank Inman Park comps.",
                  unit: "Submarket · Inman Park",
                  status: "Under review",
                  tone: "info",
                  impact: "Queued for DS triage",
                  tags: ["new-construction"],
                  time: "1d",
                },
                {
                  icon: "👎",
                  type: "Confidence",
                  body: "82% feels too high — comp set is thin above 1,100 sqft.",
                  unit: "Unit 4B · 1247 Peachtree",
                  status: "Ingested",
                  tone: "success",
                  impact: "Calibration adjusted in v4.2-candidate",
                  tags: ["confidence-calibration"],
                  time: "3d",
                },
                {
                  icon: "👍",
                  type: "Driver",
                  body: "Walkability boost on Inman Park feels right — matches my visits.",
                  unit: "Submarket · Inman Park",
                  status: "Logged",
                  tone: "neutral",
                  impact: "Positive signal recorded",
                  tags: ["walkability"],
                  time: "4d",
                },
              ].map((f) => (
                <li key={f.body} className="p-4 hover:bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="size-7 rounded-md bg-muted grid place-items-center text-[14px]">{f.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-medium">{f.type}</span>
                        <Chip tone={f.tone as any}>{f.status}</Chip>
                        <span className="text-[10.5px] text-muted-foreground ml-auto mono">{f.time}</span>
                      </div>
                      <p className="text-[13px]">{f.body}</p>
                      <div className="mt-1.5 text-[11px] text-muted-foreground">{f.unit}</div>
                      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                        {f.tags.map((t) => <Chip key={t}>#{t}</Chip>)}
                        <Chip tone="ai">✦ {f.impact}</Chip>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Right rail: structured form + progress */}
          <div className="space-y-3">
            <Card title="Submit new feedback">
              <div className="p-4 space-y-3 text-[12.5px]">
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Type</div>
                  <div className="flex flex-wrap gap-1">
                    {["Comp relevance", "Feature weight", "Local context", "Data quality", "Other"].map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Severity</div>
                  <div className="flex gap-1">
                    {["Low", "Med", "High"].map((s) => (
                      <button key={s} className="px-3 h-7 rounded-md border border-border text-[12px] hover:bg-muted">{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Tell us in your own words</div>
                  <div className="border border-border rounded-md p-2 bg-surface">
                    <textarea rows={4} className="w-full bg-transparent outline-none text-[12.5px] resize-none" placeholder="e.g. This comp is irrelevant because the neighborhood is significantly different…" />
                    <div className="flex items-center justify-between mt-1">
                      <Chip tone="ai">✦ AI will parse to tags</Chip>
                      <Btn variant="primary">Submit</Btn>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Learning progress" hint="Your feedback → model impact">
              <div className="p-4">
                <ol className="relative border-l border-border ml-1.5 space-y-3">
                  {[
                    ["Submitted", "47 events", "ok"],
                    ["Triaged", "44", "ok"],
                    ["Validated", "31", "ok"],
                    ["Ingested", "29", "active"],
                    ["Impact measured", "14 future recs changed", "pending"],
                  ].map(([s, m, st]) => (
                    <li key={s} className="ml-3 text-[12px]">
                      <span className={`absolute -left-[5px] size-2 rounded-full ${st === "active" ? "bg-ai" : st === "pending" ? "bg-border-strong" : "bg-success"}`} />
                      <div className="font-medium">{s}</div>
                      <div className="text-muted-foreground mono text-[11px]">{m}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
