import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Administration · RentIQ" }] }),
  component: Admin,
});

function Admin() {
  return (
    <AppShell>
      <PageHeader title="Administration" subtitle="Users, data sources, model settings, audit" actions={<Btn variant="primary">+ Invite user</Btn>} />
      <div className="px-6 pb-6 grid grid-cols-2 gap-3">
        <Card title="Users & roles">
          <table className="w-full text-[12.5px]">
            <thead className="bg-muted/40 text-[11px] uppercase text-muted-foreground"><tr>
              <th className="text-left px-4 py-2 font-medium">User</th>
              <th className="text-left px-2 py-2 font-medium">Role</th>
              <th className="text-left px-2 py-2 font-medium">Scope</th>
              <th className="px-2 py-2"></th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {[
                ["Priya Ramani", "Pricing Analyst", "Atlanta + Charlotte"],
                ["Marcus Hill", "Regional Manager", "Sunbelt"],
                ["Elena Park", "Asset Manager", "All"],
                ["Dr. Raj Patel", "Data Science", "Admin"],
                ["Aisha Wong", "Sr Analyst", "Nashville"],
              ].map(([n, r, s]) => (
                <tr key={n as string}><td className="px-4 py-2.5">{n}</td><td className="px-2"><Chip tone={r === "Data Science" ? "ai" : "neutral"}>{r}</Chip></td><td className="px-2 text-muted-foreground">{s}</td><td className="px-2 text-right"><Btn variant="ghost">⋯</Btn></td></tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Data sources">
          <ul className="divide-y divide-border">
            {[
              ["Yardi", "Synced 11m ago", "success"],
              ["RealPage Comps", "Synced 1h ago", "success"],
              ["MLS Atlanta", "Synced 4h ago", "success"],
              ["GreatSchools API", "Synced 22h ago", "warning"],
              ["FEMA Flood", "Snapshot 2026-05", "info"],
              ["MARTA GTFS", "Failed · retry", "danger"],
            ].map(([n, t, tone]) => (
              <li key={n as string} className="px-4 py-2.5 flex items-center gap-3 text-[12.5px]">
                <div className="size-2 rounded-full" style={{ background: `var(--${tone === "success" ? "success" : tone === "warning" ? "warning" : tone === "danger" ? "destructive" : "info"})` }} />
                <span className="flex-1">{n}</span>
                <span className="text-muted-foreground mono text-[11px]">{t}</span>
                <Btn variant="ghost">Configure</Btn>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Model settings" className="col-span-2">
          <div className="p-4 grid grid-cols-4 gap-3 text-[12.5px]">
            {[
              ["Active version", "v4.1"],
              ["Candidate", "v4.2 (5% traffic)"],
              ["Auto-promotion", "Off · manual"],
              ["Override approval threshold", "±5%"],
              ["Comp set size (target)", "8–15"],
              ["Confidence display", "Numeric + label"],
              ["Fair Housing checks", "Enforced"],
              ["Feedback ingestion", "Daily 02:00 ET"],
            ].map(([k, v]) => (
              <div key={k} className="border border-border rounded-md p-3">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="mt-1 font-medium mono">{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
