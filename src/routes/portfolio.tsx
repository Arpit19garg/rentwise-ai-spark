import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Card, PageHeader, Btn, Chip } from "@/components/AppShell";

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Property Portfolio · RentIQ" }] }),
  component: Portfolio,
});

const ROWS = Array.from({ length: 14 }).map((_, i) => {
  const cities = ["Atlanta", "Charlotte", "Nashville", "Raleigh", "Tampa", "Austin"];
  const types = ["Studio", "1BR/1BA", "2BR/2BA", "3BR/2BA"];
  const statuses = ["Vacant", "Occupied", "Notice", "Renewing"];
  const c = cities[i % cities.length];
  const t = types[i % types.length];
  const s = statuses[i % statuses.length];
  return {
    id: `U-${1024 + i * 17}`,
    addr: `${100 + i * 27} ${["Peachtree", "Marietta", "Pharr", "Spring", "Buford", "Mitchell"][i % 6]} St`,
    city: c,
    type: t,
    status: s,
    current: 1800 + ((i * 73) % 1400),
    rec: 1850 + ((i * 81) % 1400),
    conf: 70 + ((i * 13) % 25),
    occ: 85 + ((i * 7) % 14),
  };
});

function Portfolio() {
  const [view, setView] = useState("List");
  const [selected, setSelected] = useState<string[]>(["U-1024", "U-1041"]);
  const [cities, setCities] = useState<string[]>(["Atlanta"]);
  const [statuses, setStatuses] = useState<string[]>([]);

  const visibleRows = useMemo(
    () =>
      ROWS.filter((row) => {
        const cityMatch = cities.length === 0 || cities.includes(row.city);
        const statusMatch = statuses.length === 0 || statuses.includes(row.status);
        return cityMatch && statusMatch;
      }),
    [cities, statuses],
  );

  const toggle = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const toggleSelected = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <AppShell>
      <PageHeader
        title="Property Portfolio"
        subtitle="18,412 units · 6 metros · Sunbelt Portfolio"
        actions={
          <>
            <Btn variant="secondary">Export</Btn>
            <Btn variant="ai">✦ Bulk generate recs</Btn>
            <Btn variant="primary">Bulk approve (tolerance)</Btn>
          </>
        }
      />

      {/* View toggle + saved views */}
      <div className="px-6 pb-3 flex items-center gap-2">
        <div className="flex border border-border rounded-md overflow-hidden">
          {["List", "Map", "Kanban"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-3 h-8 text-[12.5px] ${view === v ? "bg-muted font-medium" : "hover:bg-muted/60"}`}
            >
              {v}
            </button>
          ))}
        </div>
        <span className="text-[12px] text-muted-foreground mx-2">Saved views:</span>
        {["My Atlanta Vacants", "Lease expiring 30d", "Below market", "+ New"].map((v, i) => (
          <Chip key={v} tone={i === 0 ? "ai" : "neutral"}>
            {v}
          </Chip>
        ))}
      </div>

      <div className="px-6 pb-6 grid grid-cols-[220px_1fr] gap-4">
        {/* Filters */}
        <aside className="space-y-3">
          <Card title="Filters">
            <div className="p-3 space-y-3 text-[12.5px]">
              {[
                ["City", ["Atlanta", "Charlotte", "Nashville", "Raleigh", "Tampa", "Austin"]],
                ["Status", ["Vacant", "Occupied", "Notice", "Renewing"]],
                ["Unit type", ["Studio", "1BR", "2BR", "3BR"]],
                ["Confidence", ["High (≥80)", "Med", "Low"]],
              ].map(([title, opts]) => (
                <div key={title as string}>
                  <div className="text-[11px] uppercase text-muted-foreground tracking-wider mb-1.5">
                    {title}
                  </div>
                  <div className="space-y-1">
                    {(opts as string[]).map((o) => (
                      <label key={o} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            title === "City"
                              ? cities.includes(o)
                              : title === "Status"
                                ? statuses.includes(o)
                                : false
                          }
                          onChange={() => {
                            if (title === "City") toggle(o, cities, setCities);
                            if (title === "Status") toggle(o, statuses, setStatuses);
                          }}
                        />{" "}
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <div className="text-[11px] uppercase text-muted-foreground tracking-wider mb-1.5">
                  Rent range
                </div>
                <div className="flex items-center gap-1.5 mono text-[11px]">
                  <input
                    className="w-full bg-muted rounded px-2 h-7 outline-none"
                    defaultValue="$1,400"
                  />
                  <span>—</span>
                  <input
                    className="w-full bg-muted rounded px-2 h-7 outline-none"
                    defaultValue="$3,800"
                  />
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Table */}
        <Card>
          <div className="border-b border-border px-4 h-11 flex items-center text-[12px] text-muted-foreground gap-2">
            <input
              type="checkbox"
              checked={selected.length === visibleRows.length && visibleRows.length > 0}
              onChange={(event) =>
                setSelected(event.target.checked ? visibleRows.map((row) => row.id) : [])
              }
            />{" "}
            <span>{selected.length} selected</span>
            <div className="ml-3 flex gap-1">
              <Btn>Assign</Btn>
              <Btn>Generate recs</Btn>
              <Btn variant="ai">✦ Bulk what-if</Btn>
              <Btn variant="primary">Approve</Btn>
            </div>
            <span className="ml-auto mono">{visibleRows.length} of 18,412</span>
          </div>
          {view === "Map" && (
            <div className="p-4 grid grid-cols-[1fr_240px] gap-4">
              <div className="wf-placeholder h-[520px] wf-grid-bg relative">
                {visibleRows.map((row, i) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => toggleSelected(row.id)}
                    className={`absolute size-7 rounded-full grid place-items-center text-[10px] font-semibold border-2 border-surface ${
                      selected.includes(row.id)
                        ? "bg-ai text-ai-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                    style={{ left: `${12 + ((i * 19) % 74)}%`, top: `${12 + ((i * 29) % 72)}%` }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {visibleRows.slice(0, 8).map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => toggleSelected(row.id)}
                    className="w-full text-left border border-border rounded-md p-2 hover:bg-muted"
                  >
                    <div className="font-medium">{row.addr}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {row.city} - ${row.rec.toLocaleString()} rec
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {view === "Kanban" && (
            <div className="p-4 grid grid-cols-4 gap-3">
              {["Vacant", "Occupied", "Notice", "Renewing"].map((status) => (
                <div key={status} className="border border-border rounded-md bg-surface">
                  <div className="h-9 px-3 border-b border-border flex items-center justify-between text-[12px] font-medium">
                    {status}
                    <Chip>{visibleRows.filter((row) => row.status === status).length}</Chip>
                  </div>
                  <div className="p-2 space-y-2 min-h-[360px]">
                    {visibleRows
                      .filter((row) => row.status === status)
                      .map((row) => (
                        <button
                          key={row.id}
                          type="button"
                          onClick={() => toggleSelected(row.id)}
                          className={`w-full text-left border rounded-md p-2 text-[12px] ${
                            selected.includes(row.id)
                              ? "border-ai bg-ai-soft"
                              : "border-border bg-card hover:bg-muted"
                          }`}
                        >
                          <div className="font-medium">{row.addr}</div>
                          <div className="mono text-muted-foreground">
                            ${row.current.toLocaleString()} &gt; ${row.rec.toLocaleString()}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {view === "List" && (
            <table className="w-full text-[12.5px]">
              <thead className="bg-muted/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 w-8"></th>
                  <th className="text-left px-2 py-2 font-medium">Unit</th>
                  <th className="text-left px-2 py-2 font-medium">City</th>
                  <th className="text-left px-2 py-2 font-medium">Type</th>
                  <th className="text-left px-2 py-2 font-medium">Status</th>
                  <th className="text-right px-2 py-2 font-medium">Current</th>
                  <th className="text-right px-2 py-2 font-medium">AI rec</th>
                  <th className="text-right px-2 py-2 font-medium">Δ</th>
                  <th className="text-right px-2 py-2 font-medium">Conf</th>
                  <th className="text-right px-2 py-2 font-medium">Occ %</th>
                  <th className="text-right px-4 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleRows.map((r) => {
                  const delta = r.rec - r.current;
                  const pct = (delta / r.current) * 100;
                  return (
                    <tr key={r.id} className="hover:bg-muted/40">
                      <td className="px-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(r.id)}
                          onChange={() => toggleSelected(r.id)}
                        />
                      </td>
                      <td className="px-2 py-2.5">
                        <div className="font-medium">{r.addr}</div>
                        <div className="text-[10.5px] text-muted-foreground mono">{r.id}</div>
                      </td>
                      <td className="px-2">{r.city}</td>
                      <td className="px-2 mono">{r.type}</td>
                      <td className="px-2">
                        <Chip
                          tone={
                            r.status === "Vacant"
                              ? "warning"
                              : r.status === "Notice"
                                ? "info"
                                : "neutral"
                          }
                        >
                          {r.status}
                        </Chip>
                      </td>
                      <td className="px-2 text-right mono text-muted-foreground">
                        ${r.current.toLocaleString()}
                      </td>
                      <td className="px-2 text-right mono font-medium">
                        ${r.rec.toLocaleString()}
                      </td>
                      <td
                        className={`px-2 text-right mono ${delta >= 0 ? "text-success" : "text-destructive"}`}
                      >
                        {delta >= 0 ? "+" : ""}
                        {pct.toFixed(1)}%
                      </td>
                      <td className="px-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-10 h-1 bg-muted rounded overflow-hidden">
                            <div className="h-full bg-ai" style={{ width: `${r.conf}%` }} />
                          </div>
                          <span className="mono">{r.conf}</span>
                        </div>
                      </td>
                      <td className="px-2 text-right mono">{r.occ}%</td>
                      <td className="px-4 text-right">
                        <Btn variant="ghost">Open</Btn>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
