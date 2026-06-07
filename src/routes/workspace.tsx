import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, Card, Btn, Chip, ConfidenceRing } from "@/components/AppShell";

export const Route = createFileRoute("/workspace")({
  head: () => ({ meta: [{ title: "Pricing Workspace · RentIQ" }] }),
  component: Workspace,
});

function Workspace() {
  return (
    <AppShell>
      {/* Context bar */}
      <div className="h-12 border-b border-border bg-surface flex items-center gap-3 px-5 sticky top-0 z-10">
        <Chip tone="warning">Vacant · 12d</Chip>
        <div className="text-[13px] font-medium">Unit 4B · 1247 Peachtree St NE</div>
        <span className="text-[12px] text-muted-foreground">
          Atlanta, GA 30309 · 2BR / 2BA · 1,140 sqft
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground mono">12 of 27</span>
          <Btn variant="ghost">← Prev</Btn>
          <Btn variant="ghost">Skip</Btn>
          <Btn variant="ghost">Next →</Btn>
          <div className="w-px h-5 bg-border mx-1" />
          <Btn variant="secondary">Request review</Btn>
          <Btn variant="secondary">Adjust</Btn>
          <Btn variant="primary">
            Approve <span className="mono opacity-70">A</span>
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-[320px_1fr_380px] min-h-[calc(100vh-7rem)]">
        {/* LEFT: Property */}
        <aside className="border-r border-border bg-surface p-4 space-y-4 overflow-y-auto">
          <div className="wf-placeholder aspect-[4/3]">Property photo</div>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="wf-placeholder aspect-square text-[9px]">
                {i === 3 ? "+5" : ""}
              </div>
            ))}
          </div>

          <div>
            <div className="text-[13px] font-semibold">1247 Peachtree St NE</div>
            <div className="text-[12px] text-muted-foreground">Midtown · Atlanta, GA · Unit 4B</div>
            <div className="mt-2 flex flex-wrap gap-1">
              {["2 BR", "2 BA", "1,140 sqft", "Built 2018", "Parking", "In-unit W/D"].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase text-muted-foreground tracking-wider mb-1.5">
              Amenities
            </div>
            <div className="flex flex-wrap gap-1">
              {["Gym", "Pool", "Roof deck", "Dog park", "EV charging"].map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
              <Chip tone="ai">✦ AI-detected: dishwasher</Chip>
            </div>
          </div>

          <div className="border border-border rounded-md divide-y divide-border">
            {[
              ["Current rent", "$2,395/mo"],
              ["Last increase", "Jun 2025 · +2.1%"],
              ["Concessions", "None"],
              ["Occupancy", "Vacant 12d"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-3 py-2 text-[12px]">
                <span className="text-muted-foreground">{k}</span>
                <span className="mono">{v}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[11px] uppercase text-muted-foreground tracking-wider mb-2">
              Lease history
            </div>
            <ol className="relative border-l border-border ml-1.5 space-y-3">
              {[
                ["2025-08", "Renewal · $2,395 · 12mo"],
                ["2024-08", "New lease · $2,346"],
                ["2023-08", "New lease · $2,250"],
              ].map(([d, t]) => (
                <li key={d} className="ml-3 text-[12px]">
                  <span className="absolute -left-[5px] size-2 rounded-full bg-border-strong mt-1.5" />
                  <div className="mono text-[10.5px] text-muted-foreground">{d}</div>
                  <div>{t}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="wf-placeholder h-[140px]">Mini-map · 0.5 / 1 / 3 mi rings</div>
        </aside>

        {/* CENTER: Recommendation */}
        <section className="p-5 overflow-y-auto space-y-4 bg-background">
          {/* Hero */}
          <div className="ai-surface rounded-xl p-5">
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Chip tone="ai">✦ AI Recommendation</Chip>
                  <span className="text-[11px] text-muted-foreground mono">
                    model v4.1 · 11 comps · updated 6m ago
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div className="text-[44px] font-semibold mono leading-none">$2,485</div>
                  <div className="text-[14px] text-muted-foreground">/month</div>
                </div>
                <div className="mt-1 text-[12px] text-muted-foreground">
                  Range <span className="mono">$2,410 – $2,560</span> · vs current{" "}
                  <span className="mono">$2,395</span>{" "}
                  <span className="text-success font-medium mono">▲ +$90 (+3.8%)</span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <Stat label="Predicted time-to-lease" value="−1.2d" tone="success" />
                  <Stat label="30-day revenue impact" value="+$1,080" tone="success" />
                  <Stat label="Risk score" value="Low (12)" tone="info" />
                </div>

                <div className="mt-5 flex gap-2">
                  <Btn variant="primary" size="md">
                    Approve
                  </Btn>
                  <Btn variant="secondary" size="md">
                    Adjust
                  </Btn>
                  <Btn variant="ai" size="md">
                    ✦ Run what-if
                  </Btn>
                  <Btn variant="ghost" size="md">
                    Explain
                  </Btn>
                </div>
              </div>

              <div className="text-center">
                <ConfidenceRing value={82} size={96} />
                <div className="mt-1 text-[11px] text-muted-foreground">Confidence · High</div>
              </div>
            </div>
          </div>

          {/* Drivers */}
          <Card
            title="Key drivers"
            hint="SHAP-style contributions to recommended price"
            actions={
              <Link to="/explainability" className="text-[12px] text-ai hover:underline">
                Open explainability ↗
              </Link>
            }
          >
            <div className="p-4 space-y-2">
              {[
                ["School quality (GreatSchools 8)", 72, "pos"],
                ["Walkability (Walk Score 86)", 54, "pos"],
                ["Nearby retail growth (+12% YoY)", 31, "pos"],
                ["Public transit (MARTA 0.3mi)", 22, "pos"],
                ["Road noise exposure (65 dB)", -28, "neg"],
                ["Flood zone (Tier 2)", -18, "neg"],
                ["HVAC age (>10 yrs)", -12, "neg"],
              ].map(([label, val, tone]) => (
                <DriverBar
                  key={label as string}
                  label={label as string}
                  value={val as number}
                  tone={tone as "pos" | "neg"}
                />
              ))}
            </div>
          </Card>

          {/* Tabs */}
          <Card
            title="Comparable properties"
            hint="Top 5 of 11 · sorted by AI relevance"
            actions={
              <Link to="/comps" className="text-[12px] text-ai hover:underline">
                View all 11 ↗
              </Link>
            }
          >
            <div className="overflow-hidden">
              <table className="w-full text-[12.5px]">
                <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left font-medium px-4 py-2">Property</th>
                    <th className="text-right font-medium px-2 py-2">Dist</th>
                    <th className="text-right font-medium px-2 py-2">Rent</th>
                    <th className="text-right font-medium px-2 py-2">$/sqft</th>
                    <th className="text-right font-medium px-2 py-2">Sim</th>
                    <th className="text-right font-medium px-2 py-2 pr-4">AI relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["1180 Peachtree · 6B", 0.2, 2520, 2.21, 94, 96],
                    ["100 W Paces · 14A", 0.6, 2470, 2.18, 91, 92],
                    ["88 Marietta · 12A", 0.8, 2410, 2.13, 88, 89],
                    ["55 Pharr Rd · 3C", 1.1, 2545, 2.22, 86, 84],
                    ["3322 Buford · 12", 1.4, 2380, 2.05, 81, 78],
                  ].map(([addr, d, rent, psf, sim, rel]) => (
                    <tr key={addr as string} className="hover:bg-muted/50">
                      <td className="px-4 py-2.5 flex items-center gap-2">
                        <div className="wf-placeholder size-7 !border-solid" />
                        <span className="truncate">{addr}</span>
                      </td>
                      <td className="px-2 text-right mono">{d}mi</td>
                      <td className="px-2 text-right mono">${rent.toLocaleString()}</td>
                      <td className="px-2 text-right mono text-muted-foreground">${psf}</td>
                      <td className="px-2 text-right">
                        <span className="mono">{sim}</span>
                      </td>
                      <td className="px-2 pr-4 py-2.5">
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-14 h-1.5 rounded bg-muted overflow-hidden">
                            <div className="h-full bg-ai" style={{ width: `${rel}%` }} />
                          </div>
                          <span className="mono w-7 text-right">{rel}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="How the AI calculated this price">
            <ol className="p-4 space-y-2 text-[12.5px] list-decimal pl-8 marker:text-muted-foreground">
              <li>
                Selected <span className="font-medium">11 comparable units</span> within 1.5mi · 2BR
                / 2BA · leased in last 90 days <sup className="text-ai">[1]</sup>
              </li>
              <li>
                Applied submarket trend <span className="mono">+1.4% MoM</span> (Midtown Atlanta){" "}
                <sup className="text-ai">[2]</sup>
              </li>
              <li>
                Adjusted +$179 for positive features, −$58 for negative features (see drivers)
              </li>
              <li>
                Calibrated against last 90 days of leases · segment MAPE{" "}
                <span className="mono">3.1%</span>
              </li>
              <li>Confidence reduced 6 pts — thin comp set in 2BR/2BA &gt; 1,100 sqft segment</li>
            </ol>
          </Card>
        </section>

        {/* RIGHT: Copilot */}
        <aside className="border-l border-border bg-surface flex flex-col">
          <div className="h-11 px-4 flex items-center gap-2 border-b border-border">
            <div className="size-5 rounded grid place-items-center bg-ai-soft text-ai text-[10px]">
              ✦
            </div>
            <div className="text-[13px] font-semibold">AI Copilot</div>
            <Chip tone="ai">Context: Unit 4B</Chip>
            <Btn variant="ghost" className="ml-auto">
              ⋯
            </Btn>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-[12.5px]">
            <Msg who="user">Why was 3322 Buford Hwy ranked lower than 1180 Peachtree?</Msg>
            <Msg who="ai">
              <p>
                <span className="font-medium">3322 Buford</span> is 1.4 mi away in a different
                submarket (Brookhaven) with <span className="font-medium">−0.6% rent trend</span>
                <sup className="text-ai">[1]</sup>, while{" "}
                <span className="font-medium">1180 Peachtree</span> is 0.2 mi away in the same
                Midtown core with matching school zone and walkability
                <sup className="text-ai">[2]</sup>.
              </p>
              <div className="mt-2 border border-border rounded-md p-2 bg-surface">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  Tool · queried_comps
                </div>
                <div className="mono text-[11px]">11 results · 0.6s</div>
              </div>
            </Msg>
            <Msg who="user">What if we keep rent flat and add covered parking?</Msg>
            <Msg who="ai">
              <p>
                Adding covered parking (~$45/mo amenity value in this submarket) at flat rent of
                $2,395 would:
              </p>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                <li>
                  Reduce time-to-lease by <span className="mono">~3.4 days</span>
                </li>
                <li>Capture ~$1,200 in retention value over 12 mo</li>
                <li>Confidence: 71% (parking comps thin)</li>
              </ul>
              <div className="mt-2 flex gap-1.5">
                <Btn variant="ai">✦ Open in What-if</Btn>
                <Btn variant="ghost">Cite in report</Btn>
              </div>
            </Msg>
          </div>

          {/* Suggested prompts */}
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {["Why this price?", "What if +5%?", "Hide highway comps", "Draft justification"].map(
              (p) => (
                <button key={p} className="ai-chip text-[11px]">
                  ✦ {p}
                </button>
              ),
            )}
          </div>

          <div className="p-3 border-t border-border">
            <div className="border border-border rounded-md bg-surface flex items-end gap-1 p-2">
              <textarea
                rows={2}
                placeholder="Ask about this unit…  /whatif  /compare  /explain"
                className="flex-1 resize-none bg-transparent outline-none text-[12.5px] placeholder:text-muted-foreground"
              />
              <Btn variant="ai">↑</Btn>
            </div>
            <div className="mt-1.5 text-[10.5px] text-muted-foreground flex items-center gap-2">
              <span>✦ All AI claims are cited</span>
              <span className="ml-auto mono">⌘J anywhere</span>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "success" | "info" | "warning";
}) {
  const toneCls =
    tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-info";
  return (
    <div className="bg-surface border border-border rounded-md p-3">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-[18px] font-semibold mono ${toneCls}`}>{value}</div>
    </div>
  );
}

function DriverBar({ label, value, tone }: { label: string; value: number; tone: "pos" | "neg" }) {
  const max = 80;
  const pct = (Math.abs(value) / max) * 50;
  const isPos = tone === "pos";
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <div className="w-[260px] truncate">{label}</div>
      <div className="flex-1 h-5 grid grid-cols-2 relative">
        <div className="border-r border-border-strong relative">
          {!isPos && (
            <div
              className="absolute right-0 top-0 h-full bg-destructive/70 rounded-l-sm"
              style={{ width: `${pct}%` }}
            />
          )}
        </div>
        <div className="relative">
          {isPos && (
            <div
              className="absolute left-0 top-0 h-full bg-success/70 rounded-r-sm"
              style={{ width: `${pct}%` }}
            />
          )}
        </div>
      </div>
      <div className={`w-16 text-right mono ${isPos ? "text-success" : "text-destructive"}`}>
        {isPos ? "+" : ""}${value}
      </div>
    </div>
  );
}

function Msg({ who, children }: { who: "user" | "ai"; children: React.ReactNode }) {
  if (who === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-accent rounded-lg rounded-br-sm px-3 py-2 text-[12.5px]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <div className="size-6 rounded-md ai-surface grid place-items-center text-ai text-[11px] shrink-0">
        ✦
      </div>
      <div className="max-w-[88%] bg-surface border border-border rounded-lg rounded-tl-sm px-3 py-2 text-[12.5px] space-y-1">
        {children}
      </div>
    </div>
  );
}
