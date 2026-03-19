import { mockApplications } from "@/lib/mock-data"
import { StatusBadge } from "@/components/applications/StatusBadge"

export function ApplicationTable() {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left">

        {/* Header */}
        <thead className="bg-slate-100 text-sm text-slate-600">
          <tr>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-sm text-slate-600">
          {mockApplications.map((app) => (
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