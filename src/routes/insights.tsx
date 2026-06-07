import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "AI Insights · RentIQ" }] }),
  component: Insights,
});

function Insights() {
  return (
    <AppShell>
      <PageHeader
        title="AI Insights"
        subtitle="Submarket briefs, anomalies, and proactive recommendations"
        actions={<Btn variant="ai">✦ Generate brief</Btn>}
      />
      <div className="px-6 pb-6 grid grid-cols-3 gap-3">
        <Card title="Anomaly feed" className="col-span-2">
          <ul className="divide-y divide-border">
            {[
              [
                "✦",
                "Atlanta Midtown demand spiking (+12% MoM)",
                "Likely driver: tech relocation announcement",
                "2h",
                "info",
              ],
              [
                "⚠",
                "Charlotte South End: 8 units priced 6%+ below market",
                "Review batch · est. $14K/mo lift",
                "5h",
                "warning",
              ],
              [
                "✦",
                "New supply at 1024 Boulevard delivering Aug",
                "Expect 80–120 unit absorption pressure",
                "1d",
                "info",
              ],
              [
                "⛔",
                "Drift alert: future_supply_units feature",
                "PSI 0.22 — DS triage opened",
                "1d",
                "danger",
              ],
              [
                "✦",
                "Tampa seasonality shift detected",
                "Suggests +2.3% adjustment Q4",
                "2d",
                "info",
              ],
            ].map(([ic, h, b, t, tone]) => (
              <li key={h as string} className="px-4 py-3 flex gap-3">
                <div
                  className={`size-7 rounded-md grid place-items-center text-[13px] ${tone === "danger" ? "bg-destructive/10 text-destructive" : tone === "warning" ? "bg-warning/15 text-warning" : "bg-ai-soft text-ai"}`}
                >
                  {ic}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium">{h}</div>
                  <div className="text-[12px] text-muted-foreground">{b}</div>
                </div>
                <span className="text-[10.5px] text-muted-foreground mono">{t}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Submarket briefs" hint="AI-generated weekly">
          <div className="p-4 space-y-2">
            {[
              "Atlanta Midtown",
              "Charlotte South End",
              "Nashville Gulch",
              "Raleigh Downtown",
              "Tampa Channelside",
            ].map((s) => (
              <div
                key={s}
                className="border border-border rounded-md p-3 hover:bg-muted/30 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[12.5px] font-medium">{s}</div>
                  <Chip tone="ai">✦</Chip>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  Rent +2.4% · Demand +8% · Supply +1.1%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
