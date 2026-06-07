import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Feedback & Learning - RentIQ" }] }),
  component: Feedback,
});

type FeedbackItem = {
  icon: string;
  type: string;
  body: string;
  unit: string;
  status: string;
  tone: "success" | "info" | "warning" | "neutral";
  impact: string;
  tags: string[];
  time: string;
};

const STARTING_ITEMS: FeedbackItem[] = [
  {
    icon: "No",
    type: "Comp relevance",
    body: "Comp #3 (3322 Buford) backs onto I-85 - irrelevant to Midtown core units.",
    unit: "Unit 4B - 1247 Peachtree",
    status: "Accepted",
    tone: "success",
    impact: "Influenced 14 future recommendations",
    tags: ["noisy-road", "comp-too-far"],
    time: "2h",
  },
  {
    icon: "AI",
    type: "Local context",
    body: "New construction at 1024 Boulevard delivered, expect demand pull. Re-rank Inman Park comps.",
    unit: "Submarket - Inman Park",
    status: "Under review",
    tone: "info",
    impact: "Queued for DS triage",
    tags: ["new-construction"],
    time: "1d",
  },
  {
    icon: "No",
    type: "Confidence",
    body: "82% feels too high - comp set is thin above 1,100 sqft.",
    unit: "Unit 4B - 1247 Peachtree",
    status: "Ingested",
    tone: "success",
    impact: "Calibration adjusted in v4.2-candidate",
    tags: ["confidence-calibration"],
    time: "3d",
  },
  {
    icon: "Yes",
    type: "Driver",
    body: "Walkability boost on Inman Park feels right - matches my visits.",
    unit: "Submarket - Inman Park",
    status: "Logged",
    tone: "neutral",
    impact: "Positive signal recorded",
    tags: ["walkability"],
    time: "4d",
  },
];

function Feedback() {
  const [activeTab, setActiveTab] = useState("My Feedback");
  const [severity, setSeverity] = useState("Med");
  const [feedback, setFeedback] = useState("");
  const [items, setItems] = useState(STARTING_ITEMS);

  const submitFeedback = () => {
    if (!feedback.trim()) {
      toast.error("Add feedback text first");
      return;
    }

    setItems((current) => [
      {
        icon: severity,
        type: "Analyst feedback",
        body: feedback.trim(),
        unit: "Unit 4B - 1247 Peachtree",
        status: "Logged",
        tone: severity === "High" ? "warning" : "info",
        impact: "Queued for triage",
        tags: ["analyst-note", severity.toLowerCase()],
        time: "now",
      },
      ...current,
    ]);
    setFeedback("");
    toast.success("Feedback submitted");
  };

  return (
    <AppShell>
      <PageHeader
        title="Feedback & Learning Center"
        subtitle="Make analyst expertise a first-class training signal"
        actions={
          <>
            <Btn variant="ai">AI Submit feedback</Btn>
            <Btn variant="primary">Export</Btn>
          </>
        }
      />

      <div className="px-6 pb-6 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {[
            ["Your feedback (30d)", String(47 + items.length - STARTING_ITEMS.length), "+12"],
            ["Team feedback (30d)", "318", "+44"],
            ["Accepted into model", "62%", "+5pts"],
            ["Avg time to ingest", "4.2d", "-0.6d"],
          ].map(([label, value, delta]) => (
            <Card key={label} className="p-4">
              <div className="text-[12px] text-muted-foreground">{label}</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-[26px] font-semibold mono leading-none">{value}</div>
                <Chip tone="success">{delta}</Chip>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-1 border-b border-border">
          {["My Feedback", "Team Feedback", "Learning Progress", "Suggested Retraining"].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 h-9 text-[12.5px] border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-ai text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        <div className="grid grid-cols-[1fr_360px] gap-4">
          <Card
            title={activeTab}
            hint={`Latest ${Math.min(items.length, 5)} - ${items.length} total`}
          >
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={`${item.time}-${item.body}`} className="p-4 hover:bg-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="size-7 rounded-md bg-muted grid place-items-center text-[10px] font-medium">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-medium">{item.type}</span>
                        <Chip tone={item.tone}>{item.status}</Chip>
                        <span className="text-[10.5px] text-muted-foreground ml-auto mono">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[13px]">{item.body}</p>
                      <div className="mt-1.5 text-[11px] text-muted-foreground">{item.unit}</div>
                      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                        {item.tags.map((tag) => (
                          <Chip key={tag}>#{tag}</Chip>
                        ))}
                        <Chip tone="ai">AI {item.impact}</Chip>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-3">
            <Card title="Submit new feedback">
              <div className="p-4 space-y-3 text-[12.5px]">
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Type</div>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "Comp relevance",
                      "Feature weight",
                      "Local context",
                      "Data quality",
                      "Other",
                    ].map((type) => (
                      <Chip key={type}>{type}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">Severity</div>
                  <div className="flex gap-1">
                    {["Low", "Med", "High"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSeverity(level)}
                        className={`px-3 h-7 rounded-md border text-[12px] hover:bg-muted ${
                          severity === level ? "border-ai bg-ai-soft text-ai" : "border-border"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground mb-1">
                    Tell us in your own words
                  </div>
                  <div className="border border-border rounded-md p-2 bg-surface">
                    <textarea
                      rows={4}
                      value={feedback}
                      onChange={(event) => setFeedback(event.target.value)}
                      className="w-full bg-transparent outline-none text-[12.5px] resize-none"
                      placeholder="e.g. This comp is irrelevant because the neighborhood is significantly different..."
                    />
                    <div className="flex items-center justify-between mt-1">
                      <Chip tone="ai">AI will parse to tags</Chip>
                      <Btn variant="primary" onClick={submitFeedback}>
                        Submit
                      </Btn>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Learning progress" hint="Your feedback to model impact">
              <div className="p-4">
                <ol className="relative border-l border-border ml-1.5 space-y-3">
                  {[
                    ["Submitted", `${items.length + 43} events`, "ok"],
                    ["Triaged", "44", "ok"],
                    ["Validated", "31", "ok"],
                    ["Ingested", "29", "active"],
                    ["Impact measured", "14 future recs changed", "pending"],
                  ].map(([stage, metric, state]) => (
                    <li key={stage} className="ml-3 text-[12px]">
                      <span
                        className={`absolute -left-[5px] size-2 rounded-full ${state === "active" ? "bg-ai" : state === "pending" ? "bg-border-strong" : "bg-success"}`}
                      />
                      <div className="font-medium">{stage}</div>
                      <div className="text-muted-foreground mono text-[11px]">{metric}</div>
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
