import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/lib/mock-data"

interface StatusBadgeProps {
  status: ApplicationStatus
}

const statusConfig: Record<ApplicationStatus, { label: string; dotColor: string; bgColor: string; textColor: string }> = {
  pending: {
    label: "Pending",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700"
  },
  shortlisted: {
    label: "Shortlisted",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700"
  },
  rejected: {
    label: "Rejected",
    dotColor: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700"
  },
  interviewed: {
    label: "Interviewed",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700"
  }
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        "border-border bg-background"
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dotColor)} />
      {config.label}
    </span>
  )
}
