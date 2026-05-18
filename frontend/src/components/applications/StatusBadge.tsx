import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/lib/applications"
interface StatusBadgeProps {
  status: ApplicationStatus
}

const statusConfig: Record<
  ApplicationStatus,
  {
    label: string
    dotColor: string
    bgColor: string
    textColor: string
  }
> = {
  PENDING: {
    label: "Pending",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },

  APPLIED: {
    label: "Applied",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },

  INTERVIEW: {
    label: "Interview",
    dotColor: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },

  REJECTED: {
    label: "Rejected",
    dotColor: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },

  OFFER: {
    label: "Offer",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.bgColor,
        config.textColor
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          config.dotColor
        )}
      />

      {config.label}
    </span>
  )
}