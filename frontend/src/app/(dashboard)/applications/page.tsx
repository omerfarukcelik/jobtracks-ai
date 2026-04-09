"use client"

import { useState } from "react"
import type { JobApplication, ApplicationStatus } from "@/lib/mock-data"
import { mockApplications } from "@/lib/mock-data"
import { AddApplicationModal } from "@/components/applications/AddApplicationModal"
import { AppHeader } from "@/components/AppHeader"
import { ApplicationTable } from "@/components/applications/ApplicationTable"
import { ApplicationFilters } from "@/components/applications/ApplicationFilters"
import { ApplicationPagination } from "@/components/applications/ApplicationPagination"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Plus } from "lucide-react"

export default function ApplicationsPage() {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [applications, setApplications] = useState(mockApplications)

    const itemsPerPage = 5

    const filteredApplications = applications.filter((app) => {
        const matchesStatus =
            selectedStatus === "all" || app.status === selectedStatus

        const matchesSearch =
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesStatus && matchesSearch
    })

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)

    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    function handleAddApplication(newApplication: JobApplication) {
        setApplications((prev) => [newApplication, ...prev])
        setCurrentPage(1)
    }

    return (
        <>
            <AppHeader title="Applications" />
            <div className="flex-1 overflow-auto p-6">

                <main className="p-6">
                    <div className="mx-auto max-w-6xl">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-medium">
                                        Job You Have Applied
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-sm text-muted-foreground">
                                        Manage and track all your job applications.
                                    </CardDescription>
                                </div>

                                <Button onClick={() => setOpen(true)}>
                                    <Plus className="mr-1 size-4" />
                                    Add Application
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ApplicationFilters
                                    selectedStatus={selectedStatus}
                                    setSelectedStatus={setSelectedStatus}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    setCurrentPage={setCurrentPage}
                                />

                                <ApplicationTable applications={paginatedApplications} />

                                <ApplicationPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </main>

                <AddApplicationModal
                    open={open}
                    onOpenChange={setOpen}
                    onAddApplication={handleAddApplication}
                />
            </div>
        </>
    )
}