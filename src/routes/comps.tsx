import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/comps")({
  head: () => ({ meta: [{ title: "Comparable Explorer · RentIQ" }] }),
  component: Comps,
});

const COMPS = [
  ["1180 Peachtree St · 6B", 0.2, 2520, 2, 2, 1140, 94, 96, "Auto"],
  ["100 W Paces · 14A", 0.6, 2470, 2, 2, 1135, 91, 92, "Pinned"],
  ["88 Marietta Ave · 12A", 0.8, 2410, 2, 2, 1098, 88, 89, "Auto"],
  ["55 Pharr Rd · 3C", 1.1, 2545, 2, 2, 1160, 86, 84, "Auto"],
  ["3322 Buford Hwy · 12", 1.4, 2380, 2, 2, 1080, 81, 78, "Auto"],
  ["210 Spring St · 22F", 0.9, 2495, 2, 2, 1150, 84, 82, "Manual"],
  ["44 12th St · 9D", 0.5, 2560, 2, 2, 1175, 90, 91, "Auto"],
  ["77 Juniper St · 4B", 0.7, 2435, 2, 2, 1110, 87, 85, "Auto"],
  ["999 Peachtree · PH2", 1.0, 2680, 2, 2, 1220, 78, 72, "Removed"],
  ["315 East Paces · 5A", 1.3, 2390, 2, 2, 1095, 80, 76, "Auto"],
  ["222 Mitchell St · 18", 1.5, 2350, 2, 2, 1075, 76, 74, "Auto"],
] as const;

export function Comps() {
  return (
    <AppShell>
      <PageHeader
        title="Comparable Explorer"
        subtitle="Unit 4B · 1247 Peachtree St NE · 11 comps · model v4.1"
        actions={
          <>
            <Btn variant="secondary">Save recipe</Btn>
            <Btn variant="secondary">+ Add manual comp</Btn>
            <Btn variant="ai">✦ Re-rank with feedback</Btn>
            <Btn variant="primary">Apply to recommendation</Btn>
          </>
        }
      />

      {/* Filter bar */}
      <div className="px-6 pb-3 flex flex-wrap gap-1.5">
        {[
          "Radius ≤ 1.5mi",
          "2 BR / 2 BA",
          "Sqft ±10%",
          "Leased ≤ 90d",
          "Exclude highways",
          "Include Midtown",
        ].map((f) => (
          <Chip key={f}>{f} ×</Chip>
        ))}
        <Chip tone="ai">✦ Recipe: Midtown-Tight</Chip>
        <button className="text-[12px] text-muted-foreground hover:text-foreground">
          + Add filter
        </button>
      </div>

      <div className="px-6 pb-6 grid grid-cols-[1fr_440px] gap-3">
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground sticky top-0">
                <tr>
                  <th className="text-left font-medium px-4 py-2.5 w-8">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left font-medium px-2 py-2.5">Property</th>
                  <th className="text-right font-medium px-2 py-2.5">Dist</th>
                  <th className="text-right font-medium px-2 py-2.5">Rent</th>
                  <th className="text-right font-medium px-2 py-2.5">BR/BA</th>
                  <th className="text-right font-medium px-2 py-2.5">Sqft</th>
                  <th className="text-right font-medium px-2 py-2.5">Sim</th>
                  <th className="text-right font-medium px-2 py-2.5">AI Rel.</th>
                  <th className="text-left font-medium px-2 py-2.5">Status</th>
                  <th className="text-right font-medium px-4 py-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPS.map((c, i) => {
                  const [addr, d, rent, br, ba, sqft, sim, rel, status] = c;
                  const removed = status === "Removed";
                  return (
                    <tr key={addr} className={`hover:bg-muted/50 ${removed ? "opacity-50" : ""}`}>
                      <td className="px-4">
                        <input type="checkbox" />
                      </td>
                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-full bg-ai/15 text-ai grid place-items-center text-[10px] mono">
                            {i + 1}
                          </div>
                          <div className="wf-placeholder size-7 !border-solid !text-[8px]" />
                          <span className={`truncate ${removed ? "line-through" : ""}`}>
                            {addr}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 text-right mono">{d}mi</td>
                      <td className="px-2 text-right mono font-medium">${rent.toLocaleString()}</td>
                      <td className="px-2 text-right mono">
                        {br}/{ba}
                      </td>
                      <td className="px-2 text-right mono">{sqft}</td>
                      <td className="px-2 text-right">
                        <Bar value={sim} />
                      </td>
                      <td className="px-2 text-right">
                        <Bar value={rel} tone="ai" />
                      </td>
                      <td className="px-2">
                        <Chip
                          tone={
                            status === "Pinned"
                              ? "info"
                              : status === "Manual"
                                ? "ai"
                                : status === "Removed"
                                  ? "danger"
                                  : "neutral"
                          }
                        >
                          {status}
                        </Chip>
                      </td>
                      <td className="px-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <Btn variant="ghost">📌</Btn>
                          <Btn variant="ghost">⋯</Btn>
                          <Btn variant="ghost">✕</Btn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-2 flex items-center text-[11.5px] text-muted-foreground">
            <span>11 comps · 1 removed · 1 manual</span>
            <span className="ml-auto mono">Median $/sqft 2.17 · Median rent $2,470</span>
          </div>
        </Card>

        {/* Right: Map + ranking explanation */}
        <div className="space-y-3">
          <Card
            title="Map"
            hint="Subject ★ · comps numbered by AI relevance"
            actions={
              <>
                <Btn variant="ghost">Layers</Btn>
                <Btn variant="ghost">Lasso</Btn>
              </>
            }
          >
            <div className="p-3">
              <div className="wf-placeholder h-[260px] relative wf-grid-bg">
                {/* Subject */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="size-5 rounded-full bg-primary text-primary-foreground grid place-items-center text-[10px]">
                    ★
                  </div>
                </div>
                {/* Comps */}
                {[
                  [20, 30, 1],
                  [70, 25, 2],
                  [35, 65, 3],
                  [80, 70, 4],
                  [55, 15, 5],
                  [15, 80, 6],
                  [88, 55, 7],
                  [45, 40, 8],
                ].map(([x, y, n]) => (
                  <div
                    key={n}
                    className="absolute size-6 rounded-full bg-ai text-ai-foreground grid place-items-center text-[10px] font-medium border-2 border-surface"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Schools", "Crime heat", "Flood", "Noise", "Transit", "Retail", "Parks"].map(
                  (l) => (
                    <Chip key={l}>{l}</Chip>
                  ),
                )}
              </div>
            </div>
          </Card>

          <Card title="Why this ranking?" actions={<Chip tone="ai">✦ AI</Chip>}>
            <div className="p-4 text-[12.5px] space-y-2">
              <p>
                Ordering weighted by <span className="font-medium">similarity 40%</span>,{" "}
                <span className="font-medium">distance 25%</span>,{" "}
                <span className="font-medium">lease recency 20%</span>,{" "}
                <span className="font-medium">feedback adjustments 15%</span>.
              </p>
              <div className="border border-border rounded-md p-2.5 bg-surface-2">
                <div className="text-[11px] text-muted-foreground mb-1">#1 vs #3</div>
                <p>
                  1180 Peachtree edges 88 Marietta on transit proximity (+4 pts) and lease recency
                  (last 30d vs 80d).
                </p>
              </div>
              <Btn variant="ai">✦ Ask Copilot to re-rank by walkability</Btn>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "ai" }) {
  const bg = tone === "ai" ? "bg-ai" : "bg-primary";
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="w-14 h-1.5 rounded bg-muted overflow-hidden">
        <div className={`h-full ${bg}`} style={{ width: `${value}%` }} />
      </div>
      <span className="mono w-7 text-right">{value}</span>
    </div>
  );
}
