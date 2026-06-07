import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip, ConfidenceRing } from "@/components/AppShell";

export const Route = createFileRoute("/explainability")({
  head: () => ({ meta: [{ title: "Explainability · RentIQ" }] }),
  component: Explain,
});

const FEATURES = [
  ["School quality (GreatSchools)", 72, 8.0, "pos"],
  ["Walkability (Walk Score)", 54, 86, "pos"],
  ["Retail growth YoY", 31, 12, "pos"],
  ["Transit proximity (MARTA)", 22, 0.3, "pos"],
  ["Parks within 0.5mi", 14, 3, "pos"],
  ["Road noise exposure (dB)", -28, 65, "neg"],
  ["Flood zone tier", -18, 2, "neg"],
  ["HVAC age (years)", -12, 11, "neg"],
  ["Crime index (FBI UCR)", -9, 38, "neg"],
] as const;

export function Explain() {
  return (
    <AppShell>
      <PageHeader
        title="Why $2,485?"
        subtitle="Explainability · Unit 4B · 1247 Peachtree St NE · model v4.1 · snapshot 2026-06-07 08:14"
        actions={<><Btn variant="secondary">Export PDF</Btn><Btn variant="ai">✦ Open in Copilot</Btn></>}
      />

      <div className="px-6 pb-6 grid grid-cols-[200px_1fr] gap-4">
        {/* Anchored TOC */}
        <aside className="sticky top-4 self-start text-[12.5px]">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">On this page</div>
          <ul className="space-y-1.5">
            {["Summary", "Feature importance", "Location intelligence", "Historical trends", "Similarity engine", "Confidence analysis", "Counterfactuals", "Audit trail"].map((s) => (
              <li key={s}><a className="text-foreground/80 hover:text-ai" href={`#${s}`}>{s}</a></li>
            ))}
          </ul>
        </aside>

        <div className="space-y-4 min-w-0">
          {/* Summary */}
          <Card title="Summary" actions={<Chip tone="ai">✦ AI generated</Chip>}>
            <div className="p-4 text-[13px] leading-relaxed">
              The model recommends <span className="font-medium mono">$2,485/mo</span> based on
              <sup className="text-ai">[1]</sup> 11 comparable Midtown Atlanta 2BR/2BA units leased in the last 90 days,
              <sup className="text-ai">[2]</sup> a +1.4% MoM submarket trend, and feature-level adjustments dominated by
              strong school quality (+$72) and walkability (+$54). Confidence is High (82%) but reduced 6 pts due to
              thin comp set above 1,100 sqft<sup className="text-ai">[3]</sup>.
            </div>
          </Card>

          {/* Feature importance */}
          <Card title="Feature importance" hint="SHAP contributions to recommended price">
            <div className="p-4 space-y-1.5">
              {FEATURES.map(([label, val, raw, tone]) => {
                const pct = (Math.abs(val as number) / 80) * 50;
                const pos = tone === "pos";
                return (
                  <div key={label as string} className="grid grid-cols-[260px_1fr_80px_60px] items-center gap-3 text-[12px]">
                    <div className="truncate">{label}</div>
                    <div className="h-5 grid grid-cols-2">
                      <div className="border-r border-border-strong relative">
                        {!pos && <div className="absolute right-0 top-0 h-full bg-destructive/70 rounded-l-sm" style={{ width: `${pct}%` }} />}
                      </div>
                      <div className="relative">
                        {pos && <div className="absolute left-0 top-0 h-full bg-success/70 rounded-r-sm" style={{ width: `${pct}%` }} />}
                      </div>
                    </div>
                    <div className="text-right mono text-muted-foreground">{raw}</div>
                    <div className={`text-right mono font-medium ${pos ? "text-success" : "text-destructive"}`}>{pos ? "+" : ""}${val}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Location + trends grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card title="Location intelligence" actions={<Btn variant="ghost">Layers ▾</Btn>}>
              <div className="p-3">
                <div className="wf-placeholder h-[220px] wf-grid-bg">Choropleth map with overlays</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                  {[
                    ["Schools", "8.0 / 10", "success"],
                    ["Walk Score", "86", "success"],
                    ["Transit", "0.3 mi", "success"],
                    ["Crime", "38 (low)", "info"],
                    ["Noise", "65 dB", "warning"],
                    ["Flood", "Tier 2", "warning"],
                  ].map(([k, v, t]) => (
                    <div key={k} className="border border-border rounded px-2.5 py-1.5 flex items-center justify-between">
                      <span className="text-muted-foreground">{k}</span>
                      <Chip tone={t as any}>{v}</Chip>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Historical trends" hint="Submarket rent index · 24 mo">
              <div className="p-4 space-y-3">
                <TrendChart />
                <div className="text-[12px] text-muted-foreground">
                  Subject unit re-priced 2x; submarket +9.1% since 2024. Macro events:
                </div>
                <div className="flex gap-1 flex-wrap">
                  <Chip>Fed cut · Sep 2025</Chip>
                  <Chip>New supply · 1024 Boulevard</Chip>
                  <Chip>School rezoning</Chip>
                </div>
              </div>
            </Card>
          </div>

          {/* Similarity + confidence */}
          <div className="grid grid-cols-2 gap-4">
            <Card title="Similarity engine" hint="Per-comp attribute match">
              <div className="p-4 space-y-2 text-[12px]">
                {[
                  ["1180 Peachtree · 6B", 94],
                  ["100 W Paces · 14A", 91],
                  ["88 Marietta · 12A", 88],
                ].map(([c, s]) => (
                  <div key={c as string} className="border border-border rounded-md p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium">{c}</span>
                      <span className="mono">{s}</span>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {["Beds ✓", "Baths ✓", "Sqft ±2%", "Year +1", "Amenities 5/6", "Noise +5dB"].map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Confidence analysis">
              <div className="p-4 flex items-start gap-4">
                <ConfidenceRing value={82} size={88} />
                <div className="text-[12.5px] space-y-1.5">
                  <p className="text-muted-foreground">Why High but not Higher:</p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Thin comp set in &gt;1,100 sqft (−6 pts)</li>
                    <li>High variance in walkability scores (−3 pts)</li>
                    <li>Strong recency (+4 pts) — 7 of 11 comps leased &lt;45d</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Counterfactuals */}
          <Card title="Counterfactuals" hint="If a single feature changed">
            <div className="p-4 grid grid-cols-2 gap-2 text-[12.5px]">
              {[
                ["Road noise → Low (45 dB)", "+$28", "$2,513"],
                ["Flood zone → Tier 0", "+$18", "$2,503"],
                ["HVAC → Replaced (<3y)", "+$12", "$2,497"],
                ["Add covered parking", "+$45", "$2,530"],
              ].map(([cf, d, p]) => (
                <div key={cf as string} className="border border-border rounded-md p-3 flex items-center gap-3">
                  <div className="flex-1">{cf}</div>
                  <Chip tone="success">{d}</Chip>
                  <span className="mono font-medium">{p}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Audit */}
          <Card title="Audit trail">
            <table className="w-full text-[12px]">
              <tbody className="divide-y divide-border">
                {[
                  ["2026-06-07 08:14", "Recommendation generated", "model v4.1 · snapshot s-2026-06-07"],
                  ["2026-06-06 22:00", "Comp data refreshed", "MLS · 14 sources"],
                  ["2026-06-05 11:32", "Feedback applied", "Priya · 'exclude highway comps'"],
                  ["2026-05-28 09:00", "Model promoted", "v4.0 → v4.1 (calibration +1.2%)"],
                ].map(([t, e, m]) => (
                  <tr key={t}>
                    <td className="px-4 py-2 mono text-muted-foreground w-[180px]">{t}</td>
                    <td className="px-2 py-2 font-medium">{e}</td>
                    <td className="px-4 py-2 text-muted-foreground">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function TrendChart() {
  const vals = [82,83,82,84,86,87,86,88,89,88,90,91,90,92,93,94,93,95,96,97,96,98,99,100];
  const w = 400, h = 120;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - 80) / 25) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[120px]">
      {[0,1,2,3].map((i) => (
        <line key={i} x1="0" x2={w} y1={(h / 4) * (i + 1)} y2={(h / 4) * (i + 1)} stroke="var(--grid)" />
      ))}
      <polyline fill="none" stroke="var(--primary)" strokeWidth="1.5" points={pts} />
      <line x1={w * 0.4} x2={w * 0.4} y1="0" y2={h} stroke="var(--ai)" strokeDasharray="3 3" strokeWidth="1" />
      <text x={w * 0.4 + 4} y="12" fontSize="9" fill="var(--ai)">Rezoning</text>
    </svg>
  );
}
