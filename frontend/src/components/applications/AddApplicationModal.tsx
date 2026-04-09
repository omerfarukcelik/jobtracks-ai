"use client";

import { useState } from "react"
import { Button } from "@/components/ui/Button";
import type { JobApplication, ApplicationStatus } from "@/lib/mock-data"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

interface AddApplicationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAddApplication: (application: JobApplication) => void
}

export function AddApplicationModal({
    open,
    onOpenChange,
    onAddApplication,
}: AddApplicationModalProps) {
    const [company, setCompany] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [location, setLocation] = useState("")
    const [salaryRange, setSalaryRange] = useState("")
    const [status, setStatus] = useState<ApplicationStatus>("pending")
    const [dateApplied, setDateApplied] = useState("")
    const [notes, setNotes] = useState("")

    function resetForm() {
        setCompany("")
        setJobTitle("")
        setLocation("")
        setSalaryRange("")
        setStatus("pending")
        setDateApplied("")
        setNotes("")
    }

    function handleAdd() {
        const newApplication: JobApplication = {
            id: crypto.randomUUID(),
            company,
            jobTitle,
            location,
            salaryRange,
            status,
            dateApplied,
            notes,
        }

        onAddApplication(newApplication)
        onOpenChange(false)
        resetForm()
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
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                            id="jobTitle"
                            placeholder="e.g. Software Engineer"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                placeholder="e.g. London, UK"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="salary">Salary Range</Label>
                            <Input
                                id="salary"
                                placeholder="e.g. $3000-$4000"
                                value={salaryRange}
                                onChange={(e) => setSalaryRange(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="dateApplied">Date Applied</Label>
                            <Input
                                id="dateApplied"
                                type="date"
                                value={dateApplied}
                                onChange={(e) => setDateApplied(e.target.value)}
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
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                    <SelectItem value="interviewed">Interviewed</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
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
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd}>Add Application</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}