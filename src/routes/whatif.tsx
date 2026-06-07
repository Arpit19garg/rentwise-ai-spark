import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/whatif")({
  head: () => ({ meta: [{ title: "What-if Simulator · RentIQ" }] }),
  component: WhatIf,
});

function WhatIf() {
  return (
    <AppShell>
      <PageHeader
        title="What-if Simulator"
        subtitle="Unit 4B · model v4.1 · instant recompute"
        actions={
          <>
            <Btn variant="secondary">Save scenario</Btn>
            <Btn variant="ai">✦ Compare 2 scenarios</Btn>
            <Btn variant="primary">Promote to recommendation</Btn>
          </>
        }
      />

      <div className="px-6 pb-6 grid grid-cols-[380px_1fr] gap-4">
        {/* Levers */}
        <Card title="Levers">
          <div className="p-4 space-y-5">
            <Lever label="Rent" current="$2,395" scenario="$2,485" min="$2,200" max="$2,700" pct={0.6} />
            <Lever label="Concessions (months free)" current="0" scenario="0.5" min="0" max="2" pct={0.25} />
            <Lever label="Occupancy target" current="93%" scenario="95%" min="80%" max="100%" pct={0.75} />
            <Lever label="Market demand index" current="100" scenario="104" min="80" max="120" pct={0.6} />
            <Lever label="Seasonality month" current="Jun" scenario="Aug" min="Jan" max="Dec" pct={0.6} />

            <div className="border-t border-border pt-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">Amenity changes</div>
              <div className="space-y-1.5">
                {[
                  ["Add covered parking", "+$45", true],
                  ["In-unit W/D", "—", true],
                  ["Renovated kitchen", "+$78", false],
                  ["Smart thermostat", "+$8", false],
                ].map(([name, lift, on]) => (
                  <label key={name as string} className="flex items-center gap-2 text-[12.5px] py-1">
                    <input type="checkbox" defaultChecked={on as boolean} />
                    <span className="flex-1">{name}</span>
                    <span className="text-muted-foreground mono">{lift as string}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Outcomes */}
        <div className="space-y-3">
          {/* Diff header */}
          <Card title="Outcomes" hint="Live recompute · 0.4s" actions={<Chip tone="ai">✦ Scenario B</Chip>}>
            <div className="p-4 grid grid-cols-4 gap-3">
              <Outcome label="Recommended rent" base="$2,395" v="$2,485" delta="+$90" tone="success" />
              <Outcome label="Time-to-lease" base="14d" v="11d" delta="−3d" tone="success" />
              <Outcome label="12-mo revenue" base="$28,740" v="$30,820" delta="+$2,080" tone="success" />
              <Outcome label="Risk score" base="Low (12)" v="Low (16)" delta="+4" tone="warning" />
            </div>
          </Card>

          {/* Revenue chart */}
          <Card title="12-month revenue projection" hint="Baseline vs scenario">
            <div className="p-4">
              <ScenarioChart />
              <div className="mt-3 flex items-center gap-4 text-[12px]">
                <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-muted-foreground" />Baseline</span>
                <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-ai" />Scenario B</span>
                <span className="ml-auto text-muted-foreground">Confidence band ±$420/mo</span>
              </div>
            </div>
          </Card>

          {/* Scenario stack */}
          <Card title="Scenario stack" hint="Saved scenarios · pin 2 to compare">
            <div className="p-4 grid grid-cols-4 gap-3">
              {[
                ["A · Hold rent", "$2,395", "Conf 88%", false],
                ["B · AI rec", "$2,485", "Conf 82%", true],
                ["C · +5% rent", "$2,515", "Conf 71%", false],
                ["D · +parking", "$2,440", "Conf 76%", false],
                ["E · New blank", "—", "—", false],
              ].map(([name, p, c, active]) => (
                <div key={name as string} className={`border rounded-md p-3 text-[12px] ${active ? "ai-surface" : "border-border bg-surface"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{name}</span>
                    {active && <Chip tone="ai">Active</Chip>}
                  </div>
                  <div className="mt-2 text-[18px] font-semibold mono">{p}</div>
                  <div className="text-[10.5px] text-muted-foreground mt-0.5">{c}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Drivers updated */}
          <Card title="Driver re-attribution" hint="Why scenario differs from baseline">
            <div className="p-4 space-y-1.5 text-[12px]">
              {[
                ["Base rent (+ scenario)", "+$90", "pos"],
                ["Covered parking amenity", "+$45", "pos"],
                ["Occupancy uplift (95% target)", "+$34", "pos"],
                ["Risk premium adjustment", "−$18", "neg"],
                ["Concession cost (0.5mo)", "−$104", "neg"],
              ].map(([l, v, t]) => (
                <div key={l as string} className="flex items-center gap-3">
                  <div className="w-[260px]">{l}</div>
                  <div className="flex-1 h-1.5 bg-muted rounded overflow-hidden">
                    <div className={`h-full ${t === "pos" ? "bg-success" : "bg-destructive"}`} style={{ width: `${Math.min(100, Math.abs(parseInt(String(v).replace(/\D/g, ""))) * 0.8)}%` }} />
                  </div>
                  <span className={`mono w-16 text-right ${t === "pos" ? "text-success" : "text-destructive"}`}>{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Lever({ label, current, scenario, min, max, pct }: { label: string; current: string; scenario: string; min: string; max: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px] mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="mono text-muted-foreground">
          {current} → <span className="text-ai">{scenario}</span>
        </span>
      </div>
      <div className="relative h-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-muted rounded" />
        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-ai rounded" style={{ width: `${pct * 100}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-surface border-2 border-ai" style={{ left: `calc(${pct * 100}% - 7px)` }} />
      </div>
      <div className="flex justify-between text-[10.5px] text-muted-foreground mt-1 mono">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function Outcome({ label, base, v, delta, tone }: { label: string; base: string; v: string; delta: string; tone: "success" | "warning" }) {
  return (
    <div className="border border-border rounded-md p-3">
      <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <div className="text-[20px] font-semibold mono">{v}</div>
        <Chip tone={tone}>{delta}</Chip>
      </div>
      <div className="text-[10.5px] text-muted-foreground mt-0.5 mono">was {base}</div>
    </div>
  );
}

function ScenarioChart() {
  const baseline = Array.from({ length: 12 }, (_, i) => 2395 + i * 4);
  const scenario = Array.from({ length: 12 }, (_, i) => 2485 + i * 8);
  const w = 600, h = 180;
  const min = 2380, max = 2620;
  const toPath = (v: number[]) => v.map((y, i) => `${(i / (v.length - 1)) * w},${h - ((y - min) / (max - min)) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
      {[0,1,2,3].map((i) => (
        <line key={i} x1="0" x2={w} y1={(h/4)*(i+1)} y2={(h/4)*(i+1)} stroke="var(--grid)" />
      ))}
      <polyline fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="3 3" points={toPath(baseline)} />
      <polyline fill="none" stroke="var(--ai)" strokeWidth="2" points={toPath(scenario)} />
    </svg>
  );
}
