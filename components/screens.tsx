import { ScreenGlass, ScreenNavBar, StatusBar } from "./phone";
import { cn } from "./ui";

/* The medications used across every mock. Colours are the eight accents the
   app's editor actually offers (`MedColors.choices`). */
const MEDS = {
  levo: { name: "Levothyroxine", dose: "50 mcg", color: "#4C6FFF", icon: "pill" },
  d3: { name: "Vitamin D", dose: "2000 IU", color: "#F79009", icon: "drop" },
  metformin: { name: "Metformin", dose: "500 mg", color: "#14C7B8", icon: "pill" },
  atorva: { name: "Atorvastatin", dose: "20 mg", color: "#9B5DE5", icon: "heart" },
  sertraline: { name: "Sertraline", dose: "50 mg", color: "#EC4899", icon: "brain" },
} as const;

type Med = (typeof MEDS)[keyof typeof MEDS];

function MedIcon({ kind, className }: { kind: Med["icon"]; className?: string }) {
  const paths: Record<Med["icon"], string> = {
    pill: "M4.9 12.7 12.7 4.9a4.1 4.1 0 0 1 5.8 5.8l-7.8 7.8a4.1 4.1 0 0 1-5.8-5.8ZM8.8 8.8l5.8 5.8",
    drop: "M12 3.5c3.2 3.7 5.2 6.4 5.2 8.9a5.2 5.2 0 1 1-10.4 0c0-2.5 2-5.2 5.2-8.9Z",
    heart: "M3.5 10.5h3.2l1.6-3.4 2.6 8 2-4.6h7.6",
    brain: "M9 4.5A3.5 3.5 0 0 0 5.5 8v.4A3 3 0 0 0 6 14.3V16a3.5 3.5 0 0 0 6 2.5 3.5 3.5 0 0 0 6-2.5v-1.7a3 3 0 0 0 .5-5.9V8A3.5 3.5 0 0 0 12 5.7 3.5 3.5 0 0 0 9 4.5Z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[kind]} />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Today — the screen the app opens on.
   -------------------------------------------------------------------------- */

function DoseRow({
  med,
  time,
  state,
  tone,
}: {
  med: Med;
  time: string;
  state: "taken" | "skipped" | "pending";
  tone: "light" | "dark";
}) {
  const settled = state !== "pending";
  return (
    <ScreenGlass
      tone={tone}
      className={cn("flex items-center gap-2.5 px-2.5 py-2.5", settled && "opacity-60")}
    >
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-[9px]"
        style={{ backgroundColor: `${med.color}22`, color: med.color }}
      >
        <MedIcon kind={med.icon} className="h-[15px] w-[15px]" />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-[10.5px] leading-tight font-semibold",
            state === "skipped" && "line-through",
          )}
        >
          {med.name}
        </span>
        <span className="block truncate text-[8.5px] leading-tight opacity-55">
          {med.dose} · {time}
        </span>
      </span>

      {state === "pending" ? (
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-current/20 opacity-45">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
          <span
            className="grid h-[22px] w-[22px] place-items-center rounded-full text-white"
            style={{ backgroundColor: "#12B76A" }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m5 12.5 4.5 4.5L19 7" />
            </svg>
          </span>
        </span>
      ) : (
        <span
          className="shrink-0 rounded-full px-2 py-[3px] text-[7.5px] font-bold tracking-wide uppercase"
          style={{
            backgroundColor: state === "taken" ? "#12B76A22" : "#5A607222",
            color: state === "taken" ? "#12B76A" : undefined,
          }}
        >
          {state}
        </span>
      )}
    </ScreenGlass>
  );
}

export function TodayScreen({
  tone = "light",
  /** Drops the last row so the day still fits on a narrower handset. */
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <>
      <StatusBar tone={tone} />
      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
        <div className="px-1">
          <p className="text-[9px] font-medium opacity-55">Good morning</p>
          <p className="font-[family-name:var(--font-jakarta)] text-[22px] leading-tight font-extrabold tracking-tight">
            Today
          </p>
        </div>

        {/* Summary card, with the app's progress ring. */}
        <ScreenGlass tone={tone} className="flex items-center gap-3 px-3 py-3">
          <ProgressRing done={1} total={compact ? 4 : 5} />
          <span className="min-w-0">
            <span className="block text-[11px] font-bold">
              1 of {compact ? 4 : 5} taken
            </span>
            <span className="block text-[8.5px] opacity-55">Next at 8:00 AM</span>
          </span>
        </ScreenGlass>

        <p className="px-1 pt-1 text-[8px] font-bold tracking-[0.12em] uppercase opacity-45">
          Morning
        </p>
        <DoseRow med={MEDS.levo} time="7:00 AM" state="taken" tone={tone} />
        <DoseRow med={MEDS.d3} time="8:00 AM" state="pending" tone={tone} />
        <DoseRow med={MEDS.metformin} time="8:00 AM" state="pending" tone={tone} />

        <p className="px-1 pt-1 text-[8px] font-bold tracking-[0.12em] uppercase opacity-45">
          Evening
        </p>
        <DoseRow med={MEDS.atorva} time="9:00 PM" state="pending" tone={tone} />
        {compact ? null : (
          <DoseRow med={MEDS.sertraline} time="9:00 PM" state="pending" tone={tone} />
        )}
      </div>
      <ScreenNavBar tone={tone} active="today" />
    </>
  );
}

function ProgressRing({ done, total }: { done: number; total: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-10 w-10 shrink-0 place-items-center">
      <span
        aria-hidden
        className="animate-tick absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, #4C6FFF33, transparent 70%)" }}
      />
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="3.5" opacity="0.15" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="#4C6FFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - done / total)}
        />
      </svg>
      <span className="relative text-[9px] font-bold">
        {done}/{total}
      </span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   Medications — the library, and where a schedule is built.
   -------------------------------------------------------------------------- */

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function MedCard({
  med,
  times,
  days,
  tone,
}: {
  med: Med;
  times: string;
  days: number[];
  tone: "light" | "dark";
}) {
  return (
    <ScreenGlass tone={tone} className="px-2.5 py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px]"
          style={{ backgroundColor: `${med.color}22`, color: med.color }}
        >
          <MedIcon kind={med.icon} className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11px] leading-tight font-semibold">{med.name}</span>
          <span className="block truncate text-[8.5px] leading-tight opacity-55">
            {med.dose} · {times}
          </span>
        </span>
      </div>
      <div className="mt-2 flex gap-1">
        {DAYS.map((d, i) => {
          const on = days.includes(i);
          return (
            <span
              key={i}
              className="grid h-[15px] flex-1 place-items-center rounded-[5px] text-[7px] font-bold"
              style={{
                backgroundColor: on ? med.color : "transparent",
                color: on ? "#fff" : undefined,
                opacity: on ? 1 : 0.3,
                border: on ? undefined : "1px solid currentColor",
              }}
            >
              {d}
            </span>
          );
        })}
      </div>
    </ScreenGlass>
  );
}

export function MedicationsScreen({ tone = "light" }: { tone?: "light" | "dark" }) {
  const every = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      <StatusBar tone={tone} time="9:41" />
      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-3">
        <div className="flex items-end justify-between px-1">
          <p className="font-[family-name:var(--font-jakarta)] text-[22px] leading-tight font-extrabold tracking-tight">
            Medications
          </p>
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-white"
            style={{ backgroundColor: "#4C6FFF" }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </div>

        <MedCard med={MEDS.levo} times="7:00 AM" days={every} tone={tone} />
        <MedCard med={MEDS.d3} times="8:00 AM" days={every} tone={tone} />
        <MedCard med={MEDS.metformin} times="8:00 AM, 8:00 PM" days={every} tone={tone} />
        <MedCard med={MEDS.atorva} times="9:00 PM" days={[0, 2, 4]} tone={tone} />
      </div>
      <ScreenNavBar tone={tone} active="meds" />
    </>
  );
}

/* --------------------------------------------------------------------------
   Settings — the seven-day adherence read-out.
   -------------------------------------------------------------------------- */

export function AdherenceScreen({ tone = "light" }: { tone?: "light" | "dark" }) {
  const week = [
    { d: "M", v: 1 },
    { d: "T", v: 1 },
    { d: "W", v: 0.8 },
    { d: "T", v: 1 },
    { d: "F", v: 0.6 },
    { d: "S", v: 1 },
    { d: "S", v: 1 },
  ];

  return (
    <>
      <StatusBar tone={tone} time="9:41" />
      <div className="flex-1 space-y-2.5 overflow-hidden px-3 pt-3">
        <p className="px-1 font-[family-name:var(--font-jakarta)] text-[22px] leading-tight font-extrabold tracking-tight">
          Settings
        </p>

        <ScreenGlass tone={tone} className="px-3 py-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[9px] font-semibold opacity-60">Adherence</span>
            <span className="text-[8px] opacity-45">Last 7 days</span>
          </div>
          <p className="mt-0.5 font-[family-name:var(--font-jakarta)] text-[26px] leading-none font-extrabold">
            91<span className="text-[15px]">%</span>
          </p>
          <div className="mt-2.5 flex h-9 items-end gap-1.5">
            {week.map((day, i) => (
              <span key={i} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className="w-full rounded-[3px]"
                  style={{
                    height: `${day.v * 26}px`,
                    backgroundColor: day.v === 1 ? "#12B76A" : "#F79009",
                    opacity: 0.85,
                  }}
                />
                <span className="text-[6.5px] font-bold opacity-45">{day.d}</span>
              </span>
            ))}
          </div>
        </ScreenGlass>

        <ScreenGlass tone={tone} className="divide-y divide-current/10">
          <Row label="Appearance" value="System" />
          <Row label="Account" value="grant@…" />
          <Row label="Remove ads" value="$0.99" accent />
        </ScreenGlass>
      </div>
      <ScreenNavBar tone={tone} active="settings" />
    </>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5">
      <span className="text-[10px] font-medium">{label}</span>
      <span
        className="text-[9px] font-semibold"
        style={{ color: accent ? "#4C6FFF" : undefined, opacity: accent ? 1 : 0.5 }}
      >
        {value}
      </span>
    </div>
  );
}
