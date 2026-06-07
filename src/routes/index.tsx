import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AppShell,
  Card,
  PageHeader,
  Btn,
  Chip,
  Sparkbar,
  Sparkline,
  ConfidenceRing,
} from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · RentIQ" },
      {
        name: "description",
        content: "Portfolio-wide AI pricing visibility for residential rental operators.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning, Priya"
        subtitle="27 units need your review today · Sunbelt portfolio · 18,412 units"
        actions={
          <>
            <Btn variant="secondary">Last 30 days ▾</Btn>
            <Btn variant="ai">✦ Ask AI about portfolio</Btn>
            <Btn variant="primary">Open review queue</Btn>
          </>
        }
      />

      <div className="px-6 pb-6 space-y-4">
        {/* Hero KPIs */}
        <div className="grid grid-cols-4 gap-3">
          <Kpi
            label="Units needing review"
            value="27"
            delta="+4 vs. yest"
            tone="warning"
            spark={[2, 4, 3, 6, 5, 7, 4, 8, 5, 9, 7, 8]}
          />
          <Kpi
            label="Pending approvals"
            value="12"
            delta="−3 vs. yest"
            tone="info"
            spark={[8, 7, 9, 6, 5, 7, 4, 6, 5, 4, 5, 3]}
          />
          <Kpi
            label="Avg confidence"
            value="82%"
            delta="+1.4 pts"
            tone="success"
            spark={[70, 72, 71, 75, 78, 80, 79, 82, 81, 83, 82, 82]}
          />
          <Kpi
            label="30-day revenue lift"
            value="$1.42M"
            delta="+8.2%"
            tone="success"
            spark={[3, 4, 5, 4, 6, 7, 8, 7, 9, 10, 12, 14]}
          />
        </div>

        {/* Heatmap + queue */}
        <div className="grid grid-cols-12 gap-3">
          <Card
            className="col-span-8"
            title="Market demand heatmap"
            hint="Demand index · last 7 days"
            actions={
              <>
                <Btn>Demand</Btn>
                <Btn variant="ghost">Rent Δ</Btn>
                <Btn variant="ghost">Occupancy</Btn>
              </>
            }
          >
            <div className="p-4">
              <div className="wf-placeholder h-[280px] relative wf-grid-bg">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px p-3">
                  {Array.from({ length: 72 }).map((_, i) => {
                    const v = ((i * 37) % 100) / 100;
                    return (
                      <div
                        key={i}
                        className="rounded-sm"
                        style={{
                          background: `color-mix(in oklch, var(--ai) ${Math.round(v * 80)}%, transparent)`,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>US Sunbelt</span>
                  <div className="flex items-center gap-1">
                    <span>Low</span>
                    <div className="flex gap-px">
                      {[10, 25, 40, 55, 70, 85].map((s) => (
                        <div
                          key={s}
                          className="w-3 h-2"
                          style={{
                            background: `color-mix(in oklch, var(--ai) ${s}%, transparent)`,
                          }}
                        />
                      ))}
                    </div>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="col-span-4"
            title="Pending approvals"
            hint="Sorted by SLA"
            actions={<Btn variant="ghost">View all</Btn>}
          >
            <ul className="divide-y divide-border">
              {[
                ["1247 Peachtree St · 4B", "+3.8%", "2h", "warning"],
                ["88 Marietta Ave · 12A", "+1.2%", "5h", "info"],
                ["55 W Paces Ferry · 7C", "−2.4%", "1d", "danger"],
                ["210 Spring St · 22F", "+0.9%", "1d", "info"],
                ["3322 Buford Hwy · 4", "+5.6%", "2d", "warning"],
              ].map(([addr, delta, sla, tone]) => (
                <li key={addr} className="px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50">
                  <div className="size-7 rounded-md bg-muted grid place-items-center text-[10px] font-medium">
                    PR
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] truncate">{addr}</div>
                    <div className="text-[10.5px] text-muted-foreground">Atlanta · 2BR/2BA</div>
                  </div>
                  <span className="mono text-[12px]">{delta}</span>
                  <Chip tone={tone as "warning" | "info" | "danger"}>{sla}</Chip>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Occupancy + Regional */}
        <div className="grid grid-cols-12 gap-3">
          <Card
            className="col-span-6"
            title="Occupancy vs. forecast"
            hint="90-day"
            actions={<Chip tone="ai">✦ AI forecast band</Chip>}
          >
            <div className="p-4">
              <ChartArea />
            </div>
          </Card>
          <Card
            className="col-span-6"
            title="Regional pricing comparison"
            hint="Avg rent Δ vs. submarket"
          >
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                ["Atlanta", 3.8, 92],
                ["Charlotte", 2.1, 88],
                ["Nashville", 4.6, 81],
                ["Raleigh", 1.4, 90],
                ["Tampa", 5.2, 78],
                ["Austin", -0.8, 84],
              ].map(([city, d, conf]) => (
                <div key={city as string} className="border border-border rounded-md p-3">
                  <div className="text-[12px] font-medium">{city}</div>
                  <div className="mt-1.5 text-[18px] font-semibold mono">
                    {Number(d) > 0 ? "+" : ""}
                    {d}%
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                    <span>Conf {conf}%</span>
                    <div className="flex-1 h-1 rounded bg-muted overflow-hidden">
                      <div className="h-full bg-ai" style={{ width: `${conf}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Accuracy + Feedback + Revenue */}
        <div className="grid grid-cols-12 gap-3">
          <Card
            className="col-span-4"
            title="AI recommendation accuracy"
            hint="Calibration · last 30d"
          >
            <div className="p-4 flex items-center gap-4">
              <ConfidenceRing value={87} size={72} />
              <div className="text-[12px] space-y-1">
                <div className="flex justify-between gap-6">
                  <span className="text-muted-foreground">MAPE</span>
                  <span className="mono">3.1%</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-muted-foreground">Override rate</span>
                  <span className="mono">14.2%</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-muted-foreground">Approvals (30d)</span>
                  <span className="mono">2,184</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="col-span-4"
            title="Recent analyst feedback"
            actions={
              <Link to="/feedback" className="text-[12px] text-ai hover:underline">
                Open ↗
              </Link>
            }
          >
            <ul className="divide-y divide-border">
              {[
                ["👎", "Comp #3 backs onto I-85, exclude", "Priya · 2h"],
                ["👍", "Walkability boost on Inman Park is right", "Marcus · 4h"],
                ["✦", "New construction at 1024 Boulevard — re-rank", "Devon · 1d"],
                ["👎", "Confidence too high given thin comp set", "Aisha · 1d"],
              ].map(([icon, txt, meta]) => (
                <li key={txt} className="px-4 py-2.5 flex gap-3 items-start">
                  <span className="text-[14px] leading-none mt-0.5">{icon}</span>
                  <div className="min-w-0">
                    <div className="text-[12.5px]">{txt}</div>
                    <div className="text-[10.5px] text-muted-foreground mt-0.5">{meta}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="col-span-4" title="Revenue impact forecast" hint="Waterfall · next 30d">
            <div className="p-4">
              <Waterfall />
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone,
  spark,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "success" | "warning" | "info" | "danger";
  spark: number[];
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[12px] text-muted-foreground">{label}</div>
        <Chip tone={tone}>{delta}</Chip>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="text-[28px] font-semibold mono leading-none">{value}</div>
        <div className="w-24 text-primary">
          <Sparkbar values={spark} />
        </div>
      </div>
    </Card>
  );
}

function ChartArea() {
  const actual = [62, 64, 63, 68, 71, 70, 73, 75, 74, 77, 79, 82, 85, 84, 87];
  const forecast = [62, 64, 64, 67, 70, 72, 74, 76, 77, 79, 81, 83, 86, 88, 90];
  const w = 600,
    h = 180,
    max = 100;
  const toPath = (vals: number[]) =>
    vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px]">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--ai)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--ai)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="0"
          x2={w}
          y1={(h / 4) * (i + 1)}
          y2={(h / 4) * (i + 1)}
          stroke="var(--grid)"
        />
      ))}
      <polygon fill="url(#g)" points={`0,${h} ${toPath(forecast)} ${w},${h}`} />
      <polyline
        fill="none"
        stroke="var(--ai)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        points={toPath(forecast)}
      />
      <polyline fill="none" stroke="var(--primary)" strokeWidth="2" points={toPath(actual)} />
    </svg>
  );
}

function Waterfall() {
  const bars = [
    { label: "Baseline", v: 100, color: "bg-muted-foreground/40" },
    { label: "AI lift", v: 18, color: "bg-ai" },
    { label: "Overrides", v: -4, color: "bg-warning" },
    { label: "Net", v: 114, color: "bg-success" },
  ];
  const max = 120;
  return (
    <div className="flex items-end gap-2 h-[160px]">
      {bars.map((b) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="text-[11px] mono">
            {b.v > 0 ? "+" : ""}
            {b.v}
          </div>
          <div
            className={`${b.color} w-full rounded-sm`}
            style={{ height: `${(Math.abs(b.v) / max) * 100}%` }}
          />
          <div className="text-[10.5px] text-muted-foreground">{b.label}</div>
        </div>
      ))}
    </div>
  );
}
