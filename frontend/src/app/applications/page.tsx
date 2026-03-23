"use client"

import { useState } from "react"
import type { ApplicationStatus } from "@/lib/mock-data"
import { mockApplications } from "@/lib/mock-data"
import { AddApplicationModal } from "@/components/applications/AddApplicationModal"
import { AppHeader } from "@/components/AppHeader"
import { ApplicationTable } from "@/components/applications/ApplicationTable"
import { ApplicationFilters } from "@/components/applications/ApplicationFilters"
import { ApplicationPagination } from "@/components/applications/ApplicationPagination"
import { Button } from "@/components/ui/Button"

export default function ApplicationsPage() {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 5

    const filteredApplications = mockApplications.filter((app) => {
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

    return (
        <div className="min-h-screen bg-slate-50">
            <AppHeader title="Applications" />

            <main className="p-6">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Job Applications
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Manage and track all your job applications.
                            </p>
                        </div>

                        <Button onClick={() => setOpen(true)}>
                            Add Application
                        </Button>
                    </div>

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
                </div>
            </main>

            <AddApplicationModal
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    )
}