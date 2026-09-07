"use client"

import { useEffect, useState } from "react"
import { AddApplicationModal } from "@/components/applications/AddApplicationModal"
import { EditApplicationModal } from "@/components/applications/EditApplicationModal"
import { AppHeader } from "@/components/AppHeader"
import { ApplicationTable } from "@/components/applications/ApplicationTable"
import { ApplicationFilters } from "@/components/applications/ApplicationFilters"
import { ApplicationPagination } from "@/components/applications/ApplicationPagination"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Plus } from "lucide-react"
import { getApplications, updateApplicationStatus, deleteApplication, type Application, type ApplicationStatus } from "@/lib/applications"
import { getAccessToken } from "@/lib/auth"

export default function ApplicationsPage() {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | "all">("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [applications, setApplications] = useState<Application[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [editOpen, setEditOpen] = useState(false)

    const [
        selectedApplication,
        setSelectedApplication,
    ] = useState<Application | null>(null)
    const itemsPerPage = 5

    useEffect(() => {
        async function loadApplications() {
            const token = getAccessToken()

            if (!token) {
                setError("You must be logged in.")
                setIsLoading(false)
                return
            }

            try {
                const data = await getApplications(token)
                setApplications(data)
            } catch {
                setError("Failed to load applications.")
            } finally {
                setIsLoading(false)
            }
        }

        loadApplications()
    }, [])

    const filteredApplications = applications.filter((app) => {
        const matchesStatus =
            selectedStatus === "all" || app.status === selectedStatus

        const matchesSearch =
            app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.title.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesStatus && matchesSearch
    })

    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)

    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    function handleAddApplication(newApplication: Application) {
        setApplications((prev) => [newApplication, ...prev])
        setCurrentPage(1)
    }

    function handleEditApplication(application: Application) {
        setSelectedApplication(application)
        setEditOpen(true)
    }
    function handleApplicationUpdated(
        updatedApplication: Application
    ) {
        setApplications((prev) =>
            prev.map((app) =>
                app.id === updatedApplication.id
                    ? updatedApplication
                    : app
            )
        )
    }

    async function handleUpdateStatus(id: number, newStatus: ApplicationStatus) {
        const token = getAccessToken()

        if (!token) {
            setError("You must be logged in.")
            return
        }

        try {
            const updatedApplication = await updateApplicationStatus(
                token,
                id,
                newStatus
            )

            setApplications((prev) =>
                prev.map((app) =>
                    app.id === id ? updatedApplication : app
                )
            )
        } catch {
            setError("Failed to update application status.")
        }
    }

    async function handleDeleteApplication(id: number) {
        const token = getAccessToken()

        if (!token) {
            setError("You must be logged in.")
            return
        }

        try {
            await deleteApplication(token, id)

            setApplications((prev) =>
                prev.filter((app) => app.id !== id)
            )
        } catch {
            setError("Failed to delete application.")
        }
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
                                        Jobs You Have Applied To
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

                                <ApplicationTable
                                    applications={paginatedApplications}
                                    onUpdateStatus={handleUpdateStatus}
                                    onDeleteApplication={handleDeleteApplication}
                                    onEditApplication={handleEditApplication}
                                />

                                <EditApplicationModal
                                    open={editOpen}
                                    onOpenChange={setEditOpen}
                                    application={selectedApplication}
                                    onApplicationUpdated={handleApplicationUpdated}
                                />

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