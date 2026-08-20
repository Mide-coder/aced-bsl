"use client";
// ACED — BookingStatusBadge
// Status pill for booking lifecycle

export type BookingStatus =
  | "requested"
  | "accepted"
  | "paid"
  | "completed"
  | "released"
  | "cancelled";

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

const CONFIG: Record<BookingStatus, { label: string; classes: string; dot: string }> = {
  requested:  { label: "Requested",  classes: "bg-blue-50   text-blue-600   border-blue-200",   dot: "bg-blue-500"   },
  accepted:   { label: "Accepted",   classes: "bg-indigo-50 text-indigo-600 border-indigo-200", dot: "bg-indigo-500" },
  paid:       { label: "Paid",       classes: "bg-purple-50 text-purple-600 border-purple-200", dot: "bg-purple-500" },
  completed:  { label: "Completed",  classes: "bg-green-50  text-aced-green  border-green-200",  dot: "bg-aced-green"  },
  released:   { label: "Released",   classes: "bg-teal-50  text-teal-600   border-teal-200",   dot: "bg-teal-500"   },
  cancelled:  { label: "Cancelled",  classes: "bg-red-50   text-aced-red   border-red-200",    dot: "bg-aced-red"   },
};

export function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const cfg = CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
