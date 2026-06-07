import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · RentIQ" }] }),
  component: Reports,
});

const TEMPLATES = [
  ["Pricing Decisions", "All approved/overridden rents", "weekly"],
  ["Revenue Forecast", "12-mo per portfolio", "monthly"],
  ["Occupancy Forecast", "By submarket", "monthly"],
  ["Market Comparison", "Submarket vs portfolio", "quarterly"],
  ["AI Performance", "MAPE, drift, calibration", "monthly"],
  ["Investor Pack", "Board-ready with narrative", "quarterly"],
  ["Audit Trail", "Every decision & override", "on demand"],
  ["Custom", "Drag-and-drop builder", "—"],
];

function Reports() {
  return (
    <AppShell>
      <PageHeader
        title="Reporting Center"
        subtitle="Templates, builder, scheduled delivery — branded & audit-stamped"
        actions={
          <>
            <Btn variant="secondary">Scheduled (8)</Btn>
            <Btn variant="primary">+ New report</Btn>
          </>
        }
      />

      <div className="px-6 pb-6 space-y-4">
        <Card title="Templates">
          <div className="p-4 grid grid-cols-4 gap-3">
            {TEMPLATES.map(([name, desc, cad]) => (
              <div
                key={name as string}
                className="border border-border rounded-lg p-4 hover:bg-muted/30 cursor-pointer"
              >
                <div className="wf-placeholder aspect-[4/3] mb-3 text-[10px]">Preview</div>
                <div className="text-[13px] font-medium">{name}</div>
                <div className="text-[11.5px] text-muted-foreground mt-0.5">{desc}</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <Chip>{cad}</Chip>
                  {name === "Custom" && <Chip tone="ai">✦ AI</Chip>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-[1fr_360px] gap-4">
          <Card title="Custom report builder" hint="Drag blocks · AI can draft narrative">
            <div className="p-4 grid grid-cols-[140px_1fr] gap-3">
              <aside className="space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Blocks
                </div>
                {[
                  "KPI",
                  "Line chart",
                  "Bar chart",
                  "Heatmap",
                  "Map",
                  "Table",
                  "Comp list",
                  "AI narrative ✦",
                  "Audit log",
                ].map((b) => (
                  <div
                    key={b}
                    className="border border-border rounded px-2 py-1.5 text-[12px] bg-surface hover:bg-muted/40 cursor-grab flex items-center gap-1.5"
                  >
                    <span className="text-muted-foreground">⋮⋮</span>
                    {b}
                  </div>
                ))}
              </aside>

              <div className="border border-dashed border-border-strong rounded-md bg-surface-2 p-4 space-y-3 min-h-[400px]">
                <div className="border border-border rounded-md p-3 bg-surface">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Title
                  </div>
                  <div className="text-[18px] font-semibold mt-1">
                    Q3 2026 Sunbelt Pricing Decisions
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Recs generated", "Approval rate", "Revenue lift", "Override rate"].map((k) => (
                    <div key={k} className="border border-border rounded-md p-3 bg-surface">
                      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
                        {k}
                      </div>
                      <div className="text-[20px] font-semibold mono mt-1">—</div>
                    </div>
                  ))}
                </div>
                <div className="border border-border rounded-md p-3 bg-surface">
                  <div className="flex items-center gap-2 mb-2">
                    <Chip tone="ai">✦ AI narrative</Chip>
                    <span className="text-[11px] text-muted-foreground">
                      editable · cites sources
                    </span>
                  </div>
                  <p className="text-[12.5px] leading-relaxed">
                    In Q3, RentIQ generated 4,182 pricing recommendations across the Sunbelt
                    portfolio. Analysts approved 86% within tolerance, with the strongest lift in
                    Atlanta Midtown (+4.8% vs baseline)<sup className="text-ai">[1]</sup>. Overrides
                    clustered around 2BR units &gt;1,100 sqft, where comp density is thin
                    <sup className="text-ai">[2]</sup>…
                  </p>
                </div>
                <div className="wf-placeholder h-[160px]">Line chart block</div>
                <div className="wf-placeholder h-[120px]">Table block</div>
                <div className="text-center text-[11px] text-muted-foreground py-2 border border-dashed border-border rounded-md">
                  + Drop block here
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Card title="Delivery">
              <div className="p-4 space-y-3 text-[12.5px]">
                <Row k="Schedule" v="Every Monday 9:00 ET" />
                <Row k="Recipients" v="exec-team@ · 12" />
                <Row k="Channels" v="Email · Slack · S3" />
                <Row k="Format" v="PDF · XLSX · CSV" />
                <Btn variant="primary" size="md" className="w-full justify-center">
                  Schedule report
                </Btn>
              </div>
            </Card>

            <Card title="Audit footer (always attached)">
              <div className="p-4 text-[11.5px] space-y-1 mono text-muted-foreground">
                <div>model: v4.1</div>
                <div>data snapshot: s-2026-09-30</div>
                <div>generator: priya@acme.com</div>
                <div>signature: 0xa14f…b2c8</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
