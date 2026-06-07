import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

type NavItem = { label: string; to: string; group: string; hint?: string };

const NAV: NavItem[] = [
  { group: "Work", label: "Dashboard", to: "/" },
  { group: "Work", label: "Pricing Workspace", to: "/workspace" },
  { group: "Work", label: "Property Portfolio", to: "/portfolio" },
  { group: "Intelligence", label: "Comparable Explorer", to: "/comps" },
  { group: "Intelligence", label: "AI Insights", to: "/insights" },
  { group: "Intelligence", label: "Explainability", to: "/explainability" },
  { group: "Intelligence", label: "What-if Simulator", to: "/whatif" },
  { group: "Quality", label: "Feedback & Learning", to: "/feedback" },
  { group: "Quality", label: "Model Performance", to: "/model" },
  { group: "Output", label: "Reports", to: "/reports" },
  { group: "System", label: "Administration", to: "/admin" },
];

const GROUPS = ["Work", "Intelligence", "Quality", "Output", "System"];

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-[232px] shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="h-14 px-4 flex items-center gap-2 border-b border-border">
          <div className="size-7 rounded-md bg-primary text-primary-foreground grid place-items-center text-[11px] font-bold tracking-tight">
            RQ
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold">RentIQ</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Pricing Ops</div>
          </div>
          <div className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground mono">PROD</div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {GROUPS.map((g) => (
            <div key={g}>
              <div className="px-2 mb-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {g}
              </div>
              <ul className="space-y-0.5">
                {NAV.filter((n) => n.group === g).map((n) => {
                  const active = path === n.to;
                  return (
                    <li key={n.to}>
                      <Link
                        to={n.to}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                          active
                            ? "bg-accent text-accent-foreground font-medium"
                            : "text-foreground/80 hover:bg-muted"
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${active ? "bg-ai" : "bg-border-strong"}`} />
                        {n.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-border p-3 text-[11px] text-muted-foreground flex items-center justify-between">
          <span className="mono">model v4.1 · stable</span>
          <span className="size-2 rounded-full bg-success" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-surface flex items-center gap-3 px-5">
          <Breadcrumbs path={path} />
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 h-8 px-3 rounded-md bg-muted text-muted-foreground text-[12px] w-[280px]">
              <span>Search properties, comps, reports…</span>
              <span className="ml-auto mono text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border">⌘K</span>
            </div>
            <TopIcon label="AI" highlight />
            <TopIcon label="Bell" />
            <TopIcon label="Help" />
            <div className="size-8 rounded-full bg-accent grid place-items-center text-[11px] font-medium">PR</div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function TopIcon({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <button
      className={`size-8 grid place-items-center rounded-md border text-[10px] font-medium uppercase tracking-wider ${
        highlight
          ? "bg-ai-soft border-[color-mix(in_oklch,var(--ai)_30%,transparent)] text-ai"
          : "bg-surface border-border text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

function Breadcrumbs({ path }: { path: string }) {
  const map: Record<string, string[]> = {
    "/": ["Dashboard"],
    "/workspace": ["Pricing Workspace", "Unit 4B · 1247 Peachtree St NE"],
    "/portfolio": ["Property Portfolio"],
    "/comps": ["Comparable Explorer"],
    "/insights": ["AI Insights"],
    "/explainability": ["Explainability", "Unit 4B"],
    "/whatif": ["What-if Simulator"],
    "/feedback": ["Feedback & Learning"],
    "/model": ["Model Performance"],
    "/reports": ["Reports"],
    "/admin": ["Administration"],
  };
  const crumbs = map[path] ?? ["Page"];
  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      <span className="text-muted-foreground">Sunbelt Portfolio</span>
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-border-strong">/</span>
          <span className={i === crumbs.length - 1 ? "font-medium" : "text-muted-foreground"}>{c}</span>
        </span>
      ))}
    </div>
  );
}

/* ───────── shared wireframe primitives ───────── */

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="px-6 pt-6 pb-4 flex items-start gap-4">
      <div className="min-w-0">
        <h1 className="text-[20px] font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-[13px] text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  title,
  hint,
  actions,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  hint?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`bg-card border border-border rounded-lg ${className}`}>
      {(title || actions) && (
        <header className="flex items-center gap-2 px-4 h-11 border-b border-border">
          <div className="min-w-0">
            {title && <h3 className="text-[13px] font-semibold">{title}</h3>}
            {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
          </div>
          {actions && <div className="ml-auto flex items-center gap-1.5">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Btn({
  children,
  variant = "secondary",
  size = "sm",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "ai" | "danger";
  size?: "sm" | "md";
  className?: string;
}) {
  const v = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-surface border border-border hover:bg-muted",
    ghost: "hover:bg-muted text-foreground/80",
    ai: "ai-surface text-ai hover:brightness-95",
    danger: "bg-destructive text-destructive-foreground",
  }[variant];
  const s = size === "md" ? "h-9 px-3.5 text-[13px]" : "h-7 px-2.5 text-[12px]";
  return <button className={`${v} ${s} rounded-md font-medium inline-flex items-center gap-1.5 ${className}`}>{children}</button>;
}

export function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info" | "ai";
}) {
  const t = {
    neutral: "bg-muted text-muted-foreground border-border",
    success: "bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-[color-mix(in_oklch,var(--success)_60%,black)] border-[color-mix(in_oklch,var(--success)_30%,transparent)]",
    warning: "bg-[color-mix(in_oklch,var(--warning)_18%,transparent)] text-[color-mix(in_oklch,var(--warning)_45%,black)] border-[color-mix(in_oklch,var(--warning)_35%,transparent)]",
    danger: "bg-[color-mix(in_oklch,var(--destructive)_12%,transparent)] text-destructive border-[color-mix(in_oklch,var(--destructive)_30%,transparent)]",
    info: "bg-[color-mix(in_oklch,var(--info)_12%,transparent)] text-[color-mix(in_oklch,var(--info)_55%,black)] border-[color-mix(in_oklch,var(--info)_30%,transparent)]",
    ai: "bg-ai-soft text-ai border-[color-mix(in_oklch,var(--ai)_30%,transparent)]",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1 h-5 px-2 rounded-full border text-[11px] font-medium ${t}`}>
      {children}
    </span>
  );
}

export function Sparkbar({ values, tone = "primary" }: { values: number[]; tone?: "primary" | "ai" | "success" }) {
  const max = Math.max(...values);
  const color = tone === "ai" ? "bg-ai" : tone === "success" ? "bg-success" : "bg-primary";
  return (
    <div className="flex items-end gap-[2px] h-8">
      {values.map((v, i) => (
        <div key={i} className={`${color} w-1.5 rounded-sm opacity-80`} style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
}

export function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 100;
  const h = 28;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7">
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={pts} className="text-primary" />
    </svg>
  );
}

export function ConfidenceRing({ value, size = 56 }: { value: number; size?: number }) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const tone =
    value >= 80 ? "text-success" : value >= 65 ? "text-[color:var(--conf-3)]" : value >= 50 ? "text-warning" : "text-destructive";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth="6" fill="none" className="text-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          className={tone}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-[12px] font-semibold mono">{value}%</div>
    </div>
  );
}
