import type { JobApplication, ApplicationStatus } from "@/lib/mock-data"
import { StatusBadge } from "@/components/applications/StatusBadge"
import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "@/components/ui/Table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { Button } from "@/components/ui/Button"
import { MoreVertical } from "lucide-react"
interface ApplicationTableProps {
  applications: JobApplication[]
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void
  onDeleteApplication: (id: string) => void
}

export function ApplicationTable({ applications, onUpdateStatus, onDeleteApplication }: ApplicationTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Company Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Salary Range</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell><p className="font-medium text-foreground">{app.company}</p></TableCell>
              <TableCell><p className="text-foreground">{app.jobTitle}</p></TableCell>
              <TableCell><p className="text-foreground">{app.salaryRange}</p></TableCell>
              <TableCell><p className="text-muted-foreground">{app.location}</p></TableCell>
              <TableCell>
                <StatusBadge status={app.status} />
              </TableCell>
              <TableCell><p className="text-muted-foreground">{app.dateApplied}</p></TableCell>

              <TableCell className="max-w-[150px] truncate text-muted-foreground" title={app.notes}>{app.notes}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreVertical className="size-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Application</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(app.id, "shortlisted")}>
                      Mark as Shortlisted
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(app.id, "interviewed")}>
                      Mark as Interviewed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onUpdateStatus(app.id, "rejected")}>
                      Mark as Rejected
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => {
                      if (confirm("Are you sure you want to delete this application?")) {
                        onDeleteApplication(app.id)
                      }
                    }}>
                      Delete Application
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}