"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { createApplication, type Application, type ApplicationStatus } from "@/lib/applications"
import { getAccessToken } from "@/lib/auth"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"
import { Textarea } from "@/components/ui/TextArea"

interface AddApplicationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAddApplication: (application: Application) => void
}

export function AddApplicationModal({
    open,
    onOpenChange,
    onAddApplication,
}: AddApplicationModalProps) {
    const [company, setCompany] = useState("")
    const [title, setTitle] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [source, setSource] = useState("")
    const [location, setLocation] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [status, setStatus] = useState<ApplicationStatus>("PENDING")
    const [appliedAt, setAppliedAt] = useState("")
    const [notes, setNotes] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    function resetForm() {
        setCompany("")
        setTitle("")
        setJobUrl("")
        setLocation("")
        setSalaryRange("")
        setStatus("PENDING")
        setAppliedAt("")
        setNotes("")
        setError("")
    }

    async function handleAdd() {
        const token = getAccessToken()

        if (!token) {
            setError("You must be logged in.")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const newApplication = await createApplication(token, {
                company,
                title,
                job_url: jobUrl,
                source,
                location,
                salary_range: salaryRange,
                status,
                applied_at: appliedAt,
                notes,
            })

            onAddApplication(newApplication)
            onOpenChange(false)
            resetForm()
        } catch {
            setError("Failed to add application.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Application</DialogTitle>
                    <DialogDescription>
                        Track a new job application. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                            id="company"
                            placeholder="e.g. Google"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            placeholder="e.g. Software Engineer"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="jobUrl">Job Posting URL</Label>

                        <Input
                            id="jobUrl"
                            type="url"
                            placeholder="https://company.com/jobs/..."
                            value={jobUrl}
                            onChange={(e) => setJobUrl(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="source">Application Source</Label>

                        <Select value={source} onValueChange={setSource}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select application source" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                <SelectItem value="Indeed">Indeed</SelectItem>
                                <SelectItem value="Company Website">Company Website</SelectItem>
                                <SelectItem value="Referral">Referral</SelectItem>
                                <SelectItem value="Recruiter">Recruiter</SelectItem>
                                <SelectItem value="Government Jobs">Government Jobs</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. Toronto, ON"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input
                                id="salary"
                                placeholder="e.g. $70k-$90k"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="appliedAt">Date Applied</Label>
                            <Input
                                id="appliedAt"
                                type="date"
                                value={appliedAt}
                                onChange={(e) => setAppliedAt(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={status}
                                onValueChange={(value) => setStatus(value as ApplicationStatus)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="APPLIED">Applied</SelectItem>
                                    <SelectItem value="INTERVIEW">Interview</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                    <SelectItem value="OFFER">Offer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any notes about this application..."
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Application"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}