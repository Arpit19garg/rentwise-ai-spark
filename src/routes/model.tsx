import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/model")({
  head: () => ({ meta: [{ title: "Model Performance · RentIQ" }] }),
  component: ModelPerf,
});

function ModelPerf() {
  return (
    <AppShell>
      <PageHeader
        title="Model Performance"
        subtitle="v4.1 · deployed 2026-05-28 · traffic 95% · candidate v4.2 on 5%"
        actions={<><Btn variant="secondary">Version compare</Btn><Btn variant="danger">Rollback</Btn><Btn variant="primary">Promote v4.2</Btn></>}
      />

      <div className="px-6 pb-6 space-y-4">
        {/* Health strip */}
        <Card className="p-4">
          <div className="grid grid-cols-6 gap-6">
            {[
              ["MAPE (30d)", "3.1%", "success"],
              ["RMSE", "$84", "success"],
              ["Calibration ECE", "0.018", "success"],
              ["Override rate", "14.2%", "warning"],
              ["Drift (PSI)", "0.09", "info"],
              ["Data freshness", "12m", "success"],
            ].map(([l, v, t]) => (
              <div key={l as string}>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="text-[22px] font-semibold mono">{v}</div>
                  <span className={`size-2 rounded-full ${t === "success" ? "bg-success" : t === "warning" ? "bg-warning" : "bg-info"}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-12 gap-3">
          {/* Accuracy heatmap */}
          <Card className="col-span-7" title="Accuracy by segment" hint="MAPE · region × unit type">
            <div className="p-4">
              <div className="grid grid-cols-[120px_repeat(6,1fr)] gap-px bg-border text-[11px]">
                <div className="bg-surface px-2 py-2 text-muted-foreground">Region \ Type</div>
                {["Studio", "1BR", "2BR", "3BR", "4BR", "TH"].map((c) => (
                  <div key={c} className="bg-surface px-2 py-2 text-center text-muted-foreground">{c}</div>
                ))}
                {["Atlanta","Charlotte","Nashville","Raleigh","Tampa","Austin","Phoenix"].map((r, ri) => (
                  <>
                    <div key={r} className="bg-surface px-2 py-2">{r}</div>
                    {Array.from({ length: 6 }).map((_, ci) => {
                      const v = ((ri * 7 + ci * 11) % 50) / 10 + 2;
                      const score = v;
                      const bg = `color-mix(in oklch, var(--success) ${Math.max(0, 90 - score * 12)}%, color-mix(in oklch, var(--destructive) ${Math.min(80, score * 12)}%, transparent))`;
                      return (
                        <div key={ci} className="px-2 py-2 text-center mono text-[11px]" style={{ background: bg }}>
                          {score.toFixed(1)}%
                        </div>
                      );
                    })}
                  </>
                ))}
              </div>
            </div>
          </Card>

          {/* Calibration */}
          <Card className="col-span-5" title="Confidence calibration" hint="Predicted vs actual hit rate">
            <div className="p-4">
              <CalibrationChart />
              <div className="mt-2 text-[11.5px] text-muted-foreground">
                Reliability diagram · perfect = diagonal. Slight over-confidence in 80–90% bucket.
              </div>
            </div>
          </Card>

          {/* Drift */}
          <Card className="col-span-7" title="Feature drift" hint="PSI · last 30d vs training">
            <div className="p-4 space-y-1.5 text-[12px]">
              {[
                ["walkability_score", 0.04, "ok"],
                ["school_rating", 0.06, "ok"],
                ["noise_db", 0.09, "ok"],
                ["retail_growth_yoy", 0.14, "warn"],
                ["transit_proximity", 0.05, "ok"],
                ["flood_tier", 0.02, "ok"],
                ["future_supply_units", 0.22, "alert"],
                ["seasonality_index", 0.07, "ok"],
              ].map(([f, v, t]) => (
                <div key={f as string} className="grid grid-cols-[200px_1fr_60px_60px] items-center gap-3">
                  <span className="mono">{f}</span>
                  <div className="h-1.5 bg-muted rounded overflow-hidden relative">
                    <div className="absolute inset-y-0 left-[40%] w-px bg-warning" />
                    <div className="absolute inset-y-0 left-[70%] w-px bg-destructive" />
                    <div
                      className={`h-full ${t === "ok" ? "bg-success" : t === "warn" ? "bg-warning" : "bg-destructive"}`}
                      style={{ width: `${Math.min(100, (v as number) * 300)}%` }}
                    />
                  </div>
                  <span className="mono text-right">{(v as number).toFixed(2)}</span>
                  <Chip tone={t === "ok" ? "success" : t === "warn" ? "warning" : "danger"}>{t === "ok" ? "Stable" : t === "warn" ? "Watch" : "Alert"}</Chip>
                </div>
              ))}
            </div>
          </Card>

          {/* Version compare */}
          <Card className="col-span-5" title="Version compare" hint="v4.1 (live) vs v4.2 (candidate)">
            <table className="w-full text-[12.5px]">
              <thead className="bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-2 font-medium">Metric</th>
                  <th className="text-right px-2 py-2 font-medium">v4.1</th>
                  <th className="text-right px-2 py-2 font-medium">v4.2</th>
                  <th className="text-right px-4 py-2 font-medium">Δ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["MAPE", "3.1%", "2.8%", "−0.3", "good"],
                  ["RMSE", "$84", "$79", "−$5", "good"],
                  ["Calibration ECE", "0.018", "0.013", "−0.005", "good"],
                  ["Override rate", "14.2%", "12.8%", "−1.4pts", "good"],
                  ["Inference p95", "240ms", "310ms", "+70ms", "bad"],
                ].map(([k, a, b, d, t]) => (
                  <tr key={k as string}>
                    <td className="px-4 py-2">{k}</td>
                    <td className="px-2 py-2 text-right mono text-muted-foreground">{a}</td>
                    <td className="px-2 py-2 text-right mono font-medium">{b}</td>
                    <td className={`px-4 py-2 text-right mono ${t === "good" ? "text-success" : "text-destructive"}`}>{d}</td>
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

function CalibrationChart() {
  const w = 280, h = 200;
  const pts = [[10,12],[20,23],[30,32],[40,42],[50,49],[60,58],[70,71],[80,84],[90,93]];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
      {[0,1,2,3,4].map((i) => (
        <line key={i} x1="0" x2={w} y1={(h/5)*(i+1)} y2={(h/5)*(i+1)} stroke="var(--grid)" />
      ))}
      <line x1="0" y1={h} x2={w} y2="0" stroke="var(--muted-foreground)" strokeDasharray="3 3" />
      <polyline
        fill="none"
        stroke="var(--ai)"
        strokeWidth="2"
        points={pts.map(([x, y]) => `${(x / 100) * w},${h - (y / 100) * h}`).join(" ")}
      />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={(x / 100) * w} cy={h - (y / 100) * h} r="3" fill="var(--ai)" />
      ))}
    </svg>
  );
}
