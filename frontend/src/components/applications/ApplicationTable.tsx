import type { JobApplication } from "@/lib/mock-data"
import { StatusBadge } from "@/components/applications/StatusBadge"

interface ApplicationTableProps {
  applications: JobApplication[]
}

export function ApplicationTable({ applications }: ApplicationTableProps) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-100 text-sm text-slate-600">
          <tr>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {applications.map((app) => (
            <tr key={app.id} className="border-t">
              <td className="px-4 py-3">{app.company}</td>
              <td className="px-4 py-3">{app.jobTitle}</td>
              <td className="px-4 py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-4 py-3">{app.dateApplied}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}