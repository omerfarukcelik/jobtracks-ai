"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"

import {
    Application,
    ApplicationStatus,
    updateApplication,
} from "@/lib/applications"

import { getAccessToken } from "@/lib/auth"

interface EditApplicationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    application: Application | null
    onApplicationUpdated: (application: Application) => void
}

export function EditApplicationModal({
    open,
    onOpenChange,
    application,
    onApplicationUpdated,
}: EditApplicationModalProps) {
    const [company, setCompany] = useState("")
    const [title, setTitle] = useState("")
    const [jobUrl, setJobUrl] = useState("")
    const [source, setSource] = useState("")
    const [location, setLocation] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [status, setStatus] =
        useState<ApplicationStatus>("APPLIED")
    const [appliedAt, setAppliedAt] = useState("")
    const [notes, setNotes] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!application) return

        setCompany(application.company || "")
        setTitle(application.title || "")
        setJobUrl(application.job_url || "")
        setSource(application.source || "")
        setLocation(application.location || "")
        setSalaryRange(application.salary_range || "")
        setStatus(application.status)
        setAppliedAt(application.applied_at || "")
        setNotes(application.notes || "")
        setError("")
    }, [application])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!application) {
            return
        }

        const token = getAccessToken()

        if (!token) {
            setError("You must be logged in.")
            return
        }

        try {
            setIsLoading(true)
            setError("")

            const updatedApplication = await updateApplication(
                token,
                application.id,
                {
                    company,
                    title,
                    job_url: jobUrl,
                    source,
                    location,
                    salary_range: salaryRange,
                    status,
                    applied_at: appliedAt,
                    notes,
                }
            )

            onApplicationUpdated(updatedApplication)
            onOpenChange(false)
        } catch {
            setError("Failed to update application.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Application</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="grid gap-2">
                        <Label htmlFor="edit-company">
                            Company Name
                        </Label>
                        <Input
                            id="edit-company"
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-title">
                            Job Title
                        </Label>
                        <Input
                            id="edit-title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-url">
                            Job Posting URL
                        </Label>
                        <Input
                            id="edit-url"
                            type="url"
                            value={jobUrl}
                            onChange={(e) =>
                                setJobUrl(e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-source">Application Source</Label>

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

                    <div className="grid gap-2">
                        <Label htmlFor="edit-location">
                            Location
                        </Label>
                        <Input
                            id="edit-location"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-salary">
                            Salary Range
                        </Label>
                        <Input
                            id="edit-salary"
                            value={salaryRange}
                            onChange={(e) =>
                                setSalaryRange(e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-date">
                            Date Applied
                        </Label>
                        <Input
                            id="edit-date"
                            type="date"
                            value={appliedAt}
                            onChange={(e) =>
                                setAppliedAt(e.target.value)
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="edit-notes">
                            Notes
                        </Label>
                        <Input
                            id="edit-notes"
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading
                            ? "Saving..."
                            : "Save Changes"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}